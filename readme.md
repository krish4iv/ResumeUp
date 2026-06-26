# ResumeUp – AI Interview Prep

An AI-powered interview preparation app that analyzes your resume and a target job description to generate personalized technical questions, behavioral questions, skill gap analysis, a day-wise preparation roadmap, and a tailored resume PDF.

<img width="1909" height="931" alt="{3C50330B-34F4-43B0-9399-B4CECF64F0A6}" src="https://github.com/user-attachments/assets/f69a344f-ed09-43fe-9eef-3b531ce4697e" />
<img width="1902" height="932" alt="{1AA632AC-06C3-4FCB-AC71-76DF3EF16D2B}" src="https://github.com/user-attachments/assets/08cf5beb-487e-47d1-8cb5-b9ca21c45b29" />


## Features

- **AI Report Generation** — Upload your resume + paste a job description → get a structured interview prep report powered by Gemini 2.5 Flash
- **Technical & Behavioral Questions** — Each question includes the interviewer's intention and a model answer
- **Skill Gap Analysis** — Identifies missing skills with severity ratings (low / medium / high)
- **Preparation Roadmap** — Day-by-day plan tailored to the role
- **Resume PDF Export** — Generates a LaTeX-styled, ATS-friendly single-page resume PDF via Puppeteer
- **Match Score** — Percentage score showing how well your profile matches the job description

---

## Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS (glassmorphism UI)
- React Router
- Vite

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Google Gemini 2.5 Flash (`@google/genai`)
- Zod v4 (structured AI output validation)
- Puppeteer (PDF generation)
- Multer (resume file upload)
- pdf-parse (resume text extraction)
- JWT + cookie-based auth

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Google Gemini API key

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/ai-interview-prep.git
cd ai-interview-prep

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `/backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
GOOGLE_GENAI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Running Locally

```bash
# Start backend (from /backend)
npm run dev

# Start frontend (from /frontend)
npm run dev
```

Frontend runs on `http://localhost:5173`  
Backend runs on `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT cookie |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/get-me` | Get current user |
| POST | `/api/interview` | Generate interview report (multipart/form-data) |
| GET | `/api/interview/report/:id` | Get report by ID |
| GET | `/api/interview/reports` | Get all reports for current user |
| POST | `/api/interview/resume/pdf/:id` | Generate and download resume PDF |

---

## Testing

### Run Jest tests

```bash
cd backend
npm test
```

**16 tests across 3 suites:**

| Suite | Tests |
|-------|-------|
| `schema.test.js` | Zod schema validation — accepts valid reports, rejects malformed data |
| `pdf.test.js` | PDF buffer integrity — valid Buffer, non-empty, `%PDF` header present |
| `api.test.js` | API contracts — 400 validation, 404 not found, 200 success, PDF content-type |

### Run k6 Load Test

Requires [k6](https://k6.io/docs/get-started/installation/) installed.

```bash
# Start backend first
npm run dev

# In a new terminal
k6 run src/test/load.js
```

**Results:** p95 response time 2.33ms, zero 5xx errors, stable under 5 concurrent users over 40 seconds.

---

## Lighthouse Scores (Production Build)

Tested against `vite build` output served via `serve -s dist`.

| Category | Score |
|----------|-------|
| Performance | 99 |
| Accessibility | 100 |
| Best Practices | 96 |
| SEO | 100 |

**Core Web Vitals:** FCP 1.6s · LCP 2.0s · TBT 0ms · CLS 0

---

## Project Structure

```
ai-interview-prep/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── interview.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── file.middleware.js
│   │   ├── models/
│   │   │   └── interviewreport.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── interview.routes.js
│   │   ├── services/
│   │   │   └── ai.service.js
│   │   ├── test/
│   │   │   ├── schema.test.js
│   │   │   ├── pdf.test.js
│   │   │   ├── api.test.js
│   │   │   └── load.js
│   │   └── app.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Interview.jsx
│   │   │   └── Login.jsx
│   │   └── main.tsx
│   ├── public/
│   │   └── robots.txt
│   └── package.json
└── README.md
```

---

## Key Implementation Notes

**Zod v4 schema validation** — Uses `z.toJSONSchema()` (native Zod v4) instead of the `zod-to-json-schema` package which silently fails on Zod v4 schemas and returns an empty shell.

**PDF generation** — Puppeteer margins must be nested inside a `margin: {}` object in `page.pdf()`. Top-level margin keys are silently ignored.

**Structured AI output** — Gemini's `responseMimeType: 'application/json'` + `responseJsonSchema` enforces schema compliance at the model level, reducing parse failures.

---

## License

MIT
