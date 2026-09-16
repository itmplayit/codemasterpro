import { useEffect, useState, useRef } from 'react'

// Custom Cursor Follower
export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  
  useEffect(()=>{
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
    }
    const handleHover = (e) => {
      const target = e.target
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleHover)
    return ()=>{
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleHover)
    }
  }, [])
  
  return (
    <>
      <div 
        className="fixed w-4 h-4 bg-blue-600 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block transition-transform duration-150"
        style={{ 
          left: pos.x - 8, 
          top: pos.y - 8,
          transform: `scale(${isHovering ? 1.5 : 1})`,
        }}
      />
      <div 
        className="fixed w-8 h-8 border border-blue-600/50 rounded-full pointer-events-none z-[9998] hidden lg:block transition-all duration-300"
        style={{ 
          left: pos.x - 16, 
          top: pos.y - 16,
          transform: `scale(${isHovering ? 1.8 : 1})`,
          opacity: isHovering ? 0.8 : 0.3
        }}
      />
    </>
  )
}

// 3D Tilt Card
export function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null)
  
  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
  }
  
  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
  }
  
  return (
    <div 
      ref={cardRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

// Magnetic Button
export function MagneticButton({ children, className = '', ...props }) {
  const btnRef = useRef(null)
  
  const handleMouseMove = (e) => {
    const btn = btnRef.current
    if (!btn) return
    
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.3}px)`
  }
  
  const handleMouseLeave = () => {
    const btn = btnRef.current
    if (!btn) return
    btn.style.transform = 'translate(0, 0)'
  }
  
  return (
    <button
      ref={btnRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  )
}

// Scroll Progress Bar
export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  
  useEffect(()=>{
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const current = window.scrollY
      setProgress((current / total) * 100)
    }
    window.addEventListener('scroll', handleScroll)
    return ()=>window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-[100] pointer-events-none">
      <div className="h-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-150" style={{ width: `${progress}%` }}/>
    </div>
  )
}

// Animated Background Grid
export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"/>
    </div>
  )
}

// Spotlight Effect
export function Spotlight({ className = '' }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  useEffect(()=>{
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return ()=>window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <div 
      className={`pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 ${className}`}
      style={{
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
      }}
    />
  )
}
