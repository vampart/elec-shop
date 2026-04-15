import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DEMO_ORDERS = [
  { id: 'ORD-M1X2Y3Z', date: '2026-04-14', status: 'Delivered', total: 479.98, items: [{ name: 'Wireless Noise-Cancelling Headphones', quantity: 1, price: 299.99 }, { name: 'Wireless Earbuds Pro', quantity: 1, price: 199.99 }] },
  { id: 'ORD-A4B5C6D', date: '2026-04-10', status: 'Shipped', total: 1299.99, items: [{ name: 'Laptop Ultra Slim 14"', quantity: 1, price: 1299.99 }] },
  { id: 'ORD-E7F8G9H', date: '2026-04-05', status: 'Processing', total: 349.99, items: [{ name: 'Smart Watch Series X', quantity: 1, price: 349.99 }] },
];

const statusColors = {
  delivered: 'bg-green-500/10 text-green-500',
  shipped: 'bg-cyan-500/10 text-cyan-600',
  processing: 'bg-yellow-400/10 text-yellow-600',
};

const Orders = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="max-w-3xl mx-auto px-5 py-8 text-center py-20">
        <h2 className="text-2xl text-brand-dark mb-4">Sign in to view your orders</h2>
        <Link to="/auth" className="inline-block gradient-btn px-8 py-3.5 rounded-xl no-underline font-bold">Sign In</Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-5 py-8">
      <h1 className="text-2xl font-extrabold text-brand-dark mb-8">My Orders</h1>
      <div className="flex flex-col gap-4">
        {DEMO_ORDERS.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
              <div>
                <span className="block text-base font-bold text-brand-dark">{order.id}</span>
                <span className="text-[13px] text-gray-400">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <span className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold ${statusColors[order.status.toLowerCase()]}`}>
                {order.status}
              </span>
            </div>
            <div className="mb-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between py-2 text-sm text-gray-500">
                  <span>{item.name}</span>
                  <span>x{item.quantity}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="text-right">
              <span className="text-lg font-extrabold text-brand-dark">Total: ${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Orders;
