import React, { useContext } from 'react';
import ScriptLink from '@bbc/psammead-script-link';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { RequestContext } from '#contexts/RequestContext';
import { UserContext } from '#contexts/UserContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { getOtherVariant } from '#lib/utilities/variantHandler';

export const generateHref = (service, otherVariant) =>
  `/${service}/${otherVariant}`;

const ScriptLinkContainer = () => {
  const { variant } = useContext(RequestContext);
  const { setPreferredVariantCookie } = useContext(UserContext);
  const { service, script, scriptLink } = useContext(ServiceContext);

  const { text, offscreenText } = scriptLink;
  const otherVariant = getOtherVariant(service, variant);

  return (
    <ScriptLink
      script={script}
      service={service}
      href={generateHref(service, otherVariant)}
      variant={otherVariant}
      onClick={() => setPreferredVariantCookie(service, otherVariant)}
    >
      <span aria-hidden="true">{text}</span>
      <VisuallyHiddenText>{` ${offscreenText}`}</VisuallyHiddenText>
    </ScriptLink>
  );
};

export default ScriptLinkContainer;
