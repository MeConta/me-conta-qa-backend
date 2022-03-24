/// <reference types="Cypress" />

import faker from "@faker-js/faker";

const aluno = {
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
            nome: faker.name.findName()
        }
        cy.cadastroInicial(usuario);
        cy.login(usuario.email, usuario.senha);
    });

    it('Cadastro Aluno - Sucesso', () => {
        cy.cadastroAluno(aluno, Cypress.env('token'))
            .should(({ status }) => {
                expect(status).to.be.eq(201);
            });
    })

    it('Cadastro Aluno - Telefone inserido no formato errado', () => {
        const alunoTelefoneErrado = {
            ...aluno,
            "telefone": "a0000-0000",
        };

        cy.cadastroAluno(alunoTelefoneErrado, Cypress.env('token'), false)
            .should(({ status, body }) => {
                expect(status).to.be.eq(400);
                expect(body.message[0]).to.be.eq("telefone deve ser um telefone válido");
            });
    });

    it('Cadastro Aluno - DataNascimento inserindo data inválida', () => {
        const alunoDataNascimientoInvalida = {
            ...aluno,
            "dataNascimento": "00/00/0000",
        };

        cy.cadastroAluno(alunoDataNascimientoInvalida, Cypress.env('token'), false)
            .should(({ status, body }) => {
                expect(status).to.be.eq(400);
                expect(body.message[0]).to.be.eq("dataNascimento deve ser uma data");
            });
    })

    it('Cadastro Aluno - Campo telefone vazio', () => {
        const alunoTelefoneVazio = {
            ...aluno,
            "telefone": "",
        };

        cy.cadastroAluno(alunoTelefoneVazio, Cypress.env('token'), false)
            .should(({ status, body }) => {
                expect(status).to.be.eq(400);
                expect(body.message[0]).to.be.eq("telefone deve ser um telefone válido");
                expect(body.message[1]).to.be.eq("telefone não deve ser vazio");
            });
    })

    it('Cadastro Aluno - Campo dataNascimento vazio', () => {
        const alunoDataNascimientoVazio = {
            ...aluno,
            "dataNascimento": ""
        };

        cy.cadastroAluno(alunoDataNascimientoVazio, Cypress.env('token'), false)
            .should(({ status, body }) => {
                expect(status).to.be.eq(400);
                expect(body.message[0]).to.be.eq("dataNascimento deve ser uma data");
            });
    })

    it('Cadastro Aluno - Campo genero vazio', () => {
        const alunoGeneroVazio = {
            ...aluno,
            "genero": "",
        };

        cy.cadastroAluno(alunoGeneroVazio, Cypress.env('token'), false)
            .should(({ status, body }) => {
                expect(status).to.be.eq(400);
                expect(body.message[0]).to.be.eq("genero deve ser um valor de enum válido");
            });
    })

    it('Cadastro Aluno - Campo tipoEscola vazio', () => {
        const alunoTipoEscolaVazio = {
            ...aluno,
            "tipoEscola": "",
        };

        cy.cadastroAluno(alunoTipoEscolaVazio, Cypress.env('token'), false)
            .should(({ status, body }) => {
                expect(status).to.be.eq(400);
                expect(body.message[0]).to.be.eq("tipoEscola deve ser um valor de enum válido");
            });
    })

    it('Cadastro Aluno - Campo escolaridade vazio', () => {
        const alunoEscolaridadeVazio = {
            ...aluno,
            "escolaridade": ""
        };

        cy.cadastroAluno(alunoEscolaridadeVazio, Cypress.env('token'), false)
            .should(({ status, body }) => {
                expect(status).to.be.eq(400);
                expect(body.message[0]).to.be.eq("escolaridade deve ser um valor de enum válido");
            });
    })
})

describe('Me Conta ? - Cadastro Aluno - Erro de credenciais', () => {

    before(() => {
        const usuario = {
            email: faker.internet.email(),
            senha: 's#nh4Valida',
            nome: faker.name.findName()
        }
        cy.cadastroInicial(usuario, 1);
        cy.login(usuario.email, usuario.senha);
    });

    it('Cadastro Aluno - Login com usuário perfil diferente de aluno', () => {
        cy.cadastroAluno(aluno, Cypress.env('token'), false)
            .should(({ status, body }) => {
                expect(status).to.be.eq(403);
                expect(body.message).to.be.eq("Forbidden resource");
            });
    });

    it('Cadastro Aluno - Token de autorização ausente', () => {
        cy.cadastroAluno(aluno, '', false)
            .should(({ status, body }) => {
                expect(status).to.be.eq(401);
                expect(body.message).to.be.eq("Unauthorized");
            });
    });
})