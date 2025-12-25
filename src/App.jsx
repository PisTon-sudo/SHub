import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Home from "./pages/Home";

// --- LAZY LOADING FOR PERFORMANCE ---
const Services = lazy(() => import('./pages/Services'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));  
const Category = lazy(() => import('./pages/Category'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ProviderCardDetails = lazy(() => import('./pages/ProviderCardDetails')); 

function App() {
  const location = useLocation();

  return (
    /* 
       Advanced 2025 Loading State: 
       Centered spinner with slate-950 backdrop for seamless dark-mode transitions.
    */
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    }>
      {/* 
         AnimatePresence allows components to animate 
         when they are removed from the React tree.
      */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          {/* Main Landing Page */}
          <Route path="/" element={<Home />} />
          
          {/* Services Directory */}
          <Route path="/services" element={<Services />} />
          
          {/* Category-Specific View */}
          <Route path="/services/category/:category" element={<Category />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/provider/:id" element={<ProviderCardDetails />} /> 

          {/* 
             ADVANCED SERVICE DETAIL ROUTE 
             Matches: navigate(`/service/${id}`) from Home and Services pages.
          */}
          <Route path="/service/:id" element={<ServiceDetails />} /> 

          {/* 404 Redirect/Fallback (Optional but recommended) */}
          <Route path="*" element={<Home />} /> 
          
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default App;
