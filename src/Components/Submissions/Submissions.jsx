import React, {useEffect, useState} from 'react';
import {BACKEND_URL} from "../../constants";
import axios from "axios";

const SUBMISSIONS_READ_ENDPOINT = `${BACKEND_URL}/manuscripts`;

const Manuscript = (manuscript) => {
    const {title, author, content, publication_date, state} = manuscript
    
    return <div>
        <h1>Title: {title}</h1>
        <p>Author: {author}</p>
        <p>Content: {content}</p>
        <p>Date published: {publication_date}</p>
        <p>State: {state}</p>
    </div>
}

function Submissions() {
    const [manuscripts, setManuscripts] = useState([]);
    const [error, setError] = useState('');
    
    // fetch manuscript Data
    const fetchManuscripts = () => {
        axios.get(SUBMISSIONS_READ_ENDPOINT)
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


export default Submissions;