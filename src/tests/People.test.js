import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import People from '../Components/People';

jest.mock('axios');

describe('People', () => {
  const mockPeople = [
    { name: 'Pablo', email: 'pablo@nyu.edu', roles: ['Editor'], affiliation: 'NYU' },
    { name: 'Jason', email: 'jason@gmail.com', roles: ['Referee'], affiliation: 'Google' }
  ];

  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url === '/api/people') {
        return Promise.resolve({ data: mockPeople });
      }
      if (url === '/api/roles') {
        return Promise.resolve({ data: { Editor: 1, Referee: 2 } });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays people data', async () => {
    render(<People />);
    await waitFor(() => expect(screen.getByText('Pablo')).toBeInTheDocument());
    expect(screen.getByText('Jason')).toBeInTheDocument();
  });

  it('shows an error message if fetching people fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch')); // override people fetch just for this test

    render(<People />);
    await waitFor(() =>
      expect(
        screen.getByText(/There was a problem retrieving the list of people/i)
      ).toBeInTheDocument()
    );
  });
});
