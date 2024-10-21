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

type AmpExperimentProps = {
  [key: Experiment]: AmpExperimentConfig;
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

const AmpExperiment = ({ experimentConfig }: AmpExperimentProps) => {
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
    </>
  );
};

export default AmpExperiment;
