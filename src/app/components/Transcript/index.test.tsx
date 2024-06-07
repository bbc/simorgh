import React from 'react';
import { render, screen } from '../react-testing-library-with-providers';
import transcriptFixture from './fixture.json';
import Transcript from './index';

const renderComponent = () =>
  render(<Transcript transcript={transcriptFixture} />);
describe('Transcript Component', () => {
  it('should render and fail', () => {
    const { container } = renderComponent();
    const region = screen.getByRole('region');
    expect(region).toBeInTheDocument();
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
