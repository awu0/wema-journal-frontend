import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import App from './App';
import { homeHeader } from './App'; // assumes homeHeader is something like "Welcome to WEMA"

describe('App', () => {
  it('renders nav and home', async () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    );

    // match a heading case-insensitively
    const heading = await screen.findByRole('heading');
    expect(heading).toHaveTextContent(homeHeader);

    const items = await screen.findAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0); // since nav has more than 3
  });

  it('switches to People view', async () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    );

    userEvent.click(screen.getByText(/view people/i)); // matches "View People"

    const heading = await screen.findByRole('heading');
    expect(heading).toHaveTextContent(/people/i);
  });
});
