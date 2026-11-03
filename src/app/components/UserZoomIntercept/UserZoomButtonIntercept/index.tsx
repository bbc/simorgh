import { use, useEffect, useRef, useState } from 'react';

import { RequestContext } from '#contexts/RequestContext';
import UserZoomScript from '../UserZoomScript';

export default () => {
  const { isAmp, isApp, isLite } = use(RequestContext);
  const [hasTriggered, setHasTriggered] = useState(false);
  const targetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const target = targetRef?.current;
    if (hasTriggered || !target) {
      return undefined;
    }

    const handleClick = () => setHasTriggered(true);
    target.addEventListener('click', handleClick);
    return () => target.removeEventListener('click', handleClick);
  }, [targetRef, hasTriggered]);

  if (isAmp || isApp || isLite) {
    return null;
  }

  return (
    <>
      {hasTriggered && <UserZoomScript />}
      <button type="button" ref={targetRef}>
        Give feedback
      </button>
    </>
  );
};
