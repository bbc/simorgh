import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import Blocks from './index';

const sampleBlocks = [
  {
    type: 'customType',
    id: '1.0',
    position: 'position',
    blockGroupType: 'groupType',
    blockGroupIndex: 'groupIndex',
    model: { text: 'FRAGMENT BLOCK TEXT 1', someRandomProp: 123 },
  },
  {
    type: 'customType',
    id: '2.0',
    position: 'position',
    blockGroupType: 'groupType',
    blockGroupIndex: 'groupIndex',
    model: { text: 'FRAGMENT BLOCK TEXT 2', someRandomProp: 456 },
  },
  {
    type: 'someOtherBlock',
    id: '3.0',
    position: 'position',
    blockGroupType: 'groupType',
    blockGroupIndex: 'groupIndex',
    model: {
      text: 'FRAGMENT BLOCK TEXT 1',
    },
  },
];

const ExampleComponent = ({ text }: { text: string }) => <p>{text}</p>;

describe('Blocks', () => {
  const componentsToRender = {
    customType: ExampleComponent,
  };

  const { container } = render(
    <Blocks blocks={sampleBlocks} componentsToRender={componentsToRender} />,
  );

  it('should render valid blocks', () => {
    const content = container.querySelectorAll('p');

    expect(content.length).toBe(2);
    expect(content[0].textContent).toBe('FRAGMENT BLOCK TEXT 1');
    expect(content[1].textContent).toBe('FRAGMENT BLOCK TEXT 2');
  });

  it('should not render unknown blocks', () => {
    const content = container.querySelectorAll('p');

    expect(content[2]?.textContent).toBe(undefined);
  });

  it('should pass all model params as props to blocks', () => {
    const content = container.querySelectorAll('p');

    expect(content[2]?.textContent).toBe(undefined);
  });
});
