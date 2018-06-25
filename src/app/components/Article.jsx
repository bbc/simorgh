import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import 'isomorphic-fetch';
import styled from 'styled-components';
// import requirejs from 'requirejs';
import Header from './Header';
import mp from '../../../vendor/mediaplayer';

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
    const playlistSettings = {
      product: 'news',
      superResponsive: true,
      playlistObject: {
        title:
          "'In Russia we are allowed in the stadium' - Hundreds of Iranian women watched their first men's football match at the World Cup.",
        holdingImageURL:
          'http://ichef.bbci.co.uk/images/ic/$recipe/p06bpk3r.jpg',
        items: [
          {
            versionID: 'p06bph9x',
            kind: 'programme',
            duration: 164,
          },
        ],
      },
    };

    console.log('imhere');

    return (
      <Fragment>
        <Helmet htmlAttributes={{ lang: 'en-GB' }}>
          <title>{headline}</title>
          <script
            type="text/javascript"
            src="http://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js"
          />
          <script type="text/javascript"
            src="https://emp.bbci.co.uk/emp/bump-4/bump-4.js"
          />
        </Helmet>
        <Header />
        <Headline>{headline}</Headline>
        <div id="mediaPlayer12345678" style={mediaPlayerStyles} />
        <script type="text/javascript">{
          var domNode = document.getElementById('mediaPlayer12345678');
          var settings = {
            product: 'iplayer',
            responsive: true,
            playlistObject: {
              "title": "Butterfly photobombs koala film shoot at Australia zoo",
              "holdingImageURL":"https://ichef.bbci.co.uk/images/ic/$recipe/p049srmr.jpg",
              "items": [{
                "versionID": "p049sq7k",
                "kind": "programme",
                "duration":37
              }]
            },
            statsObject: { clipPID: "p049sq7f" }
          };
          var mediaPlayer = window.embeddedMedia.api.player(domNode, settings);
          player.load();
        }
        </script>
      </Fragment>
    );
  }
}

export default Article;
