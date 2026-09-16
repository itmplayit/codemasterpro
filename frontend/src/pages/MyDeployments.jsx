import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Rocket, Globe, ExternalLink, Trash2, RotateCw, Eye, Calendar, Command } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MyDeployments() {
  const { API } = useAuth()
  const [deployments, setDeployments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const token = localStorage.getItem('token')
    axios.get(`${API}/api/deploy/my`, { headers: { Authorization: `Bearer ${token}` } }).then(r=>setDeployments(r.data)).catch(()=>{
      setDeployments([{ id:1, project_name:'Todo App', subdomain:'my-todo-abc123', deployment_url:'https://my-todo-abc123.codemasterpro.in', language:'javascript', framework:'react', status:'live', visits:42, created_at: new Date() }])
    }).finally(()=>setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return
    const token = localStorage.getItem('token')
    try { await axios.delete(`${API}/api/deploy/${id}`, { headers: { Authorization: `Bearer ${token}` } }) } catch {}
    setDeployments(deployments.filter(d=>d.id!==id))
  }

  if (loading) return <div className="min-h-screen bg-[#050507] p-20 text-center text-white/40">Loading deployments...</div>

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 mb-6"><Command className="w-3 h-3"/> DEPLOYMENTS / MY</div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="display text-[36px] font-bold tracking-tight flex items-center gap-3"><Rocket className="w-8 h-8"/> My Deployments</h1>
            <p className="text-white/40 mt-1 text-[13px]">One-click deploy from playground → live website • Hostinger powered</p>
          </div>
          <Link to="/playground" className="bg-white text-black px-5 py-2.5 rounded-full font-bold text-[13px] flex items-center gap-2"><Rocket className="w-4 h-4"/> New Deploy</Link>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-white text-black rounded-2xl p-6"><p className="display text-[28px] font-bold">{deployments.length}</p><p className="text-[11px] tracking-wide text-black/40">TOTAL PROJECTS</p></div>
          <div className="card-dark p-6"><p className="display text-[28px] font-bold">{deployments.filter(d=>d.status==='live').length}</p><p className="text-[11px] tracking-wide text-white/30">LIVE SITES</p></div>
          <div className="card-dark p-6"><p className="display text-[28px] font-bold">{deployments.reduce((sum,d)=>sum+(d.visits||0),0)}</p><p className="text-[11px] tracking-wide text-white/30">TOTAL VISITS</p></div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {deployments.map(d=>(
            <div key={d.id} className="card-dark p-6 hover:border-white/10 group">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center font-bold">{d.project_name[0]}</div>
                <span className={`badge ${d.status==='live'?'bg-green-500/10 text-green-400 border border-green-500/20':'bg-amber-500/10 text-amber-400'}`}>{d.status}</span>
              </div>
              <h3 className="font-semibold text-[14px] mt-4 display">{d.project_name}</h3>
              <p className="text-[11px] text-white/20 mt-1 flex items-center gap-1"><Globe className="w-3 h-3"/>{d.subdomain}.codemasterpro.in</p>
              <div className="mt-4 bg-[#0a0a0f] border border-white/[0.06] p-3 rounded-xl flex items-center justify-between">
                <span className="text-[11px] truncate flex-1 text-white/40">{d.deployment_url}</span>
                <a href={d.deployment_url} target="_blank" className="ml-2 p-1.5 bg-white/[0.06] rounded-full hover:bg-white/10"><ExternalLink className="w-3 h-3"/></a>
              </div>
              <div className="mt-4 flex gap-3 text-[11px] text-white/20">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/>{new Date(d.created_at).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3"/>{d.visits||0}</span>
              </div>
              <div className="mt-5 flex gap-2">
                <a href={d.deployment_url} target="_blank" className="flex-1 bg-white text-black py-2.5 rounded-full font-bold text-[12px] flex items-center justify-center gap-1"><ExternalLink className="w-3 h-3"/> Visit</a>
                <button onClick={()=>handleDelete(d.id)} className="w-9 h-9 bg-white/[0.06] border border-white/[0.06] rounded-full flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
