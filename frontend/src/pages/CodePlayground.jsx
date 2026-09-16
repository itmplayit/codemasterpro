import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Play, Save, Share2, Code2, Rocket, Terminal, Sparkles, Command, Copy, Download } from 'lucide-react'
import DeployButton from '../components/DeployButton'

const STARTER = {
  javascript: `// JavaScript Playground - CodeMaster Pro v6 DARK
// Try DSA, React, Node examples - runs live!

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}

console.log("🚀 Fibonacci 10:", fibonacci(10));

const arr = [1,2,3,4,5];
console.log("✨ Doubled:", arr.map(x => x*2));

// Try: Build a Todo App in 10 lines
const todos = [
  { id:1, text: "Learn React", done: true },
  { id:2, text: "Deploy to Hostinger", done: false }
];
console.log("📝 Todos:", todos);

// Deploy this to live site in 10s!
`,
  python: `# Python Playground - CodeMaster Pro
# DSA + Interview Prep

def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr)//2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

print("⚡ Sorted:", quicksort([3,6,8,10,1,2,1]))

# Two Sum - FAANG Interview
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        if target - num in seen:
            return [seen[target-num], i]
        seen[num] = i

print("🎯 Two Sum:", two_sum([2,7,11,15], 9))
`,
  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("☕ Hello from Java - CodeMaster Pro!");
    
    // DSA Example
    int[] arr = {3,6,8,10,1,2,1};
    Arrays.sort(arr);
    System.out.println("Sorted: " + Arrays.toString(arr));
    
    // Integrate Judge0 for real execution
    // See backend/routes/compiler.js
  }
}`,
  cpp: `#include <bits/stdc++.h>
using namespace std;

// CodeMaster Pro - C++ Playground
int main() {
    cout << "🚀 C++ Ready!" << endl;
    
    vector<int> arr = {3,6,8,10,1,2,1};
    sort(arr.begin(), arr.end());
    
    cout << "Sorted: ";
    for(int x: arr) cout << x << " ";
    
    return 0;
}`
}

export default function CodePlayground() {
  const { API } = useAuth()
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState(STARTER.javascript)
  const [output, setOutput] = useState('// Output will appear here\n// Click Run to execute\n// JS runs live, others need Judge0/Piston API')
  const [loading, setLoading] = useState(false)

  const handleRun = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`${API}/api/compiler/execute`, { language, code })
      setOutput(res.data.output)
    } catch (err) {
      if (language==='javascript') {
        try {
          const logs = []
          const customLog = (...args)=> logs.push(args.map(a=> typeof a==='object' ? JSON.stringify(a, null, 2) : String(a)).join(' '))
          const fn = new Function('console', code.replace(/console\.log/g, 'console.log'))
          fn({ log: customLog })
          setOutput(logs.join('\n') || '✓ Executed (no output)')
        } catch (e) {
          setOutput('❌ Error: ' + e.message)
        }
      } else {
        setOutput('⚠️ ' + language + ' needs Judge0/Piston API\n\nSetup:\n1. Use https://emkc.org/api/v2/piston\n2. Replace logic in backend/routes/compiler.js\n3. JS already works live!\n\nError: ' + (err.response?.data?.message || err.message))
      }
    } finally { setLoading(false) }
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    setCode(STARTER[lang] || STARTER.javascript)
  }

  const handleSave = async () => {
    const token = localStorage.getItem('token')
    if (!token) { alert('Login to save'); return }
    try {
      await axios.post(`${API}/api/compiler/snippets`, {
        title: `Snippet ${new Date().toLocaleTimeString()}`,
        language,
        code,
        is_public: false
      }, { headers: { Authorization: `Bearer ${token}` } })
      alert('Saved!')
    } catch (e) { alert('Save failed - needs XAMPP MySQL') }
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col">
      {/* Header - Dark Premium */}
      <div className="bg-[#050507] border-b border-white/[0.06] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center"><Command className="w-4 h-4 text-black"/></div>
            <span className="font-bold text-[14px] display">Playground</span>
            <span className="text-[10px] bg-white text-black px-2 py-0.5 rounded-full font-bold ml-2">v6 DARK</span>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-[#12121a] border border-white/[0.06] p-1 rounded-full">
            {[
              {k:'javascript', l:'JavaScript', live:true},
              {k:'python', l:'Python'},
              {k:'java', l:'Java'},
              {k:'cpp', l:'C++'},
            ].map(lang=>(
              <button key={lang.k} onClick={()=>handleLanguageChange(lang.k)} className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all flex items-center gap-1.5 ${language===lang.k ? 'bg-white text-black' : 'text-white/40 hover:text-white hover:bg-white/[0.06]'}`}>
                {lang.l} {lang.live && <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/>}
              </button>
            ))}
          </div>
          <span className="hidden lg:flex text-[11px] text-white/20 items-center gap-1"><Sparkles className="w-3 h-3"/> JS live • Others need Judge0</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleSave} className="w-9 h-9 bg-[#12121a] border border-white/[0.06] rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white/10"><Save className="w-4 h-4"/></button>
          <button className="w-9 h-9 bg-[#12121a] border border-white/[0.06] rounded-full flex items-center justify-center text-white/40 hover:text-white"><Copy className="w-4 h-4"/></button>
          <DeployButton code={code} language={language} framework={language==='javascript'?'react':'static'} />
          <button onClick={handleRun} disabled={loading} className="bg-white text-black px-5 py-2 rounded-full font-bold text-[13px] flex items-center gap-2 hover:bg-white/90 disabled:opacity-50 transition-all hover:scale-105">
            <Play className="w-4 h-4 fill-black"/> {loading?'Running...':'Run'}
          </button>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 overflow-hidden">
        {/* Editor */}
        <div className="flex flex-col bg-[#050507] border-r border-white/[0.06]">
          <div className="bg-[#0a0a0f] border-b border-white/[0.06] px-4 py-2.5 text-[11px] text-white/30 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-white/10"/><div className="w-3 h-3 rounded-full bg-white/10"/><div className="w-3 h-3 rounded-full bg-white/10"/></div>
              <span className="ml-2 font-mono flex items-center gap-2"><Code2 className="w-3 h-3"/> {language}.{language==='javascript'?'js':language==='python'?'py':language==='java'?'java':'cpp'}</span>
            </div>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/> Auto-save • XAMPP Ready</span>
          </div>
          <textarea value={code} onChange={e=>setCode(e.target.value)} className="flex-1 bg-[#050507] text-white/80 p-5 font-mono text-[13px] resize-none outline-none leading-[1.7] placeholder:text-white/20" spellCheck={false} placeholder="Write code here..."/>
          <div className="bg-[#0a0a0f] border-t border-white/[0.06] px-4 py-2 flex justify-between items-center text-[10px] text-white/20">
            <span className="flex items-center gap-2"><Terminal className="w-3 h-3"/> {code.length} chars • {code.split('\n').length} lines</span>
            <span className="flex items-center gap-2">Tab: 2 spaces • UTF-8 • LF</span>
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col bg-[#0a0a0f]">
          <div className="bg-[#12121a] border-b border-white/[0.06] px-4 py-2.5 text-[11px] text-white/30 flex justify-between items-center">
            <span className="flex items-center gap-2 font-medium"><Terminal className="w-3.5 h-3.5"/> Output • Console</span>
            <div className="flex gap-1.5">
              <button className="w-7 h-7 bg-white/[0.06] border border-white/[0.06] rounded-full flex items-center justify-center hover:bg-white/[0.08]"><Download className="w-3 h-3"/></button>
              <button className="w-7 h-7 bg-white/[0.06] border border-white/[0.06] rounded-full flex items-center justify-center hover:bg-white/[0.08]"><Share2 className="w-3 h-3"/></button>
            </div>
          </div>
          <pre className="flex-1 p-5 text-[13px] font-mono text-green-300/80 whitespace-pre-wrap overflow-auto leading-[1.7] bg-[#0a0a0f]">{output}</pre>
          
          <div className="p-4 bg-[#12121a] border-t border-white/[0.06] space-y-3">
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20"><Rocket className="w-3 h-3"/> DEPLOY IN 10s</div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-[#050507] border border-white/[0.06] rounded-xl p-3">
                <p className="font-bold text-white/80">1. Code → Live</p>
                <p className="text-white/30 mt-1 leading-relaxed">Click Deploy → subdomain → Hostinger → SSL auto • Free 1 project</p>
              </div>
              <div className="bg-[#050507] border border-white/[0.06] rounded-xl p-3">
                <p className="font-bold text-white/80">2. Production Setup</p>
                <p className="text-white/30 mt-1 leading-relaxed">Python/Java/C++: Judge0 API https://ce.judge0.com • Piston API</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
