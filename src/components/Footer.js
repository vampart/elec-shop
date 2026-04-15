import React from 'react';
import { Link } from 'react-router-dom';

const FooterLink = ({ to, children }) => (
  <li className="mb-2.5">
    <Link to={to} className="text-white/60 no-underline text-sm hover:text-brand-cyan transition-colors">
      {children}
    </Link>
  </li>
);

const Footer = () => {
  return (
    <footer className="gradient-bg text-white/80 pt-16 pb-5 px-5 mt-20" role="contentinfo">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
        <div>
          <h3 className="text-xl text-white mb-3"><span>⚡</span> Elec Shop</h3>
          <p className="text-sm leading-relaxed text-white/60">
            Your trusted destination for premium electronics. Quality products, competitive prices, and exceptional service.
          </p>
        </div>
        <div>
          <h4 className="text-base text-white mb-4 font-semibold">Shop</h4>
          <ul className="list-none p-0 m-0">
            <FooterLink to="/products?category=Phones">Phones</FooterLink>
            <FooterLink to="/products?category=Computers">Computers</FooterLink>
            <FooterLink to="/products?category=Audio">Audio</FooterLink>
            <FooterLink to="/products?category=TVs">TVs</FooterLink>
            <FooterLink to="/products?category=Wearables">Wearables</FooterLink>
          </ul>
        </div>
        <div>
          <h4 className="text-base text-white mb-4 font-semibold">Support</h4>
          <ul className="list-none p-0 m-0">
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/shipping">Shipping Info</FooterLink>
            <FooterLink to="/returns">Returns</FooterLink>
          </ul>
        </div>
        <div>
          <h4 className="text-base text-white mb-4 font-semibold">Company</h4>
          <ul className="list-none p-0 m-0">
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
          </ul>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto mt-10 pt-5 border-t border-white/10 text-center text-xs text-white/40">
        <p>&copy; 2026 Elec Shop. All rights reserved. Powered by AWS.</p>
      </div>
    </footer>
  );
};

export default Footer;
