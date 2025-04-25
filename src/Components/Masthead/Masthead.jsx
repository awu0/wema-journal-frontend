import React, { useEffect, useState } from 'react';
import './Masthead.css';
import { Link } from 'react-router-dom';
import * as api from "../../api";

function Masthead() {
  const [masthead, setMasthead] = useState(null);
  const [error, setError] = useState('');
  
  const [people, setPeople] = useState([]);
  
  useEffect(() => {
    const fetchMasthead = async () => {
      try {
        const response = await api.getMasthead();
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
    api.getUsers()
      .then(
        ({data}) => {
          setPeople(peopleObjectToArray(data));
        }
      )
      .catch((error) => setError(`There was a problem retrieving the list of people. ${error}`));
  };

  useEffect(fetchPeople, []);

  const authors = people.filter(person => person.roles.includes('author'));
  const referees = people.filter(person => person.roles.includes('referee'));
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
          <h2>Authors</h2>
          {authors.length > 0 ? (
            <ul>
              {authors.map((person, index) => (
                <li key={index}>{person.name}</li>
              ))}
            </ul>

          ) : (
            <p>No authors available.</p>
          )}

          <h2>Referee</h2>
          {referees.length > 0 ? (
            <ul>
              {referees.map((person, index) => (
                <li key={index}>
                <Link to={`/people/${person.email}`}>{person.name}</Link> {/* Link to PersonPage */}
              </li>
              ))}
            </ul>

          ) : (
            <p>No referees available.</p>
          )}
          
          <h2>Editors</h2>
          {editors.length > 0 ? (
            <ul>
              {editors.map((person, index) => (
                <li key={index}>
                <Link to={`/people/${person.email}`}>{person.name}</Link> {/* Link to PersonPage */}
              </li>
              ))}
            </ul>
            
          ) : (
            <p>No editors available.</p>
          )}

          <h2>Managing Editors</h2>
          {managingEditors.length > 0 ? (
            <ul>
              {managingEditors.map((person, index) => (
                <li key={index}>
                <Link to={`/people/${person.email}`}>{person.name}</Link> {/* Link to PersonPage */}
              </li>
              ))}
            </ul>

          ) : (
            <p>No managing editors available.</p>
          )}

          <h2>Consulting Editors</h2>
          {consultingEditors.length > 0 ? (
            <ul>
              {consultingEditors.map((person, index) => (
                <li key={index}>
                <Link to={`/people/${person.email}`}>{person.name}</Link> {/* Link to PersonPage */}
              </li>
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
