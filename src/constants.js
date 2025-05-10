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

export const MANUSCRIPT_STATES = {
  COPY_EDIT: 'CED',
  IN_REF_REVIEW: 'REV',
  AUTHOR_REVISIONS: 'AUR',
  SUBMITTED: 'SUB',
  REJECTED: 'REJ',
  WITHDRAWN: 'WIT',
  IN_EDITOR_REVIEW: 'ERW',
  IN_AUTHOR_REVIEW: 'ARW',
  FORMATTING: 'FMT',
  PUBLISHED: 'PUB'
};

export const MANUSCRIPT_STATE_TO_NAME = Object.fromEntries(
  Object.entries(MANUSCRIPT_STATES).map(([key, value]) => [value, key])
);

export const DEFAULT_USER_ROLE = 'author';