import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Bot, Send, Sparkles, Code2, Lightbulb } from 'lucide-react'

export default function AITutor({ courseContext }) {
  const { API } = useAuth()
  const [messages, setMessages] = useState([
    { role: 'assistant', message: 'Hi! I\'m CodeMaster AI 🤖\n\nAsk me about JavaScript, React, Node.js, MySQL, DSA, or XAMPP setup. I can debug code, explain concepts, and help with interviews!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if (!token) return
    axios.get(`${API}/api/ai/history`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r=>{ if(r.data.length>0) setMessages(r.data.map(m=>({ role:m.role, message:m.message }))) })
      .catch(()=>{})
  }, [])

  const send = async () => {
    if (!input.trim()) return
    const userMsg = { role:'user', message: input }
    setMessages(prev=>[...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(`${API}/api/ai/chat`, { message: userMsg.message, context: { course: courseContext } }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessages(prev=>[...prev, { role:'assistant', message: res.data.response }])
    } catch (err) {
      setMessages(prev=>[...prev, { role:'assistant', message: 'AI offline in sandbox, but works on XAMPP with OPENAI_API_KEY. Mock: I can help with ' + userMsg.message }])
    } finally { setLoading(false) }
  }

  return (
    <div className="card flex flex-col h-[600px] overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Bot className="w-6 h-6"/></div>
        <div><p className="font-bold flex items-center gap-2">AI Tutor <Sparkles className="w-4 h-4"/></p><p className="text-xs text-violet-100">Powered by GPT-4 • +5 XP per question</p></div>
        <div className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full">XAMPP + OpenAI ready</div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4 bg-[#fcfcfd]">
        {messages.map((m,i)=>(
          <div key={i} className={`flex gap-3 ${m.role==='user'?'justify-end':''}`}>
            {m.role==='assistant' && <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4"/></div>}
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${m.role==='user'?'bg-blue-600 text-white rounded-br-sm':'bg-white border shadow-sm rounded-bl-sm'}`}>
              {m.message}
            </div>
          </div>
        ))}
        {loading && <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-violet-600 animate-pulse"/><div className="bg-white border p-3 rounded-2xl text-sm">Thinking...</div></div>}
        <div ref={bottomRef}/>
      </div>

      <div className="p-3 border-t bg-white">
        <div className="flex gap-2 mb-2">
          {['Explain closures', 'Debug my code', 'MySQL XAMPP setup', 'React hooks'].map(q=>(
            <button key={q} onClick={()=>setInput(q)} className="text-[11px] bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-full flex items-center gap-1"><Lightbulb className="w-3 h-3"/>{q}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && send()} placeholder="Ask about code, DSA, MySQL..." className="flex-1 px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-violet-500 outline-none"/>
          <button onClick={send} disabled={loading} className="bg-violet-600 hover:bg-violet-700 text-white p-2.5 rounded-xl disabled:opacity-50"><Send className="w-5 h-5"/></button>
        </div>
        <p className="text-[10px] text-gray-400 mt-2">Add OPENAI_API_KEY in backend .env for real GPT-4. Mock works now.</p>
      </div>
    </div>
  )
}
