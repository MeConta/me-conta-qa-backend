/// <reference types="Cypress" />

import moment from 'moment';
import { faker } from '@faker-js/faker';

const generateVoluntario = () => ({
    "telefone": "11912345678",
    "dataNascimento": moment().subtract(18, 'years').format('YYYY-MM-DD'),
    "cidade": "Acrelândia",
    "UF": "AC",
    "genero": "ND",
    "formado": true,
    "anoFormacao": +moment(faker.date.past()).format('YYYY'),
    "areaAtuacao": "psicologo",
    "crp": faker.lorem.words(3),
    "instituicao": "Faculdade",
    "especializacoes": "Especializações",
    "tipo": 1,
    "frentes": [0, 1, 2],
    "bio": faker.lorem.paragraphs(3)
});

describe('Me Conta ? - Cadastro Voluntário', () => {

    beforeEach(() => {
        const usuario = {
            email: faker.internet.email(),
            senha: 's#nh4Valida',
            nome: faker.name.findName()
        }
        cy.cadastroInicial(usuario, 1);
        cy.login(usuario.email, usuario.senha);
    });

    it('Cadastro Voluntário - Sucesso', () => {
        cy.cadastroVoluntario(generateVoluntario(), Cypress.env('token'))
            .should(({ status }) => {
                expect(status).to.be.eq(201);
            });
    });

    it('Cadastro Voluntário - Telefone inserido no formato errado', () => {
        const voluntarioTelefoneErrado = {
            ...generateVoluntario(),
            "telefone": "a0000-0000"
        };

        cy.cadastroVoluntario(voluntarioTelefoneErrado, Cypress.env('token'), false)
            .should(({ status, body }) => {
                expect(status).to.be.eq(400);
                expect(body.message[0]).to.be.eq("telefone deve ser um telefone válido");
            });
    });

    it('Cadastro Voluntário - Campo telefone vazio', () => {
        const voluntarioTelefoneVazio = {
            ...generateVoluntario(),
            telefone: ""
        };

        cy.cadastroVoluntario(voluntarioTelefoneVazio, Cypress.env('token'), false)
            .should(({ status, body }) => {
                expect(status).to.be.eq(400)
                expect(body.message[0]).to.be.eq("telefone deve ser um telefone válido")
                expect(body.message[1]).to.be.eq("telefone não deve ser vazio")
            });
    });

    it('Cadastro Voluntário - Campo CRP vazio', () => {
        const voluntarioCRPVazio = {
            ...generateVoluntario(),
            "crp": ""
        };

        cy.cadastroVoluntario(voluntarioCRPVazio, Cypress.env('token'), false)
            .should(({ status, body }) => {
                expect(status).to.be.eq(400);
                expect(body.message[0]).to.be.eq("crp não deve ser vazio");
            });
    });

    it('Cadastro Voluntário - Menor de 18 anos', () => {
        const voluntarioMenor18 = {
            ...generateVoluntario(),
            dataNascimento: moment().format('YYYY-MM-DD')
        };

        cy.cadastroVoluntario(voluntarioMenor18, Cypress.env('token'), false)
            .should(({ status, body }) => {
                expect(status).to.be.eq(400);
                expect(body.message[0]).to.be.eq("dataNascimento deve ser superior a 18 anos");
            });
    });

});

describe('Me Conta ? - Cadastro Voluntário - Erro de credenciais', () => {

    beforeEach(() => {
        const usuario = {
            email: faker.internet.email(),
            senha: 's#nh4Valida',
            nome: faker.name.findName()
        }
        // same but with type = 0 (aluno)
        cy.cadastroInicial(usuario);
        cy.login(usuario.email, usuario.senha);
    });

    it('Cadastro Voluntário - Login com usuário perfil aluno', () => {
        cy.cadastroVoluntario(generateVoluntario(), Cypress.env('token'), false)
            .should(({ status, body }) => {
                expect(status).to.be.eq(403);
                expect(body.message).to.be.eq("Forbidden resource");
            });
    })

    it('Cadastro Voluntário - Token de autorização ausente', () => {
        cy.cadastroAluno(generateVoluntario(), '', false)
            .should(({ status, body }) => {
                expect(status).to.be.eq(401);
                expect(body.message).to.be.eq("Unauthorized");
            });
    });
})