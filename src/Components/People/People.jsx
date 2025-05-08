import React, {useEffect, useState} from 'react';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { useUser } from '../../userContext';

import * as api from "../../api";

// Add Person Form
function AddPersonForm({
                         visible, cancel, fetchPeople, setSuccess, setError, roleOptions,
                       }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changeAffliation = (event) => {
    setAffiliation(event.target.value);
  };
  const changeRole = (event) => {
    setRole(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: name, email: email, affiliation: affiliation, role: role, password: password,
    }
    api.createUser(newPerson)
      .then(fetchPeople)
      .then(() => {
        // clear the form
        setName('')
        setEmail('')
        setAffiliation('')
        setRole('')

        // set the success message
        setSuccess(`Successfully added ${newPerson.name}`)
      })
      .catch((error) => {
        console.log(error.toJSON())
        setError(`There was a problem adding the person. ${error}`);
      });
  };

  if (!visible) return null;
  return (<form>
      <label htmlFor="name">
        Name
      </label>
      <input required type="text" id="name" value={name} onChange={changeName}/>

      <label htmlFor="email">
        Email
      </label>
      <input required type="text" id="email" value={email} onChange={changeEmail}/>

      <label htmlFor="affiliation">
        Affiliation
      </label>
      <input type="text" id="affiliation" value={affiliation} onChange={changeAffliation}/>

      <label htmlFor="role">
        Role
      </label>
      <select
        required
        name="role"
        value={role}
        onChange={changeRole}
        style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
      >
        <option value="" disabled>Select a role</option>
        {/* Default option */}
        {Object.keys(roleOptions).map((code) => (<option key={code}>
            {roleOptions[code]}
          </option>))}
      </select>
      <label htmlFor="password">
        Password
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={changePassword}
        required
      />

      <button type="button" onClick={cancel}>Cancel</button>
      <button type="submit" onClick={addPerson}>Submit</button>
    </form>);
}

AddPersonForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchPeople: propTypes.func.isRequired,
  setSuccess: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
  roleOptions: propTypes.object.isRequired,
};

// Success Message
const SuccessMessage = ({message}) => {
  return <div>
    <div className="success-message">
      {message}
    </div>
  </div>
}

SuccessMessage.propTypes = {
  message: propTypes.string.isRequired,
};

// Error Message
function ErrorMessage({message}) {
  return (<div className="error-message">
      {message}
    </div>);
}

ErrorMessage.propTypes = {
  message: propTypes.string.isRequired,
};


// Function to Convert People Data to Array
function peopleObjectToArray(Data) {
  const keys = Object.keys(Data);
  return keys.map((key) => Data[key]);
}

function PersonRow({person, deletePerson}) {
  const {name, email, roles, affiliation} = person;
  const { user } = useUser();
  const isEditor = user?.roles?.includes('editor');

  return (<tr>
      <td>
        {isEditor ? (
          <Link to={`/people/${email}`}>
            {name}
          </Link>
        ) : (
          name
        )}
      </td>
      <td>{email}</td>
      <td>{roles && roles.length > 0 ? roles.join(', ') : 'N/A'}</td>
      <td>{affiliation || 'N/A'}</td>
      {isEditor && (
        <td>
          <button onClick={() => deletePerson(email)}>X</button>
        </td>
      )}
    </tr>);
}

PersonRow.propTypes = {
  person: propTypes.shape({
    name: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    roles: propTypes.arrayOf(propTypes.string).isRequired,
    affiliation: propTypes.string
  }).isRequired, deletePerson: propTypes.func.isRequired,
};

// Main People Component
function People() {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { user } = useUser();
  const isEditor = user?.roles?.includes('editor');

  const [people, setPeople] = useState([]);
  const [addingPerson, setAddingPerson] = useState(false);

  const [roleMap, setRoleMap] = useState({});

  const [sortConfig, setSortConfig] = useState({key: "name", direction: "asc"});

  const handleSort = (key) => {
    let direction = "asc";

    // toggle sorting order if the same column is clicked again
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({key, direction});
  };

  const sortedPeople = [...people].sort((a, b) => {
    let personA = a[sortConfig.key] ?? "";
    let personB = b[sortConfig.key] ?? "";

    if (typeof personA === "string") {
      personA = personA.toLowerCase();
      personB = personB.toLowerCase();
    }

    if (personA < personB) return sortConfig.direction === "asc" ? -1 : 1;
    if (personA > personB) return sortConfig.direction === "asc" ? 1 : -1;

    return 0;
  })

  // Fetch People Data
  const fetchPeople = () => {
    api.getUsers()
      .then(({data}) => {
        setPeople(peopleObjectToArray(data));
      })
      .catch((error) => setError(`There was a problem retrieving the list of people. ${error}`));
  };

  const getRoles = () => {
    api.getRoles()
      .then(({data}) => setRoleMap(data))
      .catch((error) => {
        setError(`There was a problem getting roles. ${error}`);
      });
  }

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
    api.deleteUser(email)
      .then(() => {
        fetchPeople(); // Re-fetch people after deletion
      })
      .catch((error) => {
        setError(`There was a problem deleting the person. ${error}`);
      });
  };

  useEffect(fetchPeople, []);
  useEffect(getRoles, []);

  return (<div className="wrapper">
      <header>
        <h1>View People</h1>
        {isEditor && (
          <button type="button" onClick={showAddPersonForm}>
            Add a Person
          </button>
        )}
      </header>
      <AddPersonForm
        visible={addingPerson}
        cancel={hideAddPersonForm}
        fetchPeople={fetchPeople}
        setSuccess={setSuccess}
        setError={setError}
        roleOptions={roleMap}
      />
      {success && <SuccessMessage message={success}/>}
      {error && <ErrorMessage message={error}/>}

      <table className={"people-table"}>
        <thead>
        <tr>
          <td
            onClick={() => handleSort("name")}>Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</td>
          <td
            onClick={() => handleSort("email")}>Email {sortConfig.key === "email" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</td>
          <td
            onClick={() => handleSort("roles")}>Roles {sortConfig.key === "roles" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</td>
          <td
            onClick={() => handleSort("affiliation")}>Affiliation {sortConfig.key === "affiliation" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</td>
          {isEditor && <td>Delete</td>}
        </tr>
        </thead>
        <tbody>
        {sortedPeople.map((person) => <PersonRow
          key={person.email}
          person={person}
          fetchPeople={fetchPeople}
          roleMap={roleMap}
          deletePerson={deletePerson}
        />)}
        </tbody>
      </table>

    </div>);
}

export default People;
