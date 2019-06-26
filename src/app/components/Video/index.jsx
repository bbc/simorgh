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
  title,
  statsAppName,
  statsAppType,
  statsCountername,
  statsDestination,
  uiLocale,
  mediaPlayerSettings,
  uuid,
}) => (
  <>
    <Helmet>
      <script type="text/javascript">
        {`
          function mediaPlayerSetup${uuid}(container) {
            require(['bump-4'], (bump) => {
              var mediaPlayer${uuid} = bump.player(
                document.getElementById('${id}'),
                ${JSON.stringify(mediaPlayerSettings)});
              mediaPlayer${uuid}.load();
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
            mediaPlayerSetup${uuid}();
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
    <div>title: {title}</div>
    <div>statsAppName: {statsAppName}</div>
    <div>statsAppType: {statsAppType}</div>
    <div>statsCountername: {statsCountername}</div>
    <div>statsDestination: {statsDestination}</div>
    <div>uiLocale: {uiLocale}</div>
  </>
);

Video.propTypes = videoComponentPropTypes;

export default Video;
