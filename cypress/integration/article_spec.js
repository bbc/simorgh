describe('News Article', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('should render the BBC News branding', () =>{
        cy.get('header').should('contain', 'BBC News')
    })

    it('should render a headline', () => {
        cy.get('h1').should('contain','Article Headline')
    })

    it('should render a title', () => {
    	cy.title().should('eq', 'Article Headline')
    })
})

describe('Renderer Status', () => {
    it('should display 200/OK', () => {
        cy.request('/status').then((response) => {
            expect(response.status).to.eq(200)
        })
    })
})
