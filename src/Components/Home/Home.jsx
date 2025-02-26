import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    const handleViewPeople = () => {
        navigate('/people');
    };

    const handleViewSubmissions = () => {
        navigate('/submissions');
    };

    return (
        <div className="home-container">
            <h1>Our Mission</h1>
            <p></p>
            
            <h2>Submit Manuscript</h2>
            <p></p>
            
            <h2>Meet Our Team</h2>
            <p>Get to know the people who make this platform possible.</p>
            <button className="view-people-btn" onClick={handleViewPeople}>View People</button>

            <h2>View Submissions</h2>
            <p>Check the list of submitted manuscripts.</p>
            <button className="view-submissions-btn" onClick={handleViewSubmissions}>View Submissions</button>
        </div>
    );
}

export default Home;
