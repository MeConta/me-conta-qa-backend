/// <reference types="Cypress">

describe('Me Conta ? - Auth',()=>{
    it('POST - Login - Logado com sucesso',()=>{
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
        })
    })

    it('POST - Login - Senha inválida',()=>{
        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/auth/login',
            failOnStatusCode: false,
            headers:{
                "accept" : 'application/json',
                "Content-Type" : 'application/json'
            },
            body:{
                "username": "teste@teste.com",
                "password": "s3nN4val!d@"
            },
        }).as('response')

        cy.get('@response').then(res=>{
            cy.expect(res.status).to.be.eq(401)
            cy.expect(res.body.message).to.be.eq("Unauthorized")
        })
    })
})