import propTypes from 'prop-types';

const articleDataType = {
  model: propTypes.shape({
    blocks: propTypes.arrayOf(propTypes.any),
  }),
};

export default articleDataType;
