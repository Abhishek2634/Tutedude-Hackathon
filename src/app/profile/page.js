'use client';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
      setIsLoading(false);
    }
    fetchUser();
  }, []);

  if (isLoading) return <p>Loading profile...</p>;
  if (!user) return <p>Could not load profile. Please log in.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-500">Email:</span>
          <span className="text-gray-800">{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-500">Role:</span>
          <span className="text-gray-800 capitalize">{user.role}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-500">User ID:</span>
          <span className="text-gray-800 text-sm">{user.userId}</span>
        </div>
      </div>
    </div>
  );
}
