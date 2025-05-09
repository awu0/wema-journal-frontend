import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as api from "../../api"
import './styles.css';

export function PersonPage() {
  const navigate = useNavigate();

  const {email: initialEmail} = useParams();

  const [person, setPerson] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [roles, setRoles] = useState([]);
  const [password, setPassword] = useState('');

  const [roleOptions, setRoleOptions] = useState({});

  // used to display items when updating the person
  const [editing, setEditing] = useState(false);

  const [error, setError] = useState(null);

  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeEmail = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
    console.log(email);
  };
  const changeAffiliation = (event) => {
    setAffiliation(event.target.value);
  };
  const changeRoles = (event) => {
    const selected = Array.from(event.target.selectedOptions, (option) => option.value);
    setRoles(selected);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const fetchPerson = () => {
    api.getUserByEmail(initialEmail)
      .then(({data}) => {
        setPerson(data);
        setName(data.name);
        setEmail(data.email);
        setAffiliation(data.affiliation);
        setRoles(data.roles);
        setPassword(data.password)
      })
      .catch(() => {
        setError(`There was a problem getting ${email}. They might not exist.`);
      });
  };

  const getRoles = () => {
    api.getRoles()
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
      roles: roles,
      password: password,
    }
    api.updateUser(email, updatedPerson)
      .then(() => {
        setPerson(updatedPerson);
        setEditing(false);
        fetchPerson();
      })
      .catch(() => {
        setError(`There was a problem updating the person. ${error}`);
      })
  }

  const deletePerson = (email) => {
    api.deleteUser(email)
      .then(() => {
        navigate("/people"); // redirect to people homepage
      })
      .catch((error) => {
        setError(`There was a problem deleting the person. ${error}`);
      });
  };

  const handleEditing = () => {
    setEditing(!editing);
  }

  useEffect(() => {
    fetchPerson();
  }, [initialEmail]);

  useEffect(getRoles, []);

  if (!person && !error) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!person) {
    return <p>Loading...</p>;
  }

  return (
    <div className={'wrapper'}>
      <h1>{person.name}</h1>
      {/* Handling error */}
      {error ? <p>{error}</p> : null}
      {/* Display person information if no error */}


      <div className={'person-container'}>

        {!editing && (
          <div>
            <p>Email: {person.email}</p>
            {/* Roles aren't getting the list */}
            <p>Roles: {person.roles && person.roles.length > 0 ? person.roles.join(', ') : 'N/A'}</p>
            <p>Affiliation: {person.affiliation}</p>
          </div>
        )}

        {editing && (
          <div>
            <form>
              <label htmlFor="name">
                Name
              </label>
              <input required type="text" id="name" value={name} onChange={changeName}/>

              <label htmlFor="email">
                Email
              </label>
              <input required disabled={true} type="text" id="email" value={email} onChange={changeEmail}/>

              <label htmlFor="affiliation">
                Affiliation
              </label>
              <input type="text" id="affiliation" value={affiliation} onChange={changeAffiliation}/>

              <label htmlFor="roles">
                Roles
              </label>
              <select
                multiple
                required
                name="roles"
                value={roles}
                onChange={changeRoles}
                // style={{padding: '24px 8px 24px 8px', borderRadius: '4px', border: '1px solid #ccc'}}
                className={'roles-select'}
              >
                {Object.keys(roleOptions).map((code) => (
                  <option key={code}>
                    {roleOptions[code]}
                  </option>
                ))}
              </select>
             
              <label htmlFor="password">
                New Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Leave blank to keep current password"
                value={password}
                onChange={changePassword}
              />
            </form>

            <div>
              <button onClick={() => updatePerson()}>Update</button>
              <button onClick={() => deletePerson(email)}>X</button>
            </div>
          </div>
        )}
      </div>

      <div>
        <button onClick={handleEditing}>{editing ? 'Cancel' : 'Edit'}</button>
      </div>
    </div>
  );
}
