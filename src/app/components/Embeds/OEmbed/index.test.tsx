import React from 'react';
import { render } from '../../react-testing-library-with-providers';

import OEmbedLoader, { OEmbedProps } from '.';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { RequestContextProvider } from '../../../contexts/RequestContext';
import { ARTICLE_PAGE } from '../../../routes/utils/pageTypes';
import { Services } from '../../../models/types/global';
import sampleRiddleProps from './fixture';

const Component = ({
  props,
  isAmp,
  service = 'pidgin',
}: {
  props: OEmbedProps;
  isAmp: boolean;
  service?: Services;
}) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.co.uk"
    id="c0000000000o"
    isAmp={isAmp}
    isApp={false}
    pageType={ARTICLE_PAGE}
    pathname="/pathname"
    service={service}
    statusCode={200}
  >
    <ServiceContextProvider service={service}>
      <OEmbedLoader {...props} />
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('OEmbed', () => {
  describe('Canonical', () => {
    it('Riddle Embed - Should show an iframe with the appropriate link', () => {
      const { container } = render(
        <Component props={sampleRiddleProps} isAmp={false} />,
      );
      const actual = container.querySelector(
        'iframe[src="https://www.riddle.com/embed/a/SAVstNdh?lazyImages=true&staticHeight=false"]',
      );
      expect(actual).toBeInTheDocument();
    });
  });

  describe('AMP', () => {
    it('Riddle Embed - Should show a translated error message with a link to the riddle', () => {
      const { container, getByText } = render(
        <Component props={sampleRiddleProps} service="afrique" isAmp />,
      );
      const iFrameElement = container.querySelector(
        'iframe[src="https://www.riddle.com/embed/a/SAVstNdh?lazyImages=true&staticHeight=false"]',
      );
      const linkToRiddle = container.querySelector(
        'a[href="https://www.riddle.com/view/SAVstNdh"]',
      );
      const errorMessage = getByText(
        'Consultez la version complète de la page pour voir tout le contenu.',
      );

      expect(iFrameElement).toBe(null);
      expect(linkToRiddle).toBeInTheDocument();
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
