const skipLiveDescribe = (name, func) => {
  if (Cypress.env('APP_ENV') !== 'live') {
    describe(name, func);
  }
};

export default skipLiveDescribe;
