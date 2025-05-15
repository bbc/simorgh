import React from 'react';
import { render, screen } from '../../react-testing-library-with-providers';
import EmbedHtml from '.';

const electionHtml = `
<div id="responsive-embed-vjafwest-1365-2024-us-presidential-election-banner-app" class="bbc-news-vj-wrapper--embed bbc-news-vj-direction--ltr bbc-news-vj-language--hindi">
<template><link href="https://news.test.files.bbci.co.uk/include/vjafwest/1365-2024-us-presidential-election-banner/develop/assets/embed/css/app.css?v=1.0.0.202410291737" rel="stylesheet" type="text/css" media="all"><style>
@-moz-keyframes gel-spin{0%{-moz-transform:rotate(0deg)}100%{-moz-transform:rotate(360deg)}}@-webkit-keyframes gel-spin{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@-ms-keyframes gel-spin{0%{-ms-transform:rotate(0deg)}100%{-ms-transform:rotate(360deg)}}@keyframes gel-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.bbc-news-visual-journalism-loading-spinner{display:block;margin:8px auto;width:32px;height:32px;max-width:32px;fill:#323232;-webkit-animation-name:gel-spin;-webkit-animation-duration:1s;-webkit-animation-iteration-count:infinite;-webkit-animation-timing-function:linear;-moz-animation-name:gel-spin;-moz-animation-duration:1s;-moz-animation-iteration-count:infinite;-moz-animation-timing-function:linear;animation-name:gel-spin;animation-duration:1s;animation-iteration-count:infinite;animation-timing-function:linear}
.bbc-news-vj-wrapper{font-family:Arial, Verdana, Geneva, Helvetica, sans-serif}

</style><div class="bbc-news-vj-wrapper bbc-news-vj-wrapper--embed bbc-news-vj-shadow-dom bbc-news-vj-onbbcdomain bbc-news-vj-direction--ltr bbc-news-vj-language--hindi" data-include-name="app" data-env="https://news.test.files.bbci.co.uk/include/vjafwest/1365-2024-us-presidential-election-banner/develop">
    
    
    
    <div class="us-election-banner-wrapper">
        <aside class="us-election-banner-2024" role="complementary" aria-labelledby="election-banner-heading">
            <h2 id="election-banner-heading" class="banner-heading">
                <img class="banner-img" src="https://news.test.files.bbci.co.uk/include/vjafwest/1365-2024-us-presidential-election-banner/develop/assets/app-project-assets/img/logo-hi.svg" alt="US Election 2024">
            </h2>
    
            <img class="candidate-img candidate-img-dem" src="https://news.test.files.bbci.co.uk/include/vjafwest/1365-2024-us-presidential-election-banner/develop/assets/app-project-assets/img/harris-100.png" alt="कमला हैरिस, डेमोक्रेट" aria-hidden="true">
    
            <div class="banner-body">
                <div class="candidates">
                    <div class="candidate candidate-left">
                        <p class="candidate-name" aria-label="कमला हैरिस, डेमोक्रेट">
                            <span class="candidate-full-name" aria-hidden="true">कमला हैरिस</span>
                            <span class="candidate-party-name candidate-1" aria-hidden="true">डेमोक्रेट</span>
                        </p>
                    </div>
    
                    <div class="candidate candidate-right">
                        <p class="candidate-name" aria-label="डोनाल्ड ट्रंप, रिपब्लिकन">
                            <span class="candidate-full-name" aria-hidden="true">डोनाल्ड ट्रंप</span>
                            <span class="candidate-party-name candidate-2" aria-hidden="true">रिपब्लिकन</span>
                        </p>
                    </div>
                </div>
    
                <div class="vote-bar-container" role="presentation" aria-label="Vote Progress">
                    <p class="votes-to-win"></p>
                    <div class="votes-bar">
                        <span class="votes-dem" style="width: 18.0%">
                            <span class="vote-dem-progress">
                                <span class="dem-label dem-label-inner" aria-label="97">97</span>
                                <span class="dem-label dem-label-outer" aria-label="97">97</span>
                            </span>
                        </span>
    
                        <span class=" votes-middle" aria-hidden="true"></span>
    
                        <span class="votes-rep" style="width: 20.3%">
                            <span class="vote-rep-progress">
                                <span class="rep-label rep-label-inner" aria-label="109">109</span>
                                <span class="rep-label rep-label-outer" aria-label="109">109</span>
                            </span>
                        </span>
                    </div>
                </div>
    
                <div class="votes-bar-details">
                    <div class="details-left">
                        <p class="details-text-left" aria-label="Kamala Harris, 69119354 votes, 18%">
                            69119354 (%) वोट
                        </p>
                        <p aria-hidden="true">
                            &nbsp;(18%)
                        </p>
                    </div>
                    <div class="details-right">
                        <p class="details-text-right" aria-label="Donald Trump, 71044587 votes, 20.3%">
                            71044587 (%) वोट
                        </p>
                        <p aria-hidden="true">
                            &nbsp;(20.3%)
                        </p>
                    </div>
                </div>
     
                <div class="links-details">
                    <div class="live-results">
                        <div class="last-updated-container__wrapper">
                            <div class="last-updated-container__time">
                                <div class="last-updated-container__live-container">
                                    <svg class="last-updated-container__pulse-icon" fill="currentColor" focusable="false" aria-hidden="true" viewBox="0 0 32 32" width="16" height="16">
                                        <path d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16 9.4 4 16 4zm0-4C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0z">
                                        </path>
                                        <circle cx="16" cy="16" r="8.5" class="pulse-circle"></circle>
                                    </svg>
                                    <p><a href="https://www.bbc.com/news" aria-label="लाइव अपडेट" target="_parent">लाइव अपडेट <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.75 4.46875L1.71875 9.6875H3.71875L8.28125 5L3.71875 0.3125H1.71875L6.75 5.53125V4.46875Z" fill="white"></path>
                        </svg></a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="view-complete-results">
                        <p>
                            <a href="https://www.bbc.com/news" aria-label="पूरे नतीजे देखें" target="_parent">पूरे नतीजे देखें
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.75 4.46875L1.71875 9.6875H3.71875L8.28125 5L3.71875 0.3125H1.71875L6.75 5.53125V4.46875Z" fill="white"></path>
    </svg></a>
                        </p>
                    </div>
                </div>
            </div>
    
            <img class="candidate-img candidate-img-rep" src="https://news.test.files.bbci.co.uk/include/vjafwest/1365-2024-us-presidential-election-banner/develop/assets/app-project-assets/img/trump-100.png" alt="डोनाल्ड ट्रंप, रिपब्लिकन" aria-hidden="true">
        </aside>
    </div>
    
</div></template><div></div>
</div>  

`;

describe('EmbedHtml', () => {
  it('should render passed in escaped html', async () => {
    render(<EmbedHtml embeddableContent="<h1>Barbenheimer</h1>" />);

    const renderedHtmlHeader = screen.queryByRole('heading');
    expect(renderedHtmlHeader).toBeInTheDocument();
  });
  it('should not render when empty string passed into embedHtml', async () => {
    const { container } = render(<EmbedHtml embeddableContent="" />);

    expect(container).toBeEmptyDOMElement();
  });

  // TODO: Remove this logic after the US Elections
  describe('US Election Banner', () => {
    it('should render US Election banner when embed is US Election and Toggle is true', async () => {
      const { container } = render(
        <EmbedHtml embeddableContent={electionHtml} />,
        {
          toggles: { electionBanner: { enabled: true } },
        },
      );

      expect(container).toBeInTheDocument();
    });

    it('should not render US Election banner when embed is US Election and Toggle is false', async () => {
      const { container } = render(
        <EmbedHtml embeddableContent={electionHtml} />,
        {
          toggles: { electionBanner: { enabled: false } },
        },
      );

      expect(container).toBeEmptyDOMElement();
    });
  });
  describe('Lite', () => {
    it('Should return null if isLite is true', () => {
      const { container } = render(
        <EmbedHtml embeddableContent={electionHtml} />,
        {
          isLite: true,
        },
      );

      expect(container).toBeEmptyDOMElement();
    });
  });
});
