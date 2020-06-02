import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { string, bool, number } from 'prop-types';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
  MediaMessage,
} from '@bbc/psammead-media-player';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import getEmbedUrl from '#lib/utilities/getEmbedUrl';
import getPlaceholderImageUrl from '../../../routes/utils/getPlaceholderImageUrl';
import VideoLinkedData from './VideoLinkedData';

const VideoPlayerWrapper = styled.div`
  width: calc(100% + ${GEL_SPACING_DBL});
  margin: 0 -${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: calc(100% + ${GEL_SPACING_QUAD});
    margin: 0 -${GEL_SPACING_DBL};
  }
`;

const landscapeRatio = '56.25%';
const MediaMessageWrapper = styled.div`
  padding-top: ${landscapeRatio};
  position: relative;
`;

const VideoPlayer = ({
  assetId,
  masterBrand,
  imageUrl,
  isExpired,
  shortSynopsis,
  durationISO8601,
  thumbnailImageUrl,
  releaseDateTimeStamp,
  promoBrandTitle,
}) => {
  const { lang, translations, service } = useContext(ServiceContext);
  const { isAmp, platform } = useContext(RequestContext);
  const location = useLocation();
  const isValidPlatform = ['amp', 'canonical'].includes(platform);
  const mediaInfo = {
    title: 'On-demand TV',
    type: 'video',
  };
  const noJsMessage = pathOr(
    `This ${mediaInfo.type} cannot play in your browser. Please enable JavaScript or try a different browser.`,
    ['media', 'noJs'],
    translations,
  );

  if (isExpired) {
    const expiredContentMessage = pathOr(
      'This content is no longer available',
      ['media', 'contentExpired'],
      translations,
    );

    return (
      <MediaMessageWrapper>
        <MediaMessage service={service} message={expiredContentMessage} />
      </MediaMessageWrapper>
    );
  }
  const placeholderSrc = getPlaceholderImageUrl(imageUrl);

  if (!isValidPlatform || !masterBrand || !assetId) return null;

  const mediaId = `${service}/${masterBrand}/${assetId}/${lang}`;

  const embedUrl = getEmbedUrl({
    mediaId,
    type: 'media',
    isAmp,
    queryString: location.search,
  });

  const iframeTitle = pathOr(
    'Video player',
    ['mediaAssetPage', 'videoPlayer'],
    translations,
  );

  return (
    <VideoPlayerWrapper>
      {isAmp ? (
        <AmpMediaPlayer
          placeholderSrc={placeholderSrc}
          src={embedUrl}
          title={iframeTitle}
          noJsMessage={noJsMessage}
          service={service}
        />
      ) : (
        <CanonicalMediaPlayer
          showPlaceholder={false}
          src={embedUrl}
          title={iframeTitle}
          service={service}
          mediaInfo={mediaInfo}
          noJsMessage={noJsMessage}
          noJsClassName="no-js"
        />
      )}
      <VideoLinkedData
        promoBrandTitle={promoBrandTitle}
        shortSynopsis={shortSynopsis}
        durationISO8601={durationISO8601}
        embedUrl={embedUrl}
        thumbnailImageUrl={thumbnailImageUrl}
        releaseDateTimeStamp={releaseDateTimeStamp}
      />
    </VideoPlayerWrapper>
  );
};

VideoPlayer.propTypes = {
  masterBrand: string,
  assetId: string,
  imageUrl: string,
  isExpired: bool,
  shortSynopsis: string,
  durationISO8601: string,
  thumbnailImageUrl: string,
  releaseDateTimeStamp: number,
  promoBrandTitle: string,
};

VideoPlayer.defaultProps = {
  masterBrand: '',
  assetId: '',
  imageUrl: '',
  isExpired: false,
  shortSynopsis: '',
  durationISO8601: '',
  thumbnailImageUrl: '',
  releaseDateTimeStamp: null,
  promoBrandTitle: '',
};

export default VideoPlayer;
