import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';

import './App.css';

import Navbar from './Components/Navbar';
import People from './Components/People';
import {PersonPage} from "./Components/People/PersonPage";

function PersonPage() {
  const { name } = useParams();
  return <h1>{name}</h1>
}

//function Home() {
//  const styles = {
//    'text-align': 'center',
//  }
//  return <h1 style={styles} >Journal of WEMA</h1>
//}

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
