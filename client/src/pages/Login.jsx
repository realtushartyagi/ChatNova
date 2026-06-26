import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {axios, setToken} = useAppContext();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(submitting) return;
      setSubmitting(true);
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
        if (error.message === 'Network Error') {
            toast.error("Backend server is offline or waking up. Please try again.")
        } else {
            toast.error(error.response?.data?.message || error.message)
        }
      } finally {
        setSubmitting(false);
      }
    }

    const handleOneClickLogin = async (e) => {
      e.preventDefault();
      if(submitting) return;
      setSubmitting(true);

      try {
        // Try to login as demo user first
        let res = await axios.post('/api/user/login', {email: "demo@example.com", password: "demopassword"});
        
        // If it fails (user doesn't exist), register the demo user
        if (!res.data.success) {
            res = await axios.post('/api/user/register', {name: "Demo User", email: "demo@example.com", password: "demopassword"});
        }
        
        if(res.data.success){
            setToken(res.data.token)
            localStorage.setItem('token', res.data.token)
            toast.success("Logged in successfully!")
        }else{
            toast.error(res.data.message)
        }
      } catch (error) {
        if (error.message === 'Network Error') {
            toast.error("Server is waking up (may take ~30s). Please hold on...")
        } else {
            toast.error(error.response?.data?.message || error.message)
        }
      } finally {
        setSubmitting(false);
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

            <button 
                type='button' 
                onClick={handleOneClickLogin}
                disabled={submitting} 
                className="z-10 bg-gradient-to-r from-indigo-500 to-blue-600 text-black font-semibold hover:scale-[1.02] disabled:opacity-50 transition-all w-full py-3.5 rounded-xl cursor-pointer text-sm tracking-wide shadow-[0_0_20px_rgba(99,102,241,0.3)] mb-2"
            >
                {submitting ? "Waking up server..." : "One-Click Demo Login"}
            </button>

            <div className="w-full flex items-center gap-4 z-10 mb-2 opacity-50">
                <div className="h-px bg-white/20 flex-1"></div>
                <span className="text-xs font-medium uppercase tracking-widest text-white/50">OR</span>
                <div className="h-px bg-white/20 flex-1"></div>
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

            <button type='submit' disabled={submitting} className="z-10 mt-2 bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 disabled:opacity-50 transition-colors w-full py-3 rounded-xl cursor-pointer text-sm tracking-wide">
                {submitting ? "Waking up server..." : (state === "register" ? "Continue with Email" : "Sign In with Email")}
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
