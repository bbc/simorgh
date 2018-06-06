describe('Storybook Article ', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('should render a title', () => {
        cy.title().should('eq', 'Storybook')

    })
})

describe('Renderer Status', () => {
    it('should display 200/OK', () => {
        cy.request('/').then((response) => {
            expect(response.status).to.eq(200)
        })
    })
})