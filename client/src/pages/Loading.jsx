import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Loading = () => {

  const navigate = useNavigate()
  const {fetchUser} = useAppContext()

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      fetchUser()
      navigate('/')
    },8000)
    return ()=> clearTimeout(timeout)
  },[])

  return (
    <div className='bg-black flex items-center justify-center h-screen w-screen text-white text-2xl absolute inset-0 z-50 animate-blur-in'>
      <div className='w-12 h-12 rounded-full border border-white/20 border-t-white animate-spin drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'></div>
    </div>
  )
}

export default Loading
