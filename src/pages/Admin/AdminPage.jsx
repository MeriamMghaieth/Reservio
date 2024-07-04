import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import Stats from './Stats';
import axios from 'axios';
import './AdminPage.css'; 

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ clients: 0, fournisseurs: 0 });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
      // Calculate stats based on roles
      const clientsCount = response.data.filter(user => user.Role === 'CLIENT').length;
      const fournisseursCount = response.data.filter(user => user.Role === 'SERVICE_PROVIDER').length;
      setStats({
        clients: clientsCount,
        fournisseurs: fournisseursCount,
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
    }
  };

  return (
    <div className="admin-page">
      <Sidebar />
      <div className="content">
        <h1>Tableau de bord Admin</h1>
        <section className="main-content">
          <div className="users-section box">
            <h2>Les Données d'utilisateurs</h2>
            <table className="users-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Numéro</th>
                  <th>Rôle</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.ID}>
                    <td>
                      <div className="user-info">
                        <img src={`https://api.adorable.io/avatars/40/${user.ID}.png`} alt="Avatar" className="avatar"/>
                        <div>
                          <div>{user.Nom}</div>
                          <div className="user-role">{user.Role}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.Email}</td>
                    <td>{user.Num}</td>
                    <td>{user.Role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="stats-container">
            <Stats stats={stats} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
  