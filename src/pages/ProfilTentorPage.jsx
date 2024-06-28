import { Col, Row } from "react-bootstrap";

const ProfilTentor = () => {
  return (
    <div>
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
  )
}

export default ProfilTentor