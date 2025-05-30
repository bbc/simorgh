const OPTIMIZELY_CONFIG = {
  // These are the key of multiple experiments
  flagKeys: {
    // This is the key of the whole experiment
    header_a_a_test: {
      // This is the key for the 'rule' that is attached to the experiment
      flagKey: 'header_a_a_test',
      ruleKey: 'header_a_a_test',
      variationMappings: {
        on: 'on',
        off: 'off',
      },
    },
    dummy_experiment: {
      // This is the key for the 'rule' that is attached to the experiment
      flagKey: 'dummy_experiment',
      ruleKey: 'dummy_test_ab',
      viewClickAttributeId: 'most-read', // check
      variationMappings: {
        control: 'control',
        variation_1: 'variation_1',
        variation_2: 'variation_2',
      },
    },
    dummy_experiment_1: {
      // This is the key for the 'rule' that is attached to the experiment
      flagKey: 'dummy_experiment_1',
      ruleKey: 'dummy_test_ab_1',
      viewClickAttributeId: 'top-stories', // check
      variationMappings: {
        control: 'control',
        variation_1: 'variation_1',
        variation_2: 'variation_2',
      },
    },
  },
};

export default OPTIMIZELY_CONFIG;
