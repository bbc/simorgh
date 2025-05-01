import React, { memo } from 'react';
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
      data-captioned="true"
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

const TikTok = ({ id }) => (
  <>
    <Helmet>
      <script
        async
        custom-element="amp-tiktok"
        src="https://cdn.ampproject.org/v0/amp-tiktok-0.1.js"
      />
    </Helmet>
    <amp-tiktok data-src={id} width="325" height="575" />
  </>
);

const Facebook = ({ source }) => {
  const getEmbedType = () => {
    switch (true) {
      case source?.includes('posts'):
        return 'post';
      case source?.includes('videos'):
        return 'video';
      default:
        return 'post';
    }
  };

  return (
    <>
      <Helmet>
        <script
          async
          custom-element="amp-facebook"
          src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"
        />
      </Helmet>
      <amp-facebook
        data-href={source}
        data-embed-as={getEmbedType()}
        height="1"
        width="1"
        layout="responsive"
      />
    </>
  );
};

export default {
  instagram: memo(Instagram),
  twitter: memo(Twitter),
  youtube: memo(YouTube),
  tiktok: memo(TikTok),
  facebook: memo(Facebook),
};
