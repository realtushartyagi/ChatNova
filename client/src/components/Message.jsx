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
        <div className='flex items-start justify-end my-6 gap-3 animate-fade-in-up'>
          <div className='flex flex-col gap-1 p-4 px-6 bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-3xl rounded-tr-sm max-w-2xl'>
            <p className='text-[15px] leading-relaxed font-medium'>{message.content}</p>
            <span className='text-[10px] text-gray-500 font-medium tracking-wide self-end mt-1 uppercase'>
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
          <img src={assets.user_icon} alt="User" className='w-9 h-9 mt-1 rounded-full border border-white/20'/>
        </div>
      )
      : 
      (
        <div className='flex items-start justify-start my-6 animate-fade-in-up' style={{animationDelay: '0.1s'}}>
        <div className='inline-flex flex-col gap-1 p-5 px-6 max-w-3xl bg-white/5 border border-white/10 rounded-3xl rounded-tl-sm backdrop-blur-md'>
          {message.isImage ? (
            <img src={message.content} alt="AI output" className='w-full max-w-md mt-2 rounded-xl object-cover shadow-2xl animate-blur-in'/>
          ):
          (
            <div className='text-[15px] leading-relaxed text-gray-200 reset-tw font-light tracking-wide'>
             <Markdown>{message.content}</Markdown>
            </div>
          )}
          <span className='text-[10px] text-gray-500 font-medium tracking-wide mt-3 uppercase'>{moment(message.timestamp).fromNow()}</span>
        </div>
        </div>
      )
    }
    </div>
  )
}

export default Message
