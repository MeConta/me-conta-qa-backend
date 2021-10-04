/// <reference types="Cypress">


describe('Me Conta ? - Usuário', () => {

        it.skip('PATCH-Usuário Admnistrador - Usuário precisa estar logado', () => {
        cy.request({
            method: 'PATCH',
            url: 'https://me-conta-backend.herokuapp.com/usuario/61',
            failOnStatusCode: false,
            headers: {
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
            cy.expect(res.status).to.be.eq(401)
            cy.expect(res.body.message).to.be.eq("Unauthorized")
            
        })

    })

})