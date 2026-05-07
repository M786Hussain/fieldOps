import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateJobModal = ({ isOpen, onClose, onJobCreated }) => {
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    clientId: '', 
    technicianId: '', 
    scheduledDate: '' 
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://field-ops-inky.vercel.app/api/auth/users', { 
          headers: { 'x-auth-token': token } 
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    if (isOpen) fetchUsers();
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientId) return alert("Please select a client!");
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://field-ops-inky.vercel.app/api/jobs', formData, { 
        headers: { 'x-auth-token': token } 
      });
      
      setFormData({ title: '', description: '', clientId: '', technicianId: '', scheduledDate: '' });
      onJobCreated();
      onClose();
    } catch (err) { 
      alert("Error creating job"); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="glass p-8 w-full max-w-md border border-white/20">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">New Job Request</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          
          <input 
            type="text" 
            placeholder="Job Title" 
            className="glass-input" 
            required 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
          />

          
          <textarea 
            placeholder="Detailed description of the task..." 
            className="glass-input h-24" 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          
          
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-blue-400 font-bold ml-1 uppercase">Client *</label>
            <select 
              className="p-3 rounded bg-gray-800 text-white outline-none" 
              required 
              value={formData.clientId}
              onChange={(e) => setFormData({...formData, clientId: e.target.value})}
            >
              <option value="">-- Select Client --</option>
              {users.map(u => (
                u.role.toLowerCase() === 'client' && <option key={u._id} value={u._id}>{u.name}</option>
              ))}
            </select>
          </div>

          
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-blue-400 font-bold ml-1 uppercase">Technician</label>
            <select 
              className="p-3 rounded bg-gray-800 text-white outline-none" 
              value={formData.technicianId}
              onChange={(e) => setFormData({...formData, technicianId: e.target.value})}
            >
              <option value="">-- Assign Technician --</option>
              {users.map(u => (
                u.role.toLowerCase() === 'technician' && <option key={u._id} value={u._id}>{u.name}</option>
              ))}
            </select>
          </div>

          <input 
            type="datetime-local" 
            className="glass-input" 
            value={formData.scheduledDate}
            onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})} 
          />
          
          <div className="flex gap-2 mt-2">
            <button type="button" onClick={onClose} className="flex-1 p-3 border border-white/10 rounded text-gray-300 hover:bg-white/5">Cancel</button>
            <button type="submit" className="flex-1 p-3 bg-blue-600 rounded font-bold text-white hover:bg-blue-700">Confirm Job</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;
