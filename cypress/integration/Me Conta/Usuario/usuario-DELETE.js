/// <reference types="Cypress">

describe('Me Conta?', () =>{
    let token;

    beforeEach(() =>{  
        cy.request({
            method: 'POST',
            url:'https://me-conta-backend.herokuapp.com/auth/login',
            failOnStatusCode: false,
            headers:{
                "accept" : 'application/json',
                "Content-Type" : 'application/json'
            },
            body:{
                "username": "teste@teste.com",
                "password": "s#nh4Valida"
            },
        }).as('response')

        cy.get('@response').then(res =>{
            cy.expect(res.status).to.be.eq(200)
            cy.expect(res.body.token).to.be.not.null  
            token = res.body.token
            cy.log(token)
        })
        
    })
 
    it('DELETE - Deletar usuário com sucesso', () => {
        cy.request({
            method: 'DELETE',
            url:'https://me-conta-backend.herokuapp.com/usuario/delete/39',
            failOnStatusCode: false,
            headers:{
                "access-token" : token,
                "accept" : 'application/json',
                "Content-Type" : 'application/json'
            },
        }).as('response')

        cy.get('@response').then(res =>{
            cy.expect(res.status).to.be.eq(204)
            
        })
    })
    
    xit('DELETE - Deletar usuário sem estar logado', () => {
        cy.request({
            method: 'DELETE',
            url:'https://me-conta-backend.herokuapp.com/usuario/delete/39',
            failOnStatusCode: false,
            headers:{
                "accept" : 'application/json',
                "Content-Type" : 'application/json'
            },
        }).as('response')

        cy.get('@response').then(res =>{
            cy.expect(res.status).to.be.eq(401)
            cy.expect(res.body.error).to.be.eq("Unauthorized")
        })
    })

    xit('DELETE - Deletar usuário sem estar logado', () => {
        cy.request({
            method: 'DELETE',
            url:'https://me-conta-backend.herokuapp.com/usuario/delete/39',
            failOnStatusCode: false,
            headers:{
                "access-token" : token,
                "accept" : 'application/json',
                "Content-Type" : 'application/json'
            },
        }).as('response')

        cy.get('@response').then(res =>{
            cy.expect(res.status).to.be.eq(404)
            cy.expect(res.body.message).to.be.eq("Não encontrado")
            cy.expect(res.body.error).to.be.eq("Not Found")
        })
    })
        
})