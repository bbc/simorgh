import React, { useContext } from 'react';
import { string } from 'prop-types';
import { Headline } from '@bbc/psammead-headings';
import { ServiceContext } from '#contexts/ServiceContext';
import Datestamp from '#containers/RadioPageBlocks/Blocks/Datestamp';

const HeadingContainer = ({ idAttr, brandTitle, releaseDateTimeStamp }) => {
  const { script, service } = useContext(ServiceContext);

  // if (!brandTitle) return null;

  return (
    <Headline script={script} service={service} id={idAttr} tabIndex="-1">
      <span
        // eslint-disable-next-line jsx-a11y/aria-role
        role="text"
      >
        {/* <Headline>{brandTitle}</Headline> */}
        <span>{brandTitle}</span>
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
