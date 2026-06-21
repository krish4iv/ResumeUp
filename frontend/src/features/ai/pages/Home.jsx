import { useState, useRef } from "react"
import { useInterview } from "../hooks/useInterview"
import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()
    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef(null)

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const result = await generateReport({ jobDescription, selfDescription, resumeFile })
        if (result) {
            navigate(`/interview/${result._id}`)
        } else {
            navigate('/error')
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#070b14]">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400" />
            </div>
        )
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#070b14] text-white px-4 sm:px-8 py-10">

            {/* Ambient blobs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="blob blob-a absolute -top-32 -left-24 w-md h-md rounded-full bg-violet-600/40 blur-3xl" />
                <div className="blob blob-b absolute top-1/3 -right-24 w-104 h-104 rounded-full bg-cyan-400/30 blur-3xl" />
                <div className="blob blob-c absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-16">

                {/* ── Top section: inputs ── */}
                <div>
                    {/* Header */}
                    <div className="mb-10 text-center md:text-left">
                        <p className="text-xs font-medium tracking-[0.2em] text-cyan-300/80 uppercase mb-3">
                            AI Interview Prep
                        </p>
                        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                            Walk in ready, not nervous
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-white/50 max-w-xl">
                            Drop in the role and a bit about yourself — we'll map the gaps and
                            build a report before the interview does.
                        </p>
                    </div>

                    {/* Input panels */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Job description */}
                        <div className="glass-card flex flex-col gap-4 p-6 sm:p-8 min-h-[22rem]">
                            <label htmlFor="jobdescription" className="text-xs font-medium tracking-widest text-white/50 uppercase">
                                Job description
                            </label>
                            <textarea
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="glass-input flex-1 resize-none"
                                name="jobdescription"
                                id="jobdescription"
                                placeholder="Paste the role's requirements, responsibilities, and what they're really looking for…"
                            />
                        </div>

                        {/* Candidate details */}
                        <div className="glass-card flex flex-col gap-5 p-6 sm:p-8">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="resume" className="text-xs font-medium tracking-widest text-white/50 uppercase">
                                    Resume
                                </label>
                                <label htmlFor="resume" className="upload-zone flex items-center gap-3 cursor-pointer">
                                    <svg className="w-5 h-5 text-cyan-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 7.5 12 3m0 0L7.5 7.5M12 3v13.5" />
                                    </svg>
                                    <span className="text-sm text-white/70">
                                        Click to upload your resume
                                        <span className="block text-xs text-white/35">PDF, DOC, or DOCX</span>
                                    </span>
                                </label>
                                <input type="file" ref={resumeInputRef} id="resume" accept=".pdf,.doc,.docx" className="sr-only" />
                            </div>

                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="selfDescription" className="text-xs font-medium tracking-widest text-white/50 uppercase">
                                    Self description
                                </label>
                                <textarea
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                    className="glass-input flex-1 resize-none min-h-32"
                                    name="selfDescription"
                                    id="selfDescription"
                                    placeholder="Tell us about your background, what you're proud of, and what you're aiming for…"
                                />
                            </div>

                            <button className="generate-btn mt-1" onClick={handleGenerateReport}>
                                Generate interview report
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Reports section ── */}
                {reports.length > 0 && (
                    <div>
                        {/* Section header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div>
                                <p className="text-xs font-medium tracking-[0.2em] text-cyan-300/80 uppercase mb-1">
                                    History
                                </p>
                                <h2 className="text-xl font-semibold text-white/90">
                                    Generated Reports
                                </h2>
                            </div>
                            <div className="flex-1 h-px bg-white/8" />
                            <span className="text-xs text-white/30 bg-white/6 border border-white/10 rounded-full px-3 py-1 shrink-0">
                                {reports.length} {reports.length === 1 ? 'report' : 'reports'}
                            </span>
                        </div>

                        {/* Report cards grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {reports.map((report) => (
                                <button
                                    key={report._id}
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                    className="report-card group text-left flex flex-col gap-3 p-5"
                                >
                                    {/* Top row: icon + date + score */}
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-400/20 flex items-center justify-center shrink-0">
                                            <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
                                            </svg>
                                        </div>
                                        <span className="text-[11px] text-white/30 mt-0.5 shrink-0">
                                            {new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span className="text-[11px] text-white/30 mt-0.5 shrink-0 p-2 rounded-b-full border-b-4 border-emerald-700">
                                            {report.matchScore}%
                                        </span>
                                    </div>

                                    {/* Title + description */}
                                    <div className="flex-1 space-y-1">
                                        <h3 className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors line-clamp-1">
                                            {report.title}
                                        </h3>
                                        {report.description && (
                                            <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
                                                {report.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Footer: open arrow */}
                                    <div className="flex items-center justify-between pt-2 border-t border-white/8">
                                        <span className="text-[11px] text-white/30">
                                            {new Date(report.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <span className="text-white/25 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all duration-200">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            <style>{`
        .font-display {
          font-family: 'Space Grotesk', system-ui, sans-serif;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 28px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
        }

        .glass-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 14px 16px;
          font-size: 0.875rem;
          color: white;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .glass-input::placeholder { color: rgba(255, 255, 255, 0.3); }
        .glass-input:focus {
          border-color: rgba(34, 211, 238, 0.5);
          box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.18);
        }

        .upload-zone {
          background: rgba(255, 255, 255, 0.04);
          border: 1px dashed rgba(255, 255, 255, 0.2);
          border-radius: 14px;
          padding: 14px 16px;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .upload-zone:hover {
          border-color: rgba(34, 211, 238, 0.45);
          background: rgba(255, 255, 255, 0.07);
        }

        .generate-btn {
          width: 100%;
          padding: 13px 20px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.9rem;
          color: #0a0f1a;
          background: linear-gradient(90deg, #a78bfa, #22d3ee);
          box-shadow: 0 10px 30px -10px rgba(124, 58, 237, 0.6);
          transition: filter 0.2s ease, transform 0.1s ease;
        }
        .generate-btn:hover { filter: brightness(1.08); }
        .generate-btn:active { transform: scale(0.98); }

        .report-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.10);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
          transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
          cursor: pointer;
        }
        .report-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(34, 211, 238, 0.25);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(34, 211, 238, 0.1);
          transform: translateY(-2px);
        }
        .report-card:active { transform: translateY(0); }

        .blob { animation: drift 22s ease-in-out infinite alternate; }
        .blob-b { animation-duration: 26s; animation-delay: -4s; }
        .blob-c { animation-duration: 30s; animation-delay: -10s; }
        @keyframes drift {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(40px, 30px) scale(1.08); }
          100% { transform: translate(-30px, -20px) scale(0.96); }
        }
        @media (prefers-reduced-motion: reduce) { .blob { animation: none; } }
      `}</style>
        </div>
    )
}

export default Home