import React from 'react';
import {BrowserRouter, Route, Routes,} from 'react-router-dom';

import './App.css';

import Navbar from './Components/Navbar';
import People from './Components/People';
import {PersonPage} from "./Components/People/PersonPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* For a different home page, do:
         <Route index element={<Login />} /> */}
        <Route path="people" element={<People />} />
        <Route path="people/:email" element={<PersonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
