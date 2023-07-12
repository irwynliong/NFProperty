import React from 'react';
import './App.css';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
import Listing from './components/pages/Listing';
import About from './components/pages/About';
import SignUp from './components/pages/SignUp';
import LogIn from './components/pages/LogIn';
import PropertyForm from './components/pages/Form';


function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/listing' Component={Listing} />
          <Route path='/about' Component={About} />
          <Route path='/sign-up' Component={SignUp} />
          <Route path='/log-in' Component={LogIn} />
          <Route path='/form' Component={PropertyForm} />
        </Routes>
      </Router>
    </>
  );
}

export default App;