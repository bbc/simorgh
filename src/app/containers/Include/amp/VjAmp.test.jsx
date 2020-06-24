import React from 'react';
import { render } from '@testing-library/react';
import VjAmp from './VjAmp';

const vjProps = {
  ampSrc: 'https://news.files.bbci.co.uk/vj.amp',
  ampImage:
    'https://news.files.bbci.co.uk/vj/?amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-img.png',
  ampImageHeight: '360',
  ampImageWidth: '640',
};
describe('VJ include container on Amp', () => {
  it('should render an amp-iframe with an image placeholder', async () => {
    const { container } = render(<VjAmp {...vjProps} />);
    expect(container.querySelectorAll('amp-iframe').length).toEqual(1);
    expect(container.querySelectorAll('amp-img').length).toEqual(1);
    expect(container).toMatchSnapshot();
  });
});
