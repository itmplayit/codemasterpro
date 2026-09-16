import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function VideoPlayer({ lesson, courseId }) {
  const { API } = useAuth()
  const videoRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [savedProgress, setSavedProgress] = useState(null)

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if (!token || !lesson?.id) return
    axios.get(`${API}/api/live/video/progress/${lesson.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r=>{ if(r.data) setSavedProgress(r.data) })
      .catch(()=>{})
  }, [lesson?.id])

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const current = videoRef.current.currentTime
    const total = videoRef.current.duration || 0
    setProgress((current/total)*100)
  }

  const handleEnded = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      await axios.post(`${API}/api/live/video/progress`, {
        lesson_id: lesson.id,
        progress_seconds: videoRef.current?.duration || 0,
        total_seconds: videoRef.current?.duration || 0,
        is_completed: true
      }, { headers: { Authorization: `Bearer ${token}` } })
      // Award XP handled in backend
    } catch {}
  }

  const saveProgress = async () => {
    if (!videoRef.current) return
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      await axios.post(`${API}/api/live/video/progress`, {
        lesson_id: lesson.id,
        progress_seconds: Math.floor(videoRef.current.currentTime),
        total_seconds: Math.floor(videoRef.current.duration || 0),
        is_completed: false
      }, { headers: { Authorization: `Bearer ${token}` } })
    } catch {}
  }

  // Auto-save every 10s
  useEffect(()=>{
    const interval = setInterval(saveProgress, 10000)
    return ()=>clearInterval(interval)
  }, [lesson?.id])

  if (!lesson) return <div className="bg-black aspect-video flex items-center justify-center text-white/50">Select lesson</div>

  // If video_url is YouTube, use iframe, else video tag
  const isYouTube = lesson.video_url?.includes('youtube') || lesson.video_url?.includes('youtu.be')

  return (
    <div className="bg-black rounded-2xl overflow-hidden">
      {isYouTube ? (
        <iframe src={lesson.video_url} className="w-full aspect-video" allowFullScreen onLoad={handleEnded} title={lesson.title}/>
      ) : (
        <video
          ref={videoRef}
          src={lesson.video_url}
          className="w-full aspect-video"
          controls
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onLoadedMetadata={()=>{
            if (savedProgress && videoRef.current) {
              videoRef.current.currentTime = savedProgress.progress_seconds
            }
          }}
        />
      )}
      <div className="h-1 bg-white/20 w-full"><div className="h-1 bg-red-600 transition-all" style={{width:`${progress}%`}}/></div>
      {savedProgress && <div className="px-4 py-2 text-xs text-white/60">Resumed from {Math.floor(savedProgress.progress_seconds/60)}:{String(savedProgress.progress_seconds%60).padStart(2,'0')} • Auto-saves progress + XP</div>}
    </div>
  )
}
