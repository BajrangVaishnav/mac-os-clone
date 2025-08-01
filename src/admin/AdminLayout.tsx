// AdminLayout.tsx
import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiSettings,  
  FiMenu, 
  FiX,
  FiUser,
  FiBell
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const logout = async()=>{
        alert('you are sure to logout?');
        const token = localStorage.getItem('access_token');
            try {
              const response = await fetch(`${import.meta.env.VITE_API}auth/logout`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
              });
              const res = await response.json();
              // console.log("res=>>",JSON.stringify({ data }))
              // console.log("res2=>>", res )
        
                  
                  if(res.data === null){
                    // navigate(`/os/${token}`);
                    toast.dismiss();
                    toast.warning(res.message);
                  }else if(res.message === "Invalid token"){
                    navigate("/");
                  }else if(res.message === "Logout successfully"){
                    localStorage.removeItem('access_token');
                    localStorage.setIremoveItemtem('user');
                    navigate("/");
                    alert("navigate ");
                  }
                  
                  navigate("/");
                  
                  
        
            } catch (error) {
              console.error("logout error:", error);
            }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} 
        bg-indigo-800 text-white transition-all duration-300 fixed md:relative z-10
        ${mobileSidebarOpen ? 'block' : 'hidden md:block'}`}
      >
        <div className="p-4 flex justify-between items-center  border-b border-indigo-700 gap-2">
          {sidebarOpen ? (
            <h1 className="text-xs">Admin Panel</h1>
          ) : (
            <h1 className="text-xs">AP</h1>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:block hidden"
          >
            {sidebarOpen ? <FiX size={20} className='text-black'/> : <FiMenu size={20} className='text-black'/>}
          </button>
        </div>
        
        <nav className="mt-6">
          <Link 
            to="/admin" 
            className="flex items-center p-3 hover:bg-indigo-700 transition-colors"
          >
            <FiHome className="mr-3" />
            {sidebarOpen && "Dashboard"}
          </Link>
          <Link 
            to="/admin/users" 
            className="flex items-center p-3 bg-indigo-700 transition-colors"
          >
            <FiUsers className="mr-3" />
            {sidebarOpen && "User Management"}
          </Link>
          <Link 
            to="/admin/settings" 
            className="flex items-center p-3 hover:bg-indigo-700 transition-colors"
          >
            <FiSettings className="mr-3" />
            {sidebarOpen && "Settings"}
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <button 
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden"
          >
            <FiMenu size={20} />
          </button>
          
          <div className="flex items-center justify-end w-full space-x-4">
            <button className='cursor-pointer' onClick={()=>navigate(-1)}>
              Go back
            </button>
            <button className="relative">
              <FiBell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center space-x-2 cursor-pointer" onClick={logout}>
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <FiUser className="text-indigo-800" />
              </div>
              <span className="hidden md:inline">Logout</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;