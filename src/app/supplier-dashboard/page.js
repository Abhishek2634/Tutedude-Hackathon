'use client';

import React, { useState, useEffect } from 'react';

export default function SupplierDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [bids, setBids] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch open orders when the component loads
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
        alert('Could not fetch open orders.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrders();
  }, []);

  // Function to handle bid input changes
  const handleBidChange = (orderId, price) => {
    setBids(prevBids => ({
      ...prevBids,
      [orderId]: price,
    }));
  };

  // Function to handle placing a bid
  const handlePlaceBid = async (orderId) => {
    const price = bids[orderId];
    if (!price || price <= 0) {
      alert("Please enter a valid bid price.");
      return;
    }

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: parseFloat(price),
          // In a real app, supplierId would come from user authentication
          supplierId: '60d5f2f5c7b3c2a4b8f0a3e5', 
        }),
      });

      if (!response.ok) throw new Error('Failed to place bid');

      // If successful, remove the order from the list of open orders
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      alert(`Bid of ₹${price} placed successfully!`);

    } catch (error) {
      console.error(error);
      alert('There was an error placing your bid.');
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading available orders...</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Open Co-op Orders</h1>
      <div className="space-y-6">
        {orders.length > 0 ? orders.map(order => (
          <div key={order._id} className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-blue-600">Co-op ID: {order.co_op_id}</h2>
              <p className="text-sm text-gray-500 font-medium">Delivery by: {new Date(order.delivery_date).toLocaleDateString()}</p>
            </div>
            <ul className="list-disc list-inside space-y-2 my-4 pl-2">
              {order.items.map((item, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-semibold">{item.product_name}:</span> {item.quantity_kg} kg
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <input
                type="number"
                placeholder="Enter your bid price (₹)"
                className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleBidChange(order._id, e.target.value)}
                value={bids[order._id] || ''}
              />
              <button 
                onClick={() => handlePlaceBid(order._id)}
                className="w-full sm:w-1/2 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                Place Bid
              </button>
            </div>
          </div>
        )) : <p className="text-center text-gray-500 mt-10">No open orders available right now.</p>}
      </div>
    </div>
  );
}
