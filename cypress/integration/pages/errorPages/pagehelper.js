import config from '../../../support/config/services';

const iterator = (filterCondition, tests) => {
  Object.keys(config)
    .filter(filterCondition)
    .forEach(service => {
      tests(service);
    });
};

export default iterator;
