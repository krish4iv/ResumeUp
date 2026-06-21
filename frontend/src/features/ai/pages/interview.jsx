import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'


const NAV_ITEMS = [
    {
        id: 'technical', label: 'Technical Questions',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>)
    },
    {
        id: 'behavioral', label: 'Behavioral Questions',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>)
    },
    {
        id: 'roadmap', label: 'Road Map',
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>)
    },
]

// ── Sub-components ────────────────────────────────────────────────────────────

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className={`
            rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md
            transition-all duration-300 overflow-hidden
            ${open ? 'shadow-lg shadow-violet-500/10' : 'hover:bg-white/8 hover:border-white/20'}
        `}>
            <div
                className='flex items-start gap-3 p-4 cursor-pointer select-none'
                onClick={() => setOpen(o => !o)}
            >
                <span className='shrink-0 mt-0.5 text-xs font-bold text-violet-400 bg-violet-500/15 border border-violet-400/20 rounded-lg px-2 py-1 leading-none'>
                    Q{index + 1}
                </span>
                <p className='flex-1 text-sm font-medium text-white/85 leading-snug'>{item.question}</p>
                <span className={`shrink-0 text-white/40 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>

            {open && (
                <div className='px-4 pb-4 space-y-3 border-t border-white/8 pt-4'>
                    <div className='space-y-1.5'>
                        <span className='inline-block text-[10px] font-semibold uppercase tracking-widest text-amber-400/90 bg-amber-400/10 border border-amber-400/20 rounded-md px-2 py-0.5'>
                            Intention
                        </span>
                        <p className='text-sm text-white/60 leading-relaxed'>{item.intention}</p>
                    </div>
                    <div className='space-y-1.5'>
                        <span className='inline-block text-[10px] font-semibold uppercase tracking-widest text-emerald-400/90 bg-emerald-400/10 border border-emerald-400/20 rounded-md px-2 py-0.5'>
                            Model Answer
                        </span>
                        <p className='text-sm text-white/60 leading-relaxed'>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='relative pl-8'>
        {/* Timeline spine */}
        <div className='absolute left-3 top-0 bottom-0 w-px bg-linear-to-b from-violet-500/40 via-violet-500/20 to-transparent' />
        {/* Timeline dot */}
        <div className='absolute left-1.75 top-4 w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_2px_rgba(167,139,250,0.4)]' />

        <div className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 mb-4 ml-2'>
            <div className='flex items-center gap-3 mb-3'>
                <span className='text-xs font-bold text-violet-300 bg-violet-500/15 border border-violet-400/20 rounded-lg px-2.5 py-1'>
                    Day {day.day}
                </span>
                <h3 className='text-sm font-semibold text-white/90'>{day.focus}</h3>
            </div>
            <ul className='space-y-1.5'>
                {day.tasks.map((task, i) => (
                    <li key={i} className='flex items-start gap-2 text-sm text-white/55'>
                        <span className='mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-violet-400/60' />
                        {task}
                    </li>
                ))}
            </ul>
        </div>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
     const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) getReportById(interviewId)
    }, [interviewId])

    if (loading || !report) {
        return (
            <main className='min-h-screen flex items-center justify-center bg-[#0d0d1a]'>
                {/* Ambient blobs */}
                <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                    <div className='absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/20 blur-[120px]' />
                </div>
                <div className='relative text-white/60 text-sm tracking-wide animate-pulse'>
                    Loading your interview plan…
                </div>
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10 shadow-[0_0_24px_4px_rgba(52,211,153,0.2)]' :
        report.matchScore >= 60 ? 'text-amber-400 border-amber-400/40 bg-amber-400/10 shadow-[0_0_24px_4px_rgba(251,191,36,0.2)]' :
                                  'text-rose-400 border-rose-400/40 bg-rose-400/10 shadow-[0_0_24px_4px_rgba(251,113,133,0.2)]'

    const scoreLabel =
        report.matchScore >= 80 ? 'Strong match for this role' :
        report.matchScore >= 60 ? 'Decent match — prep the gaps' :
                                  'Focus on skill gaps first'

    return (
        /* Page shell with deep navy background */
        <div className='min-h-screen bg-[#0d0d1a] relative overflow-hidden'>

            {/* ── Ambient background blobs ── */}
            <div className='absolute inset-0 pointer-events-none overflow-hidden'>
                <div className='absolute -top-40 -left-40 w-150 h-150 rounded-full bg-violet-700/20 blur-[140px]' />
                <div className='absolute top-1/2 -right-60 w-125 h-125 rounded-full bg-indigo-600/15 blur-[130px]' />
                <div className='absolute bottom-0 left-1/3 w-100 h-100 rounded-full bg-fuchsia-700/10 blur-[120px]' />
            </div>

            {/* ── Layout ── */}
            <div className='relative flex h-screen'>

                {/* ── Left Nav ── */}
                <nav className='w-56 shrink-0 flex flex-col justify-between py-6 px-3 border-r border-white/8 bg-white/3 backdrop-blur-xl'>
                    <div className='space-y-1'>
                        <p className='text-[10px] font-semibold uppercase tracking-widest text-white/30 px-3 mb-3'>
                            Sections
                        </p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveNav(item.id)}
                                className={`
                                    w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium
                                    transition-all duration-200 text-left
                                    ${activeNav === item.id
                                        ? 'bg-violet-500/20 border border-violet-400/30 text-violet-200 shadow-[0_2px_12px_rgba(167,139,250,0.15)]'
                                        : 'text-white/45 hover:text-white/75 hover:bg-white/6 border border-transparent'
                                    }
                                `}
                            >
                                <span className={activeNav === item.id ? 'text-violet-300' : 'text-white/30'}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Download Resume */}
                    <button
                        onClick={() => getResumePdf(interviewId)}
                        className='flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold
                            bg-linear-to-r from-violet-600 to-indigo-600
                            hover:from-violet-500 hover:to-indigo-500
                            text-white shadow-[0_4px_20px_rgba(124,58,237,0.35)]
                            transition-all duration-200 hover:shadow-[0_4px_28px_rgba(124,58,237,0.5)]
                            active:scale-95'
                    >
                        <svg style={{ width: '0.8rem', height: '0.8rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
                        </svg>
                        Download Resume
                    </button>
                </nav>

                {/* ── Center Content ── */}
                <main className='flex-1 overflow-y-auto px-8 py-8'>
                    {activeNav === 'technical' && (
                        <section>
                            <div className='flex items-center justify-between mb-6'>
                                <h2 className='text-xl font-semibold text-white/90'>Technical Questions</h2>
                                <span className='text-xs font-medium text-white/40 bg-white/6 border border-white/10 rounded-full px-3 py-1'>
                                    {report.technicalQuestions.length} questions
                                </span>
                            </div>
                            <div className='space-y-3'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='flex items-center justify-between mb-6'>
                                <h2 className='text-xl font-semibold text-white/90'>Behavioral Questions</h2>
                                <span className='text-xs font-medium text-white/40 bg-white/6 border border-white/10 rounded-full px-3 py-1'>
                                    {report.behavioralQuestions.length} questions
                                </span>
                            </div>
                            <div className='space-y-3'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='flex items-center justify-between mb-8'>
                                <h2 className='text-xl font-semibold text-white/90'>Preparation Road Map</h2>
                                <span className='text-xs font-medium text-white/40 bg-white/6 border border-white/10 rounded-full px-3 py-1'>
                                    {report.preparationPlan.length}-day plan
                                </span>
                            </div>
                            <div>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* ── Right Sidebar ── */}
                <aside className='w-60 shrink-0 py-6 px-4 border-l border-white/8 bg-white/3 backdrop-blur-xl space-y-6 overflow-y-auto'>

                    {/* Match Score */}
                    <div className='flex flex-col items-center text-center gap-3'>
                        <p className='text-[10px] font-semibold uppercase tracking-widest text-white/30'>
                            Match Score
                        </p>
                        <div className={`
                            w-28 h-28 rounded-full border-2 flex flex-col items-center justify-center
                            ${scoreColor}
                        `}>
                            <span className='text-3xl font-bold leading-none'>{report.matchScore}</span>
                            <span className='text-xs font-semibold mt-0.5 opacity-70'>%</span>
                        </div>
                        <p className='text-xs text-white/40 leading-snug px-2'>{scoreLabel}</p>
                    </div>

                    {/* Divider */}
                    <div className='h-px bg-white/8' />

                    {/* Skill Gaps */}
                    <div className='space-y-3'>
                        <p className='text-[10px] font-semibold uppercase tracking-widest text-white/30'>
                            Skill Gaps
                        </p>
                        <div className='flex flex-wrap gap-2'>
                            {report.skillGaps.map((gap, i) => {
                                const colors = {
                                    high: 'text-rose-400 bg-rose-400/10 border-rose-400/25',
                                    medium: 'text-amber-400 bg-amber-400/10 border-amber-400/25',
                                    low: 'text-sky-400 bg-sky-400/10 border-sky-400/25',
                                }
                                return (
                                    <span
                                        key={i}
                                        className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${colors[gap.severity] ?? colors.low}`}
                                    >
                                        {gap.skill}
                                    </span>
                                )
                            })}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Interview