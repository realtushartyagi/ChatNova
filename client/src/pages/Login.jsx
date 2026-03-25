import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {axios, setToken} = useAppContext()

    const handleSubmit = async (e) => {
      e.preventDefault();
      const url = state === "login" ? '/api/user/login' : '/api/user/register'

      try {
        const {data} = await axios.post(url, {name, email, password})
        if(data.success){
            setToken(data.token)
            localStorage.setItem('token', data.token)
        }else{
            toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }


  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md animate-fade-in-up">
        <form onSubmit={handleSubmit} className="glass-panel flex flex-col gap-6 items-start p-10 py-14 w-full sm:w-[400px] text-white rounded-3xl relative overflow-hidden">
            {/* Subtle glow orb in the background of the form */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="w-full text-center space-y-1 mb-2 z-10">
                <h1 className="text-3xl font-light tracking-tight">
                    {state === "login" ? "Welcome back." : "Create Account."}
                </h1>
                <p className="text-sm text-gray-400 font-light">
                    {state === "login" ? "Enter your details to proceed." : "Sign up to get started."}
                </p>
            </div>

            {state === "register" && (
                <div className="w-full z-10">
                    <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">Name</label>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="John Doe" className="glass-input text-white rounded-xl w-full p-3 px-4 outline-none text-sm placeholder:text-gray-600" type="text" required />
                </div>
            )}
            <div className="w-full z-10">
                <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="hello@example.com" className="glass-input text-white rounded-xl w-full p-3 px-4 outline-none text-sm placeholder:text-gray-600" type="email" required />
            </div>
            <div className="w-full z-10">
                <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="••••••••" className="glass-input text-white rounded-xl w-full p-3 px-4 outline-none text-sm placeholder:text-gray-600" type="password" required />
            </div>

            <button type='submit' className="z-10 mt-2 bg-white text-black font-medium hover:bg-gray-200 transition-colors w-full py-3 rounded-xl cursor-pointer text-sm tracking-wide">
                {state === "register" ? "Continue" : "Sign In"}
            </button>

            <div className="w-full text-center mt-2 z-10">
                {state === "register" ? (
                    <p className="text-xs text-gray-400">
                        Already have an account? <span onClick={() => setState("login")} className="text-white hover:text-gray-300 font-medium cursor-pointer transition-colors">Sign in here</span>
                    </p>
                ) : (
                    <p className="text-xs text-gray-400">
                        Don't have an account? <span onClick={() => setState("register")} className="text-white hover:text-gray-300 font-medium cursor-pointer transition-colors">Sign up here</span>
                    </p>
                )}
            </div>
        </form>
    </div>
  )
}

export default Login
