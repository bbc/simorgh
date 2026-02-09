import React from 'react';
import { useTheme, CSSObject } from '@emotion/react';
import { DropdownUl } from '#psammead/psammead-navigation/src/DropdownNavigation';

const topLevelNavLinks = [
  { title: 'Home', url: '/' },
  { title: 'Watch', url: '/watch' },
  { title: 'Listen', url: '/listen' },
];

const topLevelNavContainerStyles = (theme): CSSObject => ({
  backgroundColor: theme.palette.BRAND_BACKGROUND,
  padding: '0.5rem 0',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center' as const,
});

const topLevelNavListStyles: CSSObject = {
  display: 'flex',
  justifyContent: 'center',
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const topLevelNavItemStyles: CSSObject = {
  margin: '0 1rem',
};

const topLevelNavLinkStyles = (theme): CSSObject => ({
  color: theme.palette.WHITE,
  textDecoration: 'none',
  fontWeight: 700,
  fontSize: '1rem',
  padding: '0.5rem 1rem',
  borderRadius: '0.25rem',
  transition: 'background 0.2s',
  '&:hover, &:focus': {
    textDecoration: 'underline',
    backgroundColor: theme.palette.POSTBOX_30,
  },
});

export type TopLevelNavProps = {
  dropdownList: React.ReactNode;
  dir: string;
};

const TopLevelNav = ({ dropdownList }: TopLevelNavProps) => {
  const theme = useTheme();

  return (
    <nav
      css={topLevelNavContainerStyles(theme)}
      aria-label="Top level navigation"
    >
      <ul css={topLevelNavListStyles}>
        {topLevelNavLinks.map(link => (
          <li key={link.title} css={topLevelNavItemStyles}>
            <a href={link.url} css={topLevelNavLinkStyles(theme)}>
              {link.title}
            </a>
          </li>
        ))}
      </ul>
      <div style={{ width: '100%' }}>
        <DropdownUl role="list">{dropdownList}</DropdownUl>
      </div>
    </nav>
  );
};

export default TopLevelNav;
