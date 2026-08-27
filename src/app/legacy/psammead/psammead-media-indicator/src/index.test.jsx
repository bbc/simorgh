import { render } from '../../../../components/react-testing-library-with-providers';
import MediaIndicator from './index';

describe('MediaIndicator', () => {
  it('should render video by default', () => {
    const { container } = render(<MediaIndicator />);
    expect(
      container.querySelector('[data-e2e="media-indicator"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('svg[viewBox="0 0 12 12"]'),
    ).toBeInTheDocument();
  });

  it('should render video indicator correctly', () => {
    const { container } = render(<MediaIndicator type="video" />);
    expect(
      container.querySelector('[data-e2e="media-indicator"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('svg[viewBox="0 0 12 12"]'),
    ).toBeInTheDocument();
  });

  it('should render video indicator correctly when inline', () => {
    const { container } = render(<MediaIndicator type="video" isInline />);
    expect(
      container.querySelector('[data-e2e="media-indicator"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('svg[viewBox="0 0 12 12"]'),
    ).toBeInTheDocument();
  });

  it('should render video indicator correctly when inline on RTL', () => {
    const { container } = render(
      <MediaIndicator type="video" dir="rtl" isInline />,
      { service: 'persian' },
    );
    expect(
      container.querySelector('[data-e2e="media-indicator"][dir="rtl"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('svg[viewBox="0 0 12 12"]'),
    ).toBeInTheDocument();
  });

  it('should render audio indicator correctly', () => {
    const { container } = render(<MediaIndicator type="audio" />);
    expect(
      container.querySelector('[data-e2e="media-indicator"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('svg[viewBox="0 0 13 12"]'),
    ).toBeInTheDocument();
  });

  it('should render photogallery correctly', () => {
    const { container } = render(<MediaIndicator type="photogallery" />);
    expect(
      container.querySelector('[data-e2e="media-indicator"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('svg[viewBox="0 0 32 26"]'),
    ).toBeInTheDocument();
  });
});
