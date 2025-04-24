import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Submissions from '../Components/Submissions/Submissions.jsx';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

describe('Submissions Component', () => {
    it('submits a manuscript successfully', async () => {
        axios.post.mockResolvedValueOnce({});
      
        render(<Submissions />);
        const titleInput = screen.getByLabelText(/Manuscript Title/i);
        const authorInput = screen.getByLabelText(/Author Name/i);
        const contentInput = screen.getByLabelText(/Manuscript Content/i);
        const submitButton = screen.getByRole('button', { name: /submit/i });
      
        await userEvent.type(titleInput, 'Test Title');
        await userEvent.type(authorInput, 'Test Author');
        await userEvent.type(contentInput, 'Test Content');
      
        await userEvent.click(submitButton);
      
        await waitFor(() =>
          expect(screen.getByText(/Submission successful!/i)).toBeInTheDocument()
        );
    });
      

    it('shows error message when submission fails', async () => {
        axios.post.mockRejectedValueOnce(new Error('Network Error'));
      
        render(<Submissions />);
        await userEvent.type(screen.getByLabelText(/Manuscript Title/i), 'Test Title');
        await userEvent.type(screen.getByLabelText(/Author Name/i), 'Test Author');
        await userEvent.type(screen.getByLabelText(/Manuscript Content/i), 'Test Content');
      
        await userEvent.click(screen.getByRole('button', { name: /submit/i }));
      
        await waitFor(() =>
          expect(screen.getByText(/Submission failed. Please try again./i)).toBeInTheDocument()
        );
    });
});
