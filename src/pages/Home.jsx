import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/services';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ServicesGrid from '../components/ServicesGrid';
import HowItWorks from '../components/HowItWorks';
import Providers from '../components/Providers';  
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [selectedProviderId, setSelectedProviderId] = useState(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handler = (e) => {
      const id = e?.detail?.providerId;
      if (typeof id !== 'undefined') setSelectedProviderId(id);
    };
    window.addEventListener('provider-selected', handler);

    const checkHash = () => {
      const hash = (location.hash || '').replace('#', '');
      if (hash.startsWith('provider-')) {
        const id = Number(hash.replace('provider-', ''));
        if (!Number.isNaN(id)) setSelectedProviderId(id);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    return () => {
      window.removeEventListener('provider-selected', handler);
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  const liveMatches = useMemo(() => {
    if (!searchQuery) return [];
    return services.filter(s =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const goToServices = () => navigate('/services');
  const handleSearchSubmit = () => {
    if (searchQuery) navigate(`/services?q=${encodeURIComponent(searchQuery)}`);
  };
  const selectService = (id) => navigate(`/service/${id}`);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header theme={theme} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />

      <main className="pt-24 overflow-x-hidden">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-gray-600 font-bold tracking-widest uppercase text-xs mb-4 block">Verified Professionals 2025</span>
            <h1 className="text-5xl lg:text-7xl font-black mb-6 mt-2 leading-[1.1]">
              Local Experts <br/>
              <span className="text-blue-600 dark:text-blue-500  decoration-4">On Demand.</span>
            </h1>

            <div className="w-full max-w-2xl mt-12 md:mt-20">
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={handleSearchSubmit}
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={goToServices}
                className="text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-xl active:scale-95"
              >
                Explore All Services
              </button>
            </div>
          </motion.div>

          <div className="hidden lg:block relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10"
            >
              <img
                src={services[6]?.images[0] || "images.unsplash.com"}
                className="rounded-[3.5rem] shadow-2xl border-8 border-white dark:border-slate-900 object-cover h-[550px] w-full"
                alt="Featured Pro"
              />
            </motion.div>

            <div className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700">
              <div className="text-2xl font-black text-blue-600">4.9/5</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Average Professional Rating</div>
            </div>
          </div>
        </section>

        {/* DYNAMIC SEARCH & SERVICES SECTION */}
        <section id="services-grid" className="max-w-7xl mx-auto px-4 py-20 border-t border-slate-100 dark:border-slate-900">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <motion.div
              layout
              className={`transition-all duration-500 ease-in-out ${searchQuery ? 'lg:w-7/12' : 'w-full'}`}
            >
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white">Popular Services</h2>
                  <p className="text-slate-500 mt-2">Hand-picked experts for your needs</p>
                </div>
                {!searchQuery && (
                  <button
                    onClick={goToServices}
                    className="text-blue-600 font-bold hover:underline underline-offset-8 transition-all"
                  >
                    See More →
                  </button>
                )}
              </div>

              <ServicesGrid onServiceClick={selectService} />
            </motion.div>

            <AnimatePresence>
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="w-full lg:w-5/12 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 sticky top-28 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-500/5 h-fit"
                >
                  <div className="flex justify-between items-center mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
                    <h3 className="text-xl font-bold">Matching Results</h3>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-sm text-slate-400 hover:text-red-500 font-bold transition-colors"
                    >
                      Clear Search
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
                    {liveMatches.length > 0 ? liveMatches.map(item => (
                      <motion.div
                        key={item.id}
                        whileHover={{ x: 5 }}
                        onClick={() => selectService(item.id)}
                        className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl cursor-pointer border border-transparent hover:border-blue-500 hover:shadow-lg transition-all"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                          <img
                            src={item.images[0]}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            alt={item.title}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm leading-tight text-slate-900 dark:text-white truncate">{item.title}</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">{item.category}</p>
                          <p className="text-blue-600 font-black text-xs mt-1">${item.price}</p>
                        </div>
                        <div className="text-slate-300 group-hover:text-blue-500 transition-colors font-bold pr-2">→</div>
                      </motion.div>
                    )) : (
                      <div className="text-center py-12">
                        <div className="text-4xl mb-4 text-slate-300">🔍</div>
                        <p className="text-slate-500 italic">No matches for "{searchQuery}"</p>
                        <button onClick={goToServices} className="mt-4 text-blue-600 font-bold text-sm hover:underline">Browse all services</button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <HowItWorks />

        {/* UPDATED PROVIDERS SECTION */}
        <Providers
          onProviderClick={(id) => navigate(`/provider/${id}`)}
        />

        <Testimonials />
        <CTA onActionClick={goToServices} />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
