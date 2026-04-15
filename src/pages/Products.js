import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { DEMO_PRODUCTS } from '../services/api';

const CATEGORIES = ['All', 'Phones', 'Computers', 'Audio', 'TVs', 'Wearables', 'Smart Home', 'Cameras'];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const filteredProducts = useMemo(() => {
    let products = [...DEMO_PRODUCTS];
    if (categoryParam !== 'All') products = products.filter((p) => p.category === categoryParam);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      products = products.filter((p) =>
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    products = products.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case 'price-low': products.sort((a, b) => a.price - b.price); break;
      case 'price-high': products.sort((a, b) => b.price - a.price); break;
      case 'rating': products.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': products.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
    }
    return products;
  }, [categoryParam, searchQuery, sortBy, priceRange]);

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') params.delete('category'); else params.set('category', cat);
    setSearchParams(params);
  };

  return (
    <main className="max-w-screen-xl mx-auto px-5 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="md:sticky md:top-24 self-start bg-white rounded-2xl p-6 shadow-sm" aria-label="Product filters">
          <h2 className="text-xl font-extrabold text-brand-dark mb-6">Filters</h2>

          <div className="mb-6">
            <h3 className="text-sm font-bold text-brand-dark mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] cursor-pointer transition-all border ${
                    categoryParam === cat || (cat === 'All' && !searchParams.get('category'))
                      ? 'gradient-btn border-transparent'
                      : 'bg-white border-gray-200 text-gray-500 hover:border-brand-purple hover:text-brand-purple'
                  }`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold text-brand-dark mb-3">Price Range</h3>
            <div className="flex items-center gap-2">
              <input type="number" placeholder="Min" value={priceRange[0] || ''}
                onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                className="w-20 px-2.5 py-2 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-brand-purple"
                aria-label="Minimum price" />
              <span className="text-gray-400">—</span>
              <input type="number" placeholder="Max" value={priceRange[1] || ''}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 2000])}
                className="w-20 px-2.5 py-2 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-brand-purple"
                aria-label="Maximum price" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold text-brand-dark mb-3">Sort By</h3>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] outline-none cursor-pointer bg-white focus:border-brand-purple"
              aria-label="Sort products">
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-extrabold text-brand-dark">
              {searchQuery ? `Results for "${searchQuery}"` : categoryParam === 'All' ? 'All Products' : categoryParam}
            </h1>
            <span className="text-sm text-gray-400">{filteredProducts.length} products</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-5xl block mb-4">🔍</span>
              <h3 className="text-xl text-brand-dark mb-2">No products found</h3>
              <p className="text-gray-400">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Products;
