import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Navbar from './components/NavBar';
import MainSection from './pages/MainSection';
import Login from './pages/Login';
import RegisterClient from './pages/RegisterClient';
import RegisterProvider from './pages/RegisterProvider';
import Footer from './components/Footer';
import ProviderDashboard from './pages/Provider/ProviderDashboard';
import ClientDashboard from './pages/Client/ClientDashboard';
import AdminPage from './pages/Admin/AdminPage'; // Importer AdminPage
import ProviderRouter from './components/routes/ProviderRouter'; 
import AdminRouter from './components/routes/AdminRouter'; 
import ClientRouter from './components/routes/ClientRouter';
import ForceRedirect from './components/routes/ForceRedirect';
import CategoriesPage from './pages/Admin/CategoriesPage'; // Importer la page des catégories
import { setUser } from './redux/Action/Auth';

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    const storedJwt = window.localStorage.getItem('jwt');
    if (storedJwt) {
      try {
        const decoded = jwtDecode(storedJwt);
        dispatch(setUser(decoded));
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, [dispatch]);

  const user = {
    isConnected: auth.isConnected,
    role: auth.user?.role,
  };

  return (
    <Router>
      <div className="app">
        <Navbar user={user} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register/client" element={<RegisterClient />} />
          <Route path="/register/provider" element={<RegisterProvider />} />
          <Route path="/" element={<ForceRedirect user={user}><MainSection /></ForceRedirect>} />
          <Route path="/admin/*" element={<AdminRouter user={user}><AdminPage /></AdminRouter>} />
          <Route path="/client/*" element={<ClientRouter user={user}><ClientDashboard/></ClientRouter>} />
          <Route path="/provider/*" element={<ProviderRouter user={user}><ProviderDashboard /></ProviderRouter>} />
          {/* Ajouter la route pour les catégories */}
          <Route path="/admin/categories" element={<AdminRouter user={user}><CategoriesPage /></AdminRouter>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {/* <Footer/> */}
      </div>
    </Router>
  );
};

export default App;
