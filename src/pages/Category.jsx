import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import ServicesGrid from '../components/ServicesGrid';
import { services } from '../data/services';

export default function Category(){
  const { category } = useParams();
  const list = services.filter(s => s.category.toLowerCase() === (category || '').toLowerCase());
  const crumbs = [{to:'/', label:'Home'}, {to:'/services', label:'Services'}, {label: category}];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={crumbs} />
        <h1 className="text-3xl font-bold mb-4">{category} services</h1>
        <ServicesGrid services={list} showAll />
      </div>
    </div>
  );
}