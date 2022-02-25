//
// DO NOT PUSH THIS FILE
//

const BFF_PATH = 's';

export default {
  BFF_PATH: () => {
    if (!BFF_PATH) {
      throw new Error(
        'Accessing this page requires the BFF path be configured in your development environment.  Ask the team for help with this!',
      );
    }
    return BFF_PATH;
  },
};

// Testing hook 2
