// This function should be empty do not allow this to be merged if it isn't.
export const testsThatAlwaysRunForAMPOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForAMPOnly to run for ${service} ${pageType}`, () => {});
};

// This function should be empty do not allow this to be merged if it isn't.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
}) =>
  describe(`No testsThatFollowSmokeTestConfigForAMPOnly for ${service} ${pageType}`, () => {});

// This function should be empty do not allow this to be merged if it isn't.
export const testsThatNeverRunDuringSmokeTestingForAMPOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForAMPOnly to run for ${service} ${pageType}`, () => {});
};
