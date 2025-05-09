import React, { useState, useEffect } from 'react';
import { useUser } from '../../userContext';
import './Home.css';

const LOCAL_STORAGE_KEY = 'homePageContent';

function Home() {
  const { user } = useUser();
  const isEditor = user?.roles?.includes('editor');
  const [isEditing, setIsEditing] = useState(false);
  const [homeContent, setHomeContent] = useState({
    fullText: `# Welcome to the WEMA Journal

The WEMA Journal is a student created project where individuals can submit manuscripts for review and publication. 
Explore our mission, meet the team, and make a submission by using the navigation bar above.`
  });

  useEffect(() => {
    const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedContent) {
      setHomeContent({ fullText: savedContent });
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, homeContent.fullText);
    setIsEditing(false);
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
      {isEditor && (
        !isEditing ? (
          <button className="edit-home-button" onClick={() => setIsEditing(true)}>
            Edit Home Page
          </button>
        ) : (
          <div className="edit-controls">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        )
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
