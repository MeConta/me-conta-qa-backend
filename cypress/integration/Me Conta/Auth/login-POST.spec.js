/// <reference types="Cypress"/>

import { faker } from '@faker-js/faker'

describe('Me Conta ? - Auth', () => {
    const req = {
        username: faker.internet.email(),
        password: 's#nh4Valida',
        nome: faker.name.findName()
    }

    before(() => {
        const usuario = {
            email: req.username,
            senha: req.password,
            nome: req.nome
        }
        cy.cadastroInicial(usuario);
        cy.login(req.username, req.password);
    });

    it('POST - Login - Logado com sucesso', () => {
        cy.request({
            method: 'POST',
            url: '/auth/login',
            failOnStatusCode: false,
            headers: {
                "accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: req,
        }).should(({ status, body }) => {
            expect(status).to.be.eq(200)
            expect(body['token']).to.be.not.null
        })
    })

    it('POST - Login - Senha inválida', () => {
        cy.request({
            method: 'POST',
            url: '/auth/login',
            failOnStatusCode: false,
            headers: {
                "accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: {
                ...req,
                password: 'invalida'
            },
        }).should(({ status, body }) => {
            expect(status).to.be.eq(401);
            expect(body.message).to.be.eq("Unauthorized");
        });
    });
});