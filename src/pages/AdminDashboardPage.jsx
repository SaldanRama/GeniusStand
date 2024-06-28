import { Routes, Route } from 'react-router-dom';
import SidebarComponent from '../components/SidebarComponent';
import UserComponent from '../components/UserComponent';
import MataPelajaranComponent from '../components/MataPelajaranComponent';
import TentorComponent from '../components/TentorComponent';
import KelasComponent from '../components/KelasComponent';
import '../dist/css/AdminDashboardPage.css';

const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard">
      <SidebarComponent />
      <div className="content">
        <Routes>
          <Route path="users" element={<UserComponent />} />
          <Route path="kelas" element={<KelasComponent />} />
          <Route path="matapelajaran" element={<MataPelajaranComponent />} />
          <Route path="tentor" element={<TentorComponent />} />
          <Route path="dashboard" element={<h1>Selamat datang di dashboard admin. Di sini Anda dapat mengelola data aplikasi.</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
