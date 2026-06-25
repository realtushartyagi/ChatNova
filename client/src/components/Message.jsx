import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'

const Message = ({message}) => {

  useEffect(()=>{
    Prism.highlightAll()
  },[message.content])

  return (
    <div>
      {message.role === "user" ? (
        <div className='flex items-start justify-end my-8 gap-4 animate-fade-in-up'>
          <div className='flex flex-col gap-1 p-5 px-7 bg-white/5 border border-cyan-500/40 shadow-[0_0_20px_rgba(0,255,255,0.1)] rounded-[24px] rounded-tr-sm max-w-2xl backdrop-blur-md'>
            <p className='text-[16px] leading-relaxed font-light text-white'>{message.content}</p>
            <span className='text-[10px] text-[#B8BEC8] font-medium tracking-wide self-end mt-2 uppercase'>
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
          <div className='w-10 h-10 mt-1 rounded-full border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center bg-[#0B0F14] shrink-0'>
             <img src={assets.user_icon} alt="User" className='w-6 h-6 invert opacity-80'/>
          </div>
        </div>
      )
      : 
      (
        <div className='flex items-start justify-start my-8 animate-fade-in-up' style={{animationDelay: '0.1s'}}>
        <div className='inline-flex flex-col gap-1 p-6 px-8 w-full max-w-3xl bg-black/40 border border-cyan-400 shadow-[0_0_40px_rgba(0,255,255,0.15)] rounded-[24px] rounded-tl-sm backdrop-blur-[30px]'>
          {message.isImage ? (
            <img src={message.content} alt="AI output" className='w-full max-w-md mt-2 rounded-[16px] object-cover shadow-[0_0_20px_rgba(0,255,255,0.3)] animate-blur-in'/>
          ):
          (
            <div className='text-[16px] leading-[1.8] text-white reset-tw font-light tracking-wide'>
             <Markdown>{message.content}</Markdown>
            </div>
          )}
          <span className='text-[10px] text-[#B8BEC8] font-medium tracking-wide mt-4 uppercase'>{moment(message.timestamp).fromNow()}</span>
        </div>
        </div>
      )
    }
    </div>
  )
}

export default Message
