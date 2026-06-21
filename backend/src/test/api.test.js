jest.mock('puppeteer', () => ({
    launch: jest.fn().mockResolvedValue({
        newPage: jest.fn().mockResolvedValue({
            setContent: jest.fn().mockResolvedValue(undefined),
            pdf: jest.fn().mockResolvedValue(Buffer.from('%PDF-mock-content')),
        }),
        close: jest.fn().mockResolvedValue(undefined),
    }),
}))

jest.mock('../middlewares/auth.middleware', () => ({
    authUser: (req, res, next) => {
        req.user = { _id: '000000000000000000000000', id: '000000000000000000000000' }
        next()
    }
}))

jest.mock('../models/interviewreport.model', () => ({
    InterviewReportModel: {
        findById: jest.fn().mockResolvedValue(null),
        find: jest.fn().mockReturnValue({
            sort: jest.fn().mockReturnValue({
                select: jest.fn().mockResolvedValue([])
            })
        }),
        create: jest.fn().mockResolvedValue({ _id: '000000000000000000000000' }),
    }
}))

jest.mock('../services/ai.service', () => ({
    generateInterviewReport: jest.fn().mockResolvedValue({
        matchScore: 85,
        title: 'Frontend Developer',
        technicalQuestions: Array(3).fill({ question: 'q', intention: 'i', answer: 'a' }),
        behavioralQuestions: Array(3).fill({ question: 'q', intention: 'i', answer: 'a' }),
        skillGaps: Array(3).fill({ skill: 'React', severity: 'low' }),
        preparationPlan: Array(3).fill({ day: 1, focus: 'DSA', tasks: ['task1'] }),
    }),
    generateResumePdf: jest.fn().mockResolvedValue(Buffer.from('%PDF-mock')),
}))

jest.mock('pdf-parse', () => ({
    PDFParse: jest.fn().mockImplementation(() => ({
        getText: jest.fn().mockResolvedValue({ text: 'mock resume text' }),
    }))
}))

const request = require('supertest')
const app = require('../app')

// ── POST /api/interview ───────────────────────────────────────────────────────

describe('POST /api/interview', () => {

    test('returns 400 if jobDescription is missing', async () => {
        const res = await request(app)
            .post('/api/interview')
            .field('selfDescription', 'I am a developer')
        expect(res.status).toBe(400)
    })

    test('returns 400 if resume file is missing', async () => {
        const res = await request(app)
            .post('/api/interview')
            .field('jobDescription', 'React developer')
            .field('selfDescription', 'I am a dev')
        expect(res.status).toBe(400)
    })
})

// ── GET /api/interview/report/:interviewId ────────────────────────────────────

describe('GET /api/interview/report/:interviewId', () => {

    test('returns 404 for non-existent report', async () => {
        const res = await request(app)
            .get('/api/interview/report/000000000000000000000000')
        expect(res.status).toBe(404)
    })

    test('returns 400 or higher for invalid mongo id', async () => {
        const res = await request(app)
            .get('/api/interview/report/invalid-id')
        expect(res.status).toBeGreaterThanOrEqual(400)
    })
})

// ── GET /api/interview/reports ────────────────────────────────────────────────

describe('GET /api/interview/reports', () => {

    test('returns 200 with interviewReports array', async () => {
        const res = await request(app)
            .get('/api/interview/reports')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('interviewReports')
        expect(Array.isArray(res.body.interviewReports)).toBe(true)
    })
})

// ── POST /api/interview/resume/pdf/:id ────────────────────────────────────────

describe('POST /api/interview/resume/pdf/:interviewReportId', () => {

    test('returns 404 for non-existent report', async () => {
        const res = await request(app)
            .post('/api/interview/resume/pdf/000000000000000000000000')
        expect(res.status).toBe(404)
    })

    test('returns PDF content-type when report exists', async () => {
        const { InterviewReportModel } = require('../models/interviewreport.model')
        InterviewReportModel.findById.mockResolvedValueOnce({
            _id: '000000000000000000000000',
            resume: 'mock resume',
            selfDescription: 'mock self',
            jobDescription: 'mock job',
        })

        const res = await request(app)
            .post('/api/interview/resume/pdf/000000000000000000000000')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toContain('application/pdf')
    })
})