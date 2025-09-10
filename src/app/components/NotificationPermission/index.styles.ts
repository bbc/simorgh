import { css } from '@emotion/react';

const styles = {
  container: css({
    display: 'flex',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    backgroundColor: '#b80000', // BBC red
    position: 'relative',
    zIndex: 10,
  }),
  button: css({
    backgroundColor: 'white',
    color: '#222222',
    border: 'none',
    borderRadius: '0.25rem',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 0 0.25rem rgba(255, 255, 255, 0.3)',
    },
  }),
};

export default styles;
