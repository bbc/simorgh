import React from 'react';
import Helmet from 'react-helmet';

const AudioVideoHead = () => {
  const audioVideoAssets = [
    {
      id: 'mediaPlayer1',
      mediaPlayerSettings: JSON.stringify({
        counterName: 'news.world.asia.media_asset.45725300.page',
        product: 'news',
        responsive: true,
        superResponsive: true,
        externalEmbedUrl:
          'https://www.bbc.com/news/av/news/world-asia-45725300',
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

  const settingsArray = audioVideoAssets.map(
    ({ mediaPlayerSettings }) => mediaPlayerSettings,
  );

  return (
    <>
      <Helmet>
        <script type="text/javascript">
          {`
            function mediaPlayerSetup(container) {
              require(['bump-4'], (bump) => {
                var settings = [];
                settings.push(${settingsArray[0]});
                settings.push(${settingsArray[1]});
                settings.push(${settingsArray[2]});
                for (i = 0; i < ${settingsArray.length}+1; i++) {
                    var player = bump.player(document.getElementById('mediaPlayer'+(i+1)), settings[i]);
                    player.load();
                }
              });
          }
        `}
        </script>
        <script type="text/javascript">
          {`
          function initialiseRequires() {
            var requiredScripts = {
              "bump-4": "https://emp.bbci.co.uk/emp/bump-4/bump-4",
            };
            require({ paths: requiredScripts, waitSeconds: 30 });
            mediaPlayerSetup();
          }
        `}
        </script>
        <script
          onLoad="initialiseRequires()"
          type="text/javascript"
          src="https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js"
        />
      </Helmet>
    </>
  );
};

export default AudioVideoHead;
