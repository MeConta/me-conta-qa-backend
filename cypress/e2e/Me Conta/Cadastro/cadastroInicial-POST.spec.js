/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";

let usuario;

describe("Me conta ? - Cadastro Inicial", () => {
  beforeEach(() => {
    usuario = {
      nome: faker.name.findName(),
      email: faker.internet.email(),
      senha: "s#nh4Valida",
      tipo: 0,
    };
  });

  const tipos = [0, 1, 2];
  tipos.forEach((tipo) => {
    it(`Cadastro Inicial - Sucesso - Tipo ${tipo}`, () => {
      cy.cadastroInicial(usuario, tipo).should(({ status }) => {
        expect(status).to.be.eq(201);
      });
    });
  });

  it("Cadastro Inicial - Tipo não existente", () => {
    cy.cadastroInicial(usuario, 999, false).should(({ status, body }) => {
      expect(status).to.be.eq(400);
      expect(body.message[0]).to.be.eq("tipo deve ser um valor de enum válido");
    });
  });

  it("Cadastro Inicial - Usuário com e-mail já cadastrado", () => {
    cy.cadastroInicial(usuario, 0, false).then(() => {
      cy.cadastroInicial(usuario, 0, false).should(({ status, body }) => {
        expect(status).to.be.eq(409);
        expect(body.message).to.be.eq("E-mail duplicado");
      });
    });
  });

  it("Cadastro Inicial - Usuário com nome menor que 2 caracteres", () => {
    const usuarioWithInvalidNome = { ...usuario, nome: "M" };
    cy.cadastroInicial(usuarioWithInvalidNome, 0, false).should(
      ({ status, body }) => {
        expect(status).to.be.eq(400);
        expect(body.message[0]).to.be.eq("nome deve ter mais de 2 caracteres");
      }
    );
  });

  it("Cadastro Inicial - Usuário com nome mais que 100 caracteres", () => {
    const usuarioWithLongNome = {
      ...usuario,
      nome: faker.lorem.words(100).substring(100),
    };
    cy.cadastroInicial(usuarioWithLongNome, 0, false).should(
      ({ status, body }) => {
        expect(status).to.be.eq(400);
        expect(body.message[0]).to.be.eq(
          "nome deve ter menos de 100 caracteres"
        );
      }
    );
  });

  it("Cadastro Inicial - Usuário nome com espaços", () => {
    const usuarioNomeComEspacos = { ...usuario, nome: "  " };
    cy.cadastroInicial(usuarioNomeComEspacos, 0, false).should(({ status }) => {
      expect(status).to.be.eq(400);
    });
  });

  it("Cadastro Inicial - Usuário com e-mail inválido", () => {
    const usuarioWithInvalidEmail = { ...usuario, email: "teste" };
    cy.cadastroInicial(usuarioWithInvalidEmail, 0, false).should(
      ({ status, body }) => {
        expect(status).to.be.eq(400);
        expect(body.message[0]).to.be.eq("email deve ser um e-mail válido");
      }
    );
  });

  it("Cadastro Inicial - Usuário sem inserir senha", () => {
    const usuarioWithoutSenha = { ...usuario, senha: "" };
    cy.cadastroInicial(usuarioWithoutSenha, 0, false).should(
      ({ status, body }) => {
        expect(status).to.be.eq(400);
        expect(body.message[0]).to.be.eq("senha deve ser uma senha forte");
        expect(body.message[1]).to.be.eq("senha não pode ser vazio");
      }
    );
  });
});
