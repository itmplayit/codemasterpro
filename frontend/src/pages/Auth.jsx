import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Command } from 'lucide-react'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handle = async (e) => {
    e.preventDefault()
    try { await login(email, password); navigate('/dashboard') }
    catch (err) { setError(err.response?.data?.message || 'Login failed - XAMPP MySQL needed, use demo fill') }
  }

  const fillDemo = (type) => {
    if (type === 'admin') {
      setEmail('admin@codemaster.pro')
      setPassword('Admin@123')
    } else {
      setEmail('john@example.com')
      setPassword('User@123')
    }
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-10"><div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center"><Command className="w-5 h-5 text-black"/></div><span className="font-bold display">codemaster.pro</span></Link>
          <h1 className="display text-[32px] font-bold tracking-tight">Welcome back</h1>
          <p className="text-white/40 mt-2 text-[13px]">No auto-fill, click demo buttons to fill.</p>
          <form onSubmit={handle} className="mt-8 space-y-4" autoComplete="off">
            {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-[13px]">{error}</div>}
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" autoComplete="off" className="w-full px-4 py-3 bg-[#12121a] border border-white/[0.06] rounded-full text-[13px] focus:outline-none focus:border-white/20 placeholder:text-white/20"/>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" autoComplete="new-password" className="w-full px-4 py-3 bg-[#12121a] border border-white/[0.06] rounded-full text-[13px] focus:outline-none focus:border-white/20 placeholder:text-white/20"/>
            <button className="w-full bg-white text-black py-3 rounded-full font-bold text-[14px] hover:bg-white/90">Login</button>
          </form>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button onClick={()=>fillDemo('admin')} className="text-[12px] bg-white/[0.06] border border-white/[0.06] hover:bg-white/[0.08] py-2.5 rounded-full">Fill Admin</button>
            <button onClick={()=>fillDemo('user')} className="text-[12px] bg-white text-black py-2.5 rounded-full font-bold">Fill User</button>
          </div>
          <p className="mt-6 text-[13px] text-center text-white/40">No account? <Link to="/register" className="text-white font-semibold">Sign up</Link></p>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 bg-[#0a0a0f] border-l border-white/[0.06] text-white items-center justify-center p-12">
        <div className="max-w-md">
          <h2 className="display text-[36px] font-bold leading-[0.9]">Learn to code<br/>with MySQL + React<br/><span className="text-white/20">production stack.</span></h2>
          <p className="mt-6 text-white/40 text-[14px]">Professional education platform with memberships, quizzes, notes, deploy, AI.</p>
          <div className="mt-8 grid grid-cols-2 gap-3 text-[11px]">
            <div className="bg-white/[0.04] border border-white/[0.06] p-3 rounded-xl">✓ XAMPP Ready</div>
            <div className="bg-white/[0.04] border border-white/[0.06] p-3 rounded-xl">✓ One-Click Deploy</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handle = async (e) => {
    e.preventDefault()
    try { await register(name, email, password); navigate('/dashboard') }
    catch (err) { setError(err.response?.data?.message || 'Register failed') }
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 mb-10"><div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center"><Command className="w-5 h-5 text-black"/></div><span className="font-bold display">codemaster.pro</span></Link>
        <h1 className="display text-[32px] font-bold tracking-tight">Create account</h1>
        <p className="text-white/40 mt-2 text-[13px]">Start your coding journey - free forever.</p>
        <form onSubmit={handle} className="mt-8 space-y-4" autoComplete="off">
          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-[13px]">{error}</div>}
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" autoComplete="off" className="w-full px-4 py-3 bg-[#12121a] border border-white/[0.06] rounded-full text-[13px] focus:outline-none focus:border-white/20" required/>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" autoComplete="off" className="w-full px-4 py-3 bg-[#12121a] border border-white/[0.06] rounded-full text-[13px] focus:outline-none focus:border-white/20" required/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" autoComplete="new-password" className="w-full px-4 py-3 bg-[#12121a] border border-white/[0.06] rounded-full text-[13px] focus:outline-none focus:border-white/20" required/>
          <button className="w-full bg-white text-black py-3 rounded-full font-bold text-[14px]">Create Account</button>
        </form>
        <p className="mt-6 text-[13px] text-center text-white/40">Already have account? <Link to="/login" className="text-white font-semibold">Login</Link></p>
      </div>
    </div>
  )
}
