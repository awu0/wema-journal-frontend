import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api";
import { useUser } from '../../userContext';
import { MANUSCRIPT_STATES } from '../../constants';


export function ManuscriptPage() {
  const {_id} = useParams();
  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [abstract, setAbstract] = useState("");
  const [content, setContent] = useState("");
  const [submission_date, setSubmission_date] = useState("");
  const [originalState, setOriginalState] = useState("");
  const [state, setState] = useState('');
  const validStates = Object.entries(MANUSCRIPT_STATES);
  const { user } = useUser();
  const isEditor = user?.roles?.includes('editor');


  const handleUpdateState = () => {
    api.manuscriptReceiveAction(_id, originalState,  state)
      .then(() => fetchManuscript())
      .catch((err) => console.error("Failed to update state:", err));
  };
  
  const fetchManuscript = () => {
    api.getManuscriptsById(_id)
      .then(({data}) => {
        setTitle(data.title);
        setAuthor(data.author);
        setAbstract(data.abstract);
        setContent(data.content);
        setSubmission_date(data.submission_date);
        setState(data.state);
        setOriginalState(data.state);
      })
  }

  useEffect(() => {
    fetchManuscript()
  }, [_id]);

  return (
    <div>
      <h1>{title}</h1>

      <p>Author: {author}</p>
      <p>Abstract: {abstract}</p>
      <p>Content: {content}</p>
      <p>Date submitted: {submission_date}</p>
      {isEditor ? (
        <div>
          <label htmlFor="state">State:</label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            {validStates.map(([label, code]) => (
              <option key={code} value={code}>{label}</option>
            ))}
          </select>
          <button onClick={handleUpdateState}>Update State</button>
        </div>
      ) : (
        <p>State: {state}</p>
      )}
    </div>
  );
}