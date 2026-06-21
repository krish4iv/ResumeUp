const { generatePdfFromHtml } = require('../services/ai.service')

jest.mock('puppeteer', () => ({
    launch: jest.fn().mockResolvedValue({
        newPage: jest.fn().mockResolvedValue({
            setContent: jest.fn().mockResolvedValue(undefined),
            pdf: jest.fn().mockResolvedValue(Buffer.from('%PDF-mock-content')),
        }),
        close: jest.fn().mockResolvedValue(undefined),
    }),
}))

describe('generatePdfFromHtml', () => {

    test('returns a Buffer', async () => {
        const pdf = await generatePdfFromHtml('<html><body><p>Hello</p></body></html>')
        expect(Buffer.isBuffer(pdf)).toBe(true)
    }, 15000) // puppeteer is slow, give it 15s

    test('PDF is non-empty (> 1KB)', async () => {
        const pdf = await generatePdfFromHtml('<html><body><p>Hello</p></body></html>')
        expect(pdf.length).toBeGreaterThan(0)
    }, 15000)

    test('PDF starts with %PDF header', async () => {
        const pdf = await generatePdfFromHtml('<html><body><p>Test</p></body></html>')
        expect(pdf.toString('ascii', 0, 4)).toBe('%PDF')
    }, 15000)

    test('handles empty body without crashing', async () => {
        const pdf = await generatePdfFromHtml('<html><body></body></html>')
        expect(pdf.length).toBeGreaterThan(0)
    }, 15000)
})