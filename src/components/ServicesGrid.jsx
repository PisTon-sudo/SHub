import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services as defaultServices } from '../data/services';
import { providers as providersData } from '../data/providers';
import filterAndSortServices from '../utils/filterServices';

export default function ServicesGrid({ services = [], showAll = false, onServiceClick }) {
  const navigate = useNavigate();
  const baseList = services && services.length ? services : defaultServices;
  const [list, setList] = useState(baseList);
  const [filters, setFilters] = useState({ q: '', category: '', location: '', price: '', sort: 'popularity' });

  // Read initial filters from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlFilters = {
      q: params.get('q') || '',
      category: params.get('category') || '',
      location: params.get('location') || '',
      price: params.get('price') || '',
      sort: params.get('sort') || 'popularity'
    };
    setFilters(prev => ({ ...prev, ...urlFilters }));
  }, []);

  // Sync with Global Search Events
  useEffect(() => {
    const handler = (e) => {
      const detail = e.detail || {};
      setFilters(prev => ({ ...prev, ...detail }));
    };
    window.addEventListener('search-change', handler);
    return () => window.removeEventListener('search-change', handler);
  }, []);

  // Filter Logic
  const applyFilters = useMemo(() => filterAndSortServices(baseList, filters), [baseList, filters]);

  useEffect(() => {
    setList(applyFilters);
  }, [applyFilters]);

  // Unified Navigation Handler
  const handleNavigation = (id) => {
    if (onServiceClick) {
      // Use the specific handler passed from Home Page
      onServiceClick(id);
    } else {
      // Default navigation (Must match App.jsx route /service/:id)
      navigate(`/service/${id}`);
    }
  };

  return (
    <section id="services" className="w-full py-8">
      {/* Container removed to let Home Page control width via side-panel logic */}
      <h2 className="text-2xl font-black mb-8 dark:text-white">
        {showAll ? 'All Services' : 'Popular Services'}
      </h2>

      {list.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 font-medium text-lg">No services found for your criteria.</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8" 
          initial="hidden" 
          animate="visible" 
          variants={{hidden:{opacity:0}, visible:{opacity:1}}}
        >
          {list.slice(0, showAll ? list.length : 6).map((s, index) => (
            <motion.article 
              key={s.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.05 }} 
              whileHover={{ y: -10 }}
              onClick={() => handleNavigation(s.id)} // Navigation Trigger
              className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-500/30 transition-all duration-500"
            >
              {/* Image Section */}
              <div className="w-full h-52 relative overflow-hidden">
                <img 
                  src={s.images?.[0] || s.images || s.image} 
                  alt={s.title} 
                  loading="lazy" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />

                {s.badge && (
                  <div className="absolute top-4 left-4">
                    <span className={`text-[10px] font-black uppercase py-1.5 px-4 rounded-full shadow-lg backdrop-blur-md ${
                      s.badge.toLowerCase().includes('discount') ? 'bg-yellow-400 text-white' : 
                      s.badge.toLowerCase().includes('top') ? 'bg-blue-600 text-white' : 
                      'bg-slate-900/80 text-white'
                    }`}>
                      {s.badge}
                    </span>
                  </div>
                )}
                
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold rounded-lg">
                  {s.location || 'Remote'}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest">
                    {s.category}
                  </span>
                  <div className="flex items-center gap-1 text-sm font-bold text-yellow-500">
                    ⭐ {s.rating || '4.9'}
                  </div>
                </div>

                <h3 className="font-black text-xl mb-4 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {s.title}
                </h3>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    {/* Provider Avatar Logic */}
                    {s.providerId && providersData.find(x => x.id === s.providerId) ? (
                      <div className="flex items-center gap-2">
                        <img 
                          src={providersData.find(x => x.id === s.providerId).avatar} 
                          className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700" 
                          alt="Provider" 
                        />
                        <span className="text-xs font-bold text-slate-500">
                          {providersData.find(x => x.id === s.providerId).name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Verified Pro</span>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-black text-slate-900 dark:text-white">${s.price}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Per Session</div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </section>
  );
}
