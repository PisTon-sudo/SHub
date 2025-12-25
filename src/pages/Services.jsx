import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA IMPORT ---
import { services } from '../data/services'; 

// --- COMPONENT IMPORTS ---
import Header from '../components/Header';
import Footer from '../components/Footer';
 
// --- ICONS ---
import { 
  Squares2X2Icon, 
  ListBulletIcon, 
  AdjustmentsHorizontalIcon, 
  StarIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  HomeIcon 
} from "@heroicons/react/24/outline";

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate(); 
  const query = searchParams.get('q') || "";

  // --- STATE FOR FILTERS & VIEW ---
  const [viewMode, setViewMode] = useState('grid'); 
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceLimit, setPriceLimit] = useState(500);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- FILTERING LOGIC ---
  const filteredServices = useMemo(() => {
    return services.filter(s => {
      const matchesSearch = s.title.toLowerCase().includes(query.toLowerCase()) || 
                            s.category.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
      const matchesPrice = s.price <= priceLimit;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [query, activeCategory, priceLimit]);

  const categories = ['All', ...new Set(services.map(s => s.category))];

  // --- NAVIGATION HANDLER ---
  const handleSelectService = (id) => {
    navigate(`/service/${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        
        {/* 2025 ADVANCED BREADCRUMB NAVIGATION */}
        <nav className="flex mb-8 items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          <Link to="/" className="flex items-center hover:text-blue-600 transition-colors">
            <HomeIcon className="h-3.5 w-3.5 mr-1" />
            Home
          </Link>
          <ChevronRightIcon className="h-3 w-3 opacity-50" />
          <Link 
            to="/services" 
            onClick={() => {setActiveCategory('All'); setSearchParams({});}}
            className={`${activeCategory === 'All' && !query ? 'text-blue-600' : 'hover:text-blue-600'} transition-colors`}
          >
            Services
          </Link>
          
          {activeCategory !== 'All' && (
            <>
              <ChevronRightIcon className="h-3 w-3 opacity-50" />
              <span className="text-blue-600">{activeCategory}</span>
            </>
          )}

          {query && (
            <>
              <ChevronRightIcon className="h-3 w-3 opacity-50" />
              <span className="text-blue-600 italic">Search: "{query}"</span>
            </>
          )}
        </nav>

        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tight">
              {query ? `Results for "${query}"` : activeCategory !== 'All' ? activeCategory : "Service Directory"}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Explore <span className="text-blue-600 dark:text-blue-500 font-bold">{filteredServices.length}</span> verified experts in 2025.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-blue-500'}`}
            >
              <Squares2X2Icon className="h-6 w-6" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-blue-500'}`}
            >
              <ListBulletIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* SIDEBAR: FILTERS */}
          <aside className="w-full lg:w-80 sticky top-28 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <AdjustmentsHorizontalIcon className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-black">Refine Search</h3>
              </div>

              <div className="mb-10">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 block">Categories</label>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        activeCategory === cat 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' 
                        : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Price Ceiling</label>
                  <span className="text-sm font-black text-blue-600">${priceLimit}</span>
                </div>
                <input 
                  type="range" min="20" max="500" step="10"
                  value={priceLimit} onChange={(e) => setPriceLimit(e.target.value)}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          </aside>

          {/* RESULTS FEED */}
          <div className="flex-1">
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              <AnimatePresence mode="popLayout">
                {filteredServices.map((s) => (
                  <motion.div
                    layout
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => handleSelectService(s.id)}
                    className={`group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-blue-500/50 transition-all duration-500 ${viewMode === 'list' ? 'flex flex-row h-64' : 'flex flex-col'}`}
                  >
                    {/* Image Area */}
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-80 h-full' : 'h-60'}`}>
                      <img 
                        src={s.images[0]} 
                        alt={s.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      />
                      {s.badge && (
                        <div className="absolute top-6 left-6 px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase rounded-full shadow-lg">
                          {s.badge}
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{s.category}</p>
                          <div className="flex items-center gap-1 text-yellow-500 font-black text-sm">
                            <StarIcon className="h-4 w-4 fill-current" /> {s.rating}
                          </div>
                        </div>
                        <h3 className="text-2xl font-black mb-3 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{s.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 mt-4">
                        <div>
                          <p className="text-2xl font-black text-slate-900 dark:text-white">${s.price}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Est. Price</p>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                          Details <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {/* Empty state logic... */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
