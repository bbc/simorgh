import React from 'react';
import Text from '../Text';

const Blocks = ({ blocks }) =>
  blocks.map(({ type, model }) => {
    let Block = null;
    switch (type) {
      case 'text':
        Block = <Blocks {...model} />;
        break;
      case 'unordered-list':
        Block = (
          <ul>
            <Blocks {...model} />
          </ul>
        );
        break;
      case 'ordered-list':
        Block = (
          <ol>
            <Blocks {...model} />
          </ol>
        );
        break;
      case 'list-item':
        Block = (
          <li>
            <Blocks {...model} />
          </li>
        );
        break;
      case 'paragraph':
        Block = <Text text={model.text} />;
        break;
      default:
        break;
    }

    return Block;
  });

export default Blocks;
