import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import 'isomorphic-fetch';
import MainContent from './MainContent';
import Header from './Header';

class Article extends Component {
  state = {
    data: {
      blocks: [
        {
          type: 'headline',
          blockId: '1',
          model: {
            blocks: [
              {
                model: {
                  blocks: [
                    {
                      model: {
                        text: 'Article Headline',
                      },
                    },
                  ],
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
    const { data } = this.state;
    const { text } = data.blocks[0].model.blocks[0].model.blocks[0].model;

    return (
      <Fragment>
        <Helmet htmlAttributes={{ lang: 'en-GB' }}>
          <title>
            {text}
          </title>
        </Helmet>
        <Header />
        <MainContent {...this.state} />
      </Fragment>
    );
  }
}

export default Article;
