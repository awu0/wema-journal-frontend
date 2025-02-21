import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants";

const PEOPLE_READ_ENDPOINT = `${BACKEND_URL}/users`;

const personObjectToArray = (data) => {
  return Array.isArray(data) ? data : [data];
};

export function PersonPage() {
  const [person, setPerson] = useState(null);
  const [error, setError] = useState(null);
  const { email } = useParams();

  const fetchPerson = () => {
    axios
      .get(`${PEOPLE_READ_ENDPOINT}/${email}`)
      .then(({ data }) => {
        setPerson(personObjectToArray(data));
      })
      .catch(() => {
        setError(`There was a problem getting ${email}. They might not exist.`);
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
      <p>Email: {email}</p>
      {/* Handling error */}
      {error ? <p>{error}</p> : null}
      {/* Display person information if no error */}
      {person && (
        <>
          <p>Name: {person.name}</p>
          <p>More information: ...</p>
        </>
      )}
    </div>
  );
}
