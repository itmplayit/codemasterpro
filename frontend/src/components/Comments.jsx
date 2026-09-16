import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { MessageCircle, Heart, Reply } from 'lucide-react'

export default function Comments({ courseId }) {
  const { API, user } = useAuth()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState(null)

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${API}/api/discussions/course/${courseId}`)
      setComments(res.data)
    } catch {}
  }

  useEffect(()=>{ if(courseId) fetchComments() }, [courseId])

  const handlePost = async () => {
    if (!newComment.trim()) return
    const token = localStorage.getItem('token')
    if (!token) { alert('Login to comment'); return }
    try {
      const res = await axios.post(`${API}/api/discussions`, {
        course_id: courseId,
        comment: newComment,
        parent_id: replyTo
      }, { headers: { Authorization: `Bearer ${token}` } })
      setComments([res.data, ...comments])
      setNewComment('')
      setReplyTo(null)
    } catch (e) { alert('Failed - needs XAMPP MySQL') }
  }

  return (
    <div className="card p-6 mt-8">
      <h3 className="font-bold text-lg flex items-center gap-2"><MessageCircle className="w-5 h-5"/> Q&A / Discussions</h3>
      
      <div className="mt-4 flex gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">{user?.name?.[0] || '?'}</div>
        <div className="flex-1">
          <textarea value={newComment} onChange={e=>setNewComment(e.target.value)} placeholder={replyTo ? 'Write a reply...' : 'Ask a question or share feedback...'} className="w-full p-3 border rounded-xl text-sm resize-none" rows={3}/>
          <div className="mt-2 flex justify-between">
            <button onClick={()=>setReplyTo(null)} className="text-xs text-gray-500">{replyTo ? 'Replying - Cancel' : ''}</button>
            <button onClick={handlePost} className="btn-primary !py-1.5 !px-5 text-sm">Post</button>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {comments.length===0 ? <p className="text-sm text-gray-500 text-center py-8">No discussions yet. Be first to ask!</p> :
          comments.map(c=>(
            <div key={c.id} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-bold">{c.user_name?.[0]}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2"><p className="font-semibold text-sm">{c.user_name}</p><span className="text-[11px] text-gray-500">{new Date(c.created_at).toLocaleDateString()}</span></div>
                <p className="text-sm mt-1 leading-relaxed">{c.comment}</p>
                <div className="mt-2 flex gap-4 text-xs text-gray-500">
                  <button className="flex items-center gap-1 hover:text-black"><Heart className="w-3.5 h-3.5"/> {c.likes} likes</button>
                  <button onClick={()=>setReplyTo(c.id)} className="flex items-center gap-1 hover:text-black"><Reply className="w-3.5 h-3.5"/> Reply</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
