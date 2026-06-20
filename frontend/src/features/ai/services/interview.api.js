const axios = require('axios')

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})

export const getInterviewReport = async ({jobDescription, selfDescription , resumeFile}) => {
    const formData = new FormData()
    formData.append('jobDescription', jobDescription)
    formData.append('selfDescription', selfDescription)
    formData.append('resumeFile', resumeFile)
    
    const response = await api.post('/api/interview/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    
    return response.data
}

export const getInterviewReportByID = async (id) => {
    const response = await api.get(`/api/report/${id}`)
    return response.data
}

export const getAllInterviewReports = async () => {
    const response = await api.get('/api/reports/')
    return response.data
}
