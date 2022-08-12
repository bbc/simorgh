import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';
import { ServiceContext } from '#app/contexts/ServiceContext';
import pathOr from 'ramda/src/pathOr';

type Props = {
  authorName: string;
  jobRole: string;
  className: string;
  timestamp: boolean;
};

const Byline = ({ authorName, jobRole, className, timestamp }: Props) => {
  const { translations } = useContext(ServiceContext) as {
    translations: any;
  };

  const authorTranslated = pathOr('Reporting from', [], translations);
  const jobRoleTranslated = pathOr('Role', [], translations);

  return (
    <>
      <span role="text">
        <VisuallyHiddenText>Author, </VisuallyHiddenText>
        <span>{authorName}</span>
      </span>
      <span role="text">
        <VisuallyHiddenText>Role, </VisuallyHiddenText>
        <span>{jobRole}</span>
      </span>
    </>
  );
};

Byline.propTypes = {};

export default Byline;
