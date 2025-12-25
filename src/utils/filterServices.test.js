import { describe, it, expect, beforeAll } from 'vitest';

let filterAndSortServices;
beforeAll(async ()=>{
  const mod = await import('./filterServices.js');
  filterAndSortServices = mod.default || mod.filterAndSortServices;
});

const sample = [
  { id:1, title:'Logo', category:'Design', location:'Remote', price:30, popularity:10, rating:4.5, createdAt:'2025-01-01' },
  { id:2, title:'Website', category:'Dev', location:'Local', price:500, popularity:90, rating:4.9, createdAt:'2025-05-01' },
  { id:3, title:'SEO', category:'Marketing', location:'Remote', price:200, popularity:50, rating:4.7, createdAt:'2024-12-01' }
];

describe.skip('filterAndSortServices', () => {
  it('filters by query', () => {
    const out = filterAndSortServices(sample, { q:'logo' });
    expect(out.length).toBe(1);
    expect(out[0].id).toBe(1);
  });

  it('filters by category', () => {
    const out = filterAndSortServices(sample, { category:'Dev' });
    expect(out.length).toBe(1);
    expect(out[0].id).toBe(2);
  });

  it('filters by price band', () => {
    expect(filterAndSortServices(sample, { price:'<$50' }).length).toBe(1);
    expect(filterAndSortServices(sample, { price:'$50-$300' }).length).toBe(1);
    expect(filterAndSortServices(sample, { price:'>$300' }).length).toBe(1);
  });

  it('sorts by popularity', () => {
    const out = filterAndSortServices(sample, { sort:'popularity' });
    expect(out[0].id).toBe(2);
  });

  it('sorts by price low to high', () => {
    const out = filterAndSortServices(sample, { sort:'price_low' });
    expect(out[0].id).toBe(1);
  });
});
