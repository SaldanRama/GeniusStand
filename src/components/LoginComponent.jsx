import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../dist/css/main.css'; // Pastikan Anda telah mengimpor file CSS untuk style UI

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
                email: email,
                password: password
            });

            const { access_token } = response.data.data;

            // Simpan token ke localStorage
            localStorage.setItem('access_token', access_token);

            // Navigasi ke HomePage
            navigate('/');
        } catch (error) {
            console.error("Login failed:", error);
            alert(error.response ? error.response.data.message : "Login failed");
        }
    };

    // Event handler untuk navigasi ke halaman Register
    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className="containerLogin">
            <div className="form_container">
                <div className="logo_container">
                    <img src="../src/assets/img/SIDE LOGO.png" alt="Logo" />
                </div>
                <div className="form_section">
                    <div className="title_container">
                        <p className="title">Masuk ke GeniusStand</p>
                        <span className="subtitle">Silahkan masukkan informasi akun kamu.</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input_container">
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
                        <div className="input_container">
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
                        <div className="input_container">
                        <div className="cntr d-flex">
                            <input type="checkbox" id="cbx1" className="hidden-xs-up ]"/>
                            <label htmlFor="cbx1" className="cbx"></label>
                            <p className='ms-2'>ingat saya</p>
                            <a href="#" className="forgot_password ms-auto">Lupa password?</a>
                        </div>
                        </div>
                        <button type="submit" className="sign_in_button">Masuk</button>
                    </form>
                    <span className="register_prompt">
                        <span>Belum memiliki akun?</span>
                        <a onClick={handleRegisterClick} className="register_link">Daftar Sekarang</a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
