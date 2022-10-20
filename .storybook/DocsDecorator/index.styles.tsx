import { css, Theme } from '@emotion/react';

const styles = {
  documentationList: (theme: Theme) =>
    css({
      listStyle: 'none',
      padding: 0,
      margin: 0,
    }),

  documentationListItem: {
    display: 'flex',
    alignContent: 'space-between',
    flexWrap: 'wrap',
    padding: '8px',
  },

  documentationLabel: { flex: '80%' },

  documentationLink: { flex: '20%' },
};

export default styles;
