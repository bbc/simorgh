import React from 'react';
import { render } from '@testing-library/react';
import VjAmp from './VjAmp';

const vjProps = {
  ampSrc:
    'https://news.files.bbci.co.uk/include/newsspec/21841-green-diet/gahuza/app/amp?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
  ampImage:
    'https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
  ampImageHeight: '360',
  ampImageWidth: '640',
};
describe('VJ include container on Amp', () => {
  it('should render an amp-iframe with an image placeholder', async () => {
    const { container } = render(<VjAmp ampMetadata={vjProps} />);
    expect(container.querySelectorAll('amp-iframe').length).toEqual(1);
    expect(container.querySelectorAll('amp-img').length).toEqual(1);
    expect(container).toMatchSnapshot();
  });
});
