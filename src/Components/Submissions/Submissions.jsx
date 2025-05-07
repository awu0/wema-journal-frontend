import React, { useState } from 'react';
import { BACKEND_URL } from '../../constants';
import { useUser } from '../../userContext';
import axios from 'axios';
import './Submissions.css';

function Submissions() {
  const { user } = useUser();
  const isEditor = user?.roles?.includes('editor');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [abstract, setAbstract] = useState('');
  const [content, setContent] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [isEditingGuidelines, setIsEditingGuidelines] = useState(false);
  const [guidelinesText, setGuidelinesText] = useState(
    `Please review the following requirements before submitting to WEMA Journal:
    
    • Manuscripts must be original, unpublished work
    • Title should be concise and descriptive
    • Content must be properly formatted
    • Include all author names`
  );
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !abstract || !content) {
      setSubmissionStatus('Please fill out all fields.');
      return;
    }

    const submissionData = {
      title,
      author,
      abstract,
      content,
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
      setAbstract('');
      setContent(''); 
    } catch (error) {
      console.error('Error submitting manuscript:', error);
      setSubmissionStatus('Submission failed. Please try again.');
    }
  };

  return (
    <div className="submissions-page">
      {/* NEW EDITABLE GUIDELINES SECTION */}
      <div className="submission-guidelines">
        <div className="guidelines-header">
          <h1>WEMA Submission Guidelines</h1>
          {isEditor && (
            <button 
              onClick={() => setIsEditingGuidelines(!isEditingGuidelines)}
              className="edit-guidelines-btn"
            >
              {isEditingGuidelines ? 'Save' : 'Edit'}
            </button>
          )}
        </div>
        
        <div className="guidelines-content">
          {isEditingGuidelines ? (
            <textarea
              className="guidelines-textarea"
              value={guidelinesText}
              onChange={(e) => setGuidelinesText(e.target.value)}
              rows="8"
            />
          ) : (
            <div className="displayed-guidelines">
              {guidelinesText.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
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
          <label htmlFor="content">Manuscript Abstract</label>
          <textarea
            id="abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            placeholder="Enter manuscript abstract"
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

        <button type="submit" className="submit-button">
          Submit
        </button>

        {submissionStatus && <p className="submission-status">{submissionStatus}</p>}
      </form>
    </div>
  );
}

export default Submissions;