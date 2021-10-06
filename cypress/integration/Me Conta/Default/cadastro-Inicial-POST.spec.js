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
            cy.expect(res.status).to.be.eq(201)
            
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
            cy.expect(res.status).to.be.eq(201)
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
            cy.expect(res.status).to.be.eq(201)
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
            cy.expect(res.status).to.be.eq(403)
            cy.expect(res.body.message).to.be.eq('Não pode criar administrador')
        })
    })

    it('Cadastro Inicial - Tipo não existente', () => {
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
            cy.expect(res.body.message[0]).to.be.eq("tipo deve ser um valor de enum válido") 
        })
    })

    it('Cadastro Inicial - Usuário com e-mail já cadastrado', () => {
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

    it('Cadastro Inicial - Usuário com nome menor que 2 caracteres', () => {
        const email = faker.internet.email()
        
        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-inicial',
            failOnStatusCode: false,
            headers:{
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body:{
                "email": `${email}`,
                "senha": "s#nh4Valida",
                "nome": "M",
                "tipo": 0
            },
        }).as('response')

        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(400)
            cy.expect(res.body.message[0]).to.be.eq("nome deve ter mais de 2 caracteres")
            
        })
    })

    it('Cadastro Inicial - Usuário com nome mais que 100 caracteres', () => {
        const email = faker.internet.email()
        
        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-inicial',
            failOnStatusCode: false,
            headers:{
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body:{
                "email": `${email}`,
                "senha": "s#nh4Valida",
                "nome": "NomeCompletoNomeCompletoNomeCompletoNomeCompletoNomeCompletoNomeCompletoNomeCompletoNomeCompletoNomeCompletoNomeCompletoNomeCompletoNomeCompletoNomeCompletoNomeCompletoNomeCompletoNomeCompleto",
                "tipo": 0
            },
        }).as('response')

        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(400)
            cy.expect(res.body.message[0]).to.be.eq("nome deve ter menos de 100 caracteres")
            
        })
    })

    it('Cadastro Inicial - Usuário nome com espaços', () => {
        const email = faker.internet.email()
      
        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-inicial',
            failOnStatusCode: false,
            headers:{
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body:{
                "email": `${email}`,
                "senha": "s#nh4Valida",
                "nome": "  ",
                "tipo": 0
            },
        }).as('response')

        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(400)            
        })
    })

    it('Cadastro Inicial - Usuário com e-mail inválido', () => {
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
                "email": "teste",
                "senha": "s#nh4Valida",
                "nome": `${nome}`,
                "tipo": 0
            },
        }).as('response')

        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(400)
            cy.expect(res.body.message[0]).to.be.eq("email deve ser um e-mail válido")
            
        })
    })

    it('Cadastro Inicial - Usuário sem inserir senha', () => {
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
                "email": `${email}`,
                "senha": "",
                "nome": `${nome}`,
                "tipo": 0
            },
        }).as('response')

        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(400)
            cy.expect(res.body.message[0]).to.be.eq("senha deve ser uma senha forte")
            cy.expect(res.body.message[1]).to.be.eq("senha não pode ser vazio")
        })
    })
})