import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BACKEND_URL } from '../../constants';

const PEOPLE_READ_ENDPOINT = `${BACKEND_URL}/users`;
const PEOPLE_CREATE_ENDPOINT = `${BACKEND_URL}/users`;
const PEOPLE_DELETE_ENDPOINT = `${BACKEND_URL}/users/`;

// Add Person Form
function AddPersonForm({
  visible,
  cancel,
  fetchPeople,
  setError,
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [affiliation, setAffiliation] = useState('');

  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changeAffliation = (event) => {
    setAffiliation(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: name,
      email: email,
      affiliation: affiliation,
      role: ''
    }
    axios.post(PEOPLE_CREATE_ENDPOINT, newPerson)
      .then(fetchPeople)
      .catch((error) => {
        console.log(error.toJSON())
        setError(`There was a problem adding the person. ${error}`);
      });
  };

  if (!visible) return null;
  return (
    <form>
      <label htmlFor="name">
        Name
      </label>
      <input required type="text" id="name" value={name} onChange={changeName}/>

      <label htmlFor="email">
        Email
      </label>
      <input required type="text" id="email" onChange={changeEmail}/>

      <label htmlFor="affiliation">
        Affiliation
      </label>
      <input type="text" id="affiliation" onChange={changeAffliation}/>
      <button type="button" onClick={cancel}>Cancel</button>
      <button type="submit" onClick={addPerson}>Submit</button>
    </form>
  );
}

AddPersonForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchPeople: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
};

// Error Message
function ErrorMessage({message}) {
  return (
    <div className="error-message">
      {message}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: propTypes.string.isRequired,
};

// Delete person function
function Person({person, deletePerson}) {
  const {name, email} = person;
  return (
    <div className="person-container">
      <Link to={`/people/${email}`}>
        <h2>{name}</h2>
        <p>Email: {email}</p>
      </Link>
      {/* Add the Delete Button */}
      <button onClick={() => deletePerson(email)}>X</button> {/* Button to delete person */}
    </div>
  );
}

Person.propTypes = {
  person: propTypes.shape({
    name: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
  }).isRequired,
  deletePerson: propTypes.func.isRequired,
};

// Function to Convert People Data to Array
function peopleObjectToArray(Data) {
  const keys = Object.keys(Data);
  const people = keys.map((key) => Data[key]);
  return people;
}

// Main People Component
function People() {
  const [error, setError] = useState('');
  const [people, setPeople] = useState([]);
  const [addingPerson, setAddingPerson] = useState(false);

  // Fetch People Data
  const fetchPeople = () => {
    axios.get(PEOPLE_READ_ENDPOINT)
      .then(
        ({data}) => {
          setPeople(peopleObjectToArray(data));
        }
      )
      .catch((error) => setError(`There was a problem retrieving the list of people. ${error}`));
  };

  // Show Add Person Form
  const showAddPersonForm = () => {
    setAddingPerson(true);
  };

  // Hide Add Person Form
  const hideAddPersonForm = () => {
    setAddingPerson(false);
  };

  // Delete Person Function
  const deletePerson = (email) => {
    axios.delete(`${PEOPLE_DELETE_ENDPOINT}${email}`)
      .then(() => {
        fetchPeople(); // Re-fetch people after deletion
      })
      .catch((error) => {
        setError(`There was a problem deleting the person. ${error}`);
      });
  };

  useEffect(fetchPeople, []);

  return (
    <div className="wrapper">
      <header>
        <h1>View All People</h1>
        <button type="button" onClick={showAddPersonForm}>
          Add a Person
        </button>
      </header>
      <AddPersonForm
        visible={addingPerson}
        cancel={hideAddPersonForm}
        fetchPeople={fetchPeople}
        setError={setError}
      />
      {error && <ErrorMessage message={error} />}
      {people.map((person) => (
        <Person key={person.email} person={person} deletePerson={deletePerson} />
      ))}
    </div>
  );
}

export default People;
