import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Rocket, Globe, Loader2, ExternalLink, Copy, Check } from 'lucide-react'

export default function DeployButton({ code, language, framework }) {
  const { API } = useAuth()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [deploying, setDeploying] = useState(false)
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleDeploy = async () => {
    if (!projectName.trim()) { alert('Project name required'); return }
    if (!code) { alert('No code to deploy'); return }

    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }

    setDeploying(true)
    setResult(null)

    try {
      const res = await axios.post(`${API}/api/deploy`, {
        project_name: projectName,
        language: language || 'javascript',
        framework: framework || 'static',
        code
      }, { headers: { Authorization: `Bearer ${token}` } })

      setResult(res.data)
    } catch (err) {
      const msg = err.response?.data?.message || 'Deploy failed'
      if (err.response?.data?.limit) {
        alert(`${msg}\n\nUpgrade to Pro for 10 projects!`)
        navigate('/membership')
      } else {
        alert(msg)
      }
    } finally {
      setDeploying(false)
    }
  }

  const copyUrl = () => {
    if (result?.deployment_url) {
      navigator.clipboard.writeText(result.deployment_url)
      setCopied(true)
      setTimeout(()=>setCopied(false), 2000)
    }
  }

  return (
    <>
      <button onClick={()=>setShowModal(true)} className="px-4 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-lg text-sm font-bold flex items-center gap-1.5 shadow-lg shadow-violet-600/20">
        <Rocket className="w-4 h-4"/> Deploy
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            {!result ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center"><Rocket className="w-6 h-6 text-white"/></div>
                  <div>
                    <h3 className="font-bold text-lg">One-Click Deploy</h3>
                    <p className="text-xs text-gray-500">Playground → Live Website in 10s</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold">Project Name</label>
                    <input value={projectName} onChange={e=>setProjectName(e.target.value)} placeholder="My Todo App" className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 outline-none"/>
                    <p className="text-[11px] text-gray-500 mt-1">Subdomain: {projectName.toLowerCase().replace(/[^a-z0-9]+/g,'-') || 'my-project'}-xxx.codemasterpro.in</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-[11px] text-gray-500">Language</p>
                      <p className="font-bold text-sm capitalize">{language || 'JavaScript'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-[11px] text-gray-500">Code Size</p>
                      <p className="font-bold text-sm">{(code?.length || 0).toLocaleString()} chars</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 rounded-xl p-4">
                    <p className="font-bold text-sm flex items-center gap-2"><Globe className="w-4 h-4 text-violet-600"/> What happens?</p>
                    <ul className="mt-2 text-xs text-gray-600 space-y-1">
                      <li>✅ Creates subdomain: your-project.codemasterpro.in</li>
                      <li>✅ Deploys to Hostinger (FTP) + SSL</li>
                      <li>✅ Live in ~10 seconds</li>
                      <li>✅ +50 XP earned</li>
                      <li>✅ Free: 1 project, Pro: 10, Premium: 100</li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={()=>setShowModal(false)} className="flex-1 btn-secondary py-3">Cancel</button>
                    <button onClick={handleDeploy} disabled={deploying} className="flex-1 btn-primary bg-gradient-to-r from-violet-600 to-indigo-600 py-3 flex items-center justify-center gap-2 disabled:opacity-50">
                      {deploying ? <><Loader2 className="w-4 h-4 animate-spin"/> Deploying...</> : <><Rocket className="w-4 h-4"/> Deploy Now</>}
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-gray-400">Production: Integrates with Hostinger API / Vercel / Docker. Mock works in demo.</p>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-2xl">🎉</span></div>
                <h3 className="font-bold text-xl">Deployed Successfully!</h3>
                <p className="text-sm text-gray-500 mt-1">{result.project_name} is now live</p>

                <div className="mt-6 bg-gray-900 text-green-400 p-4 rounded-xl text-left font-mono text-[11px] whitespace-pre-wrap max-h-32 overflow-auto">
                  {result.logs}
                </div>

                <div className="mt-6 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-4 text-white">
                  <p className="text-xs opacity-80">Your live URL:</p>
                  <div className="flex items-center gap-2 mt-2 bg-white/20 rounded-lg px-3 py-2">
                    <Globe className="w-4 h-4 flex-shrink-0"/>
                    <span className="text-sm font-bold truncate flex-1">{result.deployment_url}</span>
                    <button onClick={copyUrl} className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30">
                      {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <a href={result.deployment_url} target="_blank" rel="noopener noreferrer" className="flex-1 btn-primary py-3 flex items-center justify-center gap-2">
                    <ExternalLink className="w-4 h-4"/> Visit Site
                  </a>
                  <button onClick={()=>{ setShowModal(false); setResult(null); setProjectName('') }} className="flex-1 btn-secondary py-3">Close</button>
                </div>

                <p className="text-xs text-center mt-4 text-green-600 font-bold">+50 XP Earned! 🚀</p>
                <p className="text-[11px] text-center mt-2 text-gray-500">Share on LinkedIn: "I deployed my project in 10s with CodeMaster Pro!"</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
