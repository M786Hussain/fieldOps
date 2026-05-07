import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Briefcase, User, Clock } from 'lucide-react';

import CreateJobModal from '../components/CreateJobModal';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/jobs', {
        headers: { 'x-auth-token': token }
      });
      setJobs(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <Navbar /> 
      
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Overview</h1>
            <p className="text-gray-400 text-sm">Manage and track all field service jobs</p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)} // Modal open karne ke liye
            className="bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-xl flex items-center gap-2 transition-all active:scale-95 text-white font-semibold"
          >
            <Plus size={20} /> Create New Job
          </button>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-gray-400">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-gray-500 italic">No jobs found. Create one to get started!</p>
          ) : (
            jobs.map(job => (
              <div key={job._id} className="glass p-6 rounded-2xl flex flex-col gap-4 border border-white/5">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-white tracking-tight">{job.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest ${
                    job.status === 'Completed' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 
                    job.status === 'In-Progress' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' :
                    'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20'
                  }`}>
                    {job.status}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                  {job.description || "No description provided."}
                </p>
                
                <div className="border-t border-white/10 pt-4 mt-2 flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="p-2 bg-white/5 rounded-lg text-gray-400"><User size={14} /></div>
                    <span><strong className="text-gray-500">Client:</strong> {job.client?.name || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="p-2 bg-white/5 rounded-lg text-gray-400"><Briefcase size={14} /></div>
                    <span><strong className="text-gray-500">Tech:</strong> {job.technician?.name || 'Unassigned'}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        
        <CreateJobModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onJobCreated={fetchJobs} 
        />
      </div>
    </>
  );
};

export default AdminDashboard;
