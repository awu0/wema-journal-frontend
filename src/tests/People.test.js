import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import People from '../Components/People';

jest.mock('axios');

describe('People', () => {
    const mockPeople = [
        { name: 'Pablo', email: 'pablo@nyu.edu', roles: ['Editor'], affiliation: 'NYU' },
        { name: 'Jason', email: 'jason@gmail.com', roles: ['Referee'], affiliation: 'Google' }
    ];

    it('fetches and displays people data', async () => {
        axios.get.mockResolvedValueOnce({ data: mockPeople });

        render(<People />);

        await waitFor(() => expect(screen.getByText('Pablo')).toBeInTheDocument());
        expect(screen.getByText('Jason')).toBeInTheDocument();
    });

    it('shows an error message if fetching people fails', async () => {
        axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(<People />);

        await waitFor(() => expect(screen.getByText(/There was a problem retrieving the list of people/i)).toBeInTheDocument());
    });
});
