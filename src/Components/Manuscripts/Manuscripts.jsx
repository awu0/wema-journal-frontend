import React, {useEffect, useState} from 'react';
import {BACKEND_URL} from "../../constants";
import axios from "axios";
import {Link} from "react-router-dom";
import './Manuscripts.css';

const MANUSCRIPTS_READ_ENDPOINT = `${BACKEND_URL}/manuscripts`;

const ManuscriptRow = (manuscript) => {
  const {title, author, content, publication_date, state} = manuscript

  return (
    <tr>
      <td>
        <Link to={`manuscripts/${title}`}>
          {title}
        </Link>
      </td>
      <td>{author}</td>
      <td>{content}</td>
      <td>{publication_date}</td>
      <td>{state}</td>
    </tr>
  )
}

function ViewManuscripts() {
  const [manuscripts, setManuscripts] = useState([]);
  const [error, setError] = useState('');

  // fetch manuscript Data
  const fetchManuscripts = () => {
    axios.get(MANUSCRIPTS_READ_ENDPOINT)
      .then(
        ({data}) => {
          setManuscripts(data);
        }
      )
      .catch((error) => setError(`There was a problem retrieving the list of people. ${error}`));
  };

  useEffect(fetchManuscripts, []);

  return (
    <div className={"wrapper"}>
      <table className={'people-table'}>
        <thead>
        <tr>
          <td>Title</td>
          <td>Author</td>
          <td>Content</td>
          <td>Date published</td>
          <td>State</td>
        </tr>
        </thead>
        <tbody>
        {manuscripts.map((manuscript) => ManuscriptRow(manuscript))}
        </tbody>
      </table>
      {error}
    </div>
  );
}


export default ViewManuscripts;