/// <reference types="Cypress" >
import { faker } from '@faker-js/faker';

Cypress.Commands.add('login', (username, password) => {
    cy.request('POST', '/auth/login', { username, password })
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.token).to.exist;
            Cypress.env('token', response.body.token);
        })
})

Cypress.Commands.add('cadastroInicial', (usuario, tipo = 0) => {
    usuario = {
        email: usuario?.email || faker.internet.email(),
        senha: usuario?.senha || 's#nh4Valida',
        nome: usuario?.nome || faker.name.findName()
    }
    const { email, senha, nome } = usuario;

    cy.request('POST', '/cadastro-inicial', { email, senha, nome, tipo })
        .then(response => {
            expect(response.status).to.equal(201);
        })
})