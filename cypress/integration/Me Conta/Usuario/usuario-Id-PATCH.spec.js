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

    it('PATCH-Usuário Admnistrador-Logado - Usuário com permissão', () => {
        cy.request({
            method: 'PATCH',
            url: 'https://me-conta-backend.herokuapp.com/usuario/61',
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
            cy.expect(res.status).to.be.eq(200)
            cy.expect(res.body.id).to.be.eq(61)
        })

    })
})

describe.skip('Me Conta ? - Usuário', () => {

    it('PATCH-Usuário Admnistrador - Usuário precisa estar logado', () => {
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
                "username": "teste@teste.com",
                "password": "s#nh4Valida"
            },
        }).then(response =>{
            idmToken = response.body.token
        })
        
    })

    it('PATCH-Usuário Atendente-ID-Logado - Usuário não tem pemissão ', () => {
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
                "email": "teste@teste.com",
                "nome": "Maria Silva",
                "genero": "M",
                "UF": "AC",
                "cidade": "Acrelândia",
                "tipoUsuario": "ATENDENTE"
            },
           
        }).as('response')

        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(403)
            cy.expect(res.body.message).to.be.eq("Forbidden resource")

        })
    })
})

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

    it('PATCH-Usuário Admnistrador-Logado - Item não encontrado', () => {
        cy.request({
            method: 'PATCH',
            url: 'https://me-conta-backend.herokuapp.com/usuario/17773',
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
            cy.expect(res.status).to.be.eq(404)
            cy.expect(res.body.message).to.be.eq("Não encontrado")
        })

    })
})

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