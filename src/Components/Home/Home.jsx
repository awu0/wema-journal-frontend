import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    const handleViewPeople = () => {
        navigate('/people');
    };

    const handleViewSubmissions = () => {
        navigate('/manuscripts');
    };

    const handleViewMission = () => {
        navigate('/about');
    };

    const handleViewSubmit = () => {
        navigate('/submissions');
    };

    return (
        <div className="home-container">
            <h1>WEMA Journal</h1>
            <p>Read about our mission statement</p>
            <button className="view-mission-btn" onClick={handleViewMission}>View Our Mission</button>

            <h2>Meet Our Team</h2>
            <p>Get to know the people who make this platform possible.</p>
            <button className="view-people-btn" onClick={handleViewPeople}>View People</button>
            
            <h2>Submit Manuscript</h2>
            <p>Submit a manuscript and have it reviewed and published</p>
            <button className="view-people-btn" onClick={handleViewSubmit}>Go Submit a Manuscript</button>

            <h2>View Submissions</h2>
            <p>Check the list of submitted manuscripts.</p>
            <button className="view-submissions-btn" onClick={handleViewSubmissions}>View Submitted Manuscripts</button>
        </div>
    );
}

export default Home;
