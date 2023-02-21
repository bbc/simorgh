import React, { useContext } from 'react';
import { compile } from 'path-to-regexp';
import clone from 'ramda/src/clone';
import { string } from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import ScriptLink from '#psammead/psammead-script-link/src';
import { UserContext } from '#contexts/UserContext';
import useToggle from '#hooks/useToggle';
import { ServiceContext } from '../../../../contexts/ServiceContext';

export const getVariantHref = ({
  path,
  params,
  service,
  variant,
  scriptSwitchId,
}) => {
  const fallback = `/${service}/${variant}`;

  // On error pages, we may not be on a path defined in router config.
  // In this case, link to the fallback.
  if (!path || path === '/') {
    return fallback;
  }

  const pathParams = clone(params);
  if (scriptSwitchId) {
    pathParams.id = scriptSwitchId;
  }

  try {
    return compile(path)(
      {
        ...pathParams,
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

const ScriptLinkContainer = ({ scriptSwitchId }) => {
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
        scriptSwitchId,
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

ScriptLinkContainer.propTypes = {
  scriptSwitchId: string,
};

ScriptLinkContainer.defaultProps = {
  scriptSwitchId: '',
};

export default ScriptLinkContainer;
