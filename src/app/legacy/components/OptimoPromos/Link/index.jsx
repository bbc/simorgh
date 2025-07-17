import React, { use, useEffect, useState } from 'react';
import useCombinedClickTrackerHandler from '#containers/StoryPromo/useCombinedClickTrackerHandler';
import makeRelativeUrlPath from '../../../../lib/utilities/makeRelativeUrlPath';
import StyledLink from './index.styles';
import PromoContext from '../PromoContext';

const Link = ({ className = '', children }) => {
  const { to, eventTrackingData, ariaLabelledBy } = use(PromoContext);
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);
  const relativeUrlPath = makeRelativeUrlPath(to);
  const [canonicalSizeInKb, setCanonicalSizeInKb] = useState('unknown');
  const [liteSizeInKb, setLiteSizeInKb] = useState('unknown');
  const [dataSavedWithLite, setDataSavedWithLite] = useState('unknown');

  useEffect(() => {
    fetch(`${relativeUrlPath}?renderer_env=live`, {
      method: 'HEAD',
    })
      .then(response => {
        if (!response.ok) {
          console.warn(`Link to ${relativeUrlPath} is not valid.`);
        }
        const contentLength = response.headers.get('Content-Length');
        const sizeInKb = contentLength
          ? (contentLength / 1024).toFixed(2)
          : 'unknown';
        setCanonicalSizeInKb(`${sizeInKb} KB`);
      })
      .catch(error => {
        console.error(`Error fetching link: ${error}`);
      });

    fetch(`${relativeUrlPath}.lite?renderer_env=live`, {
      method: 'HEAD',
    })
      .then(response => {
        if (!response.ok) {
          console.warn(`Link to ${relativeUrlPath} is not valid.`);
        }
        const contentLength = response.headers.get('Content-Length');
        const sizeInKb = contentLength
          ? (contentLength / 1024).toFixed(2)
          : 'unknown';
        setLiteSizeInKb(`${sizeInKb} KB`);
      })
      .catch(error => {
        console.error(`Error fetching link: ${error}`);
      });
    // Calculate data saved with lite version
    const canonicalSize = parseFloat(canonicalSizeInKb);
    const liteSize = parseFloat(liteSizeInKb);
    if (canonicalSize && liteSize) {
      const dataSaved = (
        ((canonicalSize - liteSize) / canonicalSize) *
        100
      ).toFixed(2);
      setDataSavedWithLite(dataSaved);
    } else {
      setDataSavedWithLite('unknown');
    }
  }, [canonicalSizeInKb, liteSizeInKb, relativeUrlPath]);

  return (
    <>
      <StyledLink
        data-testid="promo-link"
        className={`${className} focusIndicatorDisplayInlineBlock`}
        href={makeRelativeUrlPath(to)}
        aria-labelledby={ariaLabelledBy}
        {...(eventTrackingData && handleClickTracking)}
      >
        {children}
      </StyledLink>
      <p>Canonical: {canonicalSizeInKb}</p>
      <p>Lite: {liteSizeInKb}</p>
      <p>
        You would save {dataSavedWithLite}% in data if you visit this link on
        the lite site
      </p>
    </>
  );
};

export default Link;
