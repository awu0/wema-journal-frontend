import {useNavigate, useParams} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants";

const PEOPLE_READ_ENDPOINT = `${BACKEND_URL}/users`;
const PEOPLE_DELETE_ENDPOINT = `${BACKEND_URL}/users`;

export function PersonPage() {
  const navigate = useNavigate();
  
  const [person, setPerson] = useState(null);
  const [error, setError] = useState(null);
  const { email } = useParams();

  const fetchPerson = () => {
    axios
      .get(`${PEOPLE_READ_ENDPOINT}/${email}`)
      .then(({ data }) => {
        setPerson(data);
      })
      .catch(() => {
        setError(`There was a problem getting ${email}. They might not exist.`);
      });
  };
  
  const updatePerson = (email) => {return email}

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
          <p>Roles: {person.roles}</p>
          <p>Affiliation: {person.affiliation}</p>

          <div>
            <button onClick={() => updatePerson(person.email)}>X</button>
            <button onClick={() => deletePerson(person.email)}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}
