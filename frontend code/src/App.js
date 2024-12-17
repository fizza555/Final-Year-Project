import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Service from './Components/Service';
import Contact from './Components/Contact';
import  Login from './Components/Login';
import Signup from './Components/Signup';
import ServiceForm from './Components/ServiceForm';
import ResultPage from './Components/Resultpage';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';

function App() {
  return (

    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ServiceForm" element={<ServiceForm />} />
        <Route path="/ResultPage" element={<ResultPage />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
   
  );
}

export default App;
