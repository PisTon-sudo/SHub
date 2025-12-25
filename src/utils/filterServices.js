export default function filterAndSortServices(services = [], filters = {}){
  let out = [...services];
  const { q='', category='', location='', price='', sort='popularity' } = filters || {};

  if(q){
    const ql = q.toLowerCase();
    out = out.filter(s => (s.title||'').toLowerCase().includes(ql) || (s.description||'').toLowerCase().includes(ql));
  }

  if(category){
    out = out.filter(s => s.category === category);
  }

  if(location){
    out = out.filter(s => s.location === location);
  }

  if(price){
    if(price === '<$50') out = out.filter(s => Number(s.price) < 50);
    else if(price === '$50-$300') out = out.filter(s => Number(s.price) >= 50 && Number(s.price) <= 300);
    else if(price === '>$300') out = out.filter(s => Number(s.price) > 300);
  }

  // sorting
  if(sort === 'popularity') out.sort((a,b)=> (b.popularity||0) - (a.popularity||0));
  else if(sort === 'rating') out.sort((a,b)=> (b.rating||0) - (a.rating||0));
  else if(sort === 'newest') out.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
  else if(sort === 'price_low') out.sort((a,b)=> (a.price||0) - (b.price||0));
  else if(sort === 'price_high') out.sort((a,b)=> (b.price||0) - (a.price||0));

  return out;
}
