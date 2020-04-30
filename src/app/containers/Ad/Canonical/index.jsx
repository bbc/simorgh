import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import useToggle from '#hooks/useToggle';

const StyledAd = styled.div`
  /* To centre page layout for Group 4+ */
  margin: 0 auto ${GEL_SPACING_TRPL};
  width: 100%; /* Needed for IE11 */
  text-align: center;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_TRPL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_QUAD};
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const CanonicalAd = () => {
  const { enabled: adsEnabled } = useToggle('ads');

  if (!adsEnabled) {
    return null;
  }

  return (
    <>
      <Helmet>
        <script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        />
        <script>
          {`
            window.googletag = window.googletag || {cmd: []};
            googletag.cmd.push(function() {
                var adSlot = googletag
                  .defineSlot('/4817/bbccom.test.site.amp.news', [[300, 50], [320, 50], [728, 90], [970, 250]], 'banner-ad')
                  .addService(googletag.pubads());

                var mapping = googletag.sizeMapping()
                  .addSize([600, 1], [[728, 90], [970, 250]])
                  .addSize([0, 0], [[300, 50], [320, 50]])
                  .build();

                adSlot.defineSizeMapping(mapping);

                googletag.enableServices();
            });
          `}
        </script>
      </Helmet>
      <StyledAd id="banner-ad">
        <Helmet>
          <script>
            {`
              googletag.cmd.push(function() {
                googletag.display('banner-ad');
              });
            `}
          </script>
        </Helmet>
      </StyledAd>
    </>
  );
};

export default CanonicalAd;
