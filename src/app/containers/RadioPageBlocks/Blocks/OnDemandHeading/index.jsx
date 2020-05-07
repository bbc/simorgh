import React, { useContext } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { Headline } from '@bbc/psammead-headings';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { ServiceContext } from '#contexts/ServiceContext';
import Datestamp from '#containers/RadioPageBlocks/Blocks/Datestamp';

const BrandTitle = styled.span`
  display: block;
`;

const HeadingContainer = ({ idAttr, brandTitle, releaseDateTimeStamp }) => {
  const { script, service } = useContext(ServiceContext);

  // if (!brandTitle) return null;

  return (
    <Headline script={script} service={service} id={idAttr} tabIndex="-1">
      <span
        // eslint-disable-next-line jsx-a11y/aria-role
        role="text"
      >
        <BrandTitle>{brandTitle}</BrandTitle>
        <VisuallyHiddenText id={idAttr} tabIndex="-1">
          ,{' '}
        </VisuallyHiddenText>
        <Datestamp releaseDateTimeStamp={releaseDateTimeStamp} />
      </span>
    </Headline>
  );
};

HeadingContainer.propTypes = {
  idAttr: string,
  brandTitle: string.isRequired,
  releaseDateTimeStamp: string.isRequired,
};

HeadingContainer.defaultProps = {
  idAttr: null,
};

export default HeadingContainer;
