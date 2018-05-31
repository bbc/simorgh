describe('News Article', () => {
const url = 'http://localhost:3000/';

    it('should display 200/OK', () => {
        cy.request(url + 'status').then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('should render a headline', () => {
        cy.visit(url)
        cy.url().should('equal', url)
        cy.get('h1').should('contain','Article Headline')
    })

    it('should render a title', () => {
    	cy.visit(url)
    	cy.title().should('eq', 'Welcome to the Afterparty')

    })
})
