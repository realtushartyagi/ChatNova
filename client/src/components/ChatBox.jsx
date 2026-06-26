import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'
import ChatInput from './ChatInput'
import toast from 'react-hot-toast'

const ChatBox = () => {

  const containerRef = useRef(null)

  const {selectedChat, theme, user, axios, token, setUser} = useAppContext()

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const [mode, setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)

  const onSubmit = async (text, attachments = [], voiceNote = null) => {
    try {
      if(!user) return toast('Login to send message')
        setLoading(true)
        
        // Push user message with attachments visually
        setMessages(prev => [...prev, {
            role: 'user', 
            content: text, 
            timestamp: Date.now(), 
            isImage: false,
            attachments: attachments,
            voiceNote: voiceNote
        }])

        // Send text prompt to backend (mock backend ignores files)
        const promptToSend = text.trim() === '' ? 'Attached media.' : text;
        const {data} = await axios.post(`/api/message/${mode}`, {chatId: selectedChat._id, prompt: promptToSend, isPublished}, {headers: { Authorization: token }})

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
        }
    } catch (error) {
      toast.error(error.message)
    }finally{
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
        <ChatInput 
            onSend={onSubmit} 
            loading={loading} 
            mode={mode} 
            setMode={setMode} 
            isPublished={isPublished} 
            setIsPublished={setIsPublished} 
        />
      </div>
    </div>
  )
}

export default ChatBox
