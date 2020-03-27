import React, { useContext } from 'react';
import { compile } from 'path-to-regexp';
import { useRouteMatch } from 'react-router-dom';
import ScriptLink from '@bbc/psammead-script-link';
import { UserContext } from '#contexts/UserContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '../../Toggle/useToggle';

export const getVariantHref = ({ path, params, service, variant }) => {
  const fallback = `/${service}/${variant}`;

  // On error pages, we may not be on a path defined in router config.
  // In this case, link to the fallback.
  if (!path || path === '/') {
    return fallback;
  }

  try {
    return compile(path)(
      {
        ...params,
        variant: `/${variant}`,
        amp: undefined, // we don't want to link to AMP pages directly
      },
      {
        encode: value => value,
      },
    );
  } catch {
    return fallback;
  }
};

const ScriptLinkContainer = () => {
  const { setPreferredVariantCookie } = useContext(UserContext);
  const { service, script, scriptLink } = useContext(ServiceContext);
  const { enabled: scriptLinkEnabled } = useToggle('scriptLink');
  const { enabled: variantCookieEnabled } = useToggle('variantCookie');
  const { path, params } = useRouteMatch();

  if (!scriptLinkEnabled) {
    return null;
  }

  const { text, variant } = scriptLink;

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
      onClick={() => {
        return (
          variantCookieEnabled && setPreferredVariantCookie(service, variant)
        );
      }}
    >
      {text}
    </ScriptLink>
  );
};

export default ScriptLinkContainer;
