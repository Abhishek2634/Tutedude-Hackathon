'use client';
import React, { useState, useEffect, useCallback } from 'react';

// --- Reusable Components for a Cleaner UI ---

// Component for creating a new order
const CreateOrderForm = () => {
  const [myOrder, setMyOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const availableProduce = [
    { id: 'prod_1', name: 'Potato' },
    { id: 'prod_2', name: 'Onion' },
    { id: 'prod_3', name: 'Tomato' },
    { id: 'prod_4', name: 'Chilies' },
  ];

  const handleUpdateQuantity = (productName, amount) => {
    setMyOrder(prev => ({ ...prev, [productName]: Math.max(0, (prev[productName] || 0) + amount) }));
  };

  const handleSubmitOrder = async () => {
    setIsLoading(true);
    const orderItems = Object.entries(myOrder).filter(([_, qty]) => qty > 0).map(([name, qty]) => ({ product_name: name, quantity_kg: qty }));
    if (orderItems.length === 0) {
      alert("Please add items to your order.");
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          co_op_id: "co-op-123", // Dynamic in a real app
          items: orderItems,
          delivery_date: new Date(new Date().setDate(new Date().getDate() + 7))
        }),
      });
      if (!res.ok) throw new Error('Failed to submit order');
      alert('Your list has been added to the co-op order!');
      setMyOrder({});
    } catch (error) {
      alert('There was an error submitting your order.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create a New Co-op Order</h2>
      <div className="space-y-4">
        {availableProduce.map(product => (
          <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
            <span className="text-lg font-semibold">{product.name}</span>
            <div className="flex items-center gap-4">
              <button onClick={() => handleUpdateQuantity(product.name, -1)} className="font-bold bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-gray-300">-</button>
              <span className="text-lg font-medium w-12 text-center">{myOrder[product.name] || 0} kg</span>
              <button onClick={() => handleUpdateQuantity(product.name, 1)} className="font-bold bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-green-600">+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <button onClick={handleSubmitOrder} disabled={isLoading} className="w-full py-3 text-lg font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400">
          {isLoading ? 'Submitting...' : 'Confirm My List'}
        </button>
      </div>
    </div>
  );
};

// Component to display existing orders
const MyOrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This is the polling function from before, wrapped in useCallback
  const fetchOrders = useCallback(async () => {
    // In a real app, this would be specific to a logged-in user
    const res = await fetch('/api/orders'); 
    if (res.ok) {
      const data = await res.json();
      setOrders(data);
    }
    setIsLoading(false);
  }, []);

  // useEffect now correctly uses the polling logic
  useEffect(() => {
    fetchOrders(); // Fetch once immediately
    const intervalId = setInterval(fetchOrders, 5000); // Then poll every 5 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [fetchOrders]);
  
  const pendingOrders = orders.filter(o => o.status === 'pending_bids');
  const acceptedOrders = orders.filter(o => o.status === 'bid_accepted');

  if (isLoading) return <p className="text-center text-gray-500">Loading my orders...</p>;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">My Submitted Orders</h2>
      {orders.length === 0 ? <p className="text-center text-gray-500">You have not submitted any orders yet.</p> : (
        <div className="space-y-6">
          {/* Section for orders with accepted bids */}
          {acceptedOrders.map(order => (
            <div key={order._id} className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-500">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-bold text-green-800">Winning Bid Accepted!</h3>
                <p className="text-3xl font-bold text-green-700">₹{order.winning_bid.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600">From Supplier ID: {order.winning_bid.supplier_id}</p>
              </div>
            </div>
          ))}
          {/* Section for orders awaiting bids */}
          {pendingOrders.map(order => (
            <div key={order._id} className="bg-white p-6 rounded-xl shadow-lg border">
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <h3 className="font-semibold text-yellow-800">Awaiting Supplier Bids</h3>
                <p className="text-sm text-gray-600">This will update automatically when a bid is accepted.</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


// --- Main Page Component ---
export default function CoOpOrderPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <CreateOrderForm />
      <MyOrdersList />
    </div>
  );
}

