/// <reference types="Cypress" >

import faker, { date } from 'faker'
faker.locale = 'pt_BR'

describe('Me Conta ? - Cadastro Voluntário', () => {
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

    it('Cadastro Voluntário - Sucesso', () => {
        const telefone = faker.phone.phoneNumberFormat()
        const data = faker.date.past()

        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/cadastro-voluntario',
            failOnStatusCode: false,
            headers:{
                Authorization : `Bearer ${token}`,
                "accept" : '*/*',
                "Content-Type" : 'application/json'
            },
            body:{
                "telefone": `${telefone}`,
                "dataNascimento": "1988-03-09", 
                "cidade": "Acrelândia",
                "estado": "AC",
                "genero": "ND",
                "instituicao": "Faculdade",
                "formado": true,
                "frentes": [
                 0
                ],
                "semestre": 10,
                "anoFormacao": 2020,
                "crp": "00/000000",
                "areaAtuacao": "professor",
                "especializacoes": "ND"
        },
    }).as('response')
    cy.get('@response').then(res => {
        cy.expect(res.status).to.be.eq(201)
    })
})
})