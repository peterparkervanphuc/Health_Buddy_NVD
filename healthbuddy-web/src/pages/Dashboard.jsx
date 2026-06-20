import React from 'react';
import { Users, FileText, AlertCircle } from 'lucide-react';

const StatCard = ({ title, value, icon, bgColor, textColor }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
    <div className={`p-4 rounded-full ${bgColor} ${textColor}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* 3 Thẻ thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Tổng Bệnh Nhân" 
          value="1,248" 
          icon={<Users size={24} />} 
          bgColor="bg-blue-100" textColor="text-blue-600"
        />
        <StatCard 
          title="Đơn Thuốc Đang Quản Lý" 
          value="432" 
          icon={<FileText size={24} />} 
          bgColor="bg-green-100" textColor="text-green-600"
        />
        <StatCard 
          title="Cảnh Báo Quên Liều" 
          value="12" 
          icon={<AlertCircle size={24} />} 
          bgColor="bg-red-100" textColor="text-red-600"
        />
      </div>

      {/* Khu vực nội dung trống để mở rộng sau */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Hoạt động gần đây</h3>
        <p className="text-gray-500 text-sm">Chưa có dữ liệu mới trong ngày hôm nay.</p>
      </div>
    </div>
  );
};

export default Dashboard;