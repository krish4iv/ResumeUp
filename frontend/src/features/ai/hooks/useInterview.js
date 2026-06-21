import {getInterviewReport, getInterviewReportByID, getAllInterviewReports, generateInterviewResumePdf } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router-dom"



export const useInterview = () => {
    const context = useContext(InterviewContext)
    if(!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const {loading, setLoading, report, setReport, reports, setReports} = context
    const {interviewId} = useParams()

    const generateReport = async ({jobDescription, selfDescription, resumeFile}) => {
        setLoading(true)
        try {
            const response = await getInterviewReport({jobDescription, selfDescription, resumeFile})
            setReport(response.interviewReport)   // unwrap the actual key, not .data
            return response.interviewReport
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        try {
            const response = await getInterviewReportByID(interviewId)
           setReport(response.interviewReport)   // unwrap the actual key, not .data
           return response.interviewReport
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const getAllReports = async () => {
        setLoading(true)
        try {
            const response = await getAllInterviewReports()
            setReports(response.interviewReports)
            return response.interviewReports
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        try {
            const response = await generateInterviewResumePdf(interviewReportId)
            const url = window.URL.createObjectURL(new Blob([response]), {type: 'application/pdf'})
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            return response
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
       if(interviewId){
        getReportById(interviewId)
       }else {
        getAllReports()
       }
    }, [interviewId])

    return {
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports,
        generateReport,
        getReportById,
        getAllReports,
        getResumePdf
    }
    
}