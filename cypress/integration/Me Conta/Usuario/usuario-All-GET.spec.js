// <reference types="Cypress">


describe.skip('Me Conta ? - Usuário',()=>{

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
            cy.request({
                method: 'GET',
                url: `https://me-conta-backend.herokuapp.com/usuario?limit=${res.body.meta.totalItems}`,
                failOnStatusCode: false,
                headers: {
                    "accept" : 'application/json',
                    "Content-Type" : 'application/json'
                },
    
            }).as('resItems')

            cy.get('@resItems').then(response=>{
            cy.expect(response.status).to.be.eq(200)
            cy.expect(response.body.items).to.be.not.null
            cy.expect(response.body.meta.totalItems).to.be.not.null
            cy.expect(response.body.meta.itemCount).to.be.not.null
            cy.expect(response.body.meta.itemsPerPage).to.be.not.null
            cy.expect(response.body.meta.totalPages).to.be.not.null
            cy.expect(response.body.meta.currentPage).to.be.not.null

            })
            })
    })
})