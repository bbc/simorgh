import { css, Theme } from '@emotion/react';

const styles = {
  wrapper: ({ fontMq }: Theme) =>
    css({
      display: 'flex',
      flexWrap: 'wrap',
      padding: 0,
      fontFamily: 'ReithSahs, Arial, Helvetica, sans-serif',
      fontSize: '1rem',
      borderBottom: '1px solid #bdbdbd',
      [fontMq.GROUP_D_MIN_WIDTH]: {
        padding: '0.5rem',
      },
    }),

  navItem: ({ isActive, isLast }: { isActive?: boolean; isLast?: boolean }) =>
    css({
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 0.5rem',
      position: 'relative',
      borderBottom: isActive ? '4px solid #b80000' : '4px solid transparent',
      '&:hover, &:focus': {
        borderBottom: '4px solid #b80000',
        outline: 'none',
        cursor: 'pointer',
      },
      '&::after': {
        content: '""',
        display: isLast ? 'none' : 'block',
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: '1px',
        height: '1.25rem',
        backgroundColor: '#222',
      },
    }),

  navLink: css({
    textDecoration: 'none',
    color: '#202224',
    fontFamily: 'BBC Reith Sans',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: '0%',
  }),

  navSummary: css({
    listStyle: 'none',
    border: 'none',
    background: 'none',
  }),

  dropDown: css({
    width: '100%',
    padding: '0.5rem 0',
  }),

  dropDownHeader: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),

  dropDownTitle: css({
    fontSize: '1.25rem',
    fontFamily: 'BBC Reith Sans',
    fontWeight: 700,
    lineHeight: '1.375rem',
    letterSpacing: '0%',
    padding: '0.75rem',
  }),

  closeButton: css({
    border: 'none',
    background: 'none',
    padding: 0,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.375rem',
    height: '1.375rem',
    color: '#000000',
  }),

  dropDownItem: css({
    padding: '0.75rem 0.5rem',
    borderBottom: '1px solid #bdbdbd',
    width: '100%',
    '&:hover, &:focus, &.active': {
      borderLeft: '4px solid #b80000',
      outline: 'none',
      backgroundColor: '#e6e8ea',
    },
  }),

  dropDownLink: css({
    textDecoration: 'none',
    color: '#202224',
    fontFamily: 'BBC Reith Sans',
    fontWeight: 400,
    lineHeight: '1.375rem',
    letterSpacing: '0%',
  }),
};

export default styles;
