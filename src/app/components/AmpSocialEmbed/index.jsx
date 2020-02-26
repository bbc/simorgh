import React from 'react';
import Helmet from 'react-helmet';
import { string } from 'prop-types';

const AmpSocialEmbed = ({ source, id }) => {
  const renderAmp = provider =>
    ({
      twitter: {
        script: (
          <script
            async
            custom-element="amp-twitter"
            src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
          />
        ),
        component: (
          <amp-twitter
            data-tweetid={id}
            width="16"
            height="9"
            layout="responsive"
          />
        ),
      },
      youtube: {
        script: (
          <script
            async
            custom-element="amp-youtube"
            src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
          />
        ),
        component: (
          <amp-youtube
            data-videoid={id}
            width="16"
            height="9"
            layout="responsive"
          />
        ),
      },
      instagram: {
        script: (
          <script
            async
            custom-element="amp-instagram"
            src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"
          />
        ),
        component: (
          <amp-instagram
            data-shortcode={id}
            width="16"
            height="9"
            layout="responsive"
          />
        ),
      },
    }[provider]);

  return (
    renderAmp(source) && (
      <>
        <Helmet>{renderAmp(source).script}</Helmet>
        {renderAmp(source).component}
      </>
    )
  );
};

AmpSocialEmbed.defaultProps = {};

AmpSocialEmbed.propTypes = {
  source: string.isRequired,
  id: string.isRequired,
};

export default AmpSocialEmbed;
