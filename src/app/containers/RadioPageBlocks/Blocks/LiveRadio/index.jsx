import React, { useContext } from 'react';
import styled from 'styled-components';
import { GEL_SPACING_QUAD } from '@bbc/gel-foundations/spacings';
import { string } from 'prop-types';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
} from '@bbc/psammead-media-player';
import { pathOr } from 'ramda';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import embedUrl from '../../../MediaPlayer/helpers/embedUrl';

const staticAssetsPath = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}`;

const liveRadioPlaceholderImageSrc = `${staticAssetsPath}images/amp_audio_placeholder.png`;

const MediaPlayerOuterWrapper = styled.div`
  @media (min-width: 63rem) {
    display: flex;
    justify-content: center;
  }
`;

const MediaPlayerInnerWrapper = styled.div`
  flex-shrink: 0;
  width: 50rem;
  max-width: calc(100vw - ${GEL_SPACING_QUAD});
`;

const LiveRadioContainer = ({ idAttr, externalId, id }) => {
  const { platform, origin } = useContext(RequestContext);
  const { liveRadio, lang, translations } = useContext(ServiceContext);

  const isAmp = platform === 'amp';

  const MediaPlayer = {
    canonical: CanonicalMediaPlayer,
    amp: AmpMediaPlayer,
  }[platform];

  if (!MediaPlayer || !externalId || !id) return null;

  const serviceId = pathOr(
    externalId,
    ['externalIdOverrides', externalId],
    liveRadio,
  );

  const embedSource = embedUrl({
    requestUrl: `${serviceId}/${id}/${lang}`,
    type: 'media',
    isAmp,
    origin,
  });

  return (
    <MediaPlayerOuterWrapper>
      <MediaPlayerInnerWrapper>
        <MediaPlayer
          placeholderSrc={isAmp ? liveRadioPlaceholderImageSrc : null}
          showPlaceholder={!isAmp ? false : null}
          src={embedSource}
          title={translations.mediaAssetPage.audioPlayer}
          id={idAttr}
          skin="audio"
        />
      </MediaPlayerInnerWrapper>
    </MediaPlayerOuterWrapper>
  );
};

LiveRadioContainer.propTypes = {
  idAttr: string,
  externalId: string.isRequired,
  id: string.isRequired,
};

LiveRadioContainer.defaultProps = {
  idAttr: null,
};

export default LiveRadioContainer;
