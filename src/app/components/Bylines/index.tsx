import React, { useContext } from 'react';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';
import { ArrowIcon } from '#psammead/psammead-assets/src/svgs';
import { ServiceContext } from '#app/contexts/ServiceContext';
import pathOr from 'ramda/src/pathOr';
import {
  Author,
  JobRole,
  BylineItem,
  BylineList,
  LineBreak,
} from './index.styles';

type Props = {
  authorName: string;
  jobRole: string;
  children?: JSX.Element;
};

const Byline = ({ authorName, jobRole, children }: Props) => {
  const { script, service, translations } = useContext(ServiceContext) as {
    script: any;
    service: string;
    translations: any;
  };

  const authorTranslated = pathOr('Author', ['byline', 'author'], translations);
  const jobRoleTranslated = pathOr('Role', ['byline', 'role'], translations);

  return (
    <BylineList>
      <BylineItem>
        <span role="text">
          <VisuallyHiddenText>{`${authorTranslated}, `} </VisuallyHiddenText>
          <Author script={script} service={service}>
            {authorName}
          </Author>
        </span>
        <ArrowIcon />
      </BylineItem>
      <BylineItem>
        <span role="text">
          <VisuallyHiddenText>{`${jobRoleTranslated}, `} </VisuallyHiddenText>
          <JobRole script={script} service={service}>
            {jobRole}
          </JobRole>
        </span>
      </BylineItem>
      <LineBreak />
      {children}
    </BylineList>
  );
};

Byline.defaultProps = {
  children: null,
};

export default Byline;
