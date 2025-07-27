'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

// Reusable input component for a cleaner form
const Input = ({ name, type, placeholder, value, onChange }) => (
  <input 
    name={name} 
    type={type} 
    placeholder={placeholder} 
    value={value} 
    onChange={onChange} 
    required 
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500" 
  />
);

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'vendor', phone_number: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isLoginView ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'An error occurred.');
      
      toast.success(isLoginView ? 'Logged in successfully!' : 'Registration successful!');
      onSuccess(); // Signal success to the parent layout to refresh user state
      
    } catch (err) {
      toast.error(err.message); // Use toast for errors too
      setError(err.message);
    }
  };

  const handleSwitchView = () => {
    setIsLoginView(!isLoginView);
    setError('');
    // Reset form fields when switching views
    setFormData({ name: '', email: '', password: '', role: 'vendor', phone_number: '' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-3xl font-bold text-center mb-6">{isLoginView ? 'Welcome Back' : 'Create an Account'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && <Input name="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleInputChange} />}
          <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
          {!isLoginView && <Input name="phone_number" type="tel" placeholder="Phone Number" value={formData.phone_number} onChange={handleInputChange} />}
          <Input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
          {!isLoginView && (
            <select name="role" value={formData.role} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md">
              <option value="vendor">I am a Vendor</option>
              <option value="supplier">I am a Supplier</option>
            </select>
          )}
          
          <button type="submit" className="w-full py-3 text-lg font-bold bg-green-600 text-white rounded-lg hover:bg-green-700">
            {isLoginView ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
        
        <div className="text-center mt-6">
          <button onClick={handleSwitchView} className="text-green-600 hover:underline">
            {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}
