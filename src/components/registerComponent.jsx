import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../dist/css/main.css'; // Pastikan Anda telah mengimpor file CSS untuk style UI

const RegisterComponent = () => {
    const [name, setName] = useState(''); // Tambahkan baris ini
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            alert('Semua field harus diisi.');
            return;
        }
        if (password !== confirmPassword) {
            alert("Password dan Konfirmasi Password tidak cocok");
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:5000/createadmin', {
                name: name,
                email: email,
                password: password
            });
            alert(response.data.message);
            navigate('/login');  // Navigasi ke halaman login setelah berhasil registrasi
        } catch (error) {
            alert(error.response ? error.response.data.message : 'Failed to register');
        }
    };

    const handleLoginClick = () => {
        navigate('/login');  // Navigasi ke halaman login
    };

    return (
        <div className="containerLogin">
            <div className="form_container">
                <div className="logo_container">
                    <img src="../src/assets/img/LOGOREGIS.png" alt="Logo" />
                </div>
                <div className="form_section">
                    <div className="title_container">
                        <p className="title">Buat Akun GeniusStand</p>
                        <span className="subtitle">Silahkan isi form berikut untuk melanjutkan.</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input_containerRegister">
                            <label className="input_label" htmlFor="name_field">Nama</label>
                            <input
                                placeholder="Nama"
                                title="Nama"
                                name="input-name"
                                type="text"
                                className="input_field"
                                id="name_field"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input_containerRegister">
                            <label className="input_label" htmlFor="email_field">Email</label>
                            <input
                                placeholder="Email"
                                title="Email"
                                name="input-email"
                                type="text"
                                className="input_field"
                                id="email_field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input_containerRegister">
                            <label className="input_label" htmlFor="password_field">Password</label>
                            <input
                                placeholder="Password"
                                title="Password"
                                name="input-password"
                                type={showPassword ? "text" : "password"}
                                className="input_field"
                                id="password_field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                             />
                            <span 
                                className="show_password" 
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                        <div className="input_containerRegister">
                            <label className="input_label" htmlFor="confirm_password_field">Konfirmasi Password</label>
                            <input
                                placeholder="Konfirmasi Password"
                                title="Konfirmasi Password"
                                name="input-confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                className="input_field"
                                id="confirm_password_field"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <span 
                                className="show_password" 
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                        <div className="cntr d-flex">
                        <input type="checkbox" id="cbx1" className="hidden-xs-up"/>
                        <label htmlFor="cbx1" className="cbx"></label>
                        <p className='ms-2'>Saya bersedia menerima update informasi dari GeniusStand</p>
                      </div>
                        <button type="submit" className="sign_in_buttonRegis">Daftar</button>
                    </form>
                    <span className="register_prompt">
                        <span>Sudah memiliki akun?</span>
                        <a onClick={handleLoginClick} className="register_link">Masuk</a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
