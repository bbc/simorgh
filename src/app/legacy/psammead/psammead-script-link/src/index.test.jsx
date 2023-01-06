import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { render, fireEvent } from '@testing-library/react';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import ScriptLink from './index';

describe('ScriptLink', () => {
  const props = {
    service: 'news',
    href: 'https://www.bbc.co.uk/news',
    script: latin,
  };

  shouldMatchSnapshot(
    'should render correctly',
    <ScriptLink {...props}>Lat</ScriptLink>,
  );

  it('should render a link', () => {
    const { container } = render(
      <ScriptLink {...props} variant="lat">
        Lat
      </ScriptLink>,
    );

    const links = container.querySelectorAll('a');

    expect(links).toHaveLength(1);
    expect(links[0]).toHaveProperty('href');
    expect(links[0].href).toEqual('https://www.bbc.co.uk/news');
    expect(links[0].textContent).toEqual('Lat');
    expect(links[0].dataset).toHaveProperty('variant');
    expect(links[0].dataset.variant).toEqual('lat');
  });

  it('should call the onClick handler when the link is clicked', () => {
    const onClickMock = jest.fn();
    const { container } = render(
      <ScriptLink {...props} variant="lat" onClick={onClickMock}>
        Lat
      </ScriptLink>,
    );

    const link = container.querySelector('a');
    fireEvent.click(link);

    expect(onClickMock).toHaveBeenCalled();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
