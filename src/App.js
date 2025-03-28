import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { UserProvider } from './context/UserContext';
import AdminLogin from './components/adminpanel/AdminLogin';
import Association from './components/Association';
import Courses from './components/Courses';
import GalleryUpload from './components/adminpanel/GalleryUpload';
import Rules from './components/Rules';
import FullNews from './components/FullNews';
import SponsorsMarquee from './components/SponsorsMarquee';
import Public from './components/Public';
import News from './components/News';
import Avgift from './components/Avgifter';
import Products from './components/Products';
import Gallery from './components/Galleri';
import Sponsorer from './components/Sponsorer';
import CreateNews from './components/adminpanel/CreateNews';
import PrivateRoute from './components/PrivateRoute';
import AdminPanel from './components/adminpanel/AdminPanel';
import AdminHours from './components/adminpanel/AdminOpen';
import CreateCompetition from './components/adminpanel/CreateCompetition'; 
import Competitions from './components/Competitions';
import CookieConsent from './components/CookieConsent'; // Importera din CookieConsent
import SEO from './components/SEO';
import BanorUpload from "./components/adminpanel/BanorUpload"
import AdminProducts from './components/adminpanel/AdminProducts';
import AdminRules from './components/adminpanel/AdminRule';
import AdminIntyg from './components/adminpanel/AdminIntyg';
import AdminAvgift from './components/adminpanel/AdminAvgifter';
import AdminSponsor from './components/adminpanel/AdminSponsor';
import AdminContent from './components/adminpanel/AdminContent';
const App = () => {
  
  const [cookieAccepted, setCookieAccepted] = useState(localStorage.getItem('cookieConsent') === 'accepted');


  const handleCookieAcceptance = (accepted) => {
    setCookieAccepted(accepted);
  };

  return (
    <UserProvider>
      <Router>
        <div className="App">
        <SEO title="Hofors BGK" description="Välkommen till Hofors BKG's officiella webbplats" keywords="hofors, bangolf, klubb, nyheter, tävlingar" />
          <Header />
          {cookieAccepted || <CookieConsent onAccept={handleCookieAcceptance} />}

          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/association" element={<Association />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/butik" element={<Products />} />
           
            <Route path="/public" element={<Public />} />
            <Route path="/gallery/:folder" element={<Gallery />} />
            <Route path="/sponsorer" element={<Sponsorer />} />
            <Route path="/avgift" element={<Avgift />} />
            <Route path="/news" element={<News />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/upload" element={<PrivateRoute component={GalleryUpload} />} />
            <Route path="/banor" element={<PrivateRoute component={BanorUpload} />} />
            <Route path="/edit-products" element={<PrivateRoute component={AdminProducts} />} />
            <Route path="/edit-rules" element={<PrivateRoute component={AdminRules} />} />
            <Route path="/edit-avgifter" element={<PrivateRoute component={AdminAvgift} />} />
            <Route path="/edit-sponsor" element={<PrivateRoute component={AdminSponsor} />} />
            <Route path="/edit-open" element={<PrivateRoute component={AdminHours} />} />
            <Route path="/create-news" element={<PrivateRoute component={CreateNews} />} />
            <Route path="/edit-association" element={<PrivateRoute component={AdminContent} />} />
            <Route path="/news/:id" element={<FullNews />} />
            <Route path="/panel" element={<PrivateRoute component={AdminPanel} />} />
            <Route path="/create-competition" element={<PrivateRoute component={CreateCompetition} />} />
            <Route path="/edit-intyg" element={<PrivateRoute component={AdminIntyg} />} />
            <Route path="/competitions" element={<Competitions />} />
          </Routes>
          <SponsorsMarquee/>
          <Footer />
         
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
