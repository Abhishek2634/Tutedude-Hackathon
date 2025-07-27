'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... login logic similar to register ...
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border rounded-xl shadow-lg bg-white">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields for email, password */}
        {/* ... form implementation ... */}
        <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">Log In</button>
      </form>
      <div className="text-center mt-4">
        <Link href="/forgot-password" className="text-sm text-gray-500 hover:underline">Forgot Password?</Link>
      </div>
    </div>
  );
}
