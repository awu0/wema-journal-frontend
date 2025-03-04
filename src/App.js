import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';

import Navbar from './Components/Navbar';
import People from './Components/People';
import { PersonPage } from "./Components/People/PersonPage";
import About from './Components/About';
import Home from './Components/Home';
import Submissions from './Components/Submissions';
import Masthead from './Components/Masthead';

function App() {
  return (
    <BrowserRouter>
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

        {/* Submissions route */}
        <Route path="submissions" element={<Submissions />} />

        {/* Masthead route */}
        <Route path="masthead" element={<Masthead />} />  {/* Add Masthead route here */}

        {/* About page route */}
        <Route path="about" element={<About />} /> {/* Add About route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;