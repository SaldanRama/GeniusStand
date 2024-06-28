import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'bootstrap';
import '../dist/css/UserComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const MataPelajaranComponent = () => {
  const [mapel, setMapel] = useState([]);
  const [message, setMessage] = useState(null);
  const [selectedMapelId, setSelectedMapelId] = useState(null);
  const [selectedMapel, setSelectedMapel] = useState({
    nama_mata_pelajaran: '',
    deskripsi: '',
    topik: '',
    materi: '',
    link_video: 'https://www.youtube.com/embed/'
  });
  const [namaList, setNamaList] = useState([]); // State untuk menyimpan list nama
  const [topikList, setTopikList] = useState([]); // State untuk menyimpan list topik
  const [searchKeyword, setSearchKeyword] = useState(''); // State untuk menyimpan kata kunci pencarian

  useEffect(() => {
    fetchMapel();
    fetchNamaList(); // Panggil fungsi untuk fetch list nama
    fetchTopikList(); // Panggil fungsi untuk fetch list topik
  }, []);

  const fetchMapel = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/mapel');
      console.log('Fetched mapel:', response.data.data);
      if (Array.isArray(response.data.data)) {
        setMapel(response.data.data);
      } else {
        console.error('Data fetched is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching mapel:', error);
    }
  };

  const fetchNamaList = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/kelas/nama');
      setNamaList(response.data);
    } catch (error) {
      console.error('Error fetching nama list:', error);
    }
  };

  const fetchTopikList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/mapel');
      const topikSet = new Set(response.data.data.map(item => item.topik));
      setTopikList([...topikSet]);
    } catch (error) {
      console.error('Error fetching topik list:', error);
    }
  };

  const handleDeleteMapel = async (id) => {
    console.log('Deleting mapel with id:', id);
    try {
      await axios.delete(`http://127.0.0.1:5000/mapel/${id}`);
      setMapel(mapel.filter(item => item.id_mata_pelajaran !== id));
      setMessage(
        <div className="alert alert-success" role="alert">
          <i className="bi bi-check-circle-fill"></i> Berhasil Menghapus Mata Pelajaran
        </div>
      );
    } catch (error) {
      console.error('Error deleting mapel:', error);
      setMessage(<div className="alert alert-warning" role="alert">
                <i className="bi bi-exclamation-triangle-fill"></i>
                </div>);
    }
    const modalElement = document.getElementById('deleteModal');
    const modal = Modal.getInstance(modalElement);
    modal.hide();
  };

  const openModal = (id) => {
    setSelectedMapelId(id);
    const modalElement = document.getElementById('deleteModal');
    const modal = new Modal(modalElement);
    modal.show();
  };

  const openUpdateModal = (id) => {
    const mapelToUpdate = mapel.find(item => item.id_mata_pelajaran === id);
    setSelectedMapel({
      ...mapelToUpdate,
      link_video: mapelToUpdate.link_video || 'https://www.youtube.com/embed/' // Set default value if empty
    });
    setSelectedMapelId(id);
    const modalElement = document.getElementById('updateModal');
    const modal = new Modal(modalElement);
    modal.show();
  };

  const openAddModal = () => {
    setSelectedMapel({
      nama_mata_pelajaran: '',
      deskripsi: '',
      topik: '',
      materi: '',
      link_video: 'https://www.youtube.com/embed/' // Set default value
    });
    const modalElement = document.getElementById('addModal');
    const modal = new Modal(modalElement);
    modal.show();
  };

  const handleSaveMapel = async (isUpdate, event) => {
    event.preventDefault(); // Mencegah refresh halaman
    const form = document.getElementById(isUpdate ? 'updateForm' : 'addForm');
    const formData = new FormData(form);
    const newMapel = {
      nama_mata_pelajaran: formData.get('nama'),
      deskripsi: formData.get('deskripsi'),
      topik: formData.get('topik'),
      materi: formData.get('materi'),
      link_video: formData.get('link_video')
    };

    try {
      if (isUpdate) {
        await handleUpdateMapel(selectedMapelId, newMapel);
      } else {
        await handleAddMapel(newMapel);
      }
    } catch (error) {
      console.error('Error saving mapel:', error);
    }

    const modalElement = document.getElementById(isUpdate ? 'updateModal' : 'addModal');
    const modal = Modal.getInstance(modalElement);
    modal.hide();
  };

  const handleAddMapel = async (newMapel) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/mapel', newMapel, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMapel([...mapel, response.data.data]);
      setMessage(
        <div className="alert alert-success" role="alert">
          <i className="bi bi-check-circle-fill"></i> Berhasil Menambahkan Mata Pelajaran
        </div>
      );
    } catch (error) {
      console.error('Error adding mapel:', error);
      setMessage(
        <div className="alert alert-warning" role="alert">
          <i className="bi bi-exclamation-triangle-fill"></i> Gagal Menambahkan Mata Pelajaran
        </div>
      );
    }
  };

  const handleUpdateMapel = async (id, updatedMapel) => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/mapel/${id}`, updatedMapel);
      setMapel(mapel.map(item => item.id_mata_pelajaran === id ? response.data.data : item));
      setMessage(
        <div className="alert alert-success" role="alert">
          <i className="bi bi-check-circle-fill"></i> Berhasil Mengupdate Mata Pelajaran
        </div>
      );
    } catch (error) {
      console.error('Error updating mapel:', error);
      setMessage(
        <div className="alert alert-warning" role="alert">
          <i className="bi bi-exclamation-triangle-fill"></i> Gagal Mengupdate Mata Pelajaran
        </div>
      );
    }
  };

  const filteredMapel = mapel.filter(item =>
    (item.nama_mata_pelajaran?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    item.deskripsi?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    item.topik?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    item.materi?.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

  return (
    <div>
      <h2>Data Mata Pelajaran</h2>
      {message && <div>{message}</div>}
      <div className="div d-flex justify-content-between">
      <button className="Btn btn-primary" onClick={() => openAddModal()}>
        <div className="sign">+</div>
        <div className="text">Tambah</div>
      </button>

      <form className="formSeacrh me-2">
            <button>
                <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                    <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </button>
            <input className="inputs" placeholder="Cari Mata Pelajaran..." required="" type="text" value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)} />
            <button className="reset" type="reset">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </form>
        </div>
      <table className='table'>
        <thead className='table-dark'>
          <tr>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Topik</th>
            <th>Materi</th>
            <th>Link Video</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(filteredMapel) && filteredMapel.map((item) => (
            <tr key={item.id_mata_pelajaran}>
              <td>{item.nama_mata_pelajaran}</td>
              <td>{item.deskripsi}</td>
              <td>{item.topik}</td>
              <td>{item.materi}</td>
              <td>{item.link_video}</td>
              <td>
                <div className="d-flex">

                <button className="editBtn me-1" onClick={() => openUpdateModal(item.id_mata_pelajaran)}>
                <svg height="1em" viewBox="0 0 512 512">
                  <path
                    d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                  ></path>
                </svg>
              </button>

                <button className="bin-button"  onClick={() => openModal(item.id_mata_pelajaran)}>
                  <svg
                    className="bin-top"
                    viewBox="0 0 39 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4"></line>
                    <line
                      x1="12"
                      y1="1.5"
                      x2="26.0357"
                      y2="1.5"
                      stroke="white"
                      strokeWidth="3"
                    ></line>
                  </svg>
                  <svg
                    className="bin-bottom"
                    viewBox="0 0 33 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="path-1-inside-1_8_19" fill="white">
                      <path
                        d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                      ></path>
                    </mask>
                    <path
                      d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                      fill="white"
                      mask="url(#path-1-inside-1_8_19)"
                    ></path>
                    <path d="M12 6L12 29" stroke="white" strokeWidth="4"></path>
                    <path d="M21 6V29" stroke="white" strokeWidth="4"></path>
                  </svg>
                </button>

                </div>
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Modal */}
      <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addModalLabel">Tambah Mata Pelajaran</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form id="addForm">
                <div className="mb-3">
                  <label htmlFor="nama" className="form-label">Nama</label>
                  <select className="form-control" id="nama" name="nama" required>
                    {namaList.map((nama, index) => (
                      <option key={index} value={nama}>{nama}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
                  <input type="text" className="form-control" id="deskripsi" name="deskripsi" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="topik" className="form-label">Topik</label>
                  <input list="topikList" className="form-control" id="topik" name="topik"  value={selectedMapel.topik} onChange={(e) => setSelectedMapel({ ...selectedMapel, topik: e.target.value })} required />
                  <select className="ui_dropdown my-2" id="topik" name="topik" value={selectedMapel.topik} onChange={(e) => setSelectedMapel({ ...selectedMapel, topik: e.target.value })} required>
                    {topikList.map((topik, index) => (
                      <option key={index} value={topik}>{topik}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="materi" className="form-label">Materi</label>
                  <input type="text" className="form-control" id="materi" name="materi" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="link_video" className="form-label">Link Video</label>
                  <input type="text" className="form-control" id="link_video" name="link_video" value={selectedMapel.link_video} onChange={(e) => setSelectedMapel({ ...selectedMapel, link_video: e.target.value })} required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
              <button type="button" className="btn btn-primary" onClick={(e) => handleSaveMapel(false, e)}>Simpan</button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateModalLabel">Update Mata Pelajaran</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form id="updateForm">
                <div className="mb-3">
                  <label htmlFor="nama" className="form-label">Nama</label>
                  <select className="form-control" id="nama" name="nama" value={selectedMapel.nama_mata_pelajaran} onChange={(e) => setSelectedMapel({ ...selectedMapel, nama_mata_pelajaran: e.target.value })} required>
                    {namaList.map((nama, index) => (
                      <option key={index} value={nama}>{nama}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
                  <input type="text" className="form-control" id="deskripsi" name="deskripsi" value={selectedMapel.deskripsi} onChange={(e) => setSelectedMapel({ ...selectedMapel, deskripsi: e.target.value })} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="topik" className="form-label">Topik</label>
                  <select className="form-control" id="topik" name="topik" value={selectedMapel.topik} onChange={(e) => setSelectedMapel({ ...selectedMapel, topik: e.target.value })} required>
                    {topikList.map((topik, index) => (
                      <option key={index} value={topik}>{topik}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="materi" className="form-label">Materi</label>
                  <input type="text" className="form-control" id="materi" name="materi" value={selectedMapel.materi} onChange={(e) => setSelectedMapel({ ...selectedMapel, materi: e.target.value })} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="link_video" className="form-label">Link Video</label>
                  <input type="text" className="form-control" id="link_video" name="link_video" value={selectedMapel.link_video} onChange={(e) => setSelectedMapel({ ...selectedMapel, link_video: e.target.value })} required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
              <button type="button" className="btn btn-primary" onClick={(e) => handleSaveMapel(true, e)}>Simpan</button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Hapus Mata Pelajaran</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Apakah Anda yakin ingin menghapus mata pelajaran ini?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tidak</button>
              <button type="button" className="btn btn-primary" onClick={() => handleDeleteMapel(selectedMapelId)}>Ya</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MataPelajaranComponent;