import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import MainSection from './components/MainSection';
import Login from './components/Login';
import RegisterClient from './components/RegisterClient';
import RegisterProvider from './components/RegisterProvider';
import ServiceForm from './components/ServiceForm'; 
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register/client" element={<RegisterClient />} />
          <Route path="/register/provider" element={<RegisterProvider />} />
          <Route path="/post-service" element={<ServiceForm />} /> 
          <Route path="/" element={<MainSection />} /> {/* Default route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
