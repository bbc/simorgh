import React, { useContext } from 'react';
import ScriptLink from '@bbc/psammead-script-link';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { UserContext } from '#contexts/UserContext';
import { ServiceContext } from '#contexts/ServiceContext';

export const generateHref = (service, otherVariant) =>
  `/${service}/${otherVariant}`;

const ScriptLinkContainer = () => {
  const { setPreferredVariantCookie } = useContext(UserContext);
  const { service, script, scriptLink } = useContext(ServiceContext);

  const { text, offscreenText, otherVariant } = scriptLink;

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
