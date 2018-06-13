import { testResponseCode, getElement, shouldContainText, shouldContainStyles } from './test-helper';

describe('News Article', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('should render the BBC News branding', () => {
        const headerElement = getElement('header')
        shouldContainStyles(headerElement, 'height', '40px')
        shouldContainStyles(headerElement, 'background-color', 'rgb(187, 25, 25)')
        
        const anchorElement = getElement('header a')
        shouldContainText(anchorElement, 'BBC News')
        shouldContainStyles(anchorElement, 'color', 'rgb(255, 255, 255)')
        shouldContainStyles(anchorElement, 'font-family', 'ReithSans, Arial, Helvetica, freesans, sans-serif')
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