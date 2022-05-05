import React from 'react';
import { Helmet } from 'react-helmet';
import isLive from '#lib/utilities/isLive';

const buildScript = ({
  applicationId,
  sessionSampleRate,
  identityPoolId,
  guestRoleArn,
}) => (
  <Helmet>
    <script>
      {`
        (function(n,i,v,r,s,c,x,z){x=window.AwsRumClient={q:[],n:n,i:i,v:v,r:r,c:c};window[n]=function(c,p){x.q.push({c:c,p:p});};z=document.createElement('script');z.async=true;z.src=s;document.head.insertBefore(z,document.head.getElementsByTagName('script')[0]);})(
        'cwr',
        '${applicationId}',
        '1.0.0',
        'eu-west-1',
        'https://client.rum.us-east-1.amazonaws.com/1.2.1/cwr.js',
        {
          sessionSampleRate: ${sessionSampleRate},
          guestRoleArn: "${guestRoleArn}",
          identityPoolId: "${identityPoolId}",
          endpoint: "https://dataplane.rum.eu-west-1.amazonaws.com",
          telemetries: ["performance","errors","http"],
          allowCookies: false,
          enableXRay: false
        });
      `}
    </script>
  </Helmet>
);

const RUMLoader = Component => {
  const withRum = props => {
    if (isLive() || props.isAmp) return <Component {...props} />;

    const testConfig = {
      applicationId: '0007b574-fe46-4f8d-94d3-fe1c1a375af6',
      sessionSampleRate: 1, // TODO: remember to reduce this in live config
      identityPoolId: 'eu-west-1:7c038459-fac4-4622-86ba-92a8fbcf7fcd',
      guestRoleArn:
        'arn:aws:iam::657504540040:role/AAACognito_RUMMonitoreuwest16575045400403910436461561Unauth_Role',
    };

    return (
      <>
        {buildScript(testConfig)}
        <Component {...props} />
      </>
    );
  };

  return withRum;
};

export default RUMLoader;
