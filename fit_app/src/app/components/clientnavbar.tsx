// components/ClientNavbar.tsx
import { Button } from '@mui/material';
import Image from 'next/image';

const handleLogout = () => {
  window.location.href = "/login";
};

const ClientNavbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo-container text-left">
        <Image src="/FitApp.png" alt="Logo" width={50} height={50} className="img-fluid logo" />
        <span className="hi-manager">Hi Client! 💪🏻💪🏻</span>
      </div>
      <li className="navbar-item">
        <Button className="logout-button" onClick={handleLogout} style={{ backgroundColor: '#FF292961', color: '#1b4027', fontSize: '12px', }}>
          Log out↩
        </Button>
      </li>
      <style jsx>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          border: 2px solid #1b4027;
          border-radius: 8px;
        }

        .logo-container {
          display: flex;
          align-items: center;
        }

        .logo {
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }

        .hi-manager {
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
    </nav>
  );
};

export default ClientNavbar;
