import  { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import axios from "axios";

export const KelasPage = () => { // Changed function name to KelasPage
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
    <div>   {/* RUANG BELAJAR SECTION */}
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
  );
};


export default KelasPage;