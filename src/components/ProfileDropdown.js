'use client';
import { useState } from 'react';
import Link from 'next/link'; // Import Link

export default function ProfileDropdown({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
        {user.email.charAt(0).toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-semibold">Signed in as</p>
            <p className="text-sm text-gray-700 truncate">{user.email}</p>
          </div>
          <ul className="py-1">
            <li><Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link></li>
            <li><Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link></li>
          </ul>
          <div className="border-t border-gray-100"></div>
          <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
        </div>
      )}
    </div>
  );
}
