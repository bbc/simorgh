export const testResponseCode = (path, responseCode) => {
	cy.request(path).then(({ status }) => {
         expect(status).to.eq(responseCode)
    })
}
