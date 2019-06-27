import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { arrayOf, bool, number, oneOfType, shape, string } from 'prop-types';

const Video = ({ id, mediaPlayerSettings, width, height }) => {
  const MediaPlayerContainer = styled.div`
    height: ${height};
    width: ${width};
  `;

  return (
    <>
      <Helmet>
        <script type="text/javascript">
          {`
            function mediaPlayerSetup(container) {
              require(['bump-4'], (bump) => {
                var mediaPlayer = bump.player(
                  document.getElementById('${id}'),
                  ${JSON.stringify(mediaPlayerSettings)});
                mediaPlayer.load();
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
      <MediaPlayerContainer id={id} />
    </>
  );
};

Video.propTypes = {
  id: string.isRequired,
  mediaPlayerSettings: shape({
    appName: string.isRequired,
    appType: string.isRequired,
    counterName: string.isRequired,
    mediator: shape({
      host: string.isRequired,
    }).isRequired,
    playlistObject: shape({
      guidance: string,
      holdingImageURL: string.isRequired,
      items: arrayOf(
        shape({
          duration: number.isRequired,
          versionID: string.isRequired,
          kind: string.isRequired,
        }),
      ).isRequired,
      title: string.isRequired,
    }).isRequired,
    product: string.isRequired,
    responsive: bool.isRequired,
    statsObject: oneOfType([
      shape({ clipPID: string, destination: string.isRequired }),
      shape({ episodePID: string, destination: string.isRequired }),
    ]).isRequired,
    ui: shape({
      cta: shape({
        mode: string.isRequired,
      }).isRequired,
      locale: shape({
        lang: string.isRequired,
      }).isRequired,
      subtitles: shape({
        defaultOn: bool.isRequired,
        enabled: bool.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  width: string,
  height: string,
};

Video.defaultProps = {
  width: '100%',
  height: '26em',
};

export default Video;
