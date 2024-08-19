/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import { compile } from 'path-to-regexp';
import clone from 'ramda/src/clone';
import { useRouteMatch } from 'react-router-dom';
import { UserContext } from '#contexts/UserContext';
import useToggle from '#hooks/useToggle';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { RequestContext } from '../../../contexts/RequestContext';
import styles from './index.styles';

export type Params = Record<string, string>;

interface UseRouteMatcher {
  path: string;
  params: Params;
}

export const getVariantHref = ({
  path,
  params,
  service,
  variant,
  scriptSwitchId,
}: {
  path?: string;
  params: Params;
  service: string;
  variant: string | undefined;
  scriptSwitchId?: string;
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
        nonCanonicalArticleRenderPlatform: undefined, // we don't want to link to AMP (.amp) or APP (.app) for the Optimo article route
      },
      {
        encode: (value: any) => value,
      },
    );
  } catch {
    return fallback;
  }
};

const ScriptLink = ({ scriptSwitchId = '' }) => {
  const { setPreferredVariantCookie } = useContext(UserContext);
  const { service, scriptLink } = useContext(ServiceContext);
  const { isNextJs } = useContext(RequestContext);
  const { enabled: scriptLinkEnabled } = useToggle('scriptLink');
  const { enabled: variantCookieEnabled } = useToggle('variantCookie');

  // TODO: Next.JS doesn't support `react-router-dom` hooks, so we need to
  // revisit this to support both Express and Next.JS in the future.
  if (!scriptLinkEnabled || isNextJs) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { path, params }: UseRouteMatcher = useRouteMatch();

  const { text, variant } = scriptLink || {};

  if (!variant) return null;

  return (
    <a
      css={styles.link}
      href={getVariantHref({
        path,
        params,
        service,
        variant,
        scriptSwitchId,
      })}
      data-variant={variant}
      onClick={() => {
        return (
          variantCookieEnabled && setPreferredVariantCookie(service, variant)
        );
      }}
      className="focusIndicatorRemove"
    >
      <span css={styles.container}>{text}</span>
    </a>
  );
};

export default ScriptLink;
