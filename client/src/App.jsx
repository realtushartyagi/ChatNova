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
        {/* Mobile Hamburger Button — only show when sidebar is closed */}
        {!isMenuOpen && (
          <button
            onClick={() => setIsMenuOpen(true)}
            className='md:hidden absolute top-4 left-4 z-40 w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/20 active:bg-white/20 transition-colors'
            aria-label="Open menu"
          >
            <img src={assets.menu_icon} className='w-5 h-5 invert' alt="Menu"/>
          </button>
        )}

        {/* Dark overlay — tapping it closes the sidebar on mobile */}
        {isMenuOpen && (
          <div
            className='md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm'
            onClick={() => setIsMenuOpen(false)}
          />
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
