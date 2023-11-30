// components/TrainerNavbar.tsx
import { useState, useEffect } from 'react';
import ClientForm from './clientform';
import { Button } from '@mui/material';
import User from '../types/user';
import ProgramForm from './programform';

interface ClientListProps {
  jwtToken: string|null;
}

const TrainerNavbar: React.FC<ClientListProps> = ({ jwtToken}) => {
  const [isToolboxVisible, setToolboxVisibility] = useState(false);
  const [clients, setClients] = useState<User[]>([]);
  const [isFormVisible, setFormVisibility] = useState(false);
  const [isWorkoutFormVisible, setWorkoutFormVisibility] = useState(false);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);

  const handleToggleToolbox = () => {
    setToolboxVisibility(!isToolboxVisible);
  };

  const fetchClients = () => {
    if (jwtToken !== null) {
      fetch('https://afefitness2023.azurewebsites.net/api/Users/Clients', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: User[]) => setClients(data))
        .catch((error) => console.error('Error fetching clients:', error.message));
    }
  };

  useEffect(() => {
    fetchClients();
  }, [jwtToken]);

  const handlePlusButtonClick = () => {
    setFormVisibility(true);
  };

  const closeForm = () => {
    setFormVisibility(false);
    fetchClients();
  };

  const handleWorkoutButtonClick = (client: User) => {
    setSelectedClient(client);
    setWorkoutFormVisibility(true);
  };

  const closeWorkoutForm = () => {
    setWorkoutFormVisibility(false);
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="logo-container text-left">
        <img src="/FitApp.png" alt="Logo" className="img-fluid logo" />
        <span className="hi-trainer">Hi Trainer! 💪🏻💪🏻</span>
      </div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Button className="plus-button" onClick={handlePlusButtonClick} style={{ backgroundColor: '#1B4026A6', color: 'white', fontSize: '12px', }}>
            Add Client
          </Button>
        </li>
        <li className="navbar-item">
          <Button
            className="list-button" onClick={handleToggleToolbox} style={{ backgroundColor: '#1B4026A6 ', color: 'white', fontSize: '12px', }}>
            Clients List
          </Button>
          {isToolboxVisible && (
            <div className="toolbox">
              Clients:
              {clients.map((user) => (
                <div key={user.userId} className="toolbox-item" style={{ border: '1px solid #1b4027', padding: '15px', textAlign: 'center' }}>
                  {`${user.firstName} ${user.lastName}`.substring(0, 12)}
                  {`${user.firstName} ${user.lastName}`.length > 12 && '...'}
                  <Button
                    className="work-button"
                    onClick={() => handleWorkoutButtonClick(user)}
                    style={{ backgroundColor: '#1b4027', color: 'white', fontSize: '12px', borderRadius: '0%' }}
                  >
                    Add Program
                  </Button>
                </div>
              ))}
              <ProgramForm isOpen={isWorkoutFormVisible} onRequestClose={closeWorkoutForm} client={selectedClient} jwtToken={jwtToken} />
            </div>
          )}
        </li>
        <li className="navbar-item">
          <Button className="logout-button" onClick={handleLogout} style={{ backgroundColor: '#FF292961', color: '#1b4027', fontSize: '12px', }}>
            Log out↩
          </Button>
        </li>
      </ul>
      {/* Conditionally render the form */}
      <ClientForm isOpen={isFormVisible} onRequestClose={closeForm} jwtToken={jwtToken} />
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

          .hi-trainer {
            font-size: 18px;
            font-weight: bold;
          }

          .navbar-list {
            list-style: none;
            display: flex;
            gap: 20px;
          }

          .navbar-item {
            cursor: pointer;
            position: relative;
          }

          .toolbox {
            z-index: 1;
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #ffffff;
            border: 1px solid #1b4027;
            border-radius: 8px;
            padding: 10px;
            display: none;
          }
          
          .navbar-item:hover .toolbox,
          .toolbox:hover {
            display: block;
          }
          

          .plus-button {
            background-color: #1b4027;
            color: white;
            border: solid;
            border-radius: 50%;
            padding: 10px;
            cursor: pointer;
            font-size: 16px;
          }

          .plus-button:hover {
            background-color: #1b4027;
          }
          .toolbox-item {
            border: 1px solid #1b4027; /* Add border styling */
            padding: 5px; /* Add padding for better visual appearance */
          }
          .logout-button{
            background-color: #1b4027;
            color: white;
            border: solid;
            border-radius: 50%;
            padding: 10px;
            cursor: pointer;
            font-size: 16px;
          }
          .list-button {
            background-color: #1b4027;
            color: white;
            border: solid;
            border-radius: 50%;
            padding: 8px; 
            cursor: pointer;
            font-size: 14px; 
          }
        `}</style>
    </nav>
  );
};

export default TrainerNavbar;


