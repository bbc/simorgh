import {testResponseCode} from './test-helper';

describe('News Article', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('Header should contain BBC News', () => {
        const header = cy.get('header')
        header.should('contain', 'BBC News')
    });

    it('Header should contain the following CSS property values', () => {
        const header = cy.get('header')
        header.should((el) => {
            expect(el).to.have.css('background-color', 'rgb(187, 25, 25)')
            expect(el).to.have.css('height', '40px')
        });
    });

    it('Header should contain the following anchor CSS property values', () => {
        const anchor = cy.get('header a')

        anchor.should((el) => {
            expect(el).to.have.css('font-family', 'ReithSans, Arial, Helvetica, freesans, sans-serif')
            expect(el).to.have.css('color', 'rgb(255, 255, 255)')
        })
    });

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
