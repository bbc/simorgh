import { css } from '@emotion/react';

// TODO: Use new theme API to get these styles and fonts
import {
  GEL_SPACING_DBL,
  GEL_SPACING_HLF_TRPL,
  GEL_SPACING,
} from '../../legacy/psammead/gel-foundations/src/spacings';
import {
  C_WHITE,
  C_POSTBOX,
} from '../../legacy/psammead/psammead-styles/src/colours';

export default {
  self: css({
    backgroundColor: C_WHITE,
    padding: GEL_SPACING_DBL,
    minHeight: 280,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  }),

  heading: css({}),

  textBody: css({
    margin: `${GEL_SPACING_HLF_TRPL} 0`,
  }),

  button: css({
    color: C_WHITE,
    backgroundColor: C_POSTBOX,
    border: 'none',
    fontWeight: 'bold',
    padding: GEL_SPACING,
    cursor: 'pointer',
  }),
};
