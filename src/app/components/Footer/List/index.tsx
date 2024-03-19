import React from 'react';
import styled from '@emotion/styled';
import { string, arrayOf, shape, element } from 'prop-types';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import Link from '../Link';


const StyledListItem = styled.li`
  min-width: 50%;
  column-gap: ${GEL_SPACING_DBL};
  break-inside: avoid-column;
`;

const List = ({ service, elements, trustProjectLink }) => {
  const listItems = elements.map((elem, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <StyledListItem key={index} role="listitem">
      {elem}
    </StyledListItem>
  ));

  return (
    <ul
      role="list"
      trustProjectLink={trustProjectLink}
      itemCount={listItems.length}
    >
      {trustProjectLink && (
        <StyledListItem>
          <Link
            service={service}
            text={trustProjectLink.text}
            href={trustProjectLink.href}
          />
        </StyledListItem>
      )}
      {listItems}
    </StyledList>
  );
};

List.propTypes = {
  service: string,
  elements: arrayOf(element).isRequired,
  trustProjectLink: shape({
    href: string.isRequired,
    text: string.isRequired,
    lang: string,
  }),
};

List.defaultProps = {
  service: null,
  trustProjectLink: null,
};

export default List;
