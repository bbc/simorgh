import React from 'react';
import Helmet from 'react-helmet';
import { arrayOf, shape, string } from 'prop-types';

const AudioVideoHead = ({ audioVideoAssets }) => {
  const settingsArray = audioVideoAssets.map(
    ({ mediaPlayerSettings }) => mediaPlayerSettings,
  );

  // The [${settingsArray}] syntax is needed due to its usage in the string literal
  const loadPlayers = `
      var settings = [${settingsArray}];
      ${audioVideoAssets
        .map(
          (avAsset, index) =>
            `var player${index} = bump.player(document.getElementById('${avAsset.id}'), settings[${index}]);
          player${index}.load();`,
        )
        .join(' ')}
    `;

  return (
      <Helmet>
        <script type="text/javascript">
          {`
            function mediaPlayerSetup(container) {
              require(['bump-4'], (bump) => {
                ${loadPlayers}
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
