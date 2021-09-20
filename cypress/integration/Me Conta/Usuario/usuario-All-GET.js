/// <reference types="Cypress">


describe('Me Conta?',()=>{

    it('GET-Listar todos os usuários cadastrados',()=>{
        cy.request({
            method: 'GET',
            url: 'https://me-conta-backend.herokuapp.com/usuario',
            failOnStatusCode: false,
            headers: {
                "accept" : 'application/json',
                "Content-Type" : 'application/json'
            },

        }).as('response')

        cy.get('@response').then(res=>{
            cy.expect(res.status).to.be.eq(200)
            cy.expect(res.body.items).to.be.not.null
            cy.expect(res.body.meta.totalItems).to.be.not.null
            cy.expect(res.body.meta.itemCount).to.be.not.null
            cy.expect(res.body.meta.itemsPerPage).to.be.not.null
            cy.expect(res.body.meta.totalPages).to.be.not.null
            cy.expect(res.body.meta.currentPage).to.be.not.null
        })


        
    })

})