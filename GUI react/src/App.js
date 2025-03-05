// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Wrapper from './component/Wrapper';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import EProfile from './component/Profile';
import CreateProfile from './component/CreateProfile';
import EditProfile from './component/EditProfile';
import LoginForm from './component/LoginForm';

import './App.css';

function App() {
  const [isPopupActive, setIsPopupActive] = useState(false);

  return (
    <Router>
      
      <div className="App">
        <Routes>
          
          <Route path="/login" element={<LoginForm />} />

          
          <Route path="/appointment/table" element={<EProfile />} />
          <Route path="/edit/appointment/:productCode" element={<EditProfile />} />
          <Route path="/create/appointment" element={<CreateProfile />} />

         
          <Route
            path="*"
            element={
              <>
              
                <Header onLoginClick={() => setIsPopupActive(true)} />
                {isPopupActive && (
                  <Wrapper
                    isPopupActive={isPopupActive}
                    onClose={() => setIsPopupActive(false)}
                  />
                )}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
                
              </>
            }
          />
          
        </Routes>
        
      </div>
      
    </Router>
    
  );
}

export default App;
