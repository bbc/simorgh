import {testResponseCode} from './test-helper';

describe('News Article', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('should render a headline', () => {
        cy.get('h1').should('contain','Article Headline')
    })

    it('should render a title', () => {
    	cy.title().should('eq', 'Article Headline')

    })
})

describe('Page Status', () => {
    it('should display 200', () => {
      testResponseCode('/', 200)  
    })
})

describe('Renderer Status', () => {
    it('should display 200', () => {
      testResponseCode('/status', 200)  
    })
})
