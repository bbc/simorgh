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
    return (
      <Fragment>
        <Helmet htmlAttributes={{ lang: 'en-GB' }}>
          <title>{headline}</title>
        </Helmet>
        <Header />
        <Headline>{headline}</Headline>
        <div id="mediaPlayer12345678" style={mediaPlayerStyles} />
        <script type="text/javascript">
          {/* eslint-disable-next-line global-require import/no-dynamic-require */
          require(['bump-3'], $ => {
            const mediaPlayer = $('#mediaPlayer12345678').player(
              playlistSettings,
            );
            mediaPlayer.load();
          })}
        </script>
      </Fragment>
    );
  }
}

export default Article;
