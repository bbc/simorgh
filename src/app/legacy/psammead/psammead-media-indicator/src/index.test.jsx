import React from 'react';
import { render } from '../../../../components/react-testing-library-with-providers';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import MediaIndicator from './index';

describe('MediaIndicator', () => {
  it('should render video by default', () => {
    const { container } = render(<MediaIndicator service="news" />);
    expect(container).toMatchSnapshot();
  });

  it('should render video indicator correctly', () => {
    const { container } = render(
      <MediaIndicator type="video" script={latin} service="news" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render video indicator correctly when inline', () => {
    const { container } = render(
      <MediaIndicator type="video" script={latin} service="news" isInline />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render video indicator correctly when inline on RTL', () => {
    const { container } = render(
      <MediaIndicator
        type="video"
        script={arabic}
        service="persian"
        dir="rtl"
        isInline
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render audio indicator correctly', () => {
    const { container } = render(
      <MediaIndicator type="audio" script={latin} service="news" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render photogallery correctly', () => {
    const { container } = render(
      <MediaIndicator type="photogallery" script={latin} service="news" />,
    );
    expect(container).toMatchSnapshot();
  });
});
