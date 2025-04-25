import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import './Home.css';

function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [homeContent, setHomeContent] = useState({
    fullText: `# Welcome to the WEMA Journal

The WEMA Journal is a student created project where individuals can submit manuscripts for review and publication. 
Explore our mission, meet the team, and make a submission by using the navigation bar above.`
  });

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/home`);
        if (response.data) {
          setHomeContent(response.data);
        }
      } catch (error) {
        console.error("Error fetching home content:", error);
      }
    };
    fetchHomeContent();
  }, []);

  const handleSave = async () => {
    try {
      await axios.post(`${BACKEND_URL}/home`, homeContent);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving home content:", error);
    }
  };

  const renderFormattedText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index}>{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index}>{line.substring(3)}</h2>;
      }
      return <p key={index}>{line || <br />}</p>;
    });
  };

  return (
    <div className="home-container">
      {!isEditing ? (
        <button className="edit-home-button" onClick={() => setIsEditing(true)}>
          Edit Home Page
        </button>
      ) : (
        <div className="edit-controls">
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}

      {isEditing ? (
        <textarea
          value={homeContent.fullText}
          onChange={(e) => setHomeContent({ fullText: e.target.value })}
          className="full-edit-textarea"
        />
      ) : (
        renderFormattedText(homeContent.fullText)
      )}
    </div>
  );
}

export default Home;
