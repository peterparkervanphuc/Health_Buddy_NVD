import React, { useState, useRef } from 'react';
import { Upload, Eye, Trash2, Search, FileText, X, UploadCloud, FileImage, XCircle } from 'lucide-react';

const Prescriptions = () => {
  // --- 1. KHU VỰC KHAI BÁO STATE & HOOKS (Tuyệt đối không để trong return) ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [prescriptions, setPrescriptions] = useState([
    { id: 1, patientName: 'Nguyễn Thế Công', diagnosis: 'Viêm phế quản cấp', date: '2026-03-10', status: 'Đã số hóa' },
    { id: 2, patientName: 'Trần Thị B', diagnosis: 'Tăng huyết áp', date: '2026-03-09', status: 'Đã số hóa' },
    { id: 3, patientName: 'Lê Văn C', diagnosis: 'Tiểu đường tuýp 2', date: '2026-03-08', status: 'Chờ xử lý' },
  ]);

  // --- 2. KHU VỰC KHAI BÁO HÀM ---
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- 3. KHU VỰC GIAO DIỆN (JSX) ---
  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quản lý Đơn thuốc</h2>
          <p className="text-gray-500 text-sm mt-1">Xem và số hóa các đơn thuốc từ hình ảnh</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
        >
          <Upload size={20} />
          <span>Tải đơn thuốc lên (AI OCR)</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Tìm kiếm theo tên bệnh nhân hoặc chẩn đoán..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-gray-600">ID</th>
              <th className="p-4 font-semibold text-gray-600">Bệnh nhân</th>
              <th className="p-4 font-semibold text-gray-600">Chẩn đoán</th>
              <th className="p-4 font-semibold text-gray-600">Ngày tạo</th>
              <th className="p-4 font-semibold text-gray-600">Trạng thái</th>
              <th className="p-4 font-semibold text-gray-600 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-500">#{p.id}</td>
                <td className="p-4 font-medium text-gray-800">{p.patientName}</td>
                <td className="p-4 text-gray-600">{p.diagnosis}</td>
                <td className="p-4 text-gray-600">{p.date}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${p.status === 'Đã số hóa' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="p-4 flex justify-center space-x-3">
                  <button className="text-blue-500 hover:text-blue-700"><Eye size={18} /></button>
                  <button className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[500px] shadow-2xl relative">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-6">Tải lên Đơn thuốc mới</h3>
            
            <div 
              onClick={handleBoxClick}
              className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                selectedFile ? 'border-green-400 bg-green-50' : 'border-blue-300 bg-blue-50 hover:bg-blue-100 group'
              }`}
            >
               {!selectedFile ? (
                 <>
                   <UploadCloud size={56} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
                   <p className="text-gray-700 font-medium text-lg">Click để chọn file ảnh</p>
                   <p className="text-gray-500 text-sm mt-1">Hỗ trợ JPG, PNG</p>
                 </>
               ) : (
                 <div className="flex flex-col items-center text-center">
                   <FileImage size={56} className="text-green-500 mb-3" />
                   <p className="text-gray-800 font-medium truncate max-w-[250px]">{selectedFile.name}</p>
                   <p className="text-gray-500 text-sm mb-4">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                   <button 
                     onClick={handleRemoveFile}
                     className="flex items-center text-red-500 hover:text-red-700 bg-white px-3 py-1 rounded-full shadow-sm border"
                   >
                     <XCircle size={16} className="mr-1" /> Gỡ ảnh
                   </button>
                 </div>
               )}
               <input 
                 type="file" 
                 className="hidden" 
                 accept="image/png, image/jpeg, image/jpg" 
                 ref={fileInputRef}
                 onChange={handleFileChange}
               />
            </div>

            <div className="mt-8 flex justify-end space-x-3">
               <button onClick={handleCloseModal} className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                 Hủy
               </button>
               <button 
                 disabled={!selectedFile}
                 className={`px-5 py-2.5 rounded-lg font-medium flex items-center shadow-sm transition-colors ${
                   selectedFile ? 'bg-primary text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                 }`}
               >
                 <Upload size={18} className="mr-2" />
                 Bắt đầu bóc tách AI
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;