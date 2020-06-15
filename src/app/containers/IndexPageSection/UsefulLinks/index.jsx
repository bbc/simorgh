import React from 'react';
import { shape, arrayOf, string } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import styled from 'styled-components';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import {
  UsefulLink,
  UsefulLinksLi,
  UsefulLinksUl,
} from '@bbc/psammead-useful-links';
import { storyItem } from '#models/propTypes/storyItem';

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
              <UsefulLink script={script} service={service} href={item.uri}>
                {item.name}
              </UsefulLink>
            </UsefulLinksLi>
          );
        })}
      </UsefulLinksUl>
    </UsefulLinksWrapper>
  ) : (
    <UsefulLinkWrapper data-e2e="useful-links">
      <UsefulLink script={script} service={service} href={items[0].uri}>
        {items[0].name}
      </UsefulLink>
    </UsefulLinkWrapper>
  );
};

UsefulLinksComponent.propTypes = {
  items: arrayOf(shape(storyItem)).isRequired,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
};

export default UsefulLinksComponent;
