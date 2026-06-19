const { GoogleGenAI } = require("@google/genai");
const {z} = require("zod");
const {zodToJsonSchema} = require("zod-to-json-schema");
const { behavioralQuestionSchema } = require("../models/interviewreport.model");

require('dotenv').config();

const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_GENAI_API_KEY});

const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).describe("match score of the candidate"),
    
    technicalQuestions: z.array(z.object({
        question: z.string().describe("the technical question asked in the interview"),
        intention: z.string().describe("the intention of the interview question"),
        answer: z.string().describe("how to answer the question, what point to cover, what aporach to take"),
    })).describe("technical questions asked in the interview"),

    behavioralQuestionSchema: z.array(z.object({
        question: z.string().describe("the technical question asked in the interview"),
        intention: z.string().describe("the intention of the interview question"),
        answer: z.string().describe("how to answer the question, what point to cover, what aporach to take"),
    })).describe("behavioral questions asked in the interview"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("the skill that needs improvement"),
        severity: z.enum(["low", "medium", "high"]).describe("the severity of the skill gap"),
    })).describe("skills that need improvement"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("the day of the preparation plan"),
        focus: z.string().describe("the focus of the preparation plan"),
        tasks: z.array(z.string()).describe("the tasks to be completed"),
    })).describe("the preparation plan for the interview"),
})

async function generateInterviewReport ({resume, selfDescription, jobDescription}){

    const prompt  = `generate an interview report for the following:
        Resume: ${resume}
        Self Description: ${selfDescription}
        Job Description: ${jobDescription}
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: zodToJsonSchema(interviewReportSchema),
        },
    });
    console.log(response.text);
}

module.exports = {
    generateInterviewReport
};
