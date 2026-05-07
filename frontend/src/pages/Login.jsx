import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(res.data.user, res.data.token);
      
      // Role ke hisab se redirect
      if (res.data.user.role === 'Admin') navigate('/admin');
      else if (res.data.user.role === 'Technician') navigate('/tech');
      else navigate('/client');

    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="glass p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Welcome Back</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input type="email" placeholder="Email Address" className="glass-input" 
            onChange={(e) => setEmail(e.target.value)} required />
          
          <input type="password" placeholder="Password" className="glass-input" 
            onChange={(e) => setPassword(e.target.value)} required />
          
          <button type="submit" className="bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-xl font-bold text-white transition-all">
            Login Now
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account? <span onClick={() => navigate('/signup')} className="text-white cursor-pointer hover:underline">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
