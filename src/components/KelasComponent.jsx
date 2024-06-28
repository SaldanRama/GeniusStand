import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'bootstrap';
import '../dist/css/UserComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const KelasComponent = () => {
  const [kelas, setKelas] = useState([]);
  const [message, setMessage] = useState(null);
  const [selectedKelasId, setSelectedKelasId] = useState(null);
  const [selectedKelas, setSelectedKelas] = useState({
    nama_kelas: '',
    deskripsi_mapel: '',
    topik_mapel: '', // Ubah ini menjadi string
    image: ''
  });

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

  const handleDeleteKelas = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/kelas/${id}`);
      setKelas(kelas.filter(item => item.id_kelas !== id));
      setMessage(
        <div className="alert alert-success" role="alert">
          <i className="bi bi-check-circle-fill"></i> Berhasil Menghapus Kelas
        </div>
      );
    } catch (error) {
      console.error('Error deleting kelas:', error);
      setMessage(
        <div className="alert alert-warning" role="alert">
          <i className="bi bi-exclamation-triangle-fill"></i> Gagal Menghapus Kelas
        </div>
      );
    }
    const modalElement = document.getElementById('deleteModal');
    const modal = Modal.getInstance(modalElement);
    modal.hide();
  };

  const openModal = (id) => {
    setSelectedKelasId(id);
    const modalElement = document.getElementById('deleteModal');
    const modal = new Modal(modalElement);
    modal.show();
  };

  const openUpdateModal = (id) => {
    const kelasToUpdate = kelas.find(item => item.id_kelas === id);
    setSelectedKelas(kelasToUpdate);
    setSelectedKelasId(id);
    const modalElement = document.getElementById('updateModal');
    const modal = new Modal(modalElement);
    modal.show();
  };

  const openAddModal = () => {
    setSelectedKelas({
      nama_kelas: '',
      deskripsi_mapel: '',
      topik_mapel: '',
      image: ''
    });
    const modalElement = document.getElementById('addModal');
    const modal = new Modal(modalElement);
    modal.show();
  };

  const handleSaveKelas = async (isUpdate) => {
    const form = document.getElementById(isUpdate ? 'updateForm' : 'addForm');
    const formData = new FormData(form);

    try {
      if (isUpdate) {
        await handleUpdateKelas(selectedKelasId, formData);
      } else {
        await handleAddKelas(formData);
      }
    } catch (error) {
      console.error('Error saving kelas:', error);
    }

    const modalElement = document.getElementById(isUpdate ? 'updateModal' : 'addModal');
    const modal = Modal.getInstance(modalElement);
    modal.hide();
  };

  const handleAddKelas = async (formData) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/kelas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setKelas([...kelas, response.data]);
      setMessage(
        <div className="alert alert-success" role="alert">
          <i className="bi bi-check-circle-fill"></i> Berhasil Menambahkan Kelas
        </div>
      );
    } catch (error) {
      console.error('Error adding kelas:', error);
      setMessage(
        <div className="alert alert-warning" role="alert">
          <i className="bi bi-exclamation-triangle-fill"></i> Gagal Menambahkan Kelas
        </div>
      );
    }
  };

  const handleUpdateKelas = async (id, formData) => {
    try {
      // Hapus field 'image' jika tidak ada gambar baru yang dipilih
      if (!formData.get('image').name) {
        formData.delete('image');
      }
  
      const response = await axios.put(`http://127.0.0.1:5000/kelas/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setKelas(kelas.map(item => item.id_kelas === id ? response.data : item));
      setMessage(
        <div className="alert alert-success" role="alert">
          <i className="bi bi-check-circle-fill"></i> Berhasil Mengupdate Kelas
        </div>
      );
    } catch (error) {
      console.error('Error updating kelas:', error);
      setMessage(
        <div className="alert alert-warning" role="alert">
          <i className="bi bi-exclamation-triangle-fill"></i> Gagal Mengupdate Kelas
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Data Kelas</h2>
      {message && <div>{message}</div>}
      <button className="Btn btn-primary" onClick={() => openAddModal()}>
        <div className="sign">+</div>
        <div className="text">Tambah</div>
      </button>
      <table className='table'>
        <thead className='table-dark'>
          <tr>
            <th>Nama Kelas</th>
            <th>Deskripsi Mapel</th>
            <th>Topik Mapel</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(kelas) && kelas.map((item) => (
            <tr key={item.id_kelas}>
              <td>{item.nama_kelas}</td>
              <td>{item.deskripsi_mapel}</td>
              <td>{item.topik_mapel}</td>
              <td>
                {item.image && (
                  <img
                    src={`http://127.0.0.1:5000${item.image}`}  // Pastikan URL gambar benar
                    alt={item.nama_kelas}
                    style={{ width: '100px', height: 'auto' }}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/default/image.jpg'; }} // Tambahkan fallback image jika gambar tidak ditemukan
                  />
                )}
              </td>
              <td className='d-flex'>
                <button className="editBtn" onClick={() => openUpdateModal(item.id_kelas)}>
                  <svg height="1em" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                  </svg>
                </button>
                <button className="bin-button" onClick={() => openModal(item.id_kelas)}>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Modal */}
      <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addModalLabel">Tambah Kelas</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form id="addForm">
                <div className="mb-3">
                  <label htmlFor="nama_kelas" className="form-label">Nama Kelas</label>
                  <input type="text" className="form-control" id="nama_kelas" name="nama_kelas" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="deskripsi_mapel" className="form-label">Deskripsi Mapel</label>
                  <textarea className="form-control" id="deskripsi_mapel" name="deskripsi_mapel" required></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="topik_mapel" className="form-label">Topik Mapel</label>
                  <textarea className="form-control" id="topik_mapel" name="topik_mapel" required></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image</label>
                  <input type="file" className="form-control" id="image" name="image" accept="image/*" required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={() => handleSaveKelas(false)}>Save</button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateModalLabel">Update Kelas</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form id="updateForm">
                <div className="mb-3">
                  <label htmlFor="nama_kelas" className="form-label">Nama Kelas</label>
                  <input type="text" className="form-control" id="nama_kelas" name="nama_kelas" value={selectedKelas.nama_kelas} onChange={(e) => setSelectedKelas({ ...selectedKelas, nama_kelas: e.target.value })} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="deskripsi_mapel" className="form-label">Deskripsi Mapel</label>
                  <textarea className="form-control" id="deskripsi_mapel" name="deskripsi_mapel" value={selectedKelas.deskripsi_mapel} onChange={(e) => setSelectedKelas({ ...selectedKelas, deskripsi_mapel: e.target.value })} required></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="topik_mapel" className="form-label">Topik Mapel</label>
                  <textarea className="form-control" id="topik_mapel" name="topik_mapel" value={selectedKelas.topik_mapel} onChange={(e) => setSelectedKelas({ ...selectedKelas, topik_mapel: e.target.value })} required></textarea>
                </div>
             <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image</label>
                  <input type="file" className="form-control" id="image" name="image" accept="image/*" onChange={(e) => setSelectedKelas({ ...selectedKelas, image: e.target.files[0] })} />
                  {selectedKelas.image && typeof selectedKelas.image === 'string' && (
                    <img
                      src={`http://127.0.0.1:5000${selectedKelas.image}`}
                      alt={selectedKelas.nama_kelas}
                      style={{ width: '100px', height: 'auto' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/default/image.jpg'; }}
                    />
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={() => handleSaveKelas(true)}>Save</button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Delete Confirmation</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this item?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger" onClick={() => handleDeleteKelas(selectedKelasId)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KelasComponent;
