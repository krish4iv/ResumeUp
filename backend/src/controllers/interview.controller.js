const pdfParse = require('pdf-parse')
const {generateInterviewReport, generateResumePdf }= require('../services/ai.service')
const { InterviewReportModel } = require('../models/interviewreport.model')

async function createInterviewReport(req, res) {
    try {
        if (!req.body.jobDescription) return res.status(400).json({ message: "jobDescription is required." })
        if (!req.file) return res.status(400).json({ message: "Resume file is required." })
        
        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
        const { selfDescription, jobDescription } = req.body

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        })

        const interviewReport = await InterviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
    } catch (err) {
        console.error('createInterviewReport failed:', err);
        res.status(500).json({ message: "Failed to generate interview report.", error: err.message });
    }
}

async function getInterviewReportByIDController(req, res) {
    const {interviewId} = req.params

    const interviewReport = await InterviewReportModel.findById(interviewId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }
    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}

async function getAllInterviewReports(req, res) {
    const interviewReports = await InterviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}

async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params

        const interviewReport = await InterviewReportModel.findById(interviewReportId)
        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found." })
        }

        const { resume, selfDescription, jobDescription } = interviewReport

        const pdf = await generateResumePdf({ resume, selfDescription, jobDescription })

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"')
        res.status(200).send(pdf)

    } catch (err) {
        console.error('generateResumePdfController failed:', err)
        res.status(500).json({ message: "Failed to generate resume PDF.", error: err.message })
    }
}

module.exports= {createInterviewReport, getInterviewReportByIDController, getAllInterviewReports, generateResumePdfController}