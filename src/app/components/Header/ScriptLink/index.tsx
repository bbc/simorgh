/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import { compile } from 'path-to-regexp';
import clone from 'ramda/src/clone';
import { useRouteMatch } from 'react-router-dom';
import useToggle from '#hooks/useToggle';
import { Services, Variants } from '#app/models/types/global';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { RequestContext } from '../../../contexts/RequestContext';
import styles from './index.styles';

interface UseRouteMatcher {
  path: string;
  params: Record<string, string>;
}

export const getVariantHref = ({
  path,
  params,
  service,
  variant,
  scriptSwitchId,
}: {
  path?: string;
  params: Record<string, string>;
  service: Services;
  variant?: Variants;
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
    const compilePath = compile(path, { encode: value => value });

    return compilePath({
      ...pathParams,
      variant: `/${variant}`,
      amp: undefined, // we don't want to link to AMP pages directly
      nonCanonicalArticleRenderPlatform: undefined, // we don't want to link to AMP (.amp) or APP (.app) for the Optimo article route
    });
  } catch {
    return fallback;
  }
};

const ScriptLink = ({ scriptSwitchId = '' }) => {
  const { service, scriptLink } = useContext(ServiceContext);
  const { isNextJs } = useContext(RequestContext);
  const { enabled: scriptLinkEnabled } = useToggle('scriptLink');

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
      className="focusIndicatorRemove"
    >
      <span css={styles.container}>{text}</span>
    </a>
  );
};

export default ScriptLink;
