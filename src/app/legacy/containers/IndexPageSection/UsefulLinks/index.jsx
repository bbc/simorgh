import React from 'react';
import styled from '@emotion/styled';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import {
  UsefulLink,
  UsefulLinksLi,
  UsefulLinksUl,
} from '#psammead/psammead-useful-links/src';

// Apply the right margin-top between the section label and multiple useful items
const UsefulLinksWrapper = styled.div`
  padding-bottom: ${GEL_SPACING_TRPL};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_DBL};
  }
`;

// Apply the right margin-top between the section label and a single useful item
const UsefulLinkWrapper = styled.div`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_TRPL};
  }

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    margin-top: ${GEL_SPACING};
  }
`;

const UsefulLinksComponent = ({ items, script, service }) => {
  return items.length > 1 ? (
    <UsefulLinksWrapper data-e2e="useful-links">
      <UsefulLinksUl>
        {items.map((item, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <UsefulLinksLi key={`${item.timestamp}${index}`}>
              <UsefulLink
                script={script}
                service={service}
                href={item.uri}
                className="focusIndicatorDisplayBlock"
              >
                {item.name}
              </UsefulLink>
            </UsefulLinksLi>
          );
        })}
      </UsefulLinksUl>
    </UsefulLinksWrapper>
  ) : (
    <UsefulLinkWrapper data-e2e="useful-links">
      <UsefulLink
        script={script}
        service={service}
        href={items[0].uri}
        className="focusIndicatorDisplayBlock"
      >
        {items[0].name}
      </UsefulLink>
    </UsefulLinkWrapper>
  );
};

export default UsefulLinksComponent;
