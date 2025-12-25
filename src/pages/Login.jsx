import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can connect your backend API (JWT)
    if (!email || !password) return setError('Email and password are required');
    // simulate login success
    setError('');
    navigate('/'); // redirect to homepage after login
  };

  const handleSocialLogin = (provider) => {
    // Placeholder: connect Google/Facebook OAuth here
    alert(`Sign in with ${provider} coming soon!`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300"> 
         <Header theme={theme} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} /> 
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-4 mt-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6 text-center">Log in to ServiceHub</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1 text-slate-700 dark:text-slate-300">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-bold mb-1 text-slate-700 dark:text-slate-300">Password</label>
            <input 
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
            <button 
              type="button"
              onClick={()=>setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-white focus:outline-none"
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-600" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center gap-2 my-6">
          <hr className="flex-1 border-slate-300 dark:border-slate-700"/>
          <span className="text-sm text-slate-500 dark:text-slate-400">OR</span>
          <hr className="flex-1 border-slate-300 dark:border-slate-700"/>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={()=>handleSocialLogin('Google')}
            className="flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" className="h-5 w-5" alt="Google"/>
            Continue with Google
          </button>
          <button 
            onClick={()=>handleSocialLogin('Facebook')}
            className="flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <img src="https://img.icons8.com/color/48/000000/facebook-new.png" className="h-5 w-5" alt="Facebook"/>
            Continue with Facebook
          </button>
        </div>

        <p className="mt-6 text-sm text-center text-slate-500 dark:text-slate-400">
          Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline font-semibold">Sign up</Link>
        </p>
      </motion.div>
    </div>
     <Footer/>
     </div>
  );
}
