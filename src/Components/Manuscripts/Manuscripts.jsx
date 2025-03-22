import React, {useEffect, useState} from 'react';
import {BACKEND_URL} from "../../constants";
import axios from "axios";
import {Link} from "react-router-dom";
import './Manuscripts.css';

const MANUSCRIPTS_READ_ENDPOINT = `${BACKEND_URL}/manuscripts`;

const Manuscript = (manuscript) => {
    const {title, author, content, publication_date, state} = manuscript
    
    return <div className="manuscript-container">
        <Link to={`manuscripts/${title}`}>
            <h2>Title: {title}</h2>
            <p>Author: {author}</p>
            <p>Content: {content}</p>
            <p>Date published: {publication_date}</p>
            <p>State: {state}</p>
        </Link>
    </div>
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
        <div>
            {manuscripts.map((manuscript) => Manuscript(manuscript))}
            { error }
        </div>
    );
}


export default ViewManuscripts;