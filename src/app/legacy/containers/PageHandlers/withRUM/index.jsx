import React from 'react';
import { Helmet } from 'react-helmet';
import isLive from '#lib/utilities/isLive';
import useOperaMiniDetection from '../../../../hooks/useOperaMiniDetection';

// Note - if changing one of these constants, the other will also need to change
// See https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
const SCRIPT_SRC = 'https://client.rum.us-east-1.amazonaws.com/1.2.1/cwr.js';
const SCRIPT_INTEGRITY =
  'sha384-eCJxxyQILPZN5He1/UBN7E0nPIPBXIMDEPYubMaxQsCcQ+Vh8W9n6zRgQdqNgL0D';

// TODO: we cannot use subresource integrity as the AWS response doesn't have a CORS header
const USE_SUBRESOURCE_INTEGRITY = false;
const SRI_STRING = USE_SUBRESOURCE_INTEGRITY
  ? `z.integrity = ${SCRIPT_INTEGRITY};`
  : '';

const buildScript = ({
  applicationId,
  sessionSampleRate,
  identityPoolId,
  guestRoleArn,
}) => (
  <Helmet>
    <script>
      {`
        (function(n,i,v,r,s,c,x,z){x=window.AwsRumClient={q:[],n:n,i:i,v:v,r:r,c:c};window[n]=function(c,p){x.q.push({c:c,p:p});};z=document.createElement('script');z.async=true;z.src=s;${SRI_STRING}document.head.insertBefore(z,document.head.getElementsByTagName('script')[0]);})(
        'cwr',
        '${applicationId}',
        '1.0.0',
        'eu-west-1',
        '${SCRIPT_SRC}',
        {
          sessionSampleRate: ${sessionSampleRate},
          guestRoleArn: "${guestRoleArn}",
          identityPoolId: "${identityPoolId}",
          endpoint: "https://dataplane.rum.eu-west-1.amazonaws.com",
          telemetries: ["performance","errors","http"],
          allowCookies: true,
          enableXRay: false
        });
      `}
    </script>
  </Helmet>
);

const RUMLoader = Component => {
  const withRum = props => {
    if (props.isAmp) return <Component {...props} />;

    const testConfig = {
      applicationId: '0007b574-fe46-4f8d-94d3-fe1c1a375af6',
      sessionSampleRate: 1,
      identityPoolId: 'eu-west-1:7c038459-fac4-4622-86ba-92a8fbcf7fcd',
      guestRoleArn:
        'arn:aws:iam::657504540040:role/AAACognito_RUMMonitoreuwest16575045400403910436461561Unauth_Role',
    };

    const liveConfig = {
      applicationId: 'a6f74d21-ce3e-4773-a1ce-5f68eae84130',
      sessionSampleRate: 0.01,
      identityPoolId: 'eu-west-1:adc4104d-a198-402d-9e00-1db021dacb71',
      guestRoleArn:
        'arn:aws:iam::923061562593:role/RUM-Monitor-eu-west-1-923061562593-2635993079561-Unauth',
    };

    const ComponentWithRum = () => {
      const isOperaMini = useOperaMiniDetection();
      const scriptElement = buildScript(isLive() ? liveConfig : testConfig);

      return (
        <>
          {!isOperaMini ? scriptElement : null}
          <Component {...props} />
        </>
      );
    };

    return <ComponentWithRum />;
  };

  return withRum;
};

export default RUMLoader;
