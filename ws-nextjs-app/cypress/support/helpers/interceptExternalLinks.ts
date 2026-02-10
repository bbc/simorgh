export type InterceptExternalLinksOptions = {
  httpCode: number;
};

export default ({ httpCode }: InterceptExternalLinksOptions) => {
  cy.intercept('GET', 'https://www.whatsapp.com/**', {
    statusCode: httpCode,
    body: '',
  });
};
