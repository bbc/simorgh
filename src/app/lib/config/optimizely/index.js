// OPTIMIZELY_CONFIG.js
const OPTIMIZELY_CONFIG = {
  experimentKeys: {
    // Now an object to hold multiple experiment keys
    header_a_a_test: {
      // Your original experiment
      ruleKey: 'header_a_a_test', // Moved ruleKey inside the experiment-specific object
      variationMappings: {
        on: 'on',
        off: 'off',
      },
    },
    experiment_2: {
      // Example of another experiment (add more as needed)
      ruleKey: 'another_rule',
      variationMappings: {
        variationA: 'A',
        variationB: 'B',
      },
    },

    // ... add more experiment configurations as needed
  },
};

export default OPTIMIZELY_CONFIG;
