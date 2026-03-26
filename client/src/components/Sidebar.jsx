import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment'
import toast from 'react-hot-toast'

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {

    const {chats, setSelectedChat, theme, setTheme, user, navigate, createNewChat, axios, setChats, fetchUsersChats, setToken, token} = useAppContext()
    const [search, setSearch] = useState('')

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        toast.success('Logged out successfully')
    }

    const deleteChat = async (e, chatId) => {
        try {
            e.stopPropagation()
            const confirm = window.confirm('Are you sure you want to delete this chat?')
            if(!confirm) return
            const { data } = await axios.post('/api/chat/delete', {chatId}, { headers: { Authorization: token } })
            if(data.success){
                setChats(prev => prev.filter(chat => chat._id !== chatId))
                await fetchUsersChats()
                toast.success(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleChatSelect = (chat) => {
        setSelectedChat(chat)
        navigate('/')
        setIsMenuOpen(false)
    }

  return (
    <div className={`flex flex-col h-screen min-w-[280px] p-6 bg-black border-r border-white/10 transition-transform duration-500 max-md:absolute left-0 z-50 ${!isMenuOpen && 'max-md:-translate-x-full'}`}>
      
      {/* Logo */}
      <img onClick={()=>navigate('/')} src={assets.logo_full_dark} alt="ChatNova" className='w-full max-w-[180px] cursor-pointer mb-2 mx-auto block brightness-0 invert'/>

      {/* New Chat Button */}
      <button
        onClick={() => { createNewChat(); setIsMenuOpen(false); }}
        className='flex justify-center items-center w-full py-3 mt-6 bg-white/5 hover:bg-white active:bg-white text-white hover:text-black active:text-black border border-white/10 transition-all duration-300 rounded-xl cursor-pointer animate-slide-in-left'
      >
        <span className='mr-2 text-lg font-light'>+</span>
        <span className='text-sm tracking-wide font-medium'>New Chat</span>
      </button>

      {/* Search Conversations */}
      <div className='flex items-center gap-3 p-3 mt-5 bg-white/5 border border-white/5 rounded-xl transition-colors focus-within:border-white/30 focus-within:bg-white/10'>
        <img src={assets.search_icon} className='w-4 invert opacity-50' alt="Search" />
        <input onChange={(e)=>setSearch(e.target.value)} value={search} type="text" placeholder='Search...' className='text-sm bg-transparent w-full placeholder:text-gray-500 text-white outline-none'/>
      </div>

      {/* Recent Chats */}
      {chats.length > 0 && <p className='mt-6 mb-2 text-xs uppercase tracking-widest text-gray-500 font-medium'>Recent</p>}
      <div className='flex-1 overflow-y-scroll space-y-1 pr-1'>
        {
            chats
              .filter((chat)=> chat.messages[0]
                ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase())
                : chat.name.toLowerCase().includes(search.toLowerCase()))
              .map((chat, idx)=>(
                <div
                  key={chat._id}
                  onClick={() => handleChatSelect(chat)}
                  className='p-3 px-4 rounded-xl cursor-pointer flex justify-between items-center hover:bg-white/10 active:bg-white/10 transition-all duration-300 animate-slide-in-left'
                  style={{animationDelay: `${idx * 0.05}s`}}
                >
                    <div className='truncate pr-2 flex-1 min-w-0'>
                        <p className='truncate w-full text-sm text-gray-200 font-medium'>
                            {chat.messages.length > 0 ? chat.messages[0].content.slice(0,32) : chat.name}
                        </p>
                        <p className='text-xs text-gray-500 mt-0.5'>{moment(chat.updatedAt).fromNow()}</p>
                    </div>
                    {/* Delete icon — always visible */}
                    <button
                      className='flex-shrink-0 ml-3 p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 active:bg-red-500/30 transition-colors'
                      onClick={e => toast.promise(deleteChat(e, chat._id), {loading: 'deleting...'})}
                      title="Delete"
                    >
                      <img src={assets.bin_icon} className='w-4 h-4 invert' style={{filter:'invert(1) opacity(0.7)'}} alt="Delete" />
                    </button>
                </div>
              ))
        }
      </div>

    <div className='mt-auto pt-4 space-y-1 border-t border-white/10'>
        {/* Community Images */}
        <div onClick={()=> {navigate('/community'); setIsMenuOpen(false)}} className='flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/10 active:bg-white/10 transition-all duration-300 group'>
            <img src={assets.gallery_icon} className='w-4 invert opacity-70 group-hover:opacity-100 transition-opacity' alt="Community" />
            <p className='text-sm text-gray-300 group-hover:text-white font-medium'>Community</p>
        </div>

        {/* Credit Purchases Option */}
        <div onClick={()=> {navigate('/credits'); setIsMenuOpen(false)}} className='flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/10 active:bg-white/10 transition-all duration-300 group'>
            <img src={assets.diamond_icon} className='w-4 invert opacity-70 group-hover:opacity-100 transition-opacity' alt="Credits" />
            <p className='text-sm text-gray-300 group-hover:text-white font-medium'>Credits : {user?.credits}</p>
        </div>

        {/* User Account + Logout */}
        <div className='flex items-center gap-3 p-3 rounded-xl mt-2'>
            <img src={assets.user_icon} className='w-8 h-8 rounded-full border border-white/20 flex-shrink-0' alt="User" />
            <p className='flex-1 text-sm text-white font-medium truncate min-w-0'>{user ? user.name : 'Sign In'}</p>
            {user && (
                <button
                    onClick={(e) => { e.stopPropagation(); logout(); }}
                    className='flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/20 border border-white/10 transition-colors'
                    title="Logout"
                >
                    <img
                      src={assets.logout_icon}
                      style={{filter:'invert(1) opacity(0.9)'}}
                      className='w-4 h-4'
                      alt="Logout"
                    />
                    <span className='text-xs text-gray-300 font-medium hidden md:inline'>Logout</span>
                </button>
            )}
        </div>
    </div>

    {/* Close button (X) — mobile only */}
    <button
      onClick={() => setIsMenuOpen(false)}
      className='absolute top-5 right-5 md:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 active:bg-white/20 transition-colors'
    >
      <img src={assets.close_icon} className='w-4 h-4 invert' alt="Close" />
    </button>

    </div>
  )
}

export default Sidebar
