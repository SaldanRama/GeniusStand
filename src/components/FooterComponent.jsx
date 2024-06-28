


const FooterComponent = () => {
  return (
    <div className="tentang-kami-footer1 container-fluit">
        <div className="container">
          <div className="row">
            <h1 className="tentangkamitxt mt-5 text-light">
              Tentang Kami
            </h1>
          </div>

          <div className="col-11 mt-5 text-light">
            <p>GeniusStand adalah penyedia layanan bimbel online terbaik melalui aplikasi belajar online yang dapat diakses kapan saja dan dari mana saja melalui hp, tablet, laptop, dan komputer. GeniusStand menyediakan konten pembelajaran dengan konsep yang menyenangkan, kelas belajar online yang aplikatif dan inovatif, serta video belajar beranimasi yang informatif dan edukatif.GeniusStand juga menyediakan platform persiapan ujian modern yang mempersiapkan siswa untuk ujian masuk perguruan tinggi negeri melalui jalur SNMPTN, UTBK SBMPTN, maupun ujian mandiri. Melalui GeniusStand, siswa bisa melatih diri dan mendapatkan feedback terhadap kelemahan dan kekurangan mereka dalam menghadapi ujian.</p>
          </div>

          <div className="row d-flex">

          <div className="col-4">
              <img className="logo-1-icon3" alt="" src="/logo-1@2x.png" style={{ width: '70px', height: 'auto' }} />
              <b className="geniusstand7">
                <span className="text-light fs-4">GENIUS</span>
                <span className="stand3 fs-4">STAND</span>
              </b>

              <p className="tahun-ajaran-baru1 mt-3 text-light">
                  <span className="raih-kesuksesan-dan-impian-ber3">
                    <span>{`Raih kesuksesan dan impian bersama GeniusStand `}</span>
                    <span className="span1"></span>
                  </span>
                <p className="geniusstand8 fs-5">
                  <b>#GeniusStand</b>
                </p>
              </p>

              <div className="address1 text-light">
              <div className="jalan1">
              Jl. Boulevard Panakkukang Mas, Masale, Kec. Panakkukang, Kota
              Makassar, Sulawesi Selatan 90231
              </div>
              <div className="alamat1">Mess Pemda Luwu Utara</div>
              </div>   
          </div>

          <div className="col-2 text-light">
              <div className="geniusstandid2">
                <div className="geniusstandid3 mt-4">
                    <span className="geniusstand9">GeniusStand.</span>
                    <span>id</span>
                  </div>
                  <div className="home5 mt-4">Home</div>
                  <div className="profile-tentor1 mt-3">Profile Tentor</div>
                  <div className="ruang-belajar5 mt-3">Ruang Belajar</div>
                  <div className="tentang-kami4 mt-3">Tentang Kami</div>
                </div>
              </div>
              <div className="col-2 text-light"> 
                <div className="hak-cipta2 mt-4">
                  <div className="privacy-policy1 mt-3">Privacy Policy</div>
                  <div className="syarat-ketentuan1 mt-3">{`Syarat & Ketentuan`}</div>
                  <div className="hak-cipta3 mt-3">Hak Cipta</div>
              </div> 
          </div>

          <div className="col-2">
            <div className="ikuti-kami2 text-light">
              <div className="ikuti-kami3 mt-4">Ikuti Kami</div>
                <div className="instagram1 mt-3">
                  <img
                    className="instagram-circle-icon1"
                    alt=""
                    src="/instagram-circle@2x.png"
                    style={{ width: '28px', height: 'auto' }} // Mengatur ukuran gambar
                  />
                  Instagram
                </div>
                <div className="facebook1 mt-3">
                  <img
                    className="facebook-icon1"
                    alt=""
                    src="/facebook@2x.png"
                    style={{ width: '28px', height: 'auto' }} // Mengatur ukuran gambar
                  />
                  Facebook
                </div>
                <div className="tiktok1 mt-3">
                  <img
                    className="tiktok-icon1"
                    alt=""
                    src="/tiktok@2x.png"
                    style={{ width: '28px', height: 'auto' }} // Mengatur ukuran gambar
                  />
                  Tiktok
                </div>
              </div>
          </div>

          <div className="col-2">      
              <div className="kontak-kami2 text-light">
                  <div className="kontak-kami3 mt-4">Kontak Kami</div>
                  
                  <div className="nomor-wa1 mt-3">
                    <img 
                      className="whatsapp-icon1" 
                      alt="" src="/whatsapp@2x.png" 
                      style={{ width: '28px', height: 'auto' }}/>08123456789
                  </div>
                  <div className="nomor-hp1 mt-3">
                    <img 
                      className="call-icon1" 
                      alt="" src="/call@2x.png"  
                      style={{ width: '28px', height: 'auto' }} />08123456789
                  </div>
                  <div className="gmail1 mt-3">
                    <img
                      className="circled-envelope-icon1"
                      alt=""
                      src="/circled-envelope@2x.png"
                      style={{ width: '28px', height: 'auto' }}/>geniusstand@gmail.com
                  </div>
                </div>
          </div>

                <div className="geniusstand-all-rights1 text-light text-center"   style={{ marginTop: '50px', marginBottom: '50px' }}>
                  © 2024 GeniusStand. All rights reserved.
                </div>
          </div>
        </div>
      </div>
  );
};

export default FooterComponent;

