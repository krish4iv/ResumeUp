const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const puppeteer = require('puppeteer');

require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

// NOTE: Always use z.toJSONSchema() (Zod v4's native converter) here, not the third-party
// zodToJsonSchema() from the "zod-to-json-schema" package. That package was built for Zod v3's
// internal schema format and silently fails on Zod v4 schemas — instead of throwing an error,
// it just returns an empty shell like { "$schema": "..." } with no actual type/properties.
// When that happens, responseJsonSchema is effectively blank, Gemini ignores it and freelances
// its own JSON structure for the response, and the AI report fields end up empty/mismatched
// with no error anywhere in the pipeline. Cost a long debugging session to track down — don't
// reintroduce zod-to-json-schema here.

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question that can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(3).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question that can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(3).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap")
    })).min(3).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day")
    })).min(3).describe("A day-wise preparation plan for the candidate"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
});

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseJsonSchema: z.toJSONSchema(interviewReportSchema),
            maxOutputTokens: 16000,
        },
    });

    return interviewReportSchema.parse(JSON.parse(response.text));
}

 async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
            top: '12mm',
            bottom: '12mm',
            left: '14mm',
            right: '14mm',
        },
    });
    await browser.close();
    return pdf;
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const resumePdfSchema = z.object({
        html: z.string().describe("The complete self-contained HTML document for the resume")
    });

    const prompt = `You are an expert resume writer and web designer. Generate a single-page resume as a self-contained HTML document.

    CANDIDATE DETAILS:
    Resume/Background: ${resume}
    Self Description: ${selfDescription}
    Target Job Description: ${jobDescription}

    STRICT REQUIREMENTS — follow every rule exactly:

    PAGE & SIZING:
    - The entire resume MUST fit on exactly ONE A4 page (210mm × 297mm) with 12mm top/bottom and 14mm left/right margins rendered by Puppeteer.
    - Set the root font-size to 12px. Use rem/em throughout so scaling is consistent.
    - Set body margin/padding to 0. Do NOT add any wrapper padding — the PDF renderer handles margins.
    - Use CSS: html, body { width: 210mm; box-sizing: border-box; }

    TYPOGRAPHY (LaTeX-inspired academic style):
    - Font stack: 'Linux Libertine', 'Georgia', 'Times New Roman', serif  for body text.
    - Name/heading: 'Linux Biolinum', 'Helvetica Neue', Arial, sans-serif — bold, ~22px.
    - Section headings: small-caps via font-variant: small-caps; font-size: 1em; font-weight: bold; border-bottom: 1px solid #333; margin-bottom: 3px.
    - Body text color: #1a1a1a. Links: #1a1a1a, no underline.
    - Line-height: 1.35 throughout.

    LAYOUT:
    - Single-column layout.
    - Header block: name centered large, then one line below: email | phone | LinkedIn | GitHub | location — centered, separated by thin vertical pipes (|), font-size 0.82em.
    - Sections in order: Summary (2–3 tight sentences), Experience, Projects, Education, Skills.
    - Each section uses a heading rule then tight content.
    - Experience & Project entries: role/title bold left, date right (flexbox space-between); company/tech italic below; then 2–3 bullet points starting with strong action verbs. Bullets use a real bullet (•) with margin-left: 1em, no list padding.
    - Skills: inline comma-separated under sub-labels (Languages:, Frameworks:, Tools:) on one or two lines.

    CONTENT RULES:
    - Be ruthlessly concise. Max 3 bullet points per experience/project. Each bullet max 1 line.
    - Omit anything not relevant to the job description.
    - Do not pad with filler. No "References available upon request."
    - Numbers/metrics wherever possible (e.g. "reduced load time by 40%").
    - Must sound like a real human wrote it — no AI buzzword padding.
    - ATS-friendly: no tables, no columns, no text in images, semantic HTML tags only.

    TECHNICAL:
    - Output a complete HTML document: <!DOCTYPE html><html>...</html>
    - All CSS must be inline in a <style> tag in <head>. No external resources.
    - Do NOT use CSS page-break or @page rules — Puppeteer handles that.
    - Do NOT use CSS grid or flexbox for the overall page layout (single column only). Flexbox only within header and entry title rows.
    - Ensure @media print is consistent with screen styles.
    `;

    const t1 = Date.now()
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseJsonSchema: z.toJSONSchema(resumePdfSchema),
            maxOutputTokens: 16000,
        },
    });
    console.log(`[AI] Gemini response: ${Date.now() - t1}ms`)

    const jsonContent = resumePdfSchema.parse(JSON.parse(response.text));

    const t2 = Date.now()
    const pdf = await generatePdfFromHtml(jsonContent.html);
    console.log(`[PDF] Puppeteer render: ${Date.now() - t2}ms`)

    return pdf;
}

module.exports = { interviewReportSchema, generateInterviewReport, generateResumePdf, generatePdfFromHtml }