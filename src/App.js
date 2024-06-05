import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

import AdminLogin from './components/AdminLogin';
import Players from './components/Players';
import Courses from './components/Courses';
import Rules from './components/Rules';
import Tips from './components/Tips';
import Public from './components/Public';
import News from './components/News';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
       
        <Routes>
        <Route path="/" element={<News />} />
          <Route path="/players" element={<Players />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/public" element={<Public />} />
          <Route path="/news" element={<News />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
