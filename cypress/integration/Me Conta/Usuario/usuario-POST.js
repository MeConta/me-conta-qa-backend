/// <reference types="Cypress">
import faker from 'faker'
faker.locale = 'pt_BR'

describe('Me Conta?',()=>{

    it('POST-Cadastro de usuário válido',()=>{
        const email = faker.internet.email()
        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/usuario',
            failOnStatusCode: false,
            headers:{ 
                "accept" : 'application/json',
                "Content-Type" : 'application/json'
            },
            body: {
                
                "senha": "s#nh4Valida",
                "dataNascimento": "1988-03-09",
                "telefone": "(81) 91234-5678",
                "email": `email${email}`,
                "nome": "Maria Silva",
                "genero": "M",
                "UF": "AC",
                "cidade": "Acrelândia",
                "tipoUsuario": "ATENDENTE"
            },

        }).as('response')

        cy.get('@response').then(res =>{
          
            expect(res.status).to.be.eq(201)
            expect(res.body.UF).to.be.eq("AC")
            expect(res.body.cidade).to.be.eq("Acrelândia")
            expect(res.body.dataNascimento).to.be.eq("1988-03-09T00:00:00.000Z")
            expect(res.body.genero).to.be.eq("M")
            expect(res.body.email).to.be.not.null
            expect(res.body.id).to.be.not.null
            expect(res.body.nome).to.be.eq("Maria Silva")
            expect(res.body.telefone).to.be.eq("(81) 91234-5678")
            expect(res.body.tipoUsuario).to.be.eq("ATENDENTE")


        })

    })
it('POST-Cadastro de usuário já cadastrado',()=>{
    cy.request({
        method: 'POST',
        url: 'https://me-conta-backend.herokuapp.com/usuario',
        failOnStatusCode: false,
        headers:{ 
            "accept" : 'application/json',
            "Content-Type" : 'application/json'
        },
        body: {
            
            "senha": "s#nh4Valida",
            "dataNascimento": "1988-03-09",
            "telefone": "(81) 91234-5678",
            "email": "teste@teste.com.br",
            "nome": "Maria Silva",
            "genero": "M",
            "UF": "AC",
            "cidade": "Acrelândia",
            "tipoUsuario": "ATENDENTE"
        },

    }).as('response')

    cy.get('@response').then(res=>{
       
        cy.expect(res.status).to.be.eq(422)
        cy.expect(res.body.message).to.be.eq("E-mail duplicado")
    })

    
})
    
    
})
