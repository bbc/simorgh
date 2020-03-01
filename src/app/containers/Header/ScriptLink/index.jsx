import React, { useContext } from 'react';
import { compile } from 'path-to-regexp';
import { useRouteMatch } from 'react-router-dom';
import ScriptLink from '@bbc/psammead-script-link';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { UserContext } from '#contexts/UserContext';
import { ServiceContext } from '#contexts/ServiceContext';

export const getVariantHref = ({ path, params, variant }) => {
  // How to deal with error pages served when page is not matched by a Simorgh route?
  // Is this a case to consider or can we safely ignore? A mistyped link could take to 404 page locally.
  // What should we do for AMP pages? Link to canonical or AMP? This currently links to AMP, but could remove .amp easily.
  return compile(path)(
    {
      ...params,
      variant: `/${variant}`,
    },
    {
      encode: value => value,
    },
  );
};

const ScriptLinkContainer = () => {
  const { setPreferredVariantCookie } = useContext(UserContext);
  const { service, script, scriptLink } = useContext(ServiceContext);

  const { text, offscreenText, variant } = scriptLink;
  const { path, params } = useRouteMatch();

  return (
    <ScriptLink
      script={script}
      service={service}
      href={getVariantHref({
        path,
        params,
        service,
        variant,
      })}
      variant={variant}
      onClick={() => setPreferredVariantCookie(service, variant)}
    >
      <span aria-hidden="true">{text}</span>
      <VisuallyHiddenText>{` ${offscreenText}`}</VisuallyHiddenText>
    </ScriptLink>
  );
};

export default ScriptLinkContainer;
