import { useEffect, useState } from 'react'

// Animated Counter
export function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0)
  
  useEffect(()=>{
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(()=>{
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return ()=>clearInterval(timer)
  }, [end, duration])
  
  return <span>{count.toLocaleString()}{suffix}</span>
}

// Typing Animation
export function TypingText({ texts, speed = 100, deleteSpeed = 50, pause = 2000 }) {
  const [display, setDisplay] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  useEffect(()=>{
    const current = texts[textIndex]
    const timeout = setTimeout(()=>{
      if (!isDeleting) {
        if (display.length < current.length) {
          setDisplay(current.slice(0, display.length + 1))
        } else {
          setTimeout(()=>setIsDeleting(true), pause)
        }
      } else {
        if (display.length > 0) {
          setDisplay(current.slice(0, display.length - 1))
        } else {
          setIsDeleting(false)
          setTextIndex((textIndex + 1) % texts.length)
        }
      }
    }, isDeleting ? deleteSpeed : speed)
    
    return ()=>clearTimeout(timeout)
  }, [display, isDeleting, textIndex, texts, speed, deleteSpeed, pause])
  
  return <span className="border-r-2 border-blue-600 pr-1">{display}</span>
}

// Floating Orbs Background
export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"/>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"/>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"/>
    </div>
  )
}

// Glass Card with dynamic border
export function GlassCard({ children, className = '', hover = true }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"/>
      <div className={`relative bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-100 ${hover ? 'hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1' : ''} transition-all duration-500`}>
        {children}
      </div>
    </div>
  )
}

// Shimmer Button
export function ShimmerButton({ children, className = '', ...props }) {
  return (
    <button className={`relative overflow-hidden bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group ${className}`} {...props}>
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"/>
      <span className="relative flex items-center justify-center gap-2">{children}</span>
    </button>
  )
}

// Animated Gradient Text
export function GradientText({ children, className = '' }) {
  return (
    <span className={`bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 bg-clip-text text-transparent animate-gradient ${className}`}>
      {children}
    </span>
  )
}

// Testimonial Card
export function TestimonialCard({ name, role, company, avatar, text, rating }) {
  return (
    <div className="card-dynamic p-6 hover-lift">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold">{avatar}</div>
        <div>
          <p className="font-bold text-sm">{name}</p>
          <p className="text-xs text-gray-500">{role} @ {company}</p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {[...Array(rating)].map((_,i)=><span key={i} className="text-amber-400">★</span>)}
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">"{text}"</p>
    </div>
  )
}

// Feature Card with icon animation
export function FeatureCard({ icon, title, desc, color = 'blue' }) {
  const colors = {
    blue: 'from-blue-500 to-cyan-500',
    violet: 'from-violet-500 to-purple-500',
    pink: 'from-pink-500 to-rose-500',
    amber: 'from-amber-500 to-orange-500',
    green: 'from-green-500 to-emerald-500'
  }
  
  return (
    <div className="group relative">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${colors[color]} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`}/>
      <div className="relative card p-6 hover:-translate-y-1 transition-all duration-500">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-white text-xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
          {icon}
        </div>
        <h3 className="font-bold group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

// Code Window with typing
export function CodeWindow({ code, language = 'javascript' }) {
  const [displayed, setDisplayed] = useState('')
  
  useEffect(()=>{
    let i = 0
    const timer = setInterval(()=>{
      if (i < code.length) {
        setDisplayed(code.slice(0, i+1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 20)
    return ()=>clearInterval(timer)
  }, [code])
  
  return (
    <div className="bg-[#0f0f12] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a23] border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500"/>
        <div className="w-3 h-3 rounded-full bg-yellow-500"/>
        <div className="w-3 h-3 rounded-full bg-green-500"/>
        <span className="ml-3 text-xs text-gray-400 mono">{language}.js</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
          <span className="text-[10px] text-gray-500">Live</span>
        </div>
      </div>
      <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto leading-6">
        <code>{displayed}<span className="animate-pulse">▊</span></code>
      </pre>
    </div>
  )
}
