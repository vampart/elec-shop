import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { DEMO_PRODUCTS } from '../services/api';

const CATEGORIES = [
  { name: 'Phones', icon: '📱', color: 'border-red-400' },
  { name: 'Computers', icon: '💻', color: 'border-teal-400' },
  { name: 'Audio', icon: '🎧', color: 'border-brand-purple' },
  { name: 'TVs', icon: '📺', color: 'border-brand-cyan' },
  { name: 'Wearables', icon: '⌚', color: 'border-yellow-400' },
  { name: 'Smart Home', icon: '🏠', color: 'border-green-500' },
  { name: 'Cameras', icon: '📷', color: 'border-orange-400' },
];

const FEATURES = [
  { icon: '🚚', title: 'Free Shipping', desc: 'Free delivery on all orders over $99. Fast and reliable worldwide shipping.' },
  { icon: '🔒', title: 'Secure Payments', desc: 'Your transactions are protected with industry-leading encryption via Stripe.' },
  { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free return policy. No questions asked.' },
  { icon: '🎧', title: '24/7 Support', desc: 'Our expert team is always here to help you with any questions.' },
];

const Home = () => {
  const featuredProducts = DEMO_PRODUCTS.slice(0, 4);
  const bestSellers = DEMO_PRODUCTS.filter((p) => p.rating >= 4.7).slice(0, 4);

  return (
    <main className="max-w-screen-xl mx-auto px-5">
      {/* Hero */}
      <section className="flex items-center min-h-[500px] py-16 relative overflow-hidden" aria-label="Welcome banner">
        <div className="flex-1 z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-brand-dark">
            Next-Gen Electronics
            <span className="gradient-text"> at Your Fingertips</span>
          </h1>
          <p className="text-lg text-gray-500 mt-5 mb-8 max-w-lg leading-relaxed">
            Discover the latest gadgets, premium audio, cutting-edge computers, and smart home devices. Free shipping on orders over $99.
          </p>
          <div className="flex gap-4 mb-10">
            <Link to="/products" className="gradient-btn px-8 py-3.5 rounded-xl text-base font-bold no-underline hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-purple/30 transition-all">
              Shop Now
            </Link>
            <Link to="/products?category=Phones" className="bg-brand-purple/10 text-brand-purple px-8 py-3.5 rounded-xl text-base font-bold no-underline hover:bg-brand-purple/15 transition-colors">
              New Arrivals
            </Link>
          </div>
          <div className="flex gap-10">
            {[['10K+', 'Products'], ['50K+', 'Happy Customers'], ['99%', 'Satisfaction']].map(([num, label]) => (
              <div key={label} className="flex flex-col">
                <span className="text-2xl font-extrabold text-brand-dark">{num}</span>
                <span className="text-xs text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 hidden md:flex items-center justify-center">
          <div className="w-96 h-96 rounded-full bg-gradient-radial from-brand-cyan/15 via-brand-purple/10 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Categories */}
      <section className="my-16" aria-label="Product categories">
        <h2 className="text-2xl font-extrabold text-brand-dark mb-8">Shop by Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className={`flex flex-col items-center gap-2.5 py-6 px-4 bg-white rounded-2xl no-underline text-brand-dark shadow-sm border-2 border-transparent hover:-translate-y-1 hover:shadow-md hover:${cat.color} transition-all`}
            >
              <span className="text-4xl">{cat.icon}</span>
              <span className="text-sm font-semibold">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="my-16" aria-label="Featured products">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold text-brand-dark">Featured Products</h2>
          <Link to="/products" className="text-brand-purple no-underline font-semibold text-sm hover:text-brand-cyan transition-colors">View All →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-gradient-to-br from-brand-purple to-brand-cyan rounded-3xl py-16 px-10 my-16 text-center text-white" aria-label="Promotional offer">
        <span className="inline-block bg-white/20 px-4 py-1.5 rounded-full text-xs font-semibold mb-4">Limited Time Offer</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Up to 40% Off on Audio Equipment</h2>
        <p className="text-base opacity-90 mb-6">Premium headphones, speakers, and earbuds at unbeatable prices. Don't miss out!</p>
        <Link to="/products?category=Audio" className="inline-block px-8 py-3.5 bg-white text-brand-purple rounded-xl no-underline font-bold text-base hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 transition-all">
          Shop Audio Deals
        </Link>
      </section>

      {/* Best Sellers */}
      <section className="my-16" aria-label="Best selling products">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold text-brand-dark">Best Sellers</h2>
          <Link to="/products" className="text-brand-purple no-underline font-semibold text-sm hover:text-brand-cyan transition-colors">View All →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="my-16" aria-label="Why choose us">
        <h2 className="text-2xl font-extrabold text-brand-dark mb-8">Why Choose Elec Shop?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="text-center py-8 px-6 bg-white rounded-2xl shadow-sm hover:-translate-y-1 transition-transform">
              <span className="text-4xl block mb-4">{f.icon}</span>
              <h3 className="text-lg font-bold text-brand-dark mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
