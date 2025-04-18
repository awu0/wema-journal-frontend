import React, { useState } from 'react';
import { BACKEND_URL } from '../../constants';
import axios from 'axios';
import './Submissions.css';

function Submissions() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !content || !publicationDate) {
      setSubmissionStatus('Please fill out all fields.');
      return;
    }

    const submissionData = {
      title,
      author,
      content,
      "publication_date": publicationDate,
    };

    try {
      setSubmissionStatus('Submitting...');
      await axios.post(`${BACKEND_URL}/manuscripts`, submissionData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSubmissionStatus('Submission successful!');
      setTitle('');
      setAuthor('');
      setContent('');
      setPublicationDate('');
    } catch (error) {
      console.error('Error submitting manuscript:', error);
      setSubmissionStatus('Submission failed. Please try again.');
    }
  };

  return (
    <div className="submissions-page">

      {/* New Guidelines Section */}
      <div className="submission-guidelines">
        <h1>WEMA Submission Guidelines</h1>
        <div className="guidelines-content">
          <p>Please review the following requirements before submitting to WEMA Journal:</p>
          <ul>
            <li>Manuscripts must be original, unpublished work</li>
            <li>Title should be concise and descriptive</li>
            <li>Content must be properly formatted</li>
            <li>Include all author names</li>
            <li>Select the publication date</li>
          </ul>
        </div>
      </div>

      <h1>Submit Your Manuscript</h1>
      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="submission-form">
        <div className="form-group">
          <label htmlFor="title">Manuscript Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter manuscript title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author Name</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Manuscript Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter manuscript content"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="publicationDate">Publication Date</label>
          <input
            type="date"
            id="publicationDate"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>

        {submissionStatus && <p className="submission-status">{submissionStatus}</p>}
      </form>
    </div>
  );
}

export default Submissions;