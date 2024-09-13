import React from 'react';
import { render } from '../react-testing-library-with-providers';
import transcriptFixture from './fixture.json';
import Transcript from './index';

const renderComponent = () =>
  render(<Transcript transcript={transcriptFixture} title="My Title" />);
describe('Transcript Component', () => {
  it('should match snapshot (temp)', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('should render details element', () => {
    const { container } = renderComponent();
    const details = container.querySelector('details');
    expect(details).toBeInTheDocument();
  });
});
