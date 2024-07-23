import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { UserProvider } from './context/UserContext';
import AdminLogin from './components/AdminLogin';
import Association from './components/Association';
import Courses from './components/Courses';
import GalleryUpload from './components/GalleryUpload';
import Rules from './components/Rules';
import FullNews from './components/FullNews';

import Public from './components/Public';
import News from './components/News';
import Members from './components/Sponsorer';
import Gallery from './components/Galleri';
import Sponsorer from './components/Sponsorer';
import CreateNews from './components/CreateNews';
import PrivateRoute from './components/PrivateRoute';
import AdminPanel from './components/AdminPanel';
import CreateCompetition from './components/CreateCompetition'; 
import Competitions from './components/Competitions';
import CookieConsent from './components/CookieConsent'; // Importera din CookieConsent
import SEO from './components/SEO';
const App = () => {
  
  const [cookieAccepted, setCookieAccepted] = useState(localStorage.getItem('cookieConsent') === 'accepted');


  const handleCookieAcceptance = (accepted) => {
    setCookieAccepted(accepted);
  };

  return (
    <UserProvider>
      <Router>
        <div className="App">
        <SEO title="Hofors BKG" description="Välkommen till Hofors BKG's officiella webbplats" keywords="hofors, bangolf, klubb, nyheter, tävlingar" />
          <Header />
          {cookieAccepted || <CookieConsent onAccept={handleCookieAcceptance} />}
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/association" element={<Association />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/rules" element={<Rules />} />
           
           
            <Route path="/public" element={<Public />} />
            <Route path="/gallery/:folder" element={<Gallery />} />
            <Route path="/sponsorer" element={<Sponsorer />} />
           
            <Route path="/news" element={<News />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/upload" element={<PrivateRoute component={GalleryUpload} />} />
            <Route path="/create-news" element={<PrivateRoute component={CreateNews} />} />
            <Route path="/news/:id" element={<FullNews />} />
            <Route path="/panel" element={<PrivateRoute component={AdminPanel} />} />
            <Route path="/create-competition" element={<PrivateRoute component={CreateCompetition} />} />
            <Route path="/competitions" element={<Competitions />} />
          </Routes>
          <Footer />
         
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
