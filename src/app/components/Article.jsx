import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import 'isomorphic-fetch';
import styled from 'styled-components';
import Header from './Header';

const Headline = styled.h1`
  color: #222;
  font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
  font-size: 2em;
`;

class Article extends Component {
  state = {
    headline: 'Article Headline',
  };

  static async getInitialProps({ req } = {}) {
    let url = '/data/test/scenario-01.json';

    if (req) {
      url = `${process.env.RAZZLE_BASE_PATH}${url}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      return { data };
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      return {};
    }
  }

  render() {
    const { headline } = this.state;
    const mediaPlayerStyles = {
      height: 270,
      width: 480,
    };

    return (
      <Fragment>
        <Helmet htmlAttributes={{ lang: 'en-GB' }}>
          <title>{headline}</title>
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
        </Helmet>
        <Header />
        <Headline>{headline}</Headline>
        <div id="mediaPlayer12345678" style={mediaPlayerStyles} />
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
      </Fragment>
    );
  }
}

export default Article;
