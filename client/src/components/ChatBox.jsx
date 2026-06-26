import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'
import toast from 'react-hot-toast'

const ChatBox = () => {

  const containerRef = useRef(null)

  const {selectedChat, theme, user, axios, token, setUser} = useAppContext()

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)

  const onSubmit = async (e) => {
    try {
      e.preventDefault() 
      if(!user) return toast('Login to send message')
        setLoading(true)
        const promptCopy = prompt
        setPrompt('')
        setMessages(prev => [...prev, {role: 'user', content: prompt, timestamp: Date.now(), isImage: false }])

        const {data} = await axios.post(`/api/message/${mode}`, {chatId: selectedChat._id, prompt, isPublished}, {headers: { Authorization: token }})

        if(data.success){
          setMessages(prev => [...prev, data.reply])
          // decrease credits
          if (mode === 'image'){
            setUser(prev => ({...prev, credits: prev.credits - 2}))
          }else{
            setUser(prev => ({...prev, credits: prev.credits - 1}))
          }
        }else{
          toast.error(data.message)
          setPrompt(promptCopy)
        }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setPrompt('')
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(selectedChat){
      setMessages(selectedChat.messages)
    }
  },[selectedChat])

  useEffect(()=>{
    if(containerRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  },[messages])

  return (
    <div className='flex-1 flex flex-col relative w-full h-full pt-12 max-md:pt-[80px]'>
      
      {/* Chat Messages Timeline */}
      <div ref={containerRef} className='flex-1 w-full max-w-4xl mx-auto overflow-y-scroll px-6 pb-40 scroll-smooth'>
        {messages.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center gap-8 animate-blur-in'>
            <img src={assets.logo_full_dark} alt="ChatNova" className='w-full max-w-[260px] sm:max-w-[320px] brightness-0 invert opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]'/>
            <p className='text-4xl sm:text-6xl text-center text-white tracking-tighter font-extralight opacity-80'>
              What can I help with?
            </p>
          </div>
        )}

        {messages.map((message, index)=> <Message key={index} message={message}/>)}

        {/* Loading Indicator */}
        {
          loading && <div className='flex items-center gap-2 mt-4 ml-2 animate-fade-in-up'>
            <div className='w-2 h-2 rounded-full bg-cyan-400/50 shadow-[0_0_10px_rgba(0,255,255,0.5)] animate-bounce'></div>
            <div className='w-2 h-2 rounded-full bg-cyan-400/70 shadow-[0_0_10px_rgba(0,255,255,0.5)] animate-bounce' style={{animationDelay: '0.15s'}}></div>
            <div className='w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)] animate-bounce' style={{animationDelay: '0.3s'}}></div>
          </div>
        }
      </div>

      {/* Floating Prompt Input Box */}
      <div className='absolute bottom-[30px] left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 z-20'>
        {mode === 'image' && (
          <div className='flex justify-center mb-4'>
            <label className='inline-flex items-center gap-3 cursor-pointer group animate-fade-in-up bg-[#081019]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10'>
              <div className='relative w-4 h-4 rounded border border-white/30 flex items-center justify-center group-hover:border-cyan-400 transition-colors bg-white/5'>
                  {isPublished && <div className='w-2 h-2 bg-cyan-400 rounded-sm shadow-[0_0_8px_rgba(0,255,255,0.8)]'></div>}
              </div>
              <input type="checkbox" className='hidden' checked={isPublished} onChange={(e)=>setIsPublished(e.target.checked)}/>
              <p className='text-xs text-[#B8BEC8] font-medium uppercase tracking-widest group-hover:text-white transition-colors'>Publish to Community</p>
            </label>
          </div>
        )}

        <form onSubmit={onSubmit} className='bg-white/[0.04] backdrop-blur-[25px] border border-white/10 rounded-full w-full p-2 flex items-center gap-3 focus-within:shadow-[0_0_40px_rgba(0,255,255,0.15)] focus-within:border-cyan-500/40 transition-all duration-500 animate-slide-in-up'>
          
          <div className='relative ml-2'>
              <select onChange={(e)=>setMode(e.target.value)} value={mode} className='appearance-none text-xs font-semibold uppercase tracking-widest text-[#B8BEC8] bg-white/5 hover:bg-white/10 hover:text-white py-3 pl-5 pr-10 rounded-full outline-none cursor-pointer transition-colors border border-white/5'>
              <option className='bg-[#0B0F14] text-white' value="text">Text</option>
              <option className='bg-[#0B0F14] text-white' value="image">Image</option>
              </select>
              <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#B8BEC8] text-[10px]'>
                  ▼
              </div>
          </div>

          <input onChange={(e)=>setPrompt(e.target.value)} value={prompt} type="text" placeholder="Message Nova..." className='flex-1 w-full text-[16px] text-white bg-transparent outline-none placeholder:text-[#B8BEC8] px-3' required/>
          
          <button disabled={loading} className={`flex items-center justify-center w-[48px] h-[48px] rounded-full transition-all duration-300 mr-1 ${prompt.length > 0 ? 'bg-gradient-to-br from-cyan-400 to-blue-600 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:scale-105 border-0' : 'bg-white/5 border border-white/10 cursor-not-allowed'}`}>
            <img src={loading ? assets.stop_icon : assets.send_icon} className={`w-5 ${prompt.length > 0 && !loading ? 'filter invert-0 brightness-200' : 'invert opacity-40'}`} alt="Send" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatBox
