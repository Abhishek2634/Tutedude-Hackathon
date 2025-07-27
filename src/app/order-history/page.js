'use client';
import { useEffect, useState } from 'react';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // We update the GET /api/orders route to accept a status query
    async function fetchHistory() {
      const res = await fetch('/api/orders?status=delivered');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
      setIsLoading(false);
    }
    fetchHistory();
  }, []);
  
  if (isLoading) return <p>Loading order history...</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Order History</h1>
      <div className="space-y-4">
        {orders.length > 0 ? orders.map(order => (
          <div key={order._id} className="bg-white p-4 rounded-lg shadow-md border">
            <p>Order ID: {order._id}</p>
            <p>Date: {new Date(order.order_date).toLocaleDateString()}</p>
            <p>Final Price: ₹{order.winning_bid.price}</p>
          </div>
        )) : <p>You have no completed orders.</p>}
      </div>
    </div>
  );
}
