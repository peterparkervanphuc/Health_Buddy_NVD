import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, FileText, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', icon: <Home size={20} />, label: 'Tổng quan' },
    { path: '/patients', icon: <Users size={20} />, label: 'Bệnh nhân' },
    { path: '/prescriptions', icon: <FileText size={20} />, label: 'Đơn thuốc' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Cài đặt' },
  ];

  return (
    <div className="h-screen w-64 bg-white shadow-xl flex flex-col z-10">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary">Health Buddy</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-50 text-primary font-semibold'
                : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button className="flex items-center space-x-3 p-3 w-full text-red-500 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;