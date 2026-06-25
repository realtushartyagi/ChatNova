import React, { useState } from 'react'
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
import Landing from './pages/Landing'
import { Toaster } from 'react-hot-toast'
import RightAIPanel from './components/RightAIPanel'

const App = () => {

  const {user, loadingUser} = useAppContext()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const {pathname} = useLocation()

  if(pathname === '/loading' || loadingUser) return <Loading />

  return (
    <>
    <Toaster />

    {user ? (
      <div className='bg-[#0B0F14] text-white w-screen h-screen overflow-hidden selection:bg-white/20 relative z-0'>
        
        {/* Layer 2: Radial gradient */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(80,120,255,0.18)_0%,transparent_70%)] pointer-events-none -z-10'></div>
        
        {/* Layer 3 & 4: HUD Rings */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] hud-ring animate-spin-slow pointer-events-none -z-10 blur-[1px]'></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] hud-ring animate-spin-slow pointer-events-none -z-10 blur-[2px]' style={{animationDirection: 'reverse', animationDuration: '60s'}}></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/5 rounded-full pointer-events-none -z-10'></div>

        {/* Mobile Hamburger Button */}
        {!isMenuOpen && (
          <button
            onClick={() => setIsMenuOpen(true)}
            className='md:hidden absolute top-4 left-4 z-40 w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/20 active:bg-white/20 transition-colors'
            aria-label="Open menu"
          >
            <img src={assets.menu_icon} className='w-5 h-5 invert' alt="Menu"/>
          </button>
        )}

        {/* Dark overlay */}
        {isMenuOpen && (
          <div
            className='md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm'
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        <div className={`grid h-full w-full ${pathname === '/' ? 'xl:grid-cols-[290px_1fr_260px] md:grid-cols-[290px_1fr]' : 'md:grid-cols-[290px_1fr]'} grid-cols-1`}>
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
          <div className='relative w-full h-full flex flex-col overflow-hidden z-10'>
            <Routes>
              <Route path='/' element={<ChatBox />} />
              <Route path='/credits' element={<Credits />} />
              <Route path='/community' element={<Community />} />
            </Routes>
          </div>
          {pathname === '/' && <RightAIPanel />}
        </div>
      </div>
    ) : (
      <div className='bg-black min-h-screen w-full selection:bg-white/20 overflow-x-hidden relative'>
        <Landing setShowLogin={setShowLogin} />
        
        {showLogin && (
          <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-blur-in'>
             <button 
                onClick={() => setShowLogin(false)}
                className='absolute top-8 right-8 text-gray-400 hover:text-white transition-colors p-2 text-2xl font-light'
             >
                ✕
             </button>
             <Login />
          </div>
        )}
      </div>
    )}
      
      
    </>
  )
}

export default App
