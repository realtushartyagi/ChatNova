import React, { use, useState } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import { assets } from './assets/assets'
import './assets/prism.css'
import Loading from './pages/Loading'
import { useAppContext } from './context/AppContext'
import Login from './pages/Login'
import {Toaster} from 'react-hot-toast'

const App = () => {

  const {user, loadingUser} = useAppContext()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {pathname} = useLocation()

  if(pathname === '/loading' || loadingUser) return <Loading />

  return (
    <>
    <Toaster />

    {user ? (
      <div className='bg-black text-white w-screen h-screen overflow-hidden selection:bg-white/20'>
        {/* Mobile Header */}
        {!isMenuOpen && (
          <div className='md:hidden absolute top-0 left-0 w-full h-16 px-5 flex items-center justify-between z-40 bg-black/80 backdrop-blur-md border-b border-white/10'>
              <img src={assets.menu_icon} className='w-7 h-7 cursor-pointer invert opacity-80 hover:opacity-100 transition-opacity' onClick={()=>setIsMenuOpen(true)} alt="Menu"/>
              <img src={assets.logo_full_dark} onClick={() => window.location.href = '/'} className='w-[130px] cursor-pointer brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]' alt="ChatNova"/>
              <div className='w-7' />
          </div>
        )}
        <div className='flex h-full w-full'>
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
          <Routes>
            <Route path='/' element={<ChatBox />} />
            <Route path='/credits' element={<Credits />} />
            <Route path='/community' element={<Community />} />
          </Routes>
        </div>
      </div>
    ) : (
      <div className='bg-black flex items-center justify-center h-screen w-screen selection:bg-white/20'>
        <Login />
      </div>
    )}
      
      
    </>
  )
}

export default App
