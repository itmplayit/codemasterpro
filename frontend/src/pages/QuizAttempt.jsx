import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Trophy, Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight, Command } from 'lucide-react'

export default function QuizAttempt() {
  const { slug } = useParams()
  const { API } = useAuth()
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [current, setCurrent] = useState(0)
  const [result, setResult] = useState(null)
  const [timeLeft, setTimeLeft] = useState(600)
  const navigate = useNavigate()

  useEffect(()=>{ axios.get(`${API}/api/quizzes/${slug}`).then(r=>setQuiz(r.data)).catch(()=>setQuiz({
    id:1, title:'JavaScript Basics Quiz', time_limit:10,
    questions:[
      {id:1, question:'What is closure in JavaScript?', option_a:'Function inside function with outer scope access', option_b:'A type of loop', option_c:'CSS property', option_d:'None', correct_option:'a', explanation:'Closure = inner function remembers outer variables'},
      {id:2, question:'What does === do?', option_a:'Assigns value', option_b:'Strict equality check', option_c:'Loose equality', option_d:'None', correct_option:'b', explanation:'=== checks value + type'},
      {id:3, question:'What is useState?', option_a:'React Hook for state', option_b:'CSS hook', option_c:'DB query', option_d:'None', correct_option:'a', explanation:'useState manages component state'},
    ]
  })) }, [])

  useEffect(()=>{
    if (!quiz || result) return
    const timer = setInterval(()=>setTimeLeft(t=> t>0 ? t-1 : 0), 1000)
    return ()=>clearInterval(timer)
  }, [quiz, result])

  const submit = async () => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    try {
      const res = await axios.post(`${API}/api/quizzes/${quiz.id}/submit`, { answers, time_taken: 600-timeLeft }, { headers: { Authorization: `Bearer ${token}` } })
      setResult(res.data)
    } catch (e) { 
      // Mock result for demo
      const correct = Object.values(answers).filter((v,i)=> ['a','b','a'][i]===v).length
      setResult({
        score: Math.round(correct/3*100),
        correct, total: 3, passed: correct>=2,
        detailed_results: quiz.questions.map((q,i)=>({
          id:q.id, question:q.question, user_answer: answers[q.id]||'Not answered', correct_option: q.correct_option, is_correct: answers[q.id]===q.correct_option, explanation: q.explanation
        }))
      })
    }
  }

  if (!quiz) return <div className="min-h-screen bg-[#050507] flex items-center justify-center text-white/40">Loading quiz...</div>
  
  if (result) {
    return (
      <div className="min-h-screen bg-[#050507] text-white">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> QUIZ / RESULT</div>
          <div className="card-dark p-8 text-center border-white/[0.08]">
            <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center text-[36px] font-bold display ${result.passed ? 'bg-green-500 text-white' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
              {result.score}%
            </div>
            <h1 className="display text-[32px] font-bold mt-6">{result.passed ? 'Passed! 🎉' : 'Keep practicing 💪'}</h1>
            <p className="mt-2 text-white/40 text-[14px]">{result.correct} / {result.total} correct • {result.passed ? 'Certificate unlocked' : 'Need 60% to pass'}</p>
            
            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4"><p className="text-[20px] font-bold">{result.correct}</p><p className="text-[11px] text-white/40">Correct</p></div>
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4"><p className="text-[20px] font-bold">{result.total-result.correct}</p><p className="text-[11px] text-white/40">Wrong</p></div>
              <div className="bg-white text-black rounded-xl p-4"><p className="text-[20px] font-bold">{result.score}%</p><p className="text-[11px] text-black/60">Score</p></div>
            </div>

            <div className="mt-8 space-y-3 text-left">
              {result.detailed_results.map((q,i)=>(
                <div key={q.id} className={`p-5 rounded-xl border ${q.is_correct ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                  <div className="flex gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${q.is_correct ? 'bg-green-500 text-white' : 'bg-red-500/20 text-red-400'}`}>
                      {q.is_correct ? <CheckCircle className="w-4 h-4"/> : <XCircle className="w-4 h-4"/>}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[13px] leading-relaxed">{i+1}. {q.question}</p>
                      <p className="text-[11px] mt-2 text-white/40">Your: <span className="text-white">{q.user_answer}</span> • Correct: <span className="text-green-400">{q.correct_option}</span></p>
                      {q.explanation && <p className="text-[11px] mt-2 bg-white/[0.04] border border-white/[0.04] p-2.5 rounded-lg text-white/60">💡 {q.explanation}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3 justify-center">
              <button onClick={()=>navigate('/quizzes')} className="bg-white/[0.06] border border-white/[0.06] px-6 py-3 rounded-full font-medium text-[13px]">Browse Quizzes</button>
              <button onClick={()=>navigate('/dashboard')} className="bg-white text-black px-6 py-3 rounded-full font-bold text-[13px]">Go to Dashboard</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const q = quiz.questions[current]
  const progress = ((current+1)/quiz.questions.length)*100
  const mins = Math.floor(timeLeft/60)
  const secs = timeLeft%60

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20"><Command className="w-3 h-3"/> QUIZ / {quiz.title.toUpperCase()}</div>
          <div className="flex items-center gap-3">
            <span className="text-[12px] bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1 rounded-full flex items-center gap-1.5 font-mono"><Clock className="w-3.5 h-3.5"/> {String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}</span>
            <span className="text-[11px] text-white/20">{current+1} / {quiz.questions.length}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-2">
          <h1 className="font-bold text-[18px] display">{quiz.title}</h1>
          <Trophy className="w-5 h-5 text-amber-400"/>
        </div>
        <div className="w-full bg-white/[0.06] h-1.5 rounded-full mb-8"><div className="bg-white h-1.5 rounded-full transition-all duration-500" style={{width: `${progress}%`}}/></div>

        <div className="card-dark p-8 border-white/[0.08]">
          <h2 className="font-semibold text-[16px] leading-relaxed display">{q.question}</h2>
          <div className="mt-8 space-y-3">
            {[
              {k:'a', v:q.option_a},
              {k:'b', v:q.option_b},
              {k:'c', v:q.option_c},
              {k:'d', v:q.option_d},
            ].map(opt=>(
              <button key={opt.k} onClick={()=>setAnswers({...answers, [q.id]: opt.k})} className={`w-full text-left p-4 rounded-xl border flex gap-3 transition-all ${answers[q.id]===opt.k ? 'bg-white text-black border-white' : 'bg-[#0a0a0f] border-white/[0.06] hover:border-white/10 hover:bg-[#12121a] text-white/80'}`}>
                <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-[11px] font-bold shrink-0 ${answers[q.id]===opt.k?'bg-black text-white border-black':'bg-white/[0.06] border-white/10 text-white/40'}`}>{opt.k.toUpperCase()}</span>
                <span className="text-[13px] leading-relaxed">{opt.v}</span>
              </button>
            ))}
          </div>
          <div className="mt-10 flex justify-between">
            <button disabled={current===0} onClick={()=>setCurrent(current-1)} className="bg-white/[0.06] border border-white/[0.06] hover:bg-white/[0.08] px-5 py-2.5 rounded-full text-[13px] font-medium disabled:opacity-30 flex items-center gap-2"><ArrowLeft className="w-4 h-4"/> Previous</button>
            {current < quiz.questions.length-1 ? (
              <button onClick={()=>setCurrent(current+1)} className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-[13px] flex items-center gap-2 hover:bg-white/90">Next <ArrowRight className="w-4 h-4"/></button>
            ) : (
              <button onClick={submit} className="bg-green-500 hover:bg-green-600 text-white px-8 py-2.5 rounded-full font-bold text-[13px] flex items-center gap-2">Submit Quiz <Trophy className="w-4 h-4"/></button>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-6 gap-2">
          {quiz.questions.map((_,i)=>(
            <button key={i} onClick={()=>setCurrent(i)} className={`h-9 rounded-xl text-[12px] font-bold border transition-all ${i===current?'bg-white text-black border-white': answers[quiz.questions[i].id] ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-[#12121a] border-white/[0.06] text-white/20 hover:border-white/10'}`}>
              {i+1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
