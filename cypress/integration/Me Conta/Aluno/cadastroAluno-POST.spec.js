/// <reference types="Cypress" >

import faker from "@faker-js/faker";

const req = {
    "telefone": "11912345678",
    "dataNascimento": "1996-07-12",
    "cidade": "Acrelândia",
    "UF": "AC",
    "genero": "ND",
    "tipoEscola": 0,
    "escolaridade": 0
}

describe('Me Conta ? - Cadastro Aluno', () => {

    before(() => {
        const usuario = {
            email: faker.internet.email(),
            senha: 's#nh4Valida',
        }
        cy.cadastroInicial(usuario);
        cy.login(usuario.email, usuario.senha);
    });

    it('Cadastro Aluno - Sucesso', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-aluno',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: req,
        }).should(({ status }) => {
            expect(status).to.be.eq(201);
        })
    })

    it('Cadastro Aluno - Telefone inserido no formato errado', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-aluno',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req,
                "telefone": "a0000-0000",
            },
        }).should(({ status, body }) => {
            expect(status).to.be.eq(400)
            expect(body.message[0]).to.be.eq("telefone deve ser um telefone válido")
        })
    });

    it('Cadastro Aluno - DataNascimento inserindo data inválida', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-aluno',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req,
                "dataNascimento": "00/00/0000",
            },
        }).should(({ status, body }) => {
            expect(status).to.be.eq(400)
            expect(body.message[0]).to.be.eq("dataNascimento deve ser uma data")
        })
    })

    it('Cadastro Aluno - Campo telefone vazio', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-aluno',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req,
                "telefone": "",
            },
        }).should(({ status, body }) => {
            expect(status).to.be.eq(400)
            expect(body.message[0]).to.be.eq("telefone deve ser um telefone válido")
            expect(body.message[1]).to.be.eq("telefone não deve ser vazio")
        })
    })

    it('Cadastro Aluno - Campo dataNascimento vazio', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-aluno',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req,
                "dataNascimento": "",
            },
        }).should(({ status, body }) => {
            expect(status).to.be.eq(400)
            expect(body.message[0]).to.be.eq("dataNascimento deve ser uma data")
        })
    })

    it('Cadastro Aluno - Campo genero vazio', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-aluno',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req,
                "genero": "",
            },
        }).should(({ status, body }) => {
            expect(status).to.be.eq(400)
            expect(body.message[0]).to.be.eq("genero deve ser um valor de enum válido")
        })
    })

    it('Cadastro Aluno - Campo tipoEscola vazio', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-aluno',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req,
                "tipoEscola": " ",
            },
        }).should(({ status, body }) => {
            expect(status).to.be.eq(400)
            expect(body.message[0]).to.be.eq("tipoEscola deve ser um valor de enum válido")
        })
    })

    it('Cadastro Aluno - Campo escolaridade vazio', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-aluno',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req,
                "escolaridade": " "
            },
        }).should(({ status, body }) => {
            expect(status).to.be.eq(400)
            expect(body.message[0]).to.be.eq("escolaridade deve ser um valor de enum válido")
        })
    })
})

describe('Me Conta ? - Cadastro Aluno - Erro de credenciais', () => {

    before(() => {
        const usuario = {
            email: faker.internet.email(),
            senha: 's#nh4Valida',
        }
        cy.cadastroInicial(usuario, 1);
        cy.login(usuario.email, usuario.senha);
    });

    it('Cadastro Aluno - Login com usuário perfil diferente de aluno', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-aluno',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: req,
        }).should(({ status, body }) => {
            expect(status).to.be.eq(403)
            expect(body.message).to.be.eq("Forbidden resource")
        });
    });
})