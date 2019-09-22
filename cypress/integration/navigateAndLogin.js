require('cypress-xpath')

context('Cypress interview question', () => {
    it('check the link availability', () => {
        cy.visit('https://phptravels.com/demo/')
    })


    it('Check for Page Title', () => {
        cy.get('head title') //find title in DOM
            // .should('contain', 'Demo Script Test drive - PHPTRAVELS')
            .should('contain', 'APPLICATION TEST DRIVE')

    })


    it('Find phptravels.net and navigate', () => {
        //   cy.xpath('.//*[text()="http://www.phptravels.net"]')
        //   .should('contain','http://www.phptravels.net')
        //   .invoke('removeAttr', 'target').click()

        // Remove traget from <a> to open it on same tab
        cy.get('a').invoke('removeAttr', 'target')
        cy.get('a').find('small')
            .contains('http://www.phptravels.net')
            .click()
    })

    // Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
    //     return new Cypress.Promise(resolve => {
    //         $iframe.on('load', () => {
    //             resolve($iframe.contents().find('body'));
    //         });
    //     });
    // });


    it('Go to My Account and Login', () => {
        cy.get('.full-screen-preview__frame')
            .then(($iframe) => {
                const $body = $iframe.contents().find('body')

                cy.wrap($body)
                    .find('li')
                    .contains('My Account').click({ force: true })

                cy.wrap($body)
                    .find('a')
                    .contains('Login').click({ force: true })
            })
    })


    it('Enter Login Credentials ', () => {
        //wait to render all the elements because it is iframe of different domain.
        cy.wait(5000)

        //Get all thecontent of iframe
        cy.get('.full-screen-preview__frame')
            .then(($iframe) => {
                const $body = $iframe.contents().find('body')

                cy.wrap($body)
                    .find('[name="username"]')
                    .type('user@phptravels.com')

                cy.wrap($body)
                    .find('[name="password"]')
                    .type('demouser')

                cy.wrap($body)
                    .find('button.btn.btn-action.btn-lg.btn-block.loginbtn')
                    .click()
            })
    })


    it('Check for Invoice', () => {
        cy.wait(5000)
        cy.get('.full-screen-preview__frame')
            .then(($iframe) => {
                const $body = $iframe.contents()    .find('body')
                cy.wrap($body)
                    .find('a').contains('Invoice').
                    invoke('removeAttr', 'target')
                    .click()
            })
    })


    it('Verfiy page has INVOICE', () => {
        cy.wait(5000)

        cy.get('.full-screen-preview__frame')
            .then(($iframe) => {
                const $body = $iframe.contents().find('body')
                cy.wrap($body)
                    .find('div').contains('Invoice')
            })
     })

})

