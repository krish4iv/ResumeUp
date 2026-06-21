import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})

export const getInterviewReport = async ({jobDescription, selfDescription , resumeFile}) => {
    const formData = new FormData()
    formData.append('jobDescription', jobDescription)
    formData.append('selfDescription', selfDescription)
    formData.append('resume', resumeFile)
    
    const response = await api.post('/interview/', formData)
    
    return response.data
}

export const getInterviewReportByID = async (id) => {
    const response = await api.get(`/interview/report/${id}`)
    return response.data
}

export const getAllInterviewReports = async () => {
    const response = await api.get('/interview/reports')
    return response.data
}

export const generateInterviewResumePdf = async (interviewReportId) => {
    const response = await api.post(`/interview/resume/pdf/${interviewReportId}`, null, { responseType: 'blob' })
    return response.data
}