export const testResponseCode = (uri, responseCode) => {
	cy.request(uri).then(({ status }) => {
         expect(status).to.eq(responseCode)
    })
}
