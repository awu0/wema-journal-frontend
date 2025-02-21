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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Home page setup */}
        {/* For a different home page, you can add an index route here */}
        {/* <Route index element={<Home />} /> */}

        {/* People list route */}
        <Route path="people" element={<People />} />
        
        {/* Dynamic route for individual person */}
        <Route path="people/:email" element={<PersonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
