import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = ({
    statusCode = '404',
    title = "This page wandered off",
    message = "We couldn't find what you were looking for. It might have been moved, deleted, or never existed in the first place.",
}) => {
    const navigate = useNavigate()

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#070b14] text-white flex items-center justify-center px-4 sm:px-8 py-10">

            {/* ambient gradient blobs — rose/amber leaning so it reads as "error" without leaving the brand palette */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="blob blob-a absolute -top-32 -left-24 w-96 h-96 rounded-full bg-rose-500/30 blur-3xl" />
                <div className="blob blob-b absolute top-1/3 -right-28 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl" />
                <div className="blob blob-c absolute -bottom-36 left-1/3 w-80 h-80 rounded-full bg-violet-500/20 blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-md text-center bg-white/6 border border-white/10 backdrop-blur-2xl rounded-[28px] shadow-2xl shadow-black/40 px-9 py-11">

                <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full text-rose-400 bg-rose-400/10 border border-rose-400/30 shadow-[0_0_28px_-6px_rgba(251,113,133,0.45)]">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 9.5 7 12l2 2.5M15 9.5 17 12l-2 2.5" />
                        <circle cx="12" cy="12" r="9.5" />
                    </svg>
                </div>

                <p className="font-display text-xs font-semibold tracking-[0.18em] uppercase text-white/40 mb-2">
                    {statusCode}
                </p>
                <h1 className="font-display text-2xl font-semibold text-white mb-3">
                    {title}
                </h1>
                <p className="text-sm leading-relaxed text-white/55 mb-8">
                    {message}
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-3 rounded-full text-sm font-semibold text-[#0a0f1a] bg-linear-to-r from-violet-400 to-cyan-400 shadow-[0_10px_30px_-10px_rgba(124,58,237,0.55)] transition hover:brightness-110 active:scale-[0.98] focus-visible:outline focus-visible:outline-cyan-400 focus-visible:outline-offset-2"
                    >
                        Back to home
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full py-3 rounded-full text-sm font-semibold text-white/70 bg-white/5 border border-white/10 transition hover:bg-white/10 hover:text-white active:scale-[0.98] focus-visible:outline focus-visible:outline-cyan-400 focus-visible:outline-offset-2"
                    >
                        Try again
                    </button>
                </div>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');

        .font-display {
          font-family: 'Space Grotesk', system-ui, sans-serif;
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
          50%  { transform: translate(36px, 26px) scale(1.07); }
          100% { transform: translate(-28px, -18px) scale(0.96); }
        }
        @media (prefers-reduced-motion: reduce) {
          .blob { animation: none; }
        }
      `}</style>
        </div>
    )
}

export default ErrorPage