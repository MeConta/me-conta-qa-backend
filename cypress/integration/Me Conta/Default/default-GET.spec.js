/// <reference types="Cypress">

describe('Me Conta ? - GET Default',()=>{
    it('Default - Consulta get default',()=>{
        cy.request({
            method: 'GET',
            url: 'https://me-conta-backend.herokuapp.com/',
            failOnStatusCode: false,
            headers: {
                "connection" : 'keep-alive'
            },
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.eq(200)
            expect(res.headers['date']).to.be.not.null
        })
    })
})
