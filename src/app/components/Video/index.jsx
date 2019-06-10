import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { videoComponentPropTypes } from '../../models/propTypes';

const MediaPlayerContainer = styled.div`
  height: 26em;
  width: 100%;
`;

const Video = ({
  id,
  pid,
  kind,
  title,
  items,
  holdingImageUrl,
  statsAppName,
  statsAppType,
  statsCountername,
  statsDestination,
  uiLocale,
  mediaPlayerSettings,
}) => (
  <>
    <Helmet>
      <script type="text/javascript">
        {`
          function mediaPlayerSetup(container) {
            require(['bump-4'], (bump) => {
              var mediaPlayer = bump.player(
                document.getElementById('mediaPlayer${pid}'),
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
    <MediaPlayerContainer id={`${id}${pid}`}>
      <div>video pid: {pid}</div>
      <div>kind: {kind}</div>
      <div>title: {title}</div>
      <div>holdingImageURL: {holdingImageUrl}</div>
      <div>items: {JSON.stringify(items, null, 4)}</div>
      <div>statsAppName: {statsAppName}</div>
      <div>statsAppType: {statsAppType}</div>
      <div>statsCountername: {statsCountername}</div>
      <div>statsDestination: {statsDestination}</div>
      <div>uiLocale: {uiLocale}</div>
    </MediaPlayerContainer>
  </>
);

Video.propTypes = videoComponentPropTypes;

export default Video;
