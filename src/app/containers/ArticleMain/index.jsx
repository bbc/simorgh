import React, { Fragment } from 'react';
import { articleDataPropTypes } from '../../models/propTypes/article';
import MetadataContainer from '../Metadata';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import timestamp from '../ArticleTimestamp';
import { GhostWrapper } from '../../lib/styledGrid';
import ATIAnalytics from '../ATIAnalytics';
import audioVideo from '../AudioVideo';
import AudioVideoHead from '../../components/AudioVideoHead';
import { RequestContext } from '../../contexts/RequestContext';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  text,
  image,
  timestamp,
  video: audioVideo,
};

const audioVideoAssets = [
  {
    id: 'mediaPlayer1',
    mediaPlayerSettings: JSON.stringify({
      counterName: 'news.world.asia.media_asset.45725300.page',
      product: 'news',
      responsive: true,
      superResponsive: true,
      externalEmbedUrl: 'https://www.bbc.com/news/av/news/world-asia-45725300',
      playlistObject: {
        embedRights: 'allowed',
        holdingImageURL:
          'https://ichef.bbci.co.uk/images/ic/$recipe/p06mxcw3.jpg',
        items: [{ duration: 117, kind: 'programme', versionID: 'p06ms4vq' }],
        liveRewind: false,
        simulcast: false,
        summary:
          'A pilot pays tribute to traffic controller Anthonius Gunawan Agung for saving those on board his plane',
        title: "'Air traffic controller was guardian angel'",
      },
      statsObject: { clipPID: 'p06ms4vn' },
      ui: {
        controls: { enabled: true },
        locale: { lang: 'en-gb' },
        subtitles: { enabled: true, defaultOn: true },
        fullscreen: { enabled: true },
      },
    }),
  },
  {
    id: 'mediaPlayer2',
    mediaPlayerSettings: JSON.stringify({
      counterName: 'news.politics.story.46827301.page',
      product: 'news',
      responsive: true,
      superResponsive: true,
      externalEmbedUrl:
        'https://www.bbc.com/news/av/news/uk-politics-46827301/pid/p06w3lfm',
      playlistObject: {
        embedRights: 'allowed',
        holdingImageURL:
          'https://ichef.bbci.co.uk/images/ic/$recipe/p078r8cf.jpg',
        items: [{ duration: 177, kind: 'programme', versionID: 'p078qkrl' }],
        liveRewind: false,
        simulcast: false,
        summary:
          "Universal credit: Is the government's benefit system working?",
        title: "What's the problem with universal credit?",
      },
      statsObject: { clipPID: 'p06w3lfm' },
      ui: {
        controls: { enabled: true },
        locale: { lang: 'en-gb' },
        subtitles: { enabled: true, defaultOn: true },
        fullscreen: { enabled: true },
      },
    }),
  },
  {
    id: 'mediaPlayer3',
    mediaPlayerSettings: JSON.stringify({
      counterName: 'mundo.media.media_asset.48596711.page',
      product: 'news',
      responsive: true,
      superResponsive: true,
      externalEmbedUrl: 'https://www.bbc.com/news/av/mundo/media-48596711',
      playlistObject: {
        embedRights: 'allowed',
        holdingImageURL:
          'https://ichef.bbci.co.uk/images/ic/$recipe/p07cth9h.jpg',
        items: [{ duration: 143, kind: 'programme', versionID: 'p07ctgpn' }],
        liveRewind: false,
        simulcast: false,
        summary: 'Así es el Carnaval Afrodescendiente de Arica en Chile',
        title: 'Así es el Carnaval Afrodescendiente de Arica en Chile',
      },
      statsObject: { clipPID: 'p07ctgpl' },
      ui: {
        controls: { enabled: true },
        locale: { lang: 'es' },
        subtitles: { enabled: true, defaultOn: true },
        fullscreen: { enabled: true },
      },
    }),
  },
];

const ArticleMain = ({ articleData }) => {
  const { platform } = React.useContext(RequestContext);
  const { content, metadata, promo } = articleData;
  const { blocks } = content.model;

  return (
    <Fragment>
      <ATIAnalytics data={articleData} />
      <MetadataContainer metadata={metadata} promo={promo} />
      {platform === 'canonical' ? (
        <AudioVideoHead audioVideoAssets={audioVideoAssets} />
      ) : null}
      <main role="main">
        <GhostWrapper>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </GhostWrapper>
      </main>
    </Fragment>
  );
};

ArticleMain.propTypes = {
  articleData: articleDataPropTypes.isRequired,
};

export default ArticleMain;
