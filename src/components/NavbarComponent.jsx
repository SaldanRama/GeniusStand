  import { useState, useEffect } from 'react';
  import { Navbar, Container, Nav, NavLink as BootstrapNavLink, NavDropdown } from "react-bootstrap";
  import { NavLink, useNavigate } from "react-router-dom";
  import { navLinks } from "../data/index";
  import logo from '../assets/img/LOGO 1.png'; // Pastikan Anda memiliki logo di folder assets
  import axios from 'axios'; // Tambahkan axios untuk melakukan request ke backend
  import "../dist/css/main.css";

  const NavbarComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      // Cek local storage untuk status login
      const token = localStorage.getItem('access_token');
      if (token) {
        axios.get('http://localhost:5000/current_user', { // Pastikan URL sudah benar
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          setIsLoggedIn(true);
          setUser(response.data.data); // Pastikan response data diterima dengan benar
        })
        .catch(error => {
          console.error("Error fetching user data", error);
        });
      }
    }, []);

    const handleSignUp = () => {
      navigate('/login');
    };

    const handleLogout = () => {
      localStorage.removeItem('access_token');
      setIsLoggedIn(false);
      setUser(null);
      navigate('/');
    };

    return (
      <div>
        <Navbar expand="lg" className="navigation">
          <Container>
            <Navbar.Brand href="/">
              <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
              <span style={{ color: 'black', fontWeight: 'bold' }}>GENIUS</span>
              <span style={{ color: '#C80E0E', fontWeight: 'bold' }}>STAND</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                {navLinks.map((link) => (
                  <BootstrapNavLink
                    className="nav-link"
                    key={link.id}
                    as={NavLink}
                    to={link.path}
                    style={{ color: '#393939', margin: '0 10px' }}
                  >
                    {link.text}
                  </BootstrapNavLink>
                ))}
              </Nav>

              <div>
                {isLoggedIn ? (
                <NavDropdown
                className="custom-dropdown"
                title={<img src={logo} alt="Avatar" style={{ height: '40px', borderRadius: '50%' }} />}
                id="basic-nav-dropdown"
                align="end" // Mengatur posisi dropdown ke kanan
              >
                <div className="input">
                  <div className="text-light value">
                    <strong>{user?.name}</strong><br />
                    <small>{user?.email}</small>
                  </div>
                  <button className="value d-flex" onClick={() => navigate('/profile')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                    Profile
                  </button>
                  <button className="value d-flex" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i>
                    Logout
                  </button>
                </div>
              </NavDropdown>
                  
                ) : (
                  <button
                    onClick={handleSignUp}
                    style={{
                      border: '1px solid #C80E0E',
                      padding: '8px 12px',
                      backgroundColor: 'transparent',
                      color: 'black',
                      borderRadius: '5px',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  };

  export default NavbarComponent;
