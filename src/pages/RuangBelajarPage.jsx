import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../dist/css/rb.css";

const RuangBelajarDetail = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [materi, setMateri] = useState({});
  const [topik, setTopik] = useState([]); // Ubah state topik menjadi array

  useEffect(() => {
    fetch('http://localhost:5000/mapel')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          const filteredData = data.data.filter(item => item.nama_mata_pelajaran === subject);
          const topikList = [...new Set(filteredData.map(item => item.topik))]; // Ekstrak properti 'topik' dan hilangkan duplikat
          setTopik(topikList);

          const materiByTopik = topikList.reduce((acc, topik) => {
            acc[topik] = filteredData.filter(item => item.topik === topik).map(item => item.materi);
            return acc;
          }, {});
          setMateri(materiByTopik); // Set materi sebagai objek yang dikelompokkan berdasarkan topik
        } else {
          console.error('Data fetched is not an array:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [subject]);

  const gambarMap = {
    Matematika: "/MatematikaDetail.png",
    Fisika: "/FisikaDetail.png",
    Kimia: "/KimiaDetail.png",
    Biologi: "/BiologiDetail.png",
    "Bahasa Indonesia": "/BahasaDetail.png",
    "Bahasa Inggris": "/InggrisDetail.png",
    "Pendidikan Agama": "/AgamaDetail.png",
    "Pendidikan Jasmani": "/PenjasDetail.png",

    // Tambahkan gambar untuk mata pelajaran lainnya
  };

  const handleTontonVideo = (materi) => {
    navigate(`/mapeldetail/${subject}/${encodeURIComponent(materi)}`);
  };

  return (
    <div className="RuangBelajarDetail">
      <div className="container text-center mt-5">
        <div className="row">
          <div className="col-sm-3 me-5">
            <img
              src={gambarMap[subject]}
              alt="Pelajaran Detail Gambar"
              className="detail-image"
            />
          </div>
          <div className="col-sm-7 detail-section ms-5">
            <div className="NamaMapel">{subject}</div>
            <div className="DetailIsi d-flex">
              <div className="topik d-flex align-items-center justify-content-center  me-3">
                <img src="/Open Book.png" alt="" className="me-2" />
                <p>4 Topik</p>
              </div>
              <div className="materi d-flex align-items-center justify-content-center">
                <img src="/Stack Of Paper.png" alt="" className="me-2" />
                <p>40 Materi</p>
              </div>
            </div>
            <div className="deskripsiMapel text-start mt-5">
              <p>
              🎯 Yuk, gabung dan pelajari banyak materi tentang {subject} yang keren abis! Dari dasar sampai advance, semua materi disusun rapi dan gampang dipahami. Ditambah lagi, banyak tips & trik dalam mengerjakan soal latihan yang interaktif dan pembahasan mendalam yang bikin kamu makin jago {subject}. Ayo, jadikan belajar {subject} seru dan penuh tantangan bareng #GENIUSSTAND. Siap-siap jadi master {subject}, yuk!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MATERI */}
      <div className="materiSection mt-5">
        <div className="container">
          {Array.isArray(topik) && topik.map((topikItem, index) => (
            <div key={index}>
              <h3 className="NamaTopik">{topikItem}</h3> {/* Tampilkan topik */}
              <div className="row align-items-start mt-5">
                {materi[topikItem] && materi[topikItem].map((materiItem, materiIndex) => (
                  <div className="col" key={materiIndex}>
                    <div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded" style={{ width: "351px" }}>
                      <img
                        src="/Thumbnail.png"
                        className="card-img-top mt-2 px-2"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title fw-bold">{materiItem}</h5> {/* Tampilkan materi */}
                        <p className="card-text">
                          <img src="/view.png" alt="" />
                        </p>
                        <button className="button" onClick={() => handleTontonVideo(materiItem)}> Tonton video</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* END MATERI */}
    </div>
  );
};

export default RuangBelajarDetail;
