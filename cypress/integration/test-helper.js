export const testRequestResponse = (uri, responseCode) => {
	cy.request(uri).then((response) => {
         expect(response.status).to.eq(responseCode)



    })
}


    
        
  