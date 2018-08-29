/* eslint-disable */

import React from 'react';

const Leaves = ({ leaves }) =>
  leaves.map(({ text, marks }) => {
    let leaf = text;
    for (let index = 0; index < marks.length; index++) {
      const { type } = marks[index];
      if (type === 'italic') {
        leaf = <i>{leaf}</i>;
      } else if (type === 'bold') {
        leaf = <b>{leaf}</b>;
      }
    }
    return leaf;
  });

const Nodes = ({ nodes }) => {
  return nodes.map(node => {
    if (node.hasOwnProperty('leaves')) {
      return <Leaves leaves={node.leaves} />;
    }

    let Node = null;

    switch (node.type) {
      case 'text':
        Node = <Nodes nodes={node.nodes} />;
        break;
      case 'unordered-list':
        Node = (
          <ul>
            <Nodes nodes={node.nodes} />
          </ul>
        );
        break;
      case 'ordered-list':
        Node = (
          <ol>
            <Nodes nodes={node.nodes} />
          </ol>
        );
        break;
      case 'list-item':
        Node = (
          <li>
            <Nodes nodes={node.nodes} />
          </li>
        );
        break;
      case 'paragraph':
        Node = (
          <p>
            <Nodes nodes={node.nodes} />
          </p>
        );
        break;
      default:
        break;
    }

    return Node;
  });
};

export default Nodes;
