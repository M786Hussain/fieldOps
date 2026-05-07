import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Client' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://field-ops-inky.vercel.app/api/auth/register', formData);
      alert('Signup Successful! Now Login.');
      navigate('/login');
    } catch (err) {
      alert(err.response.data.msg || 'Signup Failed');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="glass p-8 w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
        
        <input type="text" placeholder="Full Name" className="glass-input" 
          onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        
        <input type="email" placeholder="Email Address" className="glass-input" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        
        <input type="password" placeholder="Password" className="glass-input" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        
        <select className="glass-input bg-gray-900" 
          onChange={(e) => setFormData({...formData, role: e.target.value})}>
          <option value="Client">Client</option>
          <option value="Technician">Technician</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold mt-4 transition">
          Sign Up
        </button>
        <p className="text-sm text-center opacity-70">Already have an account? <span className="cursor-pointer text-blue-400" onClick={() => navigate('/login')}>Login</span></p>
      </form>
    </div>
  );
};

export default Signup;
