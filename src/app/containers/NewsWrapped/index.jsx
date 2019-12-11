import React from 'react';
import Helmet from 'react-helmet';

const AmpHead = () => (
  <Helmet>
    <script
      async
      custom-element="amp-story"
      src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
    />
  </Helmet>
);

const NewsWrappedContainer = () => (
  <>
    <AmpHead />

    <amp-story-page id="cover">
      <amp-story-grid-layer template="fill">
        <amp-img
          src="https://ichef.bbci.co.uk/news/1024/cpsprodpb/17E6/production/_109481160_fantasma1.png"
          width="720"
          height="1280"
          layout="responsive"
        ></amp-img>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="thirds">
        <h1 grid-area="upper-third" animate-in="fly-in-right">
          #1
        </h1>
        <div grid-area="lower-third">
          <h4>
            El "escalofriante rostro" captado en el espacio por el telescopio
            Hubble (y de qué se trata realmente)
          </h4>
          <a
            animate-in="drop"
            href="https://www.bbc.com/thai/thailand-50376569"
          >
            View More
          </a>
        </div>
      </amp-story-grid-layer>
    </amp-story-page>

    <amp-story-page id="page-2">
      <amp-story-grid-layer template="fill">
        <amp-img
          src="https://ichef.bbci.co.uk/news/660/cpsprodpb/2BCE/production/_109341211_harrywilliam.jpg"
          width="720"
          height="1280"
          layout="responsive"
        ></amp-img>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="vertical">
        <h1>#2</h1>
        <p>Test Title</p>
      </amp-story-grid-layer>
    </amp-story-page>
  </>
);

export default NewsWrappedContainer;
