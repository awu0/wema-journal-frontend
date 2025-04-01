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

  const [sortConfig, setSortConfig] = useState({key: "title", direction: "asc"});

  const handleSort = (key) => {
    let direction = "asc";

    // toggle sorting order if the same column is clicked again
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({key, direction});
  };

  const sortedManuscripts = [...manuscripts].sort((a, b) => {
    let manuscriptA = a[sortConfig.key];
    let manuscriptB = b[sortConfig.key];

    if (typeof manuscriptA === "string") {
      manuscriptA = manuscriptA.toLowerCase();
      manuscriptB = manuscriptB.toLowerCase();
    }

    if (manuscriptA < manuscriptB) return sortConfig.direction === "asc" ? -1 : 1;
    if (manuscriptA > manuscriptB) return sortConfig.direction === "asc" ? 1 : -1;

    return 0;
  })

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
          <td
            onClick={() => handleSort("title")}>Title {sortConfig.key === "title" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</td>
          <td
            onClick={() => handleSort("author")}>Author {sortConfig.key === "author" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</td>
          <td
            onClick={() => handleSort("content")}>Content {sortConfig.key === "content" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</td>
          <td
            onClick={() => handleSort("datePublished")}>Date published {sortConfig.key === "datePublished" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</td>
          <td
            onClick={() => handleSort("state")}>State{sortConfig.key === "state" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</td>
        </tr>
        </thead>
        <tbody>
        {sortedManuscripts.map((manuscript) => ManuscriptRow(manuscript))}
        </tbody>
      </table>
      {error}
    </div>
  );
}


export default ViewManuscripts;