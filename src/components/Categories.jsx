import React from 'react';

const cats = ['Plumbing','Electrician','House Cleaning','Landscaping','Moving','Tutoring','Design','Web Dev'];

export default function Categories(){
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {cats.map(c=> (
        <a key={c} href={`/services?category=${encodeURIComponent(c)}`} className="px-3 py-2 bg-white dark:bg-slate-900 border rounded text-sm hover:bg-orange-50 transition">{c}</a>
      ))}
    </div>
  );
}