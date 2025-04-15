import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import './Masthead.css';

const PEOPLE_READ_ENDPOINT = `${BACKEND_URL}/users`;
const MASTHEAD_ENDPOINT = `${BACKEND_URL}/users/masthead`;

function Masthead() {
  const [masthead, setMasthead] = useState(null);
  const [error, setError] = useState('');
  
  const [people, setPeople] = useState([]);
  
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

  function peopleObjectToArray(Data) {
    const keys = Object.keys(Data);
    return keys.map((key) => Data[key]);
  }

  const fetchPeople = () => {
    axios.get(PEOPLE_READ_ENDPOINT)
      .then(
        ({data}) => {
          setPeople(peopleObjectToArray(data));
        }
      )
      .catch((error) => setError(`There was a problem retrieving the list of people. ${error}`));
  };

  useEffect(fetchPeople, []);
  
  const editors = people.filter(person => person.roles.includes('editor'));
  const managingEditors= people.filter(person => person.roles.includes('managing editor'));
  const consultingEditors = people.filter(person => person.roles.includes('consulting editor'));

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
          <h2>Editors</h2>
          {editors.length > 0 ? (
            <ul>
              {editors.map((person, index) => (
                <li key={index}>{person.name}</li>
              ))}
            </ul>
            
          ) : (
            <p>No editors available.</p>
          )}

          <h2>Managing Editors</h2>
          {managingEditors.length > 0 ? (
            <ul>
              {managingEditors.map((person, index) => (
                <li key={index}>{person.name}</li>
              ))}
            </ul>

          ) : (
            <p>No managing editors available.</p>
          )}

          <h2>Consulting Editors</h2>
          {consultingEditors.length > 0 ? (
            <ul>
              {consultingEditors.map((person, index) => (
                <li key={index}>{person.name}</li>
              ))}
            </ul>
          ) : (
            <p>No consulting editors available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Masthead;
