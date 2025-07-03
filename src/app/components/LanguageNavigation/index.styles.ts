import styled from '@emotion/styled';
// import { MediaQueries } from '../../models/types/theming';

// WRAPPER FOR AFRICA, ASIA, ETC
export const Wrapper = styled.nav(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: 0,
  fontFamily: 'ReithSahs, Arial, Helvetica, sans-serif',
  fontSize: '1rem',
  borderBottom: '1px solid #bdbdbd',

  [theme.fontMq.GROUP_D_MIN_WIDTH]: {
    padding: '0.5rem',
  },
}));

// CONTAINER FOR EACH TOP NAV ITEM
export const NavItem = styled.div<{
  isLast?: boolean;
  isActive?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 0.75rem 0.5rem;
  position: relative;
  border-bottom: 4px solid transparent;

  ${({ isActive }) =>
    isActive &&
    `
      border-bottom: 4px solid #b80000;
    `}

  &:hover,
  &:focus {
    border-bottom: 4px solid #b80000;
    outline: none;
    cursore: pointer;
  }

  &::after {
    content: '';
    display: ${props => (props.isLast ? 'none' : 'block')};
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 1.25rem;
    background-color: #222;
  }
`;

// "HOME"
export const NavLink = styled.a`
  text-decoration: none;
  color: #202224;
  font-family: BBC Reith Sans;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0%;
`;

// "AFRICA, ASIA, ETC"
export const NavSummary = styled.summary`
  list-style: none;
  border: none;
  background: none;
`;

//

// DROPDOWN CONTAINER
export const DropDown = styled.nav({
  width: '100%',
  padding: '0.5rem 0',

  // [MediaQueries.GROUP_3_MIN_WIDTH]: {
  //   padding: '0.5rem',
  // },
  // [MediaQueries.GROUP_4_MIN_WIDTH]: {
  //   padding: '0.5rem',
  // },
});

// NAME + CLOSE BUTTON IN DROPDOWN
export const DropDownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// NAME IN DROPDOWN HEADER
export const DropDownTitle = styled.span`
  font-size: 1rem;
  font-family: BBC Reith Sans;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.375rem;
  letter-spacing: 0%;
  padding: 0.75rem;
`;

// CLOSE BUTTON IN DROPDOWN HEADER
export const CloseButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.375rem;
  height: 1.375rem;
  color: #black;
`;

// CONTAINER FOR EACH ITEM IN DROPDOWN
export const DropDownItem = styled.div`
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid #bdbdbd;
  width: 100%;

  &:hover,
  &:focus,
  &.active {
    border-left: 4px solid #b80000;
    outline: none;
    background-color: #e6e8ea;
  }
`;

// EACH ITEM IN DROPDOWN
export const DropDownLink = styled.a`
  text-decoration: none;
  color: #202224;
  font-family: BBC Reith Sans;
  font-weight: 400;
  line-height: 1.375rem;
  letter-spacing: 0%;
`;
