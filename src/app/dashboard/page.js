'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Reusable card component for the dashboard
const DashboardCard = ({ title, description, link, icon }) => (
  <Link href={link} className="block bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border">
    <div className="flex items-center gap-4 mb-2">
      <div className="bg-green-100 text-green-700 p-2 rounded-full">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </Link>
);

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data to display a personalized welcome message
    async function fetchUser() {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setUser(data.user);
    }
    fetchUser();
  }, []);

  const commonCards = [
    { title: "My Profile", description: "View and manage your account details.", link: "/profile", icon: '👤' },
    { title: "Order History", description: "Browse your past completed orders.", link: "/order-history", icon: '📜' }
  ];

  const vendorCards = [
    { title: "Create New Order", description: "Add items to your co-op's list.", link: "/co-op-order", icon: '🛒' },
    ...commonCards
  ];

  const supplierCards = [
    { title: "View Open Orders", description: "See available orders to bid on.", link: "/supplier-dashboard", icon: ' BID ' },
    ...commonCards
  ];
  
  const cards = user?.role === 'vendor' ? vendorCards : supplierCards;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to your Dashboard{user ? `, ${user.email}` : ''}!</h1>
      <p className="text-gray-600 mb-8">Here's a quick overview of your account.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map(card => <DashboardCard key={card.title} {...card} />)}
      </div>
    </div>
  );
}
