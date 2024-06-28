// MapelDetailPage.jsx

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../dist/css/main.css';
import PropTypes from 'prop-types'; // Tambahkan impor ini

export const MapelDetailPage = () => {
  const [userId, setUserId] = useState(null); // Tambahkan state untuk userId
  const { subject, materi } = useParams(); // Mengambil subject dan materi dari URL
  const [videoSrc, setVideoSrc] = useState('');
  const [materiDetail, setMateriDetail] = useState(''); // Ganti nama variabel ini
  const [namaMapelDetail, setNamaMapelDetail] = useState('');
  const [relatedSubjects, setRelatedSubjects] = useState([]); // Tambahkan state baru
  const [checkedItems, setCheckedItems] = useState({});

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

  useEffect(() => {
    if (userId) {
      console.log('Subject:', subject); // Tambahkan log ini
      console.log('Materi:', materi); // Tambahkan log ini

      axios.get('http://localhost:5000/mapel')
        .then(response => {
          const data = response.data.data;
          console.log('Data fetched:', data); // Tambahkan log ini
          const mapel = data.find(item => item.materi === decodeURIComponent(materi) && item.nama_mata_pelajaran === subject);
          if (mapel) {
            console.log('Mapel found:', mapel); // Tambahkan log ini
            setVideoSrc(mapel.link_video);
            setMateriDetail(mapel.materi); // Gunakan variabel yang baru
            setNamaMapelDetail(mapel.topik); // Tambahkan ini

            // Filter subjects with the same topic
            const related = data.filter(item => item.topik === mapel.topik);
            setRelatedSubjects(related); // Simpan data yang relevan

            // Load checked items for the current user and topic
            const savedCheckedItems = localStorage.getItem(`checkedItems-${userId}-${mapel.topik}`);
            setCheckedItems(savedCheckedItems ? JSON.parse(savedCheckedItems) : {});
          } else {
            console.log('Mapel not found'); // Tambahkan log ini
            // Tambahkan logika untuk menangani jika materi tidak ditemukan
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [subject, materi, userId]);

  const handleCheckboxChange = (index) => {
    setCheckedItems(prev => {
      const newCheckedItems = { ...prev, [index]: !prev[index] };
      localStorage.setItem(`checkedItems-${userId}-${namaMapelDetail}`, JSON.stringify(newCheckedItems));
      return newCheckedItems;
    });
  };

  const gambarMap = {
    Matematika: '/MatematikaDetail.png',
    Fisika: '/FisikaDetail.png',
    Kimia: '/KimiaDetail.png',
    Biologi: '/BiologiDetail.png',
    'Bahasa Indonesia': '/BahasaDetail.png',
    'Bahasa Inggris': '/InggrisDetail.png',
    'Pendidikan Agama': '/AgamaDetail.png',
    'Pendidikan Jasmani': '/PenjasDetail.png',
    // Tambahkan gambar untuk mata pelajaran lainnya
  };

  return (
    <div className="DetailMapel container-fluid">
      <div className="container">
        {/* ROW 1 */}
        <div className="video row mt-5">
          <div className="col-8">
            <div className="ratio ratio-16x9">
              <iframe
                src={videoSrc}
                title="YouTube video"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="col-4 ">
            <div>
              <table className="table  table-hover">
                <thead className="table-dark ">
                  <div>
                    <p className="NamaMapelDetail fw-bold">{namaMapelDetail}</p>
                  </div>
                </thead>
                <tbody>
                  {relatedSubjects.map((item, index) => (
                    <div key={index} className='d-flex justify-content-between align-item-center'>
                      <p className="jumlah-video"><i className="bi bi-play-circle me-2"></i>{item.materi}</p>
                      <div className="cntr">
                        <input
                          type="checkbox"
                          id={`cbx${index}`}
                          className="hidden-xs-up"
                          checked={!!checkedItems[index]}
                          onChange={() => handleCheckboxChange(index)}
                        />
                        <label htmlFor={`cbx${index}`} className="cbx"></label>
                      </div>
                    </div>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* ROW 1 END */}
        {/* ROW 2 */}
        <div className="row">
          <div className="col-12">
            <h5 className="subMateri fw-bold mt-4">{materiDetail}</h5>
          </div>
          <div className="col-8 mt-5">
            <p className="fw-bold">About Course</p>
            <p className="Deskripsi">
              Hai, teman-teman! Selamat datang di GeniusStand. Pada video kali ini, kita akan menjelajahi dunia pengetahuan dengan membahas topik menarik yang pasti akan menambah wawasan kamu. Penasaran apa saja yang akan kita pelajari? Yuk, kita simak bersama!
            </p>
            <p>📌 Apa yang Akan Kamu Pelajari:</p>
            <ul>
              <li>
                Konsep Dasar: Memahami konsep dasar yang menjadi fondasi dari topik yang kita bahas.
              </li>
              <li>
                Contoh Praktis: Menjelajahi berbagai contoh praktis untuk mengaplikasikan pengetahuan yang telah dipelajari.
              </li>
              <li>
                Studi Kasus: Melihat bagaimana topik ini diterapkan dalam situasi nyata melalui studi kasus yang menarik.
              </li>
              <li>
                Analisis Mendalam: Melakukan analisis mendalam untuk memahami aspek-aspek penting dari topik yang dibahas.
              </li>
              <li>
                Penerapan Sehari-hari: Mengetahui bagaimana pengetahuan ini dapat digunakan dalam kehidupan sehari-hari.
              </li>
            </ul>
            <p>🎯 Mengapa Ini Penting?</p>
            <p>
              Memahami topik ini sangat penting karena menjadi dasar untuk mempelajari topik-topik lebih lanjut dan kompleks. Pengetahuan ini juga berguna dalam berbagai bidang dan situasi, membantu kamu untuk menjadi lebih kritis dan analitis.
            </p>
            <p>🔍 Simak Video Ini dan Pelajari:</p>
            <ul>
              <li>Pengertian dan contoh dari topik yang dibahas.</li>
              <li>Perbedaan dan persamaan dengan topik lainnya.</li>
              <li>Bagaimana konsep ini digunakan dalam situasi nyata.</li>
            </ul>
            <p>
              Jangan lupa untuk like, comment, dan subscribe untuk mendapatkan lebih banyak konten edukatif seputar berbagai mata pelajaran! Jika kamu punya pertanyaan atau topik yang ingin dibahas, tulis di kolom komentar ya!
            </p>
            <p>
              #GeniusStand #PemilarLearningCenter #Belajar #TopikPenting #Pengetahuan #Edukatif 
            </p>
          </div>
          <div className="col-4">
            <img src={gambarMap[subject]} alt="" className="GambarMapel d-flex align-items-center justify-content-center ms-5 "/>
          </div>
        </div>
        {/* ROW 2 END */}
      </div>
    </div>
  );
};

// Tambahkan validasi prop di bawah ini
MapelDetailPage.propTypes = {
  userId: PropTypes.string.isRequired,
};