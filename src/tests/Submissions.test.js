import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Submissions from './Submissions';

jest.mock('axios');

describe('Submissions Component', () => {
    it('renders list of manuscripts from the backend', async () => {
        const mockManuscripts = [
            { title: 'Title 1', author: 'Author 1', content: 'Content 1', publication_date: '01/01/2025', state: 'Published' },
            { title: 'Title 2', author: 'Author 2', content: 'Content 2', publication_date: '01/02/2025', state: 'Pending' }
        ];
        axios.get.mockResolvedValueOnce({ data: mockManuscripts });

        render(<Submissions />);

        await waitFor(() => {
            expect(screen.getByText('Title: Title 1')).toBeInTheDocument();
            expect(screen.getByText('Title: Title 2')).toBeInTheDocument();
        });
    });
});
