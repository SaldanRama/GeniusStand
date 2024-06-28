
import { Link } from 'react-router-dom';
import '../dist/css/AdminDashboardPage.css';

const SidebarComponent = () => {
  return (
    <div>
    <div className="sidebar text-light">
      
      <div className="header">
        <div className="description-header d-flex align-items-center">
          <img className='logoicon' src="/logo-1@2x.png" alt="icon" />
          <span className='fw-bold'>GENIUSSTAND</span>
        </div>
      </div>

      <div className="illustration">
        <img src="/ICON BOOK.png " alt="" />
      </div>

    <div className='link'>
      <ul>
        <li className='mt-3 ms-2'><Link to="/admin/users"> <i className="bi bi-person"> </i> User</Link></li>   
      </ul>
    </div>


    <div className="link">
      <ul>
      <li className='mt-3 ms-2'><Link to="/admin/kelas">  <i className="bi bi-journals"></i> Kelas</Link></li>
      </ul>
    </div>
    <div className="link">
      <ul>
      <li className='mt-3 ms-2'><Link to="/admin/matapelajaran"> <i className="bi bi-book"></i> Mata Pelajaran</Link></li>
      </ul>
    </div>
    <div className="link">
      <ul>
      <li className='mt-3 ms-2'><Link to="/admin/tentor"> <i className="bi bi-person-workspace"></i> Tentor</Link></li>
      </ul>
    </div>  
    </div>
    </div>
  );
};

export default SidebarComponent;
