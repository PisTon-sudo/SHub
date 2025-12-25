import React from 'react';

export default function Footer(){
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <div className="font-bold text-lg">ServiceHub</div>
            <div className="mt-2">Connecting you with professionals.</div>
          </div>

          <div className="flex gap-6">
            <div>
              <h4 className="font-semibold">Company</h4>
              <ul className="mt-2 space-y-1">
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Support</h4>
              <ul className="mt-2 space-y-1">
                <li><a href="#terms">Terms</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div className="hidden sm:block">
              <h4 className="font-semibold">Newsletter</h4>
              <form id="newsletter" onSubmit={async (e)=>{e.preventDefault(); const val = e.target.email.value; if(!val) return; try{ const res = await fetch('http://localhost:5000/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'}, body: JSON.stringify({email:val})}); const json = await res.json(); if(!res.ok) throw new Error(json.error||'Failed'); localStorage.setItem('newsletter_sub', val); e.target.reset(); alert('Thanks — subscription saved (demo)'); }catch(err){ alert('Subscription failed: '+err.message); } }} className="mt-2 flex gap-2">
                <input name="email" type="email" placeholder="Your email" className="px-3 py-2 rounded border w-48" required />
                <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Subscribe</button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">© {new Date().getFullYear()} ServiceHub • All rights reserved</div>
      </div>
    </footer>
  );
}
