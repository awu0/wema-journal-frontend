export const BACKEND_URL = (process.env.REACT_APP_URL_PRE || 'https://wl2612.pythonanywhere.com')

export const MANUSCRIPT_STATES = {
  // Submitted: 'SUB',
  // RefereeReview: 'REV',
  // AuthorRevisions: 'AUR',
  // EditorReview: 'ERW',
  // CopyEdit: 'CED',
  // AuthorReview: 'ARW',
  // Formatting: 'FMT',
  // Published: 'PUB',
  // Withdrawn: 'WIT',

  SUBMITTED: 'SUB',
  ACCEPT: 'ACC',
  ASSIGN_REF: 'ARF',
  DELETE_REF: 'DRF',
  DONE: 'DON',
  REJECT: 'REJ',
  WITHDRAW: 'WIT'
};