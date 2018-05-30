describe('News Article', function() {
var url = 'http://localhost:3000/';

    it('should render a headline', function(){
        cy.visit(url)
        cy.url().should('equal', url)
        cy.get('h1').should('contain','Article Headline')
    })

    it('should render a title', function(){
    	cy.visit(url)
    	cy.title().should('eq', 'Welcome to the Afterparty')

    })

    it('should display 200/OK', function(){
    	cy.request(url + 'status').then((response) => {
    		expect(response.status).to.eq(200)		
    	})
    	
    })
})