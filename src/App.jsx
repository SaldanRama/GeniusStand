import NavbarComponent from "./components/NavbarComponent";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import KelasPage from "./pages/kelasPage"; // Perbaiki jalur impor
import ProfilTentorPage from "./pages/ProfilTentorPage";
import RuangBelajarPage from "./pages/RuangBelajarPage";
import TentangKamiPage from "./pages/TentangKamiPage";
import LoginComponent from "./components/LoginComponent";
import FooterComponent from "./components/FooterComponent";
import RegisterComponent from "./components/registerComponent";
import ProfilUserPage from "./pages/ProfilUserPage"
import { MapelDetailPage } from "./pages/MapelDetailPage";
import AdminDashboardPage from "./pages/AdminDashboardPage"; // Import komponen dashboard admin

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div>
      {!isAuthPage && !isAdminPage && <NavbarComponent />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilUserPage />} />
        <Route path="/ruangbelajar" element={<RuangBelajarPage />} />
        <Route path="/Kelas" element={<KelasPage />} />
        <Route path="/ruangbelajar/:subject" element={<RuangBelajarPage />} />
        <Route path="/mapeldetail/:subject/:materi" element={<MapelDetailPage />} />
        <Route path="/profiltentor" element={<ProfilTentorPage />} />
        <Route path="/tentangkami" element={<TentangKamiPage />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/admin/*" element={<AdminDashboardPage />} />
      </Routes>

      {!isAuthPage && !isAdminPage  && <FooterComponent /> }
    </div>
  );
}

export default App;
