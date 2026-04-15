import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="max-w-screen-xl mx-auto px-5 py-8 text-center py-20">
        <span className="text-6xl block mb-4">🛒</span>
        <h2 className="text-2xl text-brand-dark mb-2">Your Cart is Empty</h2>
        <p className="text-gray-400 mb-6">Looks like you haven't added any items yet.</p>
        <Link to="/products" className="inline-block gradient-btn px-8 py-3.5 rounded-xl no-underline font-bold">Continue Shopping</Link>
      </main>
    );
  }

  const shipping = totalPrice >= 99 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shipping + tax;

  return (
    <main className="max-w-screen-xl mx-auto px-5 py-8">
      <h1 className="text-2xl font-extrabold text-brand-dark mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
        {/* Items */}
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm flex-wrap md:flex-nowrap">
              <Link to={`/product/${item.id}`} className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 flex flex-col gap-1">
                <Link to={`/product/${item.id}`} className="text-base font-semibold text-brand-dark no-underline hover:text-brand-purple transition-colors">{item.name}</Link>
                <span className="text-[13px] text-gray-400">{item.brand}</span>
                <span className="text-[15px] font-bold text-brand-dark">${item.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-5 w-full md:w-auto justify-between md:justify-end">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-9 h-9 border-none bg-gray-100 text-base cursor-pointer hover:bg-gray-200 flex items-center justify-center" aria-label="Decrease quantity">−</button>
                  <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-9 h-9 border-none bg-gray-100 text-base cursor-pointer hover:bg-gray-200 flex items-center justify-center" aria-label="Increase quantity">+</button>
                </div>
                <span className="text-lg font-extrabold text-brand-dark min-w-[80px] text-right">${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeItem(item.id)} className="w-8 h-8 border-none bg-gray-100 rounded-lg cursor-pointer text-sm text-gray-400 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center" aria-label={`Remove ${item.name}`}>✕</button>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="self-start px-4 py-2 bg-transparent border border-gray-200 rounded-lg text-gray-400 text-[13px] cursor-pointer hover:border-red-500 hover:text-red-500 transition-colors">Clear Cart</button>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-7 shadow-sm sticky top-24">
          <h2 className="text-xl font-extrabold text-brand-dark mb-5">Order Summary</h2>
          <div className="flex justify-between py-2.5 text-[15px] text-gray-500">
            <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2.5 text-[15px] text-gray-500">
            <span>Shipping</span>
            <span>{shipping === 0 ? <span className="text-green-500 font-semibold">FREE</span> : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between py-2.5 text-[15px] text-gray-500">
            <span>Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          {shipping > 0 && (
            <p className="text-[13px] text-brand-purple bg-brand-purple/5 px-3 py-2 rounded-lg my-2">
              Add ${(99 - totalPrice).toFixed(2)} more for free shipping!
            </p>
          )}
          <div className="flex justify-between py-4 mt-2 border-t-2 border-gray-100 text-xl font-extrabold text-brand-dark">
            <span>Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="block w-full gradient-btn py-4 rounded-xl text-base font-bold text-center no-underline mt-4 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-purple/30 transition-all">
            Proceed to Checkout
          </Link>
          <Link to="/products" className="block text-center mt-3 text-brand-purple no-underline text-sm font-semibold">← Continue Shopping</Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;
