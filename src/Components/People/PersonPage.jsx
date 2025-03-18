import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_URL} from "../../constants";

const PEOPLE_READ_ENDPOINT = `${BACKEND_URL}/users`;
const PEOPLE_UPDATE_ENDPOINT = `${BACKEND_URL}/users`;
const PEOPLE_DELETE_ENDPOINT = `${BACKEND_URL}/users`;
const ROLES_ENDPOINT = `${BACKEND_URL}/roles`

export function PersonPage() {
  const navigate = useNavigate();
  const {email: initialEmail} = useParams();

  const [person, setPerson] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [role, setRole] = useState('');

  const [roleOptions, setRoleOptions] = useState({});

  const [error, setError] = useState(null);

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

  const fetchPerson = () => {
    axios
      .get(`${PEOPLE_READ_ENDPOINT}/${initialEmail}`)
      .then(({data}) => {
        setPerson(data);
        setName(data.name);
        setEmail(data.email);
        setAffiliation(data.affiliation);
        setRole(data.role);
      })
      .catch(() => {
        setError(`There was a problem getting ${email}. They might not exist.`);
      });
  };

  const getRoles = () => {
    axios.get(ROLES_ENDPOINT)
      .then(({data}) => setRoleOptions(data))
      .catch((error) => {
        setError(`There was a problem getting roles. ${error}`);
      });
  }

  const updatePerson = () => {
    const updatedPerson = {
      name: name,
      email: email,
      affiliation: affiliation,
      role: role,
    }
    axios.patch(`${PEOPLE_UPDATE_ENDPOINT}/${email}`, updatedPerson)
      .then(() => {
        console.log("hiIIIII")
      })
      .catch(() => {
        setError(`There was a problem updating the person. ${error}`);
      })
  }

  const deletePerson = (email) => {
    axios.delete(`${PEOPLE_DELETE_ENDPOINT}/${email}`)
      .then(() => {
        navigate("/people"); // redirect to people homepage
      })
      .catch((error) => {
        setError(`There was a problem deleting the person. ${error}`);
      });
  };

  useEffect(() => {
    fetchPerson();
  }, [email]);

  useEffect(getRoles, []);

  if (!person && !error) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Person Information</h1>
      {/* Handling error */}
      {error ? <p>{error}</p> : null}
      {/* Display person information if no error */}

      {person && (
        <div className={'person-container'}>
          <p>Name: {person.name}</p>
          <p>Email: {person.email}</p>
          {/* Roles aren't getting the list */}
          <p>Roles: {person.role}</p>
          <p>Affiliation: {person.affiliation}</p>

          <form>
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
              {Object.keys(roleOptions).map((code) => (
                <option key={code}>
                  {roleOptions[code]}
                </option>
              ))}
            </select>
          </form>

          <div>
            <button onClick={() => updatePerson()}>Update</button>
            <button onClick={() => deletePerson(email)}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}
