import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../dist/css/main.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [kelas, setKelas] = useState([]);
  const ruangBelajarRef = useRef(null);

  useEffect(() => {
    fetchKelas();
  }, []);

  const fetchKelas = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/kelas');
      setKelas(response.data);
    } catch (error) {
      console.error('Error fetching kelas:', error);
    }
  };

  const handleImageClick = (subject) => {
    navigate(`/ruangbelajar/${subject}`);
  };

  return (
    <div className="">
      <div className="HeroSection container">
        <img src="/heroimg.png" className="img-fluid mt-2 heroImg" alt="..." />
      </div>
      <div>
        {/* RUANG BELAJAR SECTION */}
        <div className="container-fluid RuangBelajarSection" ref={ruangBelajarRef}>
          <div className="container">
            <div className="ruang-belajar">Ruang Belajar</div>
            <div className="container text-center">
              <div className="kelas-section">
                <Row className="mt-5">
                  {kelas.map((item) => (
                    <Col md={3} key={item.id_kelas} onClick={() => handleImageClick(item.nama_kelas)}>
                      <img
                        src={`http://127.0.0.1:5000${item.image}`}
                        alt={item.nama_kelas}
                        className="img-fluid"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/default/image.jpg'; }}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PROFIL TENTOR SECTION */}
      <div className="profilTentorSection">
        <div className="profiltentor container">Profil Tentor</div>
        <div className="container text-center">
          <Row className="mt-5">
            <Col md={3}>
              <div className="cardTentor">
                <img
                  src="/Profil Guru.png"
                  alt="Profil Tentor"
                  className="img-fluid img"
                />
                <div className="textBox1">
                  <p className="text head">PAK TARNO</p>
                  <p className="text price">MATEMATIKA</p>
                  <span className="fs-6">UNIVERSITAS HASANUDDIN</span>
                  <span className="fs-6">UNIVERSITAS HASANUDDIN</span>
                  <span>UNIVERSITAS HASANUDDIN</span>
                </div>
              </div>
            </Col>
            <Col md={3}>
            <div className="cardTentor">
                <img
                  src="/Profil Guru.png"
                  alt="Profil Tentor"
                  className="img-fluid img"
                />
                <div className="textBox1">
                  <p className="text head">PAK TARNO</p>
                  <p className="text price">MATEMATIKA</p>
                  <span className="fs-6">UNIVERSITAS HASANUDDIN</span>
                  <span className="fs-6">UNIVERSITAS HASANUDDIN</span>
                  <span>UNIVERSITAS HASANUDDIN</span>
                </div>
              </div>
            </Col>
            <Col md={3}>
            <div className="cardTentor">
                <img
                  src="/Profil Guru.png"
                  alt="Profil Tentor"
                  className="img-fluid img"
                />
                <div className="textBox1">
                  <p className="text head">PAK TARNO</p>
                  <p className="text price">MATEMATIKA</p>
                  <span className="fs-6">UNIVERSITAS HASANUDDIN</span>
                  <span className="fs-6">UNIVERSITAS HASANUDDIN</span>
                  <span>UNIVERSITAS HASANUDDIN</span>
                </div>
              </div>
            </Col>
            <Col md={3}>
            <div className="cardTentor">
                <img
                  src="/Profil Guru.png"
                  alt="Profil Tentor"
                  className="img-fluid img"
                />
                <div className="textBox1">
                  <p className="text head">PAK TARNO</p>
                  <p className="text price">MATEMATIKA</p>
                  <span className="fs-6">UNIVERSITAS HASANUDDIN</span>
                  <span className="fs-6">UNIVERSITAS HASANUDDIN</span>
                  <span>UNIVERSITAS HASANUDDIN</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
