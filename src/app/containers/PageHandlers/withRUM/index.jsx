import React from 'react';
import { AwsRum } from 'aws-rum-web';
import isLive from '#lib/utilities/isLive';

const loadRum = ({ service, isAmp }) => {
  // We're just trialing this on the test environment for one service
  if (isLive()) return;
  if (isAmp) return;
  if (service !== 'pidgin') return;

  // TODO - Not yet implemented on live
  const liveSpecificConfig = {
    applicationId: 'TODO',
    sessionSampleRate: 0.00001,
    identityPoolId: 'TODO',
    guestRoleArn: 'TODO',
  };

  const testSpecificConfig = {
    applicationId: '0007b574-fe46-4f8d-94d3-fe1c1a375af6',
    sessionSampleRate: 1,
    identityPoolId: 'eu-west-1:7c038459-fac4-4622-86ba-92a8fbcf7fcd',
    guestRoleArn:
      'arn:aws:iam::657504540040:role/AAACognito_RUMMonitoreuwest16575045400403910436461561Unauth_Role',
  };

  const { applicationId, applicationVersion, applicationRegion, ...rest } = {
    applicationVersion: '1.0.0',
    applicationRegion: 'eu-west-1',
    endpoint: 'https://dataplane.rum.eu-west-1.amazonaws.com',
    telemetries: ['performance', 'errors', 'http'],
    allowCookies: false,
    enableXRay: false,
    ...(isLive() ? liveSpecificConfig : testSpecificConfig),
  };

  try {
    // eslint-disable-next-line no-new
    new AwsRum(applicationId, applicationVersion, applicationRegion, rest);
  } catch (error) {
    // AWS recommend wrapping their constructor in a try/catch
  }
};

const RUMHoc = Component => {
  const withRum = props => {
    const { service, isAmp } = props;

    loadRum({ service, isAmp });

    return <Component {...props} />;
  };

  return withRum;
};

export default RUMHoc;
