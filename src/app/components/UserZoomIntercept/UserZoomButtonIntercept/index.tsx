import { use, useState } from 'react';

import { RequestContext } from '#contexts/RequestContext';
import UserZoomScript from '../UserZoomScript';

export default () => {
  const { isAmp, isApp, isLite } = use(RequestContext);
  const [hasTriggered, setHasTriggered] = useState(false);

  if (isAmp || isApp || isLite) {
    return null;
  }

  return (
    <>
      {hasTriggered && <UserZoomScript />}
      <button type="button" onClick={() => setHasTriggered(true)}>
        Give feedback
      </button>
    </>
  );
};
