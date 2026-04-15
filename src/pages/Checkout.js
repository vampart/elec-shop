import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const inputClass = 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-[15px] outline-none transition-colors focus:border-brand-purple box-border';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [shipping, setShipping] = useState({ firstName: '', lastName: '', address: '', city: '', state: '', zip: '', country: 'US' });
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '', cvc: '', nameOnCard: '' });

  const shippingCost = totalPrice >= 99 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shippingCost + tax;

  if (items.length === 0 && !orderComplete) {
    return (
      <main className="max-w-screen-xl mx-auto px-5 py-8 text-center py-20">
        <h2 className="text-2xl text-brand-dark mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-brand-purple font-semibold no-underline">Continue Shopping</Link>
      </main>
    );
  }

  if (orderComplete) {
    return (
      <main className="max-w-screen-xl mx-auto px-5 py-8 text-center py-20">
        <span className="text-6xl block mb-4">✅</span>
        <h1 className="text-3xl font-extrabold text-brand-dark mb-2">Order Confirmed!</h1>
        <p className="text-base text-brand-purple font-semibold mb-3">Order ID: {orderId}</p>
        <p className="text-gray-400 mb-8">Thank you for your purchase! You'll receive a confirmation email shortly.</p>
        <div className="flex gap-4 justify-center">
          <Link to="/orders" className="gradient-btn px-8 py-3.5 rounded-xl no-underline font-bold">View Orders</Link>
          <Link to="/products" className="bg-gray-100 text-brand-dark px-8 py-3.5 rounded-xl no-underline font-bold">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  const handleShippingSubmit = (e) => { e.preventDefault(); setStep(2); };
  const handlePaymentSubmit = (e) => {
    e.preventDefault(); setProcessing(true);
    setTimeout(() => {
      setOrderId('ORD-' + Date.now().toString(36).toUpperCase());
      setOrderComplete(true); clearCart(); setProcessing(false);
    }, 2000);
  };

  return (
    <main className="max-w-screen-xl mx-auto px-5 py-8">
      <h1 className="text-2xl font-extrabold text-brand-dark mb-6">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center justify-center gap-4 mb-10" role="navigation" aria-label="Checkout steps">
        <div className={`flex items-center gap-2 text-sm font-semibold ${step >= 1 ? 'text-brand-purple' : 'text-gray-300'}`}>
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'gradient-btn' : 'bg-gray-200 text-gray-400'}`}>1</span>
          <span>Shipping</span>
        </div>
        <div className="w-16 h-0.5 bg-gray-200" />
        <div className={`flex items-center gap-2 text-sm font-semibold ${step >= 2 ? 'text-brand-purple' : 'text-gray-300'}`}>
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'gradient-btn' : 'bg-gray-200 text-gray-400'}`}>2</span>
          <span>Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {step === 1 && (
            <form onSubmit={handleShippingSubmit}>
              <h2 className="text-xl font-extrabold text-brand-dark mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-brand-dark mb-1.5">First Name</label>
                  <input id="firstName" type="text" required value={shipping.firstName} onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-brand-dark mb-1.5">Last Name</label>
                  <input id="lastName" type="text" required value={shipping.lastName} onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-semibold text-brand-dark mb-1.5">Address</label>
                <input id="address" type="text" required value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} className={inputClass} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-brand-dark mb-1.5">City</label>
                  <input id="city" type="text" required value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-semibold text-brand-dark mb-1.5">State</label>
                  <input id="state" type="text" required value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-semibold text-brand-dark mb-1.5">ZIP Code</label>
                  <input id="zip" type="text" required value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} className={inputClass} />
                </div>
              </div>
              <button type="submit" className="w-full py-3.5 gradient-btn rounded-xl text-base font-bold cursor-pointer border-none hover:opacity-90 hover:-translate-y-0.5 transition-all">Continue to Payment</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePaymentSubmit}>
              <h2 className="text-xl font-extrabold text-brand-dark mb-6">Payment Details</h2>
              <div className="bg-brand-purple/5 px-4 py-2.5 rounded-lg text-[13px] text-brand-purple font-semibold mb-5">🔒 Secured by Stripe (Test Mode)</div>
              <div className="mb-4">
                <label htmlFor="nameOnCard" className="block text-sm font-semibold text-brand-dark mb-1.5">Name on Card</label>
                <input id="nameOnCard" type="text" required value={payment.nameOnCard} onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })} className={inputClass} />
              </div>
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-sm font-semibold text-brand-dark mb-1.5">Card Number</label>
                <input id="cardNumber" type="text" required placeholder="4242 4242 4242 4242" value={payment.cardNumber} maxLength={19} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-semibold text-brand-dark mb-1.5">Expiry Date</label>
                  <input id="expiry" type="text" required placeholder="MM/YY" value={payment.expiry} maxLength={5} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-semibold text-brand-dark mb-1.5">CVC</label>
                  <input id="cvc" type="text" required placeholder="123" value={payment.cvc} maxLength={4} onChange={(e) => setPayment({ ...payment, cvc: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="py-3.5 px-6 bg-gray-100 border-none rounded-xl text-[15px] font-semibold cursor-pointer text-gray-500 hover:bg-gray-200 transition-colors">← Back</button>
                <button type="submit" disabled={processing} className="flex-1 py-3.5 gradient-btn rounded-xl text-base font-bold cursor-pointer border-none hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0">
                  {processing ? 'Processing...' : `Pay $${orderTotal.toFixed(2)}`}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-7 shadow-sm sticky top-24">
          <h2 className="text-lg font-extrabold text-brand-dark mb-4">Order Summary</h2>
          <div className="mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2.5 border-b border-gray-100">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-brand-dark">{item.name}</p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between py-2.5 text-[15px] text-gray-500"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
          <div className="flex justify-between py-2.5 text-[15px] text-gray-500"><span>Shipping</span><span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span></div>
          <div className="flex justify-between py-2.5 text-[15px] text-gray-500"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
          <div className="flex justify-between py-4 mt-2 border-t-2 border-gray-100 text-xl font-extrabold text-brand-dark"><span>Total</span><span>${orderTotal.toFixed(2)}</span></div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
