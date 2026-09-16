import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { Trophy, Clock, Target, Crown, Command } from 'lucide-react'

export default function Quizzes() {
  const { API } = useAuth()
  const [quizzes, setQuizzes] = useState([
    { id:1, title:'JavaScript Basics Quiz', slug:'javascript-basics-quiz', description:'Test your JS fundamentals - variables, functions, closures', category_name:'JavaScript', level:'beginner', time_limit:10, total_questions:20, total_attempts:1240, is_premium:false },
    { id:2, title:'ReactJS Advanced Quiz', slug:'reactjs-advanced-quiz', description:'Hooks, Redux, Performance - for interviews', category_name:'ReactJS', level:'advanced', time_limit:15, total_questions:30, total_attempts:890, is_premium:true },
    { id:3, title:'MySQL Quiz for Beginners', slug:'mysql-quiz-beginners', description:'SQL queries and concepts - XAMPP focused', category_name:'SQL', level:'beginner', time_limit:10, total_questions:25, total_attempts:2100, is_premium:false }
  ])

  useEffect(()=>{ axios.get(`${API}/api/quizzes`).then(r=>{ if(r.data?.length) setQuizzes(r.data) }).catch(()=>{}) }, [])

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> QUIZZES / ALL</div>
        <h1 className="display text-[42px] font-bold tracking-tight leading-[0.9]">Quizzes that<br/><span className="text-white/20">test you.</span></h1>
        <p className="text-white/40 mt-3 max-w-xl text-[14px]">Test your skills, climb leaderboard, get interview ready. 300+ quizzes.</p>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {quizzes.map(q=>(
            <Link key={q.id} to={`/quizzes/${q.slug}`} className="group">
              <div className="card-dark p-6 hover:border-white/10 hover:-translate-y-1 transition-all h-full">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center"><Trophy className="w-6 h-6"/></div>
                  {q.is_premium && <span className="badge bg-[#f59e0b] text-black flex gap-1"><Crown className="w-3 h-3"/> PRO</span>}
                </div>
                <h3 className="font-semibold text-[14px] mt-5 group-hover:text-white display">{q.title}</h3>
                <p className="text-[12px] text-white/40 mt-2 line-clamp-2 leading-relaxed">{q.description}</p>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="text-[11px] bg-white/[0.06] border border-white/[0.06] px-2.5 py-1 rounded-full text-white/40 flex items-center gap-1"><Clock className="w-3 h-3"/>{q.time_limit}m</span>
                  <span className="text-[11px] bg-white/[0.06] border border-white/[0.06] px-2.5 py-1 rounded-full text-white/40 flex items-center gap-1"><Target className="w-3 h-3"/>{q.total_questions} Qs</span>
                  <span className="text-[11px] bg-white/[0.06] border border-white/[0.06] px-2.5 py-1 rounded-full text-white/40">{q.total_attempts} attempts</span>
                </div>
                <div className="mt-6">
                  <span className="text-[13px] font-semibold text-white group-hover:gap-2 flex items-center gap-1 transition-all">Start Quiz →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
