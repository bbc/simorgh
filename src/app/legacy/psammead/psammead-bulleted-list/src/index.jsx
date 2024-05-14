import styled from '@emotion/styled';
import { getBodyCopy } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';
import { SHADOW } from '#app/components/ThemeProvider/palette';

const BulletedList = styled.ul`
  ${({ script }) => script && getBodyCopy(script)};
  ${({ service }) => getSansRegular(service)};
  margin-top: 0;
  list-style-type: none;

  & > li {
    position: relative;
    color: ${({ theme }) => theme.isDarkUi && theme.palette.GREY_2};
  }

  & > li::before {
    top: 0.5rem;
    content: ' ';
    position: absolute;
    border-width: 1rem;
    border: 0.1875rem solid
      ${({ bulletPointColour, theme }) =>
        theme.isDarkUi ? theme.palette.GREY_4 : bulletPointColour};
    background-color: ${({ bulletPointColour, theme }) =>
      theme.isDarkUi ? theme.palette.GREY_4 : bulletPointColour};
    border-radius: ${({ bulletPointShape }) =>
      bulletPointShape === 'round' ? '50%' : '0'};
    ${({ dir }) => (dir === 'rtl' ? 'right: -1rem;' : 'left: -1rem;')}
  }
`;

BulletedList.defaultProps = {
  dir: 'ltr',
  role: 'list',
  bulletPointShape: 'round',
  bulletPointColour: SHADOW,
};

export const BulletedListItem = styled.li`
  margin-bottom: ${GEL_SPACING_DBL};
`;

BulletedListItem.defaultProps = {
  role: 'listitem',
};

export default BulletedList;
