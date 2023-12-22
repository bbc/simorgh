// This function should be empty do not allow this to be merged if it isn't.
export const testsThatAlwaysRunForCanonicalOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};

// This function should be empty do not allow this to be merged if it isn't.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
}) =>
  describe(`No testsThatFollowSmokeTestConfigForCanonicalOnly for ${service} ${pageType}`, () => {});

// This function should be empty do not allow this to be merged if it isn't.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};
