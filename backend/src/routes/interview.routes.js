const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const interviewController = require('../controllers/interview.controller')
const upload = require('../middlewares/file.middleware')

const interviewRouter = express.Router()

interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.createInterviewReport)
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIDController)
interviewRouter.get("/reports", authMiddleware.authUser, interviewController.getAllInterviewReports)
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)

module.exports = interviewRouter