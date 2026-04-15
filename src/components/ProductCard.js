import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-2xl overflow-hidden no-underline text-inherit flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
      aria-label={`View ${product.name}`}
    >
      <div className="relative pt-[75%] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
          loading="lazy"
        />
        {product.inStock ? (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-500/90 text-white">In Stock</span>
        ) : (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-500/90 text-white">Out of Stock</span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-brand-purple font-semibold uppercase tracking-wide">{product.category}</span>
        <h3 className="text-[15px] font-semibold text-brand-dark mt-1.5 mb-1.5 leading-tight line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-yellow-400 text-sm" aria-label={`Rating: ${product.rating} out of 5`}>
            {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
          </span>
          <span className="text-xs text-gray-400">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-3">
          <span className="text-xl font-extrabold text-brand-dark">${product.price.toFixed(2)}</span>
          <button
            className="px-4 py-2 gradient-btn rounded-lg text-[13px] font-semibold cursor-pointer border-none hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
