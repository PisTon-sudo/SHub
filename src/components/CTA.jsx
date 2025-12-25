import React from 'react';
import { motion } from 'framer-motion';

export default function CTA(){
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Ready to get started?</h3>
              <p className="mt-1">Create an account and discover professionals ready to help.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <a href="#signup" className="px-6 py-3 bg-white text-blue-600 rounded font-semibold">Sign Up Now</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
