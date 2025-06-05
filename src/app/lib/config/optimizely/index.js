const OPTIMIZELY_CONFIG = {
  newswb_ws_topbarojs_read_more: {
    // This is the key of the whole experiment
    flagKey: 'newswb_ws_topbarojs_read_more',
    // This is the key for the 'rule' that is attached to the experiment
    ruleKey: 'newswb_ws_topbarojs_read_more',
    variationMappings: {
      on: 'on',
      off: 'off',
    },
  },
  dummy_experiment: {
    flagKey: 'dummy_experiment',
    ruleKey: 'dummy_experiment',
    viewClickAttributeId: 'most-read',
    variationMappings: {
      control: 'control',
      variation_1: 'variation_1',
      variation_2: 'variation_2',
    },
  },
  dummy_experiment_1: {
    flagKey: 'dummy_experiment_1',
    ruleKey: 'dummy_experiment_1',
    viewClickAttributeId: 'top-stories',
    variationMappings: {
      control: 'control',
      variation_1: 'variation_1',
      variation_2: 'variation_2',
    },
  },
};

export default OPTIMIZELY_CONFIG;
