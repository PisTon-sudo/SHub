import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../data/services';

// --- COMPONENT IMPORTS ---
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- ICONS ---
import { 
  StarIcon, 
  MapPinIcon, 
  ShieldCheckIcon, 
  ClockIcon, 
  ArrowLeftIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/solid";

import { 
  HomeIcon, 
  ChevronRightIcon 
} from "@heroicons/react/24/outline";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = useMemo(
    () => services.find(s => s.id === parseInt(id)),
    [id]
  );

  const relatedServices = useMemo(() => {
    if (!service) return [];
    return services.filter(
      s => s.category === service.category && s.id !== service.id
    ).slice(0, 3);
  }, [service]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-3xl font-black">Service Not Found</h2>
          <button
            onClick={() => navigate('/services')}
            className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-2xl font-black"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-6">

        {/* BREADCRUMB */}
        <div className="flex justify-between items-center mb-12">
          <nav className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-slate-400">
            <Link to="/" className="flex items-center hover:text-blue-600">
              <HomeIcon className="h-3.5 w-3.5 mr-1" /> Home
            </Link>
            <ChevronRightIcon className="h-3 w-3 opacity-50" />
            <Link to="/services" className="hover:text-blue-600">Services</Link>
            <ChevronRightIcon className="h-3 w-3 opacity-50" />
            <span className="text-blue-600 truncate max-w-[220px]">
              {service.title}
            </span>
          </nav>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-8 space-y-14">

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-[3.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800"
            >
              <img
                src={service.images[0]}
                alt={service.title}
                className="w-full h-[500px] object-cover"
              />
            </motion.div>

            <header>
              <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest mb-3">
                <CheckCircleIcon className="h-4 w-4" />
                {service.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6">
                {service.title}
              </h1>

              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-2">
                  <StarIcon className="h-6 w-6 text-yellow-500" />
                  <span className="font-black text-xl">{service.rating}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-bold uppercase text-sm">
                  <MapPinIcon className="h-5 w-5 text-blue-600" />
                  {service.location}
                </div>
              </div>
            </header>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
              <h3 className="text-2xl font-black mb-6">Service Description</h3>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {service.description}
              </p>
            </div>

            {/* TRUST BLOCKS */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: ShieldCheckIcon, title: "Verified Provider", sub: "Background Checked", color: "from-emerald-500 to-teal-400" },
                { icon: ClockIcon, title: "Fast Response", sub: "Replies under 2h", color: "from-blue-500 to-cyan-400" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800"
                >
                  <div className={`p-4 rounded-3xl bg-gradient-to-br ${item.color} text-white`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-black">{item.title}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – PROVIDER / BOOKING CARD (UPDATED DESIGN) */}
          <aside className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-32 group"
            >
              <div className="relative bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[3rem] p-10 transition-all hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">

                {/* ICON */}
                <div className="flex justify-between mb-10">
                  <div className="p-4 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-500 text-white shadow-xl">
                    <CalendarDaysIcon className="h-7 w-7" />
                  </div>
                  <span className="text-5xl font-black text-slate-100 dark:text-slate-800">
                    $
                  </span>
                </div>

                {/* PRICE */}
                <div className="mb-10">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 mb-3">
                    Starting From
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black">${service.price}</span>
                    <span className="text-slate-400 font-bold">/hr</span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="space-y-4">
                  <button
                    onClick={() => navigate(`/booking/${service.id}`)}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all"
                  >
                    Book Professional
                  </button>

                  <button
                    onClick={() => navigate(`/chat?service=${service.id}`)}
                    className="w-full py-4 border border-slate-200 dark:border-slate-700 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-600" />
                    Chat with Provider
                  </button>
                </div>

                <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-relaxed">
                  No upfront payment <br />
                  Secure booking protection
                </p>
              </div>
            </motion.div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetails;
