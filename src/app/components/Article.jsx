import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import 'isomorphic-fetch';
import Header from './Header';
import Headline from './Headline'

class Article extends Component {
  state = {
    headline: {
      blocks: [
        {
          model: {
            blocks: [
              {
                model: {
                  text: 'This is a headline!',
                },
              },
            ],
          },
        },
      ],
    },
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
    // console.log(headline);
    const { text } = headline.blocks[0].model.blocks[0].model;
    return (
      <Fragment>
        <Helmet htmlAttributes={{ lang: 'en-GB' }}>
          <title>
            {text}
          </title>
        </Helmet>
        <Header />
        <Headline>
          {headline}
        </Headline>
      </Fragment>
    );
  }
}

export default Article;
