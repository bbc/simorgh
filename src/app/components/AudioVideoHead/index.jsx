import React from 'react';
import Helmet from 'react-helmet';
import { arrayOf, shape, string } from 'prop-types';

const AudioVideoHead = ({ audioVideoAssets }) => {
  const settingsArray = audioVideoAssets.map(
    ({ mediaPlayerSettings }) => mediaPlayerSettings,
  );
  const o = {};
  settingsArray.forEach((item, index) => {
    o[index] = item;
  });
  // console.log(o);
  // console.log(typeof o[0]);
  return (
    <>
      <Helmet>
        <script type="text/javascript">
          {`
            function mediaPlayerSetup(container) {
              require(['bump-4'], (bump) => {
                var settings = [];
                console.log(typeof ${o[0]});
                Object.keys(${o}).forEach(value => settings.push(value));

                ${audioVideoAssets
                  .map(
                    (
                      avAsset,
                      index,
                    ) => `var player${index} = bump.player(document.getElementById('${avAsset.id}'), settings[${index}]);
                player${index}.load();`,
                  )
                  .join(' ')}
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
