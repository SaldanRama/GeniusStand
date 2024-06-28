import { useEffect, useState } from 'react';
import '../dist/css/profil.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const ProfilUserPage = () => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [originalEmail, setOriginalEmail] = useState(''); // State untuk menyimpan email asli
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [className, setClassName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [domicile, setDomicile] = useState('');
  const [isEmailEditable, setIsEmailEditable] = useState(false); // State untuk mengontrol apakah email dapat diedit
  const [showPasswordModal, setShowPasswordModal] = useState(false); // State untuk mengontrol tampilan modal password
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false); // State untuk mengontrol visibilitas password lama
  const [showNewPassword, setShowNewPassword] = useState(false); // State untuk mengontrol visibilitas password baru
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // Tambahkan state untuk checkbox

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      axios.get('http://localhost:5000/current_user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        const userData = response.data.data;
        setUserId(userData.id);
        setUserName(userData.name || '');
        setEmail(userData.email || '');
        setOriginalEmail(userData.email || ''); // Simpan email asli
        setFullName(userData.full_name || '');
        setBirthDate(userData.birth_date ? new Date(userData.birth_date).toISOString().split('T')[0] : ''); // Konversi tanggal
        setClassName(userData.class_name || '');
        setPhoneNumber(userData.phone_number || '');
        setDomicile(userData.domicile || '');
        console.log("User ID set:", userData.id); // Tambahkan log ini
      })
      .catch(error => {
        console.error("Error fetching user profile", error); // Log error
        if (error.response) {
          console.error("Server responded with status:", error.response.status);
          console.error("Response data:", error.response.data);
        }
        alert('Gagal mengambil profil pengguna');
      });
    }
  }, []);

  const handleSaveChanges = () => {
    if (!isCheckboxChecked) {
      alert('Anda harus menyetujui untuk menerima update informasi dari GeniusStand.');
      return;
    }
    console.log("handleSaveChanges called"); // Tambahkan log ini
    const token = localStorage.getItem('access_token');
    console.log("Token:", token); // Tambahkan log ini
    console.log("User ID:", userId); // Tambahkan log ini
    if (token && userId) {
      const userData = {
        name: userName,
        email: email,
        full_name: fullName,
        birth_date: birthDate,
        class_name: className,
        phone_number: phoneNumber,
        domicile: domicile
      };
      console.log("Data to be sent:", userData); // Tambahkan log ini

      axios.put(`http://localhost:5000/users/${userId}`, userData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => { // Tambahkan parameter response
        console.log('Response:', response); // Tambahkan log ini
        alert('Data berhasil diperbarui');
        if (email !== originalEmail) {
          alert('Email telah diubah, Anda akan logout secara otomatis.');
          setTimeout(() => {
            localStorage.removeItem('access_token');
            window.location.href = '/login'; // Redirect ke halaman login
          }, 3000); // Logout setelah 3 detik
        }
      })
      .catch(error => {
        console.error("Error updating user profile", error); // Log error
        alert('Gagal memperbarui data');
      });
    } else {
      console.error("Token or User ID is missing"); // Tambahkan log ini
    }
  };

  const handleEditEmail = () => {
    setIsEmailEditable(true);
  };

  const handleEditPassword = () => {
    setShowPasswordModal(true);
  };

  const handleChangePassword = () => {
    const token = localStorage.getItem('access_token');
    if (token && userId) {
      axios.put(`http://localhost:5000/users/${userId}`, {
        old_password: oldPassword,
        new_password: newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('Password change response:', response);
        alert('Password berhasil diubah, Anda akan logout secara otomatis.');
        setTimeout(() => {
          localStorage.removeItem('access_token');
          window.location.href = '/login'; // Redirect ke halaman login
        }, 3000); // Logout setelah 3 detik
      })
      .catch(error => {
        console.error("Error changing password", error);
        alert('Gagal mengubah password');
      });
    } else {
      console.error("Token or User ID is missing");
    }
  };

  return (
    <div>
      <div className="container profil-section">
        <div className="welcome text-center mt-5">
          <h3>Welcome, <span>{userName}!</span></h3>
          <p>Informasi mengenai profil dan status kamu di seluruh layanan GeniusStand.</p>
        </div>

        <div className="row mt-5 offset-2">
          <div className="col-10">  
            <form>
              <div className="input_container">
                <label className="input_label" htmlFor="full_name_field">Nama Lengkap</label>
                <input
                  placeholder="Nama Lengkap User"
                  type="text"
                  className="input_field"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </form>

            <div className="row">
              <div className="col-6">
                <form>
                  <div className="input_container">
                    <label className="input_label" htmlFor="birth_date_field">Tanggal Lahir</label>
                    <input placeholder="dd/mm/yyyy" type="date" className="input_field" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                  </div>
                </form>
              </div>

              <div className="col-6">
                <form>
                  <div className="input_container">
                    <label className="input_label" htmlFor="class_name_field">Kelas</label>
                    <input placeholder="12" type="text" className="input_field" value={className} onChange={(e) => setClassName(e.target.value)} />
                  </div>
                </form>
              </div>   
            </div>

            <div className="row">
              <div className="col-6">
                <form>
                  <div className="input_container">
                    <label className="input_label" htmlFor="phone_number_field">No.Hp</label>
                    <input placeholder="08123456789" type="text" className="input_field" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  </div>
                </form>
              </div>

              <div className="col-6">
                <form>
                  <div className="input_container">
                    <label className="input_label" htmlFor="domicile_field">Domisili</label>
                    <input placeholder="Perdos Unhas" type="text" className="input_field" value={domicile} onChange={(e) => setDomicile(e.target.value)} />
                  </div>
                </form>
              </div>   
            </div>
          </div> {/* Tutup div col-10 */}
        </div> {/* Tutup div row mt-5 offset-2 */}
        <div className="row offset-2">
          <div className="col-10">
            <form>
              <div className="input_container">
                <label className="input_label" htmlFor="email_field">Email</label>
                <input
                  placeholder="useremail@gmail.com"
                  type="text"
                  className="input_field"
                  value={email}
                  onChange={(e) => isEmailEditable ? setEmail(e.target.value) : null}
                  disabled={!isEmailEditable} // Disable input jika isEmailEditable false
                />
              </div>
            </form>
          </div>
        </div>
        
        <div className="row offset-2">
          <div className="col-10 d-flex justify-content-between ">
            <div className="tombol-1">
              <button onClick={handleEditEmail}>
                Ubah Email
              </button>
              <button onClick={handleEditPassword}>
                Ubah Password
              </button>
            </div>
            <div className="tombol-2">
              <button type="button" onClick={handleSaveChanges}>
                Simpan Perubahan
              </button>
            </div>
          </div>

          <div className="input_container mt-3">
            <div className="cntr d-flex">
              <input 
                type="checkbox" 
                id="cbx1" 
                className="hidden-xs-up"
                checked={isCheckboxChecked} // Bind state ke checkbox
                onChange={(e) => setIsCheckboxChecked(e.target.checked)} // Update state saat checkbox berubah
              />
              <label htmlFor="cbx1" className="cbx"></label>
              <p className='ms-2'>Saya bersedia menerima update informasi dari GeniusStand</p>
            </div>
          </div>
        </div>
      </div> {/* Tutup div container */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Ubah Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="input_container">
                <label className="input_label" htmlFor="old_password_field">Password Lama</label>
                <input
                  placeholder="Password Lama"
                  type={showOldPassword ? "text" : "password"}
                  className="input_field"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <span 
                  className="show_password" 
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? "🙈" : "👁️"}
                </span>
              </div>
              <div className="input_container">
                <label className="input_label" htmlFor="new_password_field">Password Baru</label>
                <input
                  placeholder="Password Baru"
                  type={showNewPassword ? "text" : "password"}
                  className="input_field"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span 
                  className="show_password" 
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
              Batal
            </Button>
            <Button variant="danger" onClick={handleChangePassword}>
              Simpan Password Baru
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}
export default ProfilUserPage;
