/// <reference types="Cypress" >

import moment from 'moment';
import { faker } from '@faker-js/faker';

const req = () => ({
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
        }
        cy.cadastroInicial(usuario, 1);
        cy.login(usuario.email, usuario.senha);
    });

    it('Cadastro Voluntário - Sucesso', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-voluntario',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: req(),
        }).should(({ status }) => {
            expect(status).to.be.eq(201)
        });
    });

    it('Cadastro Voluntário - Telefone inserido no formato errado', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-voluntario',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req(),
                "telefone": "a0000-0000",
            },
        }).should(({ status, body }) => {
            expect(status).to.be.eq(400);
            expect(body.message[0]).to.be.eq("telefone deve ser um telefone válido");
        });
    });

    it('Cadastro Voluntário - Campo telefone vazio', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-voluntario',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req(),
                telefone: "",
            },
        }).should(({ status, body }) => {
            expect(status).to.be.eq(400)
            expect(body.message[0]).to.be.eq("telefone deve ser um telefone válido")
            expect(body.message[1]).to.be.eq("telefone não deve ser vazio")
        });
    });

    it('Cadastro Voluntário - Campo CRP vazio', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-voluntario',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req(),
                "crp": "",
            },
        }).should(({ status, body }) => {
            expect(status).to.be.eq(400);
            expect(body.message[0]).to.be.eq("crp não deve ser vazio");
        });
    });

    it('Cadastro Voluntário - Menor de 18 anos', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-voluntario',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req(),
                dataNascimento: moment().format('YYYY-MM-DD'),
            },
        }).should(({ status, body }) => {
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
        }
        cy.cadastroInicial(usuario);
        cy.login(usuario.email, usuario.senha);
    });

    it('Cadastro Voluntário - Login com usuário perfil aluno', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-voluntario',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: req(),
        }).should(({ status, body }) => {
            expect(status).to.be.eq(403)
            expect(body.message).to.be.eq("Forbidden resource")
        })
    })
})