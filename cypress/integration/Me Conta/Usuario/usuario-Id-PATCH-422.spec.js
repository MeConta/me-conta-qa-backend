/// <reference types="Cypress">

describe.skip('Me Conta ? - Usuário', () => {

    let idmToken
    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/auth/login',
            failOnStatusCode: false,
            headers: {
                "accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: {
                "username": "administrador@teste.com",
                "password": "s#nh4Valida"
            },
        }).then(response => {
            idmToken = response.body.token
        })

    })

    it('PATCH-Usuário Admnistrador-Logado - Violação de regra de negócio', () => {
        cy.request({
            method: 'PATCH',
            url: 'https://me-conta-backend.herokuapp.com/usuario/13',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${idmToken}`,
                "accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: {
                "senha": "s#nh4Valida",
                "dataNascimento": "1988-03-09",
                "telefone": "(81) 91234-5678",
                "email": "administrador@teste.com",
                "nome": "Maria Silva",
                "genero": "M",
                "UF": "AC",
                "cidade": "Acrelândia",
                "tipoUsuario": "ADMINISTRADOR"

            },

        }).as('response')

        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(422)
            cy.expect(res.body.message).to.be.eq("Parâmetros incorretos")
        })

    })
})