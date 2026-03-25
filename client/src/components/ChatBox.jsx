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
    <div className='flex-1 flex flex-col justify-between m-4 md:m-8 xl:mx-20 max-md:mt-16 2xl:pr-32 relative'>
      
      {/* Background Ambient Glow */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none -z-10'></div>

      {/* Chat Messages */}
      <div ref={containerRef} className='flex-1 mb-6 overflow-y-scroll pb-10 pr-2 scroll-smooth'>
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
            <div className='w-2 h-2 rounded-full bg-white/50 animate-bounce'></div>
            <div className='w-2 h-2 rounded-full bg-white/70 animate-bounce' style={{animationDelay: '0.15s'}}></div>
            <div className='w-2 h-2 rounded-full bg-white animate-bounce' style={{animationDelay: '0.3s'}}></div>
          </div>
        }
      </div>

        {mode === 'image' && (
          <label className='inline-flex items-center gap-3 mb-4 mx-auto cursor-pointer group animate-fade-in-up'>
            <div className='relative w-4 h-4 rounded border border-white/30 flex items-center justify-center group-hover:border-white transition-colors bg-white/5'>
                {isPublished && <div className='w-2 h-2 bg-white rounded-sm'></div>}
            </div>
            <input type="checkbox" className='hidden' checked={isPublished} onChange={(e)=>setIsPublished(e.target.checked)}/>
            <p className='text-xs text-gray-400 font-medium uppercase tracking-widest group-hover:text-white transition-colors'>Publish to Community</p>
          </label>
        )}

      {/* Prompt Input Box */}
      <form onSubmit={onSubmit} className='glass-panel rounded-full w-full max-w-3xl p-2 mx-auto flex items-center gap-3 focus-within:shadow-[0_0_30px_rgba(255,255,255,0.1)] focus-within:border-white/30 transition-all duration-300 z-10 animate-slide-in-left'>
        
        <div className='relative ml-2'>
            <select onChange={(e)=>setMode(e.target.value)} value={mode} className='appearance-none text-xs font-medium uppercase tracking-widest text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white py-2 pl-4 pr-8 rounded-full outline-none cursor-pointer transition-colors border border-white/10'>
            <option className='bg-black text-white' value="text">Text</option>
            <option className='bg-black text-white' value="image">Image</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50'>
                ▼
            </div>
        </div>

        <input onChange={(e)=>setPrompt(e.target.value)} value={prompt} type="text" placeholder="Message Nova..." className='flex-1 w-full text-[15px] text-white bg-transparent outline-none placeholder:text-gray-500 px-2' required/>
        
        <button disabled={loading} className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 mr-1 ${prompt.length > 0 ? 'bg-white hover:bg-gray-200 hover:scale-105' : 'bg-white/10 cursor-not-allowed'}`}>
          <img src={loading ? assets.stop_icon : assets.send_icon} className={`w-5 ${prompt.length > 0 && !loading ? 'filter invert-0 opacity-90 brightness-0' : 'invert opacity-50'}`} alt="Send" />
        </button>
      </form>
    </div>
  )
}

export default ChatBox
