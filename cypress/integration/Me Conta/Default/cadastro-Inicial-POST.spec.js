/// <reference types="Cypress" >

import faker from 'faker'
faker.locale = 'pt_BR'

describe('Me conta ? - Cadastro Inicial', () => {

    it('Cadastro Inicial - Sucesso - Tipo 0', () => {
        const email = faker.internet.email()
        const nome = faker.name.findName()

        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-inicial',
            failOnStatusCode: false,
            headers:{
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body:{
                "email": `email${email}`,
                "senha": "s#nh4Valida",
                "nome": `nome${nome}`,
                "tipo": 0
            },
        }).as('response')

        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(204)
            
        })

    })

    it('Cadastro Inicial - Sucesso - Tipo 1 ', () => {
        const email = faker.internet.email()
        const nome = faker.name.findName()

        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-inicial',
            failOnStatusCode: false,
            headers:{
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body:{
                "email": `email${email}`,
                "senha": "s#nh4Valida",
                "nome": `nome${nome}`,
                "tipo": 1
            },
        }).as('response')

        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(204)
            
        })

    })

    it('Cadastro Inicial - Sucesso - Tipo 2', () => {
        const email = faker.internet.email()
        const nome = faker.name.findName()

        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-inicial',
            failOnStatusCode: false,
            headers:{
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body:{
                "email": `email${email}`,
                "senha": "s#nh4Valida",
                "nome": `nome${nome}`,
                "tipo": 2
            },
        }).as('response')

        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(204)
            
        })

    })

    it('Cadastro Inicial - Sucesso - Tipo 3', () => {
        const email = faker.internet.email()
        const nome = faker.name.findName()

        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-inicial',
            failOnStatusCode: false,
            headers:{
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body:{
                "email": `email${email}`,
                "senha": "s#nh4Valida",
                "nome": `nome${nome}`,
                "tipo": 3
            },
        }).as('response')

        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(204)
              })

    })

    it('Cadastro Inicial - Sucesso - Tipo 4', () => {
        const email = faker.internet.email()
        const nome = faker.name.findName()

        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-inicial',
            failOnStatusCode: false,
            headers:{
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body:{
                "email": `email${email}`,
                "senha": "s#nh4Valida",
                "nome": `nome${nome}`,
                "tipo": 4
            },
        }).as('response')

        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(400)
            cy.expect(res.body.message[0]).to.be.eq("tipo must be a valid enum value")
            
        })

    })

    it('Cadastro Inicial - Sucesso - Usuário já cadastrado', () => {

        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-inicial',
            failOnStatusCode: false,
            headers:{
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body:{
                "email": "teste@teste.com",
                "senha": "s#nh4Valida",
                "nome": "Maria Silva",
                "tipo": 0
            },
        }).as('response')

        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(409)
            cy.expect(res.body.message).to.be.eq("e-mail duplicado")
            
        })

    })


})