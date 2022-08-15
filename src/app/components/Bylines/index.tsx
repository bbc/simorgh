import React, { useContext } from 'react';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';
import { AccorditionIcon } from '#psammead/psammead-assets/src/svgs';
import { ServiceContext } from '#app/contexts/ServiceContext';
import pathOr from 'ramda/src/pathOr';

type Props = {
  authorName: string;
  jobRole: string;
};

const Byline = ({ authorName, jobRole }: Props) => {
  const { translations } = useContext(ServiceContext) as {
    translations: any;
  };

  const authorTranslated = pathOr('Author', ['byline', 'author'], translations);
  const jobRoleTranslated = pathOr('Role', ['byline', 'role'], translations);

  return (
    <>
      <li>
        <span role="text">
          <VisuallyHiddenText>{`${authorTranslated}, `} </VisuallyHiddenText>
          <span>{authorName}</span>
        </span>
        <AccorditionIcon />
      </li>
      <li>
        <span role="text">
          <VisuallyHiddenText>{`${jobRoleTranslated}, `} </VisuallyHiddenText>
          <span>{jobRole}</span>
        </span>
      </li>
    </>
  );
};

export default Byline;
