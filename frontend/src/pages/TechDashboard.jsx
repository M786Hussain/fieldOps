import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { CheckCircle, Clock } from 'lucide-react';

const TechDashboard = () => {
  const [jobs, setJobs] = useState([]);

  const fetchMyJobs = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/jobs', {
      headers: { 'x-auth-token': token }
    });
    setJobs(res.data);
  };

  useEffect(() => { fetchMyJobs(); }, []);

  const updateStatus = async (id, newStatus) => {
    const token = localStorage.getItem('token');
    await axios.patch(`http://localhost:5000/api/jobs/${id}/status`, 
      { status: newStatus }, 
      { headers: { 'x-auth-token': token }}
    );
    fetchMyJobs(); // List update karein
  };

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Technician Portal</h1>
        <div className="grid gap-6">
          {jobs.length === 0 ? (
            <div className="glass p-10 text-center text-gray-500">Abhi tak aapko koi job assign nahi hui.</div>
          ) : jobs.map(job => (
            <div key={job._id} className="glass p-6 rounded-2xl flex justify-between items-center border border-white/5">
              <div>
                <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                <p className="text-gray-400 text-sm">{job.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Status: {job.status}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => updateStatus(job._id, 'In-Progress')} className="bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-xl border border-yellow-500/20 hover:bg-yellow-500/20 transition flex items-center gap-2">
                  <Clock size={16} /> Start
                </button>
                <button onClick={() => updateStatus(job._id, 'Completed')} className="bg-green-500/10 text-green-400 px-4 py-2 rounded-xl border border-green-500/20 hover:bg-green-500/20 transition flex items-center gap-2">
                  <CheckCircle size={16} /> Finish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default TechDashboard;
