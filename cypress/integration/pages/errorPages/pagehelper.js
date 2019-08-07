import config from '../../../support/config/services';

const iterator = (filterCondition, tests, canonicalOnlyTests, ampOnlyTests) => {
  Object.keys(config)
    .filter(filterCondition)
    .forEach(service => {
      tests(service);
      if (canonicalOnlyTests) canonicalOnlyTests(service);
      if (ampOnlyTests) ampOnlyTests(service);
    });
};

export default iterator;
