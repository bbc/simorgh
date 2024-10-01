// This function should be empty do not allow this to be merged if it isn't.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// This function should be empty do not allow this to be merged if it isn't.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) =>
  describe(`No testsThatFollowSmokeTestConfig for ${service} ${pageType}`, () => {});

// This function should be empty do not allow this to be merged if it isn't.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
