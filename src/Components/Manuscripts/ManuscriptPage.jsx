import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as api from "../../api";
import {useUser} from '../../userContext';
import {MANUSCRIPT_ACTION_TO_NAME, MANUSCRIPT_ACTIONS, MANUSCRIPT_STATE_TO_NAME} from '../../constants';


export function ManuscriptPage() {
  const {_id} = useParams();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [abstract, setAbstract] = useState("");
  const [content, setContent] = useState("");
  const [submission_date, setSubmission_date] = useState("");
  const [referees, setReferees] = useState([])
  const [allReferees, setAllReferees] = useState([]);

  const [originalState, setOriginalState] = useState("");
  const [state, setState] = useState('');
  const [validStates, setValidStates] = useState([])
  const {user} = useUser();
  const isEditor = user?.roles?.includes('editor');

  const [refereeForm, setRefereeForm] = useState('');

  const handleUpdateState = () => {
    api.manuscriptReceiveAction(_id, originalState, state, refereeForm)
      .then(() => fetchManuscript())
      .catch((err) => console.error("Failed to update state:", err));
  };

  const fetchManuscript = async () => {
    try {
      // First, fetch the manuscript and update state
      const {data} = await api.getManuscriptsById(_id);
      setTitle(data.title);
      setAuthor(data.author);
      setAbstract(data.abstract);
      setContent(data.content);
      setSubmission_date(data.submission_date);
      setState(data.state);
      setReferees(data.ref || []);
      setOriginalState(data.state);

      const validActionsRes = await api.getManuscriptValidActions(data.state);
      setValidStates(validActionsRes.data.valid_actions);
    } catch (err) {
      console.error("Failed to fetch manuscript or valid states:", err);
    }
  }

  useEffect(() => {
    fetchManuscript();

    api.getUsers({ role: "referee" })
      .then(({ data }) => {
        console.log("Referee data:", data);
        if (Array.isArray(data)) {
          setAllReferees(data.filter(user => 
            user.roles && user.roles.includes('referee')
          ).map(user => user.email));
        } else {
          const refereeEmails = [];
          Object.entries(data).forEach(([email, userData]) => {
            if (userData.roles && userData.roles.includes('referee')) {
              refereeEmails.push(email);
            }
          });
          setAllReferees(refereeEmails);
        }
      })
      .catch((err) => console.error("Failed to fetch referees:", err));
  }, [_id]);

  return (
    <div>
      <h1>{title}</h1>

      <p>Author: {author}</p>
      <p>Abstract: {abstract}</p>
      <p>Content: {content}</p>
      <p>Date submitted: {submission_date}</p>
      <p>State: {MANUSCRIPT_STATE_TO_NAME[originalState]} ({originalState})</p>
      <div>Referees: {Array.isArray(referees) && referees.length > 0 ? (
        <ul>
          {referees.map((ref, index) => (
            <li key={index}>{ref}</li>
          ))}
        </ul>
      ) : (
        <span>No referees available.</span>
      )}
      </div>

      <label htmlFor="state">Update State:</label>
      <select
        id="state"
        value={state}
        onChange={(e) => setState(e.target.value)}
      >
        <option value="">-- Select Action --</option>
        {validStates
          .filter(action => {
            const isAuthorOfThis = user?.name === author;

            if (!isAuthorOfThis && action === MANUSCRIPT_ACTIONS.WITHDRAW) {
              return false; 
            }
            if (isAuthorOfThis && state === MANUSCRIPT_STATE_TO_NAME.IN_AUTHOR_REVIEW && action === MANUSCRIPT_ACTIONS.DONE) {
              return true; 
            }
            if (isAuthorOfThis && state === MANUSCRIPT_STATE_TO_NAME.AUTHOR_REVISIONS && action === MANUSCRIPT_ACTIONS.DONE) {
              return true; 
            }

            return true; // allow everything else
          })
          .map(action => (
            <option key={action} value={action}>
              {MANUSCRIPT_ACTION_TO_NAME[action]} ({action})
            </option>
          ))}
      </select>

      {isEditor && (
        <div>
          {state === MANUSCRIPT_ACTIONS.ASSIGN_REF && (
            <>
              <label htmlFor="referee">Referee:</label>
              <select
                value={refereeForm}
                onChange={(e) => setRefereeForm(e.target.value)}
              >
                <option value="">-- Select a referee --</option>
                {allReferees.map((ref, index) => (
                  <option key={index} value={ref}>
                    {ref}
                  </option>
                ))}
              </select>
            </>
          )}

          {state === MANUSCRIPT_ACTIONS.DELETE_REF && (
            <>
              <label htmlFor="referee">Referee:</label>
              <select
                value={refereeForm}
                onChange={(e) => setRefereeForm(e.target.value)}
              >
                <option value="">-- Select a referee --</option>
                {referees?.map((ref, index) => (
                  <option key={index} value={ref}>
                    {ref}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      )}

        <button onClick={handleUpdateState}>Update State</button>
    </div>
  );
}