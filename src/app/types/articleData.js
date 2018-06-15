import propTypes from 'prop-types';

const articleData = {
  model: propTypes.shape({
    blocks: propTypes.arrayOf(propTypes.any),
  }),
};

export default articleData;
