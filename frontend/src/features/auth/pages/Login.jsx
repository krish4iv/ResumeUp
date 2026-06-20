import { useNavigate, Link } from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'  
import { useState } from 'react'  

const Login = () => {
  const navigate = useNavigate()
  const {loading, handleLogin} = useAuth()

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    handleLogin({ email, password })
    navigate('/')
  }
  if(loading){
    return (<div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black">.</div>
    </div>)
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0d1b4b]"
      style={{ background: 'linear-gradient(135deg, #1a0533 0%, #0d1b4b 40%, #0a2a1a 100%)' }}>

      {/* Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-violet-600 opacity-50 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-sky-500 opacity-50 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-emerald-500 opacity-30 blur-[80px] pointer-events-none" />

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-sm mx-4 rounded-2xl p-8
        bg-white/8 border border-white/18
        backdrop-blur-2xl
        shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]">

        {/* Online indicator */}
        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />

        {/* Header */}
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">Welcome back</h1>
        <p className="text-sm text-white/50 mb-7">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-white/60 uppercase tracking-widest">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={(e) => { setEmail(e.target.value) }}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-white/30
                bg-white/7 border border-white/15
                focus:outline-none focus:border-violet-500/70 focus:bg-white/11
                transition-colors duration-200"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-medium text-white/60 uppercase tracking-widest">
                Password
              </label>
              <a href="#" className="text-[11px] text-violet-400 hover:text-violet-300 transition-colors">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={(e) => { setPassword(e.target.value) }}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-white/30
                bg-white/7 border border-white/15
                focus:outline-none focus:border-violet-500/70 focus:bg-white/11
                transition-colors duration-200"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-semibold text-white tracking-wide
              bg-linear-to-r from-violet-600 to-indigo-500
              shadow-[0_4px_16px_rgba(124,58,237,0.45)]
              hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(124,58,237,0.6)]
              active:scale-[0.98]
              transition-all duration-150">
            Sign in
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/30">or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-white/70
                bg-white/7 border border-white/13
                hover:bg-white/12 hover:border-white/20 hover:text-white
                transition-all duration-150">
              {/* Google icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-white/70
                bg-white/7 border border-white/13
                hover:bg-white/12 hover:border-white/20 hover:text-white
                transition-all duration-150">
              {/* GitHub icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-white/45">
            Don't have an account?{' '}
            <Link to="/register" className="text-violet-400 font-medium hover:text-violet-300 transition-colors">
              Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Login