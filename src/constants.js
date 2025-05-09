export const BACKEND_URL = (process.env.REACT_APP_URL_PRE || 'https://wl2612.pythonanywhere.com')

export const MANUSCRIPT_ACTIONS = {
  SUBMITTED: 'SUB',
  ACCEPT: 'ACC',
  ACCEPT_WITH_REV: 'ACW',
  ASSIGN_REF: 'ARF',
  DELETE_REF: 'DRF',
  DONE: 'DON',
  REJECT: 'REJ',
  WITHDRAW: 'WIT'
};

export const MANUSCRIPT_ACTION_TO_NAME = Object.fromEntries(
  Object.entries(MANUSCRIPT_ACTIONS).map(([key, value]) => [value, key])
);

export const DEFAULT_USER_ROLE = 'author';