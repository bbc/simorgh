import React from 'react';
import { render } from '../react-testing-library-with-providers';
import transcriptFixture from './fixture.json';
import Transcript from './index';

const renderComponent = () =>
  render(<Transcript transcript={transcriptFixture} />);
describe('Transcript Component', () => {
  it('should render and not fail', () => {
    const { container } = renderComponent();
    const details = container.querySelector('details');
    expect(details).toBeInTheDocument();
  });
});
