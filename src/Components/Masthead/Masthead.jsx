import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import './Masthead.css';


const MASTHEAD_ENDPOINT = `${BACKEND_URL}/users/masthead`;

function Masthead() {
  const [masthead, setMasthead] = useState(null);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchMasthead = async () => {
      try {
        const response = await axios.get(MASTHEAD_ENDPOINT);
        if (response.data && response.data.Masthead) {
          setMasthead(response.data.Masthead);
        } else {
          throw new Error('Invalid masthead data received');
        }
      } catch (err) {
        setError(`There was a problem retrieving the masthead. ${err.message}`);
      }
    };

    fetchMasthead();
  }, []);

  return (
    <div className="masthead-wrapper">
      <h1>Journal Masthead</h1>
      {/* Show error if there is one */}
      {error && <p className="error">{error}</p>}
      {/* Show loading message if masthead data is still null */}
      {!masthead ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Render Editors */}
          <h2>Editors</h2>
          {Array.isArray(masthead.Editor) && masthead.Editor.length > 0 ? (
            <ul>
              {masthead.Editor.map((editor, index) => (
                <li key={index}>
                  <strong>{editor.name}</strong> {/* Render editor names */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No editors available.</p>
          )}

          {/* Render Managing Editors */}
          <h2>Managing Editors</h2>
          {Array.isArray(masthead["Managing Editor"]) && masthead["Managing Editor"].length > 0 ? (
            <ul>
              {masthead["Managing Editor"].map((editor, index) => (
                <li key={index}>{editor}</li>
              ))}
            </ul>
          ) : (
            <p>No managing editors.</p>
          )}

          {/* Render Consulting Editors */}
          <h2>Consulting Editors</h2>
          {Array.isArray(masthead["Consulting Editor"]) && masthead["Consulting Editor"].length > 0 ? (
            <ul>
              {masthead["Consulting Editor"].map((editor, index) => (
                <li key={index}>{editor}</li>
              ))}
            </ul>
          ) : (
            <p>No consulting editors.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Masthead;
