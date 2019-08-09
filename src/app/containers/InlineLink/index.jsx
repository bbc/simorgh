import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '../../contexts/ServiceContext';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import { inlineLinkModelPropTypes } from '../../models/propTypes/inlineLink';
import { articleRegexPath } from '../../routes/regex';

const componentsToRender = { fragment };

const InlineLinkContainer = ({ locator, isExternal, blocks }) => {
  const { externalLinkText } = useContext(ServiceContext);
  const regexp = pathToRegexp(articleRegexPath, [], {
    start: false,
    end: false,
  });

  const result = regexp.exec(locator);
  // if URL matches a valid route, use a react-router link

  const linkText = pathOr(null, [0, 'model', 'text'], blocks);
  return (
    <a
      href={locator}
      aria-label={isExternal ? `${linkText}${externalLinkText}` : null}
    >
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </a>
  );
};

InlineLinkContainer.propTypes = inlineLinkModelPropTypes;

export default InlineLinkContainer;
