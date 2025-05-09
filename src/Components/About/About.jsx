import React, { useState, useEffect } from 'react';
import { useUser } from '../../userContext';
import './About.css';

const LOCAL_STORAGE_KEY = 'aboutPageContent';

function About() {
  const { user } = useUser();
  const isEditor = user?.roles?.includes('editor');
  const [isEditing, setIsEditing] = useState(false);
  const [aboutContent, setAboutContent] = useState({
    fullText: `# About Us\n\nWelcome to the WEMA Journal. Here you will find information about our project and team.\n\nOur team consists of William Lin, Eric Dong, Matthew Ma, and Aaron Wu.\n\nWe are currently working on connecting to frontend.`
  });

  useEffect(() => {
    const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedContent) {
      setAboutContent({ fullText: savedContent });
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, aboutContent.fullText);
    setIsEditing(false);
  };

  const renderFormattedText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index}>{line.substring(2)}</h1>;
      }
      return <p key={index}>{line || <br />}</p>;
    });
  };

  return (
    <div className="about-container">
      {isEditor && (
        !isEditing ? (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit About Page
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
          value={aboutContent.fullText}
          onChange={(e) => setAboutContent({ fullText: e.target.value })}
          className="full-edit-textarea"
        />
      ) : (
        renderFormattedText(aboutContent.fullText)
      )}
    </div>
  );
}

export default About;
