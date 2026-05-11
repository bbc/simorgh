export default allRequests => {
  cy.intercept('GET', '**', request => {
    request.continue(response => {
      const contentLength = response.headers['content-length'];
      const isCompressed = response.headers['accept-encoding'];

      allRequests.push({
        url: response.url,
        isCompressed,
        ...(contentLength && {
          contentLength: parseFloat(contentLength) / 1024,
        }),
      });
    });
  });
};
