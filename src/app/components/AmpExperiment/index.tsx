/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React from 'react';
import { Helmet } from 'react-helmet';

type AmpExperimentConfig = {
  [key: string]: {
    sticky?: boolean;
    consentNotificationId?: string;
    variants: {
      [key: string]: number; // variantName: traffic allocation %
    };
  };
};

type AmpExperiment = {
  [key: string]: AmpExperimentConfig;
};

const AmpHead = () => (
  <Helmet>
    <script
      async
      custom-element="amp-experiment"
      src="https://cdn.ampproject.org/v0/amp-experiment-0.1.js"
    />
  </Helmet>
);

const AmpExperiment = ({ experimentData }: AmpExperiment) => {
  return (
    <>
      <AmpHead />
      <amp-experiment>
        <script
          type="application/json"
          /* eslint-disable-next-line react/no-danger */
          dangerouslySetInnerHTML={{ __html: JSON.stringify(experimentData) }}
        />
      </amp-experiment>
    </>
  );
};

export default AmpExperiment;
