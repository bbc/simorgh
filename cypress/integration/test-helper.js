export const testRequestResponse = (uri, responseCode) => {
	cy.request(uri).then(({ status }) => {
         expect(status).to.eq(responseCode)
    })
}