import React, { Fragment } from 'react';
import {
  AMP_SCRIPT,
  AMP_NO_SCRIPT,
} from '@bbc/psammead-assets/amp-boilerplate';
import Terser from 'terser';
import ResourceHints from '../../app/components/ResourceHints';
import IfAboveIE9 from '../../app/components/IfAboveIE9Comment';
import MPulseBeacon from '../../app/containers/MPulseBeacon';
import { DialContextProvider } from '../../app/contexts/DialContext';
import progressiveEnhancementString from './loadProgressiveEnhancement';

const minifiedProgressiveEnhancement = Terser.minify(
  progressiveEnhancementString,
).code;

/* eslint-disable react/prop-types */
const Document = ({
  assets,
  assetOrigins,
  app,
  data,
  styleTags,
  helmet,
  isAmp,
  dials,
}) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const meta = helmet.meta.toComponent();
  const title = helmet.title.toComponent();
  const links = helmet.link.toComponent();
  const headScript = helmet.script.toComponent();
  const serialisedData = JSON.stringify(data);
  const scriptsAllowed = !isAmp;
  const scripts = (
    <Fragment>
      <IfAboveIE9>
        {
          /* eslint-disable react/no-danger */
          <script
            dangerouslySetInnerHTML={{
              __html: minifiedProgressiveEnhancement.replace(
                '"{{assets}}"',
                JSON.stringify(assets),
              ),
            }}
          />
        }
      </IfAboveIE9>
    </Fragment>
  );

  return (
    <html lang="en-GB" {...htmlAttrs}>
      <head>
        {meta}
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <ResourceHints assetOrigins={assetOrigins} />
        {title}
        {links}
        {styleTags}
        {headScript}
        {scriptsAllowed && (
          <DialContextProvider dials={dials}>
            <MPulseBeacon />
          </DialContextProvider>
        )}
        {isAmp && (
          <Fragment>
            <style amp-boilerplate="">{AMP_SCRIPT}</style>
            <noscript>
              <style amp-boilerplate="">{AMP_NO_SCRIPT}</style>
            </noscript>
          </Fragment>
        )}
        {isAmp && (
          <Fragment>
            <script key="amp" async src="https://cdn.ampproject.org/v0.js" />
            <script
              async
              custom-element="amp-geo"
              src="https://cdn.ampproject.org/v0/amp-geo-0.1.js"
            />
            <script
              async
              custom-element="amp-consent"
              src="https://cdn.ampproject.org/v0/amp-consent-0.1.js"
            />
            <script
              async
              custom-element="amp-analytics"
              src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
            />
          </Fragment>
        )}
      </head>
      <body>
        {/* eslint-disable react/no-danger */
        /* disabling the rule that bans the use of dangerouslySetInnerHTML until a more appropriate implementation can be implemented */}
        <div id="root" dangerouslySetInnerHTML={{ __html: app }} />
        {scriptsAllowed && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.SIMORGH_DATA=${serialisedData}`,
            }}
          />
        )}
        {scriptsAllowed && scripts}
      </body>
    </html>
  );
};

export default Document;
