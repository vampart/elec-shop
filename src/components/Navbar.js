import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="gradient-bg px-5 sticky top-0 z-50 shadow-lg shadow-black/20" role="navigation" aria-label="Main navigation">
      <div className="max-w-screen-xl mx-auto flex items-center h-[70px] gap-5 flex-wrap md:flex-nowrap">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 no-underline shrink-0" aria-label="Elec Shop Home">
          <span className="text-3xl">⚡</span>
          <span className="text-xl font-extrabold gradient-text">Elec Shop</span>
        </Link>

        {/* Search */}
        <form
          className="flex-1 max-w-[500px] flex bg-white/10 rounded-lg overflow-hidden border border-white/10 focus-within:border-brand-cyan transition-colors order-3 md:order-none w-full md:w-auto mt-2 md:mt-0"
          onSubmit={handleSearch}
          role="search"
        >
          <input
            type="search"
            placeholder="Search electronics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 border-none bg-transparent text-white text-sm outline-none placeholder:text-white/50"
            aria-label="Search products"
          />
          <button type="submit" className="px-4 py-2.5 border-none bg-transparent cursor-pointer text-base" aria-label="Submit search">
            🔍
          </button>
        </form>

        {/* Mobile menu button */}
        <button
          className="md:hidden bg-transparent border-none text-white text-2xl cursor-pointer ml-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        {/* Links */}
        <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex items-center gap-4 w-full md:w-auto order-4 md:order-none flex-col md:flex-row py-3 md:py-0`}>
          <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="text-white/85 no-underline text-sm font-medium hover:text-brand-cyan transition-colors whitespace-nowrap">
            Products
          </Link>

          {user ? (
            <>
              <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="text-white/85 no-underline text-sm font-medium hover:text-brand-cyan transition-colors whitespace-nowrap">
                Orders
              </Link>
              <span className="text-white/70 text-xs whitespace-nowrap">Hi, {user.name || user.email}</span>
              <button
                className="px-4 py-2 rounded-md text-sm font-semibold cursor-pointer border-none bg-white/10 text-white hover:bg-red-500/30 transition-colors whitespace-nowrap"
                onClick={() => { logout(); setMobileMenuOpen(false); }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="gradient-btn px-4 py-2 rounded-md text-sm font-semibold no-underline hover:opacity-90 hover:-translate-y-0.5 transition-all whitespace-nowrap"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          )}

          <Link
            to="/cart"
            className="relative text-xl no-underline p-1 text-white/85 hover:text-brand-cyan transition-colors"
            onClick={() => setMobileMenuOpen(false)}
            aria-label={`Shopping cart with ${totalItems} items`}
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-red-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
