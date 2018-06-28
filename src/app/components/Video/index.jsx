import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

const Video = () => {
  const mediaPlayerStyles = {
    height: 270,
    width: 480,
  };

  return (
    <Fragment>
      <Helmet htmlAttributes={{ lang: 'en-GB' }}>
        <script
          type="text/javascript"
          src="https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js"
        />
        <script type="text/javascript">
          {`
          const bbcRequireMap = {
            "bump-4": "//emp.bbci.co.uk/emp/bump-4/bump-4",
          };
          require({ paths: bbcRequireMap });
        `}
        </script>
        <script type="text/javascript">
          {`
            const settings = {
              product: 'news',
              responsive: true,
              playlistObject: {
                title: 'Butterfly photobombs koala film shoot at Australia zoo',
                holdingImageURL:
                  'https://ichef.bbci.co.uk/images/ic/$recipe/p049srmr.jpg',
                items: [
                  {
                    versionID: 'p049sq7k',
                    kind: 'programme',
                    duration: 37,
                  },
                ],
              },
            };

            require(['bump-4'], function (bump) {
              var mediaPlayer = bump.player(document.getElementById('mediaPlayer'), settings);
              mediaPlayer.load();
            });
          `}
        </script>
      </Helmet>
      <div id="mediaPlayer12345678" style={mediaPlayerStyles} />
    </Fragment>
  );
};

export default Video;
