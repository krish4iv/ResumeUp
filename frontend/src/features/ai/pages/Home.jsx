
function Home() {
    const { loading, generateReport } = useInterview()
    const {jobDescription, setJobDescription} = useJobDescription()



    
return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#070b14] text-white flex items-center justify-center px-4 sm:px-8 py-10">

            {/* ambient gradient blobs — the glass only reads as glass if something colorful sits behind it */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="blob blob-a absolute -top-32 -left-24 w-md h-md rounded-full bg-violet-600/40 blur-3xl" />
                <div className="blob blob-b absolute top-1/3 -right-24 w-104 h-104 rounded-full bg-cyan-400/30 blur-3xl" />
                <div className="blob blob-c absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-6xl">

                {/* header */}
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

                {/* panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* job description */}
                    <div className="glass-card flex flex-col gap-4 p-6 sm:p-8 min-h-88">
                        <label
                            htmlFor="jobdescription"
                            className="text-xs font-medium tracking-widest text-white/50 uppercase"
                        >
                            Job description
                        </label>
                        <textarea
                            className="glass-input flex-1 resize-none"
                            name="jobdescription"
                            id="jobdescription"
                            placeholder="Paste the role's requirements, responsibilities, and what they're really looking for…" />
                    </div>

                    {/* candidate details */}
                    <div className="glass-card flex flex-col gap-5 p-6 sm:p-8">

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="resume"
                                className="text-xs font-medium tracking-widest text-white/50 uppercase"
                            >
                                Resume
                            </label>
                            <label
                                htmlFor="resume"
                                className="upload-zone flex items-center gap-3 cursor-pointer"
                            >
                                <svg
                                    className="w-5 h-5 text-cyan-300 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 7.5 12 3m0 0L7.5 7.5M12 3v13.5" />
                                </svg>
                                <span className="text-sm text-white/70">
                                    Click to upload your resume
                                    <span className="block text-xs text-white/35">PDF, DOC, or DOCX</span>
                                </span>
                            </label>
                            <input
                                type="file"
                                id="resume"
                                accept=".pdf,.doc,.docx"
                                className="sr-only" />
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <label
                                htmlFor="selfDescription"
                                className="text-xs font-medium tracking-widest text-white/50 uppercase"
                            >
                                Self description
                            </label>
                            <textarea
                                className="glass-input flex-1 resize-none min-h-32"
                                name="selfDescription"
                                id="selfDescription"
                                placeholder="Tell us about your background, what you're proud of, and what you're aiming for…" />
                        </div>

                        <button className="generate-btn mt-1">
                            Generate interview report
                        </button>
                    </div>

                </div>
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
        .glass-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
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
        .upload-zone:focus-within {
          border-color: rgba(34, 211, 238, 0.6);
          box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.18);
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
        .generate-btn:hover {
          filter: brightness(1.08);
        }
        .generate-btn:active {
          transform: scale(0.98);
        }
        .generate-btn:focus-visible {
          outline: 2px solid #22d3ee;
          outline-offset: 3px;
        }

        .blob {
          animation: drift 22s ease-in-out infinite alternate;
        }
        .blob-b {
          animation-duration: 26s;
          animation-delay: -4s;
        }
        .blob-c {
          animation-duration: 30s;
          animation-delay: -10s;
        }
        @keyframes drift {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(40px, 30px) scale(1.08); }
          100% { transform: translate(-30px, -20px) scale(0.96); }
        }
        @media (prefers-reduced-motion: reduce) {
          .blob { animation: none; }
        }
      `}</style>
        </div>
    )
}

export default Home