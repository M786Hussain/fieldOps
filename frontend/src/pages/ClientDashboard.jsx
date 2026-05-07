import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ClientDashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchMyRequests = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://field-ops-inky.vercel.app/api/jobs', {
        headers: { 'x-auth-token': token }
      });
      setJobs(res.data);
    };
    fetchMyRequests();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">My Service Status</h1>
        <div className="grid gap-6">
          {jobs.length === 0 ? (
            <div className="glass p-10 text-center text-gray-500">Aapki koi service request maujood nahi hai.</div>
          ) : jobs.map(job => (
            <div key={job._id} className="glass p-6 rounded-2xl border-l-4 border-blue-500 bg-white/5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{job.description}</p>
                </div>
                <span className="bg-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-blue-500/20">
                  {job.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ClientDashboard;
