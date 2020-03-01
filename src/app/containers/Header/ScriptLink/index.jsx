import React, { useContext } from 'react';
import { compile } from 'path-to-regexp';
import { useRouteMatch } from 'react-router-dom';
import ScriptLink from '@bbc/psammead-script-link';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { UserContext } from '#contexts/UserContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import {
  getOtherVariant,
  variantSanitiser,
} from '#lib/utilities/variantHandler';

export const getVariantHref = ({ path, params, variant }) => {
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
  const { variant } = useContext(RequestContext);

  const { text, offscreenText } = scriptLink;
  const { path, params } = useRouteMatch();

  const otherVariant = getOtherVariant({
    service,
    variant: variantSanitiser(variant),
  });

  return (
    <ScriptLink
      script={script}
      service={service}
      href={getVariantHref({
        path,
        params,
        service,
        variant: otherVariant,
      })}
      variant={otherVariant}
      onClick={() => setPreferredVariantCookie(service, otherVariant)}
    >
      <span aria-hidden="true">{text}</span>
      <VisuallyHiddenText>{` ${offscreenText}`}</VisuallyHiddenText>
    </ScriptLink>
  );
};

export default ScriptLinkContainer;
