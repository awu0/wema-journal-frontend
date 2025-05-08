import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { useUser } from '../../userContext';
import * as api from "../../api";
import './Manuscripts.css';

const ManuscriptRow = (params) => {
  const { user } = useUser();
  const isEditor = user?.roles?.includes('editor');
  const {_id, title, author, abstract, content, submission_date, state} = params.manuscript
  const deleteManuscript = params.deleteManuscript

  return (
    <tr>
      <td>
        <Link to={_id}>
          {title}
        </Link>
      </td>
      <td>{author}</td>
      <td>{abstract}</td>
      <td>{content}</td>
      <td>{submission_date}</td>
      <td>{state}</td>
      {isEditor && (
        <td>
          <button onClick={() => deleteManuscript(_id)}>X</button>
        </td>
      )}
    </tr>
  )
}

function ViewManuscripts() {
  const { user } = useUser();
  const isEditor = user?.roles?.includes('editor');
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
    let manuscriptA = a[sortConfig.key] ?? "";
    let manuscriptB = b[sortConfig.key] ?? "";

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
    api.getManuscripts()
      .then(
        ({data}) => {
          setManuscripts(data);
        }
      )
      .catch((error) => setError(`There was a problem retrieving the list of manuscripts. ${error}`));
  };

  const deleteManuscript = (_id) => {
    api.deleteManuscript(_id)
      .then(() => {
        fetchManuscripts(); // Re-fetch manuscrript after deletion
      })
      .catch((error) => {
        setError(`There was a problem deleting the manuscript. ${error}`);
      });
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
          <td>Abstract</td>
          <td
            onClick={() => handleSort("content")}>Content {sortConfig.key === "content" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</td>
          <td
            onClick={() => handleSort("submission_date")}>Date
            published {sortConfig.key === "submission_date" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</td>
          <td
            onClick={() => handleSort("state")}>State{sortConfig.key === "state" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</td>
          {isEditor && <td>Delete</td>}
        </tr>
        </thead>
        <tbody>
        {sortedManuscripts.map((manuscript) => <ManuscriptRow key={manuscript._id} manuscript={manuscript} deleteManuscript={deleteManuscript} isEditor={isEditor} />)}
        </tbody>
      </table>
      {error}
    </div>
  );
}


export default ViewManuscripts;