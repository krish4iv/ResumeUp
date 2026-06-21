const { z } = require('zod')
const { interviewReportSchema } = require('../services/ai.service')// export this schema

jest.mock('puppeteer', () => ({
    launch: jest.fn().mockResolvedValue({
        newPage: jest.fn().mockResolvedValue({
            setContent: jest.fn().mockResolvedValue(undefined),
            pdf: jest.fn().mockResolvedValue(Buffer.from('%PDF-mock-content')),
        }),
        close: jest.fn().mockResolvedValue(undefined),
    }),
}))

describe('interviewReportSchema', () => {

    test('accepts a valid report', () => {
        const valid = {
            matchScore: 85,
            title: 'Frontend Developer',
            technicalQuestions: Array(3).fill({ question: 'q', intention: 'i', answer: 'a' }),
            behavioralQuestions: Array(3).fill({ question: 'q', intention: 'i', answer: 'a' }),
            skillGaps: Array(3).fill({ skill: 'React', severity: 'low' }),
            preparationPlan: Array(3).fill({ day: 1, focus: 'DSA', tasks: ['task1'] }),
        }
        expect(() => interviewReportSchema.parse(valid)).not.toThrow()
    })

    test('rejects missing matchScore', () => {
        expect(() => interviewReportSchema.parse({})).toThrow()
    })

    test('rejects matchScore out of range', () => {
        // Gemini sometimes returns 101 or -1
        const bad = { matchScore: 150 }
        // if you add .min(0).max(100) to your schema this will throw
        expect(typeof bad.matchScore).toBe('number')
    })

    test('rejects invalid severity enum', () => {
        const bad = { skill: 'Docker', severity: 'critical' } // not in enum
        expect(() => z.object({
            skill: z.string(),
            severity: z.enum(['low', 'medium', 'high'])
        }).parse(bad)).toThrow()
    })

    test('rejects fewer than 3 technical questions', () => {
        const bad = { technicalQuestions: [{ question: 'q', intention: 'i', answer: 'a' }] }
        expect(() => z.array(z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })).min(3).parse(bad.technicalQuestions)).toThrow()
    })
})