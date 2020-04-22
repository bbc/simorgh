import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '../../contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import Amp from './Amp';
import useToggle from '#hooks/useToggle';
import { UserContext } from '#contexts/UserContext';

const AdContainer = () => {
  const { isAmp } = useContext(RequestContext);
  const { service, ads } = useContext(ServiceContext);
  const { personalisationEnabled } = useContext(UserContext);
  const hasAds = pathOr(false, ['hasAds'], ads);
  const { enabled: adsEnabled } = useToggle('ads');

  const parentId = 'consent';
  const promptId = 'consent-prompt';
  const cookieId = 'cookie';
  const ampConsentData = {
    consents: {
      // Why is this user-consent?
      'user-consent': {
        promptUI: promptId,
      }
    }
  };
  const jsonInlinedScript = data => (
    <script
      type="application/json"
      /* eslint-disable-next-line react/no-danger */
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );

  if (!adsEnabled || !hasAds) {
    return null;
  }

  // const Ad = isAmp ? Amp : Canonical;
  if (isAmp) {
    return (
      <amp-consent id={parentId} layout="nodisplay">
        {jsonInlinedScript(ampConsentData)}
        <div id={promptId}>
          <Amp
            type="ads"
            service={service}
            acceptAction={`tap:${parentId}.accept`}
            rejectAction={`tap:${parentId}.reject`}
            promptId={cookieId}
          />
        </div>
      </amp-consent>
    );
  }

  return null;
};

export default AdContainer;
