import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { DEMO_PRODUCTS } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = DEMO_PRODUCTS.find((p) => p.id === id);
  const relatedProducts = DEMO_PRODUCTS.filter((p) => p.category === product?.category && p.id !== id).slice(0, 4);

  if (!product) {
    return (
      <main className="max-w-screen-xl mx-auto px-5 py-8 text-center py-20">
        <h2 className="text-2xl text-brand-dark mb-2">Product Not Found</h2>
        <p className="text-gray-400 mb-5">The product you're looking for doesn't exist.</p>
        <Link to="/products" className="text-brand-purple no-underline font-semibold">← Back to Products</Link>
      </main>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="max-w-screen-xl mx-auto px-5 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-8 text-sm" aria-label="Breadcrumb">
        <Link to="/" className="text-brand-purple no-underline hover:underline">Home</Link>
        <span className="text-gray-400">/</span>
        <Link to="/products" className="text-brand-purple no-underline hover:underline">Products</Link>
        <span className="text-gray-400">/</span>
        <Link to={`/products?category=${product.category}`} className="text-brand-purple no-underline hover:underline">{product.category}</Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-500">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="bg-gray-100 rounded-3xl overflow-hidden aspect-square">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div>
          <span className="text-sm text-brand-purple font-semibold uppercase tracking-wider">{product.brand}</span>
          <h1 className="text-3xl font-extrabold text-brand-dark mt-2 mb-4 leading-tight">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400 text-lg" aria-label={`Rating: ${product.rating} out of 5`}>
              {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="text-sm">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
          </div>

          <p className="text-4xl font-extrabold text-brand-dark mb-4">${product.price.toFixed(2)}</p>
          <p className="text-base text-gray-500 leading-relaxed mb-6">{product.description}</p>

          {/* Meta */}
          <div className="mb-6">
            {[
              ['Availability', product.inStock
                ? <span className="text-green-500 font-semibold">✓ In Stock</span>
                : <span className="text-red-500 font-semibold">✗ Out of Stock</span>],
              ['Category', <Link to={`/products?category=${product.category}`} className="text-brand-purple no-underline">{product.category}</Link>],
              ['Brand', product.brand],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-2 py-2 border-b border-gray-100 text-sm">
                <span className="font-semibold text-brand-dark min-w-[100px]">{label}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4 items-center mb-6">
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-11 h-11 border-none bg-gray-100 text-lg cursor-pointer hover:bg-gray-200 transition-colors" aria-label="Decrease quantity">−</button>
              <span className="w-12 text-center text-base font-semibold" aria-live="polite">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-11 h-11 border-none bg-gray-100 text-lg cursor-pointer hover:bg-gray-200 transition-colors" aria-label="Increase quantity">+</button>
            </div>
            <button
              className={`flex-1 py-3.5 px-8 rounded-xl text-base font-bold cursor-pointer border-none transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-purple/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 ${added ? 'bg-green-500 text-white' : 'gradient-btn'}`}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
          </div>

          <div className="flex gap-4 flex-wrap">
            {['🚚 Free Shipping', '↩️ 30-Day Returns', '🔒 Secure Checkout'].map((f) => (
              <span key={f} className="px-4 py-2 bg-gray-100 rounded-lg text-[13px] text-gray-500">{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section aria-label="Related products">
          <h2 className="text-2xl font-extrabold text-brand-dark mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetail;
