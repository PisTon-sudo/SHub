import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items = [] }){
  if(!items || items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-4">
      <ol className="flex items-center gap-2">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center">
            {it.to ? (
              <Link to={it.to} className="hover:text-blue-600">{it.label}</Link>
            ) : (
              <span className="text-slate-500">{it.label}</span>
            )}
            {idx < items.length - 1 && <span className="px-2 text-slate-400">→</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}