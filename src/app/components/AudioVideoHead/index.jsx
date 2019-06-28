import React from 'react';
import Helmet from 'react-helmet';
import { arrayOf, shape, string } from 'prop-types';

const AudioVideoHead = ({ audioVideoAssets }) => {
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
              var requiredScripts = { "bump-4": "https://emp.bbci.co.uk/emp/bump-4/bump-4" };
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

AudioVideoHead.propTypes = {
  audioVideoAssets: arrayOf(
    shape({
      id: string,
      mediaPlayerSettings: string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default AudioVideoHead;
