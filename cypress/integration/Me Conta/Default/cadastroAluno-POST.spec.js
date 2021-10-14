/// <reference types="Cypress" >

describe('Me Conta ? - Cadastro Aluno', () => {
    let token
    
    beforeEach(()=>{
        cy.request({
            method:'POST',
            url: 'https://me-conta-backend.herokuapp.com/auth/login',
            failOnStatusCode: false,
            headers:{
                "accept" : 'application/json',
                "Content-Type" : 'application/json'
            },
            body:{
                "username": "aluno@teste.com",
                "password": "s#nh4Valida"
            },
        }).then(response =>{
            token = response.body.token
        })
    })    

    it('Cadastro Aluno - Sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-aluno',
            failOnStatusCode: false,
            headers:{
                Authorization : `Bearer ${token}`,
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body: {
                "telefone": "(11) 91234-5678",
                "dataNascimento": "1996-07-12",
                "cidade": "Acrelândia",
                "estado": "AC",
                "genero": "ND",
                "tipoEscola": 0,
                "escolaridade": 0
            },
        }).as('response')
        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(201)
        })
    })

    it('Cadastro Aluno - Telefone inserido no formato errado', () => {
        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-aluno',
            failOnStatusCode: false,
            headers:{
                Authorization : `Bearer ${token}`,
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body: {
                "telefone": "a0000-0000",
                "dataNascimento": "1996-07-12",
                "cidade": "Acrelândia",
                "estado": "AC",
                "genero": "ND",
                "tipoEscola": 0,
                "escolaridade": 0
            },
        }).as('response')
        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(400)
            cy.expect(res.body.message[0]).to.be.eq("telefone deve ser um telefone válido")
        })
    })

    it('Cadastro Aluno - DataNascimento inserindo data inválida', () => {
        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-aluno',
            failOnStatusCode: false,
            headers:{
                Authorization : `Bearer ${token}`,
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body: {
                "telefone": "(11) 91234-5678",
                "dataNascimento": "00/00/0000",
                "cidade": "Acrelândia",
                "estado": "AC",
                "genero": "ND",
                "tipoEscola": 0,
                "escolaridade": 0
            },
        }).as('response')
        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(400)
            cy.expect(res.body.message[0]).to.be.eq("dataNascimento deve ser uma data")
        })
    })

    it('Cadastro Aluno - Campo telefone vazio', () => {
        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-aluno',
            failOnStatusCode: false,
            headers:{
                Authorization : `Bearer ${token}`,
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body: {
                "telefone": "",
                "dataNascimento": "1996-07-12",
                "cidade": "Acrelândia",
                "estado": "AC",
                "genero": "ND",
                "tipoEscola": 0,
                "escolaridade": 0
            },
        }).as('response')
        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(400)
            cy.expect(res.body.message[0]).to.be.eq("telefone deve ser um telefone válido")
            cy.expect(res.body.message[1]).to.be.eq("telefone não deve ser vazio")
        })
    })

    it('Cadastro Aluno - Campo dataNascimento vazio', () => {
        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-aluno',
            failOnStatusCode: false,
            headers:{
                Authorization : `Bearer ${token}`,
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body: {
                "telefone": "(11) 91234-5678",
                "dataNascimento": "",
                "cidade": "Acrelândia",
                "estado": "AC",
                "genero": "ND",
                "tipoEscola": 0,
                "escolaridade": 0
            },
        }).as('response')
        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(400)
            cy.expect(res.body.message[0]).to.be.eq("dataNascimento deve ser uma data")
        })
    })

    it('Cadastro Aluno - Campo genero vazio', () => {
        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-aluno',
            failOnStatusCode: false,
            headers:{
                Authorization : `Bearer ${token}`,
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body: {
                "telefone": "(11) 91234-5678",
                "dataNascimento": "1996-07-12",
                "cidade": "Acrelândia",
                "estado": "AC",
                "genero": "",
                "tipoEscola": 0,
                "escolaridade": 0
            },
        }).as('response')
        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(400)
            cy.expect(res.body.message[0]).to.be.eq("genero deve ser um valor de enum válido")
        })
    })

    it('Cadastro Aluno - Campo tipoEscola vazio', () => {
        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-aluno',
            failOnStatusCode: false,
            headers:{
                Authorization : `Bearer ${token}`,
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body: {
                "telefone": "(11) 91234-5678",
                "dataNascimento": "1996-07-12",
                "cidade": "Acrelândia",
                "estado": "AC",
                "genero": "ND",
                "tipoEscola": " ",
                "escolaridade": 0
            },
        }).as('response')
        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(400)
            cy.expect(res.body.message[0]).to.be.eq("tipoEscola deve ser um valor de enum válido")
        })
    })

    it('Cadastro Aluno - Campo escolaridade vazio', () => {
        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-aluno',
            failOnStatusCode: false,
            headers:{
                Authorization : `Bearer ${token}`,
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body: {
                "telefone": "(11) 91234-5678",
                "dataNascimento": "1996-07-12",
                "cidade": "Acrelândia",
                "estado": "AC",
                "genero": "ND",
                "tipoEscola": 0,
                "escolaridade": " "
            },
        }).as('response')
        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(400)
            cy.expect(res.body.message[0]).to.be.eq("escolaridade deve ser um valor de enum válido")
        })
    })
})

describe('Me Conta ? - Cadastro Aluno - Erro de credenciais', () => {
    let token
    
    beforeEach(()=>{
        cy.request({
            method:'POST',
            url: 'https://me-conta-backend.herokuapp.com/auth/login',
            failOnStatusCode: false,
            headers:{
                "accept" : 'application/json',
                "Content-Type" : 'application/json'
            },
            body:{
                "username": "voluntrio.supervisor@teste.com",
                "password": "s#nh4Valida"
            },
        }).then(response =>{
            token = response.body.token
        })
    })    
    
    it('Cadastro Aluno - Login com usuário perfil diferente de aluno', () => {
        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-aluno',
            failOnStatusCode: false,
            headers:{
                Authorization : `Bearer ${token}`,
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body: {
                "telefone": "(11) 91234-5678",
                "dataNascimento": "1996-07-12",
                "cidade": "Acrelândia",
                "estado": "AC",
                "genero": "ND",
                "tipoEscola": 0,
                "escolaridade": 0
            },
        }).as('response')
        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(403)
            cy.expect(res.body.message).to.be.eq("Forbidden resource")
        })
    })
})