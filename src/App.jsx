import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import Navbar from './components/NavBar';
import MainSection from './pages/MainSection';
import Login from './pages/Login';
import RegisterClient from './pages/RegisterClient';
import RegisterProvider from './pages/RegisterProvider';
// import Footer from './components/Footer';
import ProviderDashboard from './pages/Provider/ProviderDashboard';
import ProviderRouter from './components/routes/ProviderRouter'; // Assurez-vous d'ajuster le chemin selon votre structure
import AdminRouter from './components/routes/AdminRouter'; // Assurez-vous d'ajuster le chemin selon votre structure
import ClientRouter from './components/routes/ClientRouter';
import ForceRedirect from './components/routes/ForceRedirect';
import { setUser } from './redux/Action/Auth'; // Ajustez le chemin selon votre structure

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
        console.error("Invalid token", error);
      }
    }
  }, [dispatch]);

  const user = {
    isConnected: auth.isConnected,
    role: auth.user?.role // Assurez-vous que auth.user est défini
  }

  return (
    <Router>
      <div className="app">
        <Navbar user={auth.user} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register/client" element={<RegisterClient />} />
          <Route path="/register/provider" element={<RegisterProvider />} />
          <Route path="/" element={<ForceRedirect user={user}><MainSection /></ForceRedirect>} />
          <Route path="/admin/*" element={<AdminRouter user={user}>AdminDashboard</AdminRouter>} />
          <Route path="/provider/*" element={<ProviderRouter user={user}><ProviderDashboard /></ProviderRouter>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
