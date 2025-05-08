import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as api from "../../api";
import {useUser} from '../../userContext';
import {MANUSCRIPT_STATES} from '../../constants';


export function ManuscriptPage() {
  const {_id} = useParams();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [abstract, setAbstract] = useState("");
  const [content, setContent] = useState("");
  const [submission_date, setSubmission_date] = useState("");
  const [referees, setReferees] = useState([])

  const [originalState, setOriginalState] = useState("");
  const [state, setState] = useState('');
  const validStates = Object.entries(MANUSCRIPT_STATES);
  const {user} = useUser();
  const isEditor = user?.roles?.includes('editor');

  const [refereeForm, setRefereeForm] = useState('');

  const handleUpdateState = () => {
    api.manuscriptReceiveAction(_id, originalState, state, refereeForm)
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
        setReferees(data.ref)
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
      <p>State: {originalState}</p>
      <p>Referees: {Array.isArray(referees) && referees.length > 0 ? (
          <ul>
            {referees.map((ref, index) => (
              <li key={index}>{ref}</li>
            ))}
          </ul>
        ) : (
        <span>No referees available.</span>
        )}
      </p>

      {isEditor && (
        <div>
          <label htmlFor="state">Update State:</label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            {validStates.map(([label, code]) => (
              <option key={code} value={code}>{label}</option>
            ))}
          </select>

          {state === MANUSCRIPT_STATES.ASSIGN_REF && (
            <>
              <label htmlFor="referee">Referee:</label>
              <input value={refereeForm} onChange={(e) => setRefereeForm(e.target.value.trim())}/>
            </>
          )}

          {state === MANUSCRIPT_STATES.DELETE_REF && (
            <>
              <label htmlFor="referee">Referee:</label>
              <select
                value={refereeForm}
                onChange={(e) => setRefereeForm(e.target.value)}
              >
                <option value="">-- Select a referee --</option>
                {referees.map((ref, index) => (
                  <option key={index} value={ref}>
                    {ref}
                  </option>
                ))}
              </select>
            </>
          )}

          <button onClick={handleUpdateState}>Update State</button>
        </div>
      )}
    </div>
  );
}