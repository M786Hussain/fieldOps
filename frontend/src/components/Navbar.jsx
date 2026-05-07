import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass m-4 p-4 flex justify-between items-center border border-white/10">
      <h2 className="font-bold text-xl tracking-widest text-blue-400">FIELDOPS</h2>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm opacity-80">
          <UserIcon size={16} />
          <span>{user?.name} <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded uppercase">{user?.role}</span></span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-1.5 hover:bg-red-500/20 rounded-lg transition text-red-400 border border-red-500/20 text-sm font-medium">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
