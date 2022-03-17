import React, { memo } from 'react';
import { string } from 'prop-types';
import { Helmet } from 'react-helmet';

const Instagram = ({ id }) => (
  <>
    <Helmet>
      <script
        async
        custom-element="amp-instagram"
        src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"
      />
    </Helmet>
    <amp-instagram
      data-captioned
      data-shortcode={id}
      height="1"
      layout="responsive"
      width="1"
    />
  </>
);

const Twitter = ({ id }) => (
  <>
    <Helmet>
      <script
        async
        custom-element="amp-twitter"
        src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
      />
    </Helmet>
    <amp-twitter data-tweetid={id} height="9" layout="responsive" width="16" />
  </>
);

const YouTube = ({ id }) => (
  <>
    <Helmet>
      <script
        async
        custom-element="amp-youtube"
        src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
      />
    </Helmet>
    <amp-youtube data-videoid={id} height="9" layout="responsive" width="16" />
  </>
);

const sharedPropTypes = {
  id: string.isRequired,
};

Instagram.propTypes = sharedPropTypes;
Twitter.propTypes = sharedPropTypes;
YouTube.propTypes = sharedPropTypes;

export default {
  instagram: memo(Instagram),
  twitter: memo(Twitter),
  youtube: memo(YouTube),
};
