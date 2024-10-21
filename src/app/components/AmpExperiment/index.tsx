/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React from 'react';
import { Helmet } from 'react-helmet';

type Variant = string;
type Experiment = string;
type TrafficAllocationPercentage = number;

type AmpExperimentConfig = {
  [key: Experiment]: {
    sticky?: boolean;
    consentNotificationId?: string;
    variants: {
      [key: Variant]: TrafficAllocationPercentage;
    };
  };
};

type AmpAnalyticsConfig = {
  requests?: {
    [key: string]: string;
  };
  triggers?: {
    [key: string]: object;
  };
};

type AmpExperimentProps = {
  experimentConfig: AmpExperimentConfig;
  analyticsConfig?: AmpAnalyticsConfig;
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

const AmpExperiment = ({
  experimentConfig,
  analyticsConfig,
}: AmpExperimentProps) => {
  return (
    <>
      <AmpHead />
      <amp-experiment>
        <script
          type="application/json"
          /* eslint-disable-next-line react/no-danger */
          dangerouslySetInnerHTML={{ __html: JSON.stringify(experimentConfig) }}
        />
      </amp-experiment>
      {analyticsConfig && (
        <amp-analytics type="piano">
          <script
            type="application/json"
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(analyticsConfig),
            }}
          />
        </amp-analytics>
      )}
    </>
  );
};

export default AmpExperiment;
