import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api";


export function ManuscriptPage() {
  const {_id} = useParams();
  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [abstract, setAbstract] = useState("");
  const [content, setContent] = useState("");
  const [submission_date, setSubmission_date] = useState("");
  const [state, setState] = useState('');
  
  const fetchManuscript = () => {
    api.getManuscriptsById(_id)
      .then(({data}) => {
        setTitle(data.title);
        setAuthor(data.author);
        setAbstract(data.abstract);
        setContent(data.content);
        setSubmission_date(data.submission_date);
        setState(data.state);
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
      <p>State: {state}</p>
    </div>
  );
}