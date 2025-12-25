import React, {useState, useEffect, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from 'framer-motion';
import NotificationBell from './NotificationBell';

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [scrolled, setScrolled] = useState(false);
  const firstMenuLink = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setDark(saved === 'dark');
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open && firstMenuLink.current) firstMenuLink.current.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab' && open && mobileMenuRef.current) {
        const focusable = mobileMenuRef.current.querySelectorAll(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`fixed w-full z-40 top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b transition ${scrolled ? 'shadow-lg' : 'border-slate-200 dark:border-slate-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-300">ServiceHub</Link>
            <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-4 text-sm">
              <Link to="/" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">Home</Link>
              <Link to="/services" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">Services</Link>
              <a href="#about" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">About</a>
              <a href="#contact" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">Contact</a>
              <Link to="/faq" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">FAQ</Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="lang-select" className="sr-only">Language</label>
            <select id="lang-select" aria-label="Language" onChange={(e)=>{ localStorage.setItem('lang', e.target.value); import('../i18n').then(mod=> mod.default.changeLanguage(e.target.value)); }} defaultValue={localStorage.getItem('lang') || 'en'} className="hidden sm:block bg-transparent text-sm border border-transparent focus:border-slate-300 rounded px-2 py-1">
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
            </select>

            <button
              onClick={() => setDark(d => !d)}
              aria-label="Toggle theme"
              className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300">
              {dark ? <SunIcon className="h-5 w-5 text-yellow-400"/> : <MoonIcon className="h-5 w-5 text-slate-700"/>}
            </button>

            <div className="hidden sm:flex items-center gap-2">
              <NotificationBell />
              <button onClick={() => navigate('/login')} className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">Log in</button>
              <button onClick={() => navigate('/signup')} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300">Sign up</button>
            </div>

            <button
              className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="menu"
            aria-hidden={!open}
            ref={mobileMenuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="md:hidden overflow-hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/95"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              <Link to="/" ref={firstMenuLink} onClick={() => setOpen(false)} className="py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">Home</Link>
              <Link to="/services" onClick={() => setOpen(false)} className="py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">Services</Link>
              <a href="#about" onClick={() => setOpen(false)} className="py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">About</a>
              <a href="#contact" onClick={() => setOpen(false)} className="py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">Contact</a>
              <div className="flex gap-2 mt-2">
                <button className="flex-1 px-3 py-1 rounded border" onClick={() => { setOpen(false); navigate('/login'); }}>Log in</button>
                <button className="flex-1 px-3 py-1 rounded bg-blue-600 text-white" onClick={() => { setOpen(false); navigate('/signup'); }}>Sign up</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
