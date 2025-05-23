import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';

import Navbar from './Components/Navbar';
import People from './Components/People';
import { PersonPage } from "./Components/People/PersonPage";
import About from './Components/About';
import Home from './Components/Home';
import Manuscripts from './Components/Manuscripts';
import Submissions from './Components/Submissions';
import Masthead from './Components/Masthead';
import Login from './Login/Login';
import Register from './Register/Register';
import {ManuscriptPage} from "./Components/Manuscripts/ManuscriptPage";
import { UserProvider } from './userContext';

export const homeHeader = "WEMA Journal";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        {/* Home page setup */}
        {/* For a different home page, you can add an index route here */}
        {/* <Route index element={<Home />} /> */}
        <Route path="home" element={<Home />} />

        {/* People list route */}
        <Route path="people" element={<People />} />
        
        {/* Dynamic route for individual person */}
        <Route path="people/:email" element={<PersonPage />} />

        {/* Manuscripts route */}
        <Route path="Manuscripts" element={<Manuscripts />} />
        <Route path="manuscripts/:_id" element={<ManuscriptPage />} />

        {/* Submissions route */}
        <Route path="Submissions" element={<Submissions />} />

        {/* Masthead route */}
        <Route path="masthead" element={<Masthead />} />

        {/* About page route */}
        <Route path="about" element={<About />} />

        {/* About login route */}
        <Route path="login" element={<Login />} />

        {/* About register route */}
        <Route path="register" element={<Register />} />
      </Routes>
    </UserProvider>
  );
}

export default App;