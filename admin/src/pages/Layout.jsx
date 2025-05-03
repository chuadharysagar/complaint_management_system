import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="h-screen">
      <NavBar /> {/* fixed height */}
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
