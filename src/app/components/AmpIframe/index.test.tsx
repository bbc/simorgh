import React from 'react';
import {
  render,
  waitFor,
} from '#components/react-testing-library-with-providers';
import AmpIframe from './index';

const vjProps = {
  src: 'https://news.files.bbci.co.uk/include/newsspec/21841-green-diet/gahuza/app/amp?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
  image:
    'https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
  imageHeight: 360,
  imageWidth: 640,
};
describe('VJ include container on Amp', () => {
  it('should render an amp-iframe with an image placeholder', async () => {
    const { container } = render(<AmpIframe ampMetadata={vjProps} />);
    expect(container.querySelector('amp-iframe')).toBeInTheDocument();
    expect(container.querySelector('amp-img')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it(`should add amp-iframe extension script to page head`, async () => {
    render(<AmpIframe ampMetadata={vjProps} />);

    await waitFor(() => {
      const scripts = Array.from(document.querySelectorAll('head script'));

      expect(scripts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            src: `https://cdn.ampproject.org/v0/amp-iframe-0.1.js`,
          }),
        ]),
      );

      expect(scripts).toHaveLength(1);
    });
  });
});
