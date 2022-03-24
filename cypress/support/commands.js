/// <reference types="Cypress" />

Cypress.Commands.add('login', (username, password) => {
    cy.request('POST', '/auth/login', { username, password })
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.token).to.exist;
            Cypress.env('token', response.body.token);
        })
})

Cypress.Commands.add('cadastroInicial', (usuario, tipo = 0, failOnStatusCode = true) => {
    const { email, senha, nome } = usuario;
    return cy.request({
        method: 'POST',
        url: '/cadastro-inicial',
        failOnStatusCode: failOnStatusCode,
        headers: {
            "accept": '*/*',
            "Content-Type": 'application/json'
        },
        body: { email, senha, nome, tipo }
    });
})

Cypress.Commands.add('cadastroVoluntario', (voluntario, token, failOnStatusCode = true) => {
    return cy.request({
        method: 'POST',
        url: '/cadastro-voluntario',
        failOnStatusCode: failOnStatusCode,
        headers: {
            Authorization: `Bearer ${token}`,
            "accept": '*/*',
            "Content-Type": 'application/json'
        },
        body: voluntario,
    })
})