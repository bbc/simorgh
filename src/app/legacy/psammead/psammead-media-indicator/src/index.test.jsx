import React from 'react';
import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import { render } from '../../../../components/react-testing-library-with-providers';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import MediaIndicator from './index';

describe('MediaIndicator', () => {
  it('should render video by default', () => {
    const { container } = render(<MediaIndicator />);
    expect(container).toMatchSnapshot();
  });

  it('should render video indicator correctly', () => {
    const { container } = render(<MediaIndicator type="video" />);
    expect(container).toMatchSnapshot();
  });

  it('should render video indicator correctly when inline', () => {
    const { container } = render(<MediaIndicator type="video" isInline />);
    expect(container).toMatchSnapshot();
  });

  it('should render video indicator correctly when inline on RTL', () => {
    const { container } = render(
      <MediaIndicator type="video" dir="rtl" isInline />,
      { service: 'persian' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render audio indicator correctly', () => {
    const { container } = render(<MediaIndicator type="audio" />);
    expect(container).toMatchSnapshot();
  });

  it('should render photogallery correctly', () => {
    const { container } = render(<MediaIndicator type="photogallery" />);
    expect(container).toMatchSnapshot();
  });
});
