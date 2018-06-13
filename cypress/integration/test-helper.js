const testResponseCode = (path, responseCode) => {
	cy.request(path).then(({ status }) => {
         expect(status).to.eq(responseCode)
    })
}

const getElement = (element) => cy.get(element)

const shouldContainText = (element, text) => {
	element.should('contain', text)
}
const shouldContainStyles = (element, css, styling) => {
	element.should((el) => {
		expect(el).to.have.css(css, styling)
	})
}

export default {
	testResponseCode, shouldContainText, shouldContainStyles, getElement
}