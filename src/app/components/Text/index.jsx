import React from 'react';
import remark from 'remark';
import reactRenderer from 'remark-react';
import { arrayOf, shape, string } from 'prop-types';

const Text = ({ blocks }) =>
  blocks.map(({ blockId, model }) => (
    <div key={blockId}>
      {remark().use(reactRenderer).processSync(model.text).contents}
    </div>
  ));

Text.propTypes = {
  blocks: arrayOf(
    shape({
      blockId: string,
      model: shape({
        text: string,
      }),
    }),
  ),
};

Text.defaultProps = {
  blocks: [],
};

export default Text;
