import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'bootstrap';
import '../dist/css/UserComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const UserComponent = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/users');
      console.log('Fetched users:', response.data.data);
      if (Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else {
        console.error('Data fetched is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    console.log('Deleting user with id:', id);
    try {
      await axios.delete(`http://127.0.0.1:5000/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      setMessage(
        <div className="alert alert-success" role="alert">
          <i className="bi bi-check-circle-fill"></i> Berhasil Menghapus User
        </div>
      );
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage(<div className="alert alert-warning" role="alert">
                <i className="bi bi-exclamation-triangle-fill"></i>
                </div>);
    }
    const modalElement = document.getElementById('deleteModal');
    const modal = Modal.getInstance(modalElement);
    modal.hide();
  };

  const openModal = (id) => {
    setSelectedUserId(id);
    const modalElement = document.getElementById('deleteModal');
    const modal = new Modal(modalElement);
    modal.show();
  };

  return (
    <div>
      <h2>Data User</h2>
      {message && <div>{message}</div>}
      <table className='table'>
        <thead className='table-dark'>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="bin-button" onClick={() => openModal(user.id)}>
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
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Konfirmasi Hapus User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Apakah Anda yakin ingin menghapus user ini?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary " data-bs-dismiss="modal">Tidak</button>
              <button type="button" className="btn btn-primary " onClick={() => handleDeleteUser(selectedUserId)}>Ya</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
