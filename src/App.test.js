import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';

import App from './App';
import { homeHeader } from './App'; 

describe('App', () => {
  it('renders nav and home', async () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] });

    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    const heading = await screen.findByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(homeHeader);

    const items = await screen.findAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  });

  it('switches to People view', async () => {
    const history = createMemoryHistory({ initialEntries: ['/people'] });
  
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );
  
    userEvent.click(screen.getByRole('link', { name: /view people/i }));
  
    await screen.findByRole('heading', { name: /people/i }); 
  });
});
