import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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
      if (url.includes('/users')) {
        return Promise.resolve({
          data: {
            'pablo@nyu.edu': mockPeople[0],
            'jason@gmail.com': mockPeople[1]
          }
        });
      }
      if (url.includes('/roles')) {
        return Promise.resolve({ data: { Editor: 'Editor', Referee: 'Referee' } });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays people data', async () => {
    render(
      <BrowserRouter>
        <People />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Pablo')).toBeInTheDocument();
      expect(screen.getByText('Jason')).toBeInTheDocument();
    });
  });

  it('shows an error message if fetching people fails', async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes('/users')) {
        return Promise.reject(new Error('Failed to fetch'));
      }
      if (url.includes('/roles')) {
        return Promise.resolve({ data: { Editor: 'Editor', Referee: 'Referee' } });
      }
    });

    render(
      <BrowserRouter>
        <People />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByText(/There was a problem retrieving the list of people/i)
      ).toBeInTheDocument()
    );
  });
});