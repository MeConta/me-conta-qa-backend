/// <reference types="Cypress"/>

import { faker } from "@faker-js/faker";

describe("Me Conta ? - Auth", () => {
  const senhaValida = "s#nh4Valida";

  const req = {
    username: faker.internet.email(),
    password: senhaValida,
    nome: faker.name.findName(),
  };

  before(() => {
    const usuario = {
      email: req.username,
      senha: req.password,
      nome: req.nome,
    };
    cy.cadastroInicial(usuario);
    cy.login(req.username, req.password);
  });

  it("POST - Logout - Sair com sucesso", () => {
    cy.request({
      method: "POST",
      url: "/auth/logout",
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }).should(({ status }) => {
      expect(status).to.be.eq(200);
    });
  });

  it("POST - Logout - Unauthorized", () => {
    cy.request({
      method: "POST",
      url: "/auth/logout",
      failOnStatusCode: false,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }).should(({ status }) => {
      expect(status).to.be.eq(401);
    });
  });
});
