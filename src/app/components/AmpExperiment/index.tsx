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
  requests: Record<string, string>;
  triggers: Record<
    string,
    {
      on: string;
      request: string;
      selector?: string;
      visibilitySpec?: {
        selector?: string;
        visiblePercentageMin?: number;
        totalTimeMin?: number;
        continuousTimeMin?: number;
      };
    }
  >;
};

type AmpExperimentProps = {
  experimentConfig: AmpExperimentConfig;
  analyticsConfig?: AmpAnalyticsConfig;
};

type AmpScriptProps = AmpExperimentConfig | AmpAnalyticsConfig;

const AmpHead = () => (
  <Helmet>
    <script
      async
      custom-element="amp-experiment"
      src="https://cdn.ampproject.org/v0/amp-experiment-0.1.js"
    />
  </Helmet>
);

const AmpScript = ({ config }: { config: AmpScriptProps }) => {
  return (
    <script
      type="application/json"
      /* eslint-disable-next-line react/no-danger */
      dangerouslySetInnerHTML={{ __html: JSON.stringify(config) }}
    />
  );
};

const AmpExperiment = ({
  experimentConfig,
  analyticsConfig,
}: AmpExperimentProps) => {
  return (
    <>
      <AmpHead />
      <amp-experiment>
        <AmpScript config={experimentConfig} />
      </amp-experiment>
      {analyticsConfig && (
        <amp-analytics type="piano">
          <AmpScript config={analyticsConfig} />
        </amp-analytics>
      )}
    </>
  );
};

export default AmpExperiment;
