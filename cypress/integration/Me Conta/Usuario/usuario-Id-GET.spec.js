/// <reference types="Cypress">

describe.skip('Me Conta ? - Usuário', () => {
    it('GET - Consulta usuário pelo id com sucesso', () => {
        cy.request({
            method: 'GET', 
            url: 'https://me-conta-backend.herokuapp.com/usuario/4',
            failOnStatusCode: false,
            headers:{ 
                "accept" : 'application/json',
                "Content-Type" : 'application/json',
            },
        }).as('response')
        
        cy.get('@response').then(res =>{
            cy.expect(res.status).to.be.eq(200)
            cy.expect(res.body.id).to.be.eq(4)
            cy.expect(res.body.nome).to.be.eq("Maria Silva")
            cy.expect(res.body.email).to.be.eq("emailRaul.Melo@gmail.com")
            cy.expect(res.body.genero).to.be.eq("M")
            cy.expect(res.body.UF).to.be.eq("AC")
            cy.expect(res.body.cidade).to.be.eq("Acrelândia")
            cy.expect(res.body.telefone).to.be.eq("(81) 91234-5678")
            cy.expect(res.body.tipoUsuario).to.be.eq("ATENDENTE")
        })
    })

    it('GET - Consulta usuário pelo id não existe', () => {
        cy.request({
            method: 'GET', 
            url: 'https://me-conta-backend.herokuapp.com/usuario/9999',
            failOnStatusCode: false,
            headers:{ 
                "accept" : 'application/json',
                "Content-Type" : 'application/json',
            },
        }).as('response')

        cy.get('@response').then(res =>{
            cy.expect(res.status).to.be.eq(404)
            cy.expect(res.body.message).to.be.eq("Não encontrado")
            cy.expect(res.body.error).to.be.eq("Not Found")
        })
    })

    it('GET - Consulta usuário pelo id inválido', () => {
        cy.request({
            method: 'GET', 
            url: 'https://me-conta-backend.herokuapp.com/usuario/teste',
            failOnStatusCode: false,
            headers:{ 
                "accept" : 'application/json',
                "Content-Type" : 'application/json',
            },
        }).as('response')

        cy.get('@response').then(res =>{
            cy.expect(res.status).to.be.eq(400)
            cy.expect(res.body.message).to.be.eq("Validation failed (numeric string is expected)")
            cy.expect(res.body.error).to.be.eq("Bad Request")
        })
    })
})