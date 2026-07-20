import { RequestContext } from '#app/contexts/RequestContext';
import { addSendStaticBeaconToWindow } from '#app/lib/analyticsUtils/staticATITracking/sendStaticBeacon';
import addInlineScript, {
  InlineScriptProps,
} from '#app/lib/utilities/addInlineScript';
import { use } from 'react';
import { Helmet } from 'react-helmet';

const addScript = ({ script, parameters, nonce }: InlineScriptProps) => {
  return <Helmet>{addInlineScript({ script, parameters, nonce })}</Helmet>;
};

const PageViewStaticTracking = () => {
  const { nonce } = use(RequestContext);

  return <>{addScript({ script: addSendStaticBeaconToWindow, nonce })}</>;
};

export default PageViewStaticTracking;
