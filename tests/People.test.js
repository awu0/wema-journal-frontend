import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import People from './People';

jest.mock('axios');

describe('People', () => {
  const mockPeople = [
    { name: 'Alice', email: 'alice@example.com', roles: ['Manager'], affiliation: 'NYU' },
    { name: 'Bob', email: 'bob@example.com', roles: ['Engineer'], affiliation: 'Google' }
  ];
});
