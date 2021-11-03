/// <reference types="Cypress" >

import {internet, name, lorem} from 'faker/locale/pt_BR';

const senha = "s#nh4Valida";

const req = () => ({
    nome: name.findName(),
    email: internet.email(),
    senha,
    tipo: 0
});

describe('Me conta ? - Cadastro Inicial', () => {

    it('Cadastro Inicial - Sucesso - Tipo 0', () => {

        cy.request({
            method: 'POST',
            url: '/cadastro-inicial',
            failOnStatusCode: false,
            headers: {
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: req(),
        }).should(({status}) => {
            expect(status).to.be.eq(201);
        });
    });

    it('Cadastro Inicial - Sucesso - Tipo 1 ', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-inicial',
            failOnStatusCode: false,
            headers: {
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req(),
                tipo: 1
            },
        }).should(({status}) => {
            expect(status).to.be.eq(201);
        });
    });

    it('Cadastro Inicial - Sucesso - Tipo 2', () => {

        cy.request({
            method: 'POST',
            url: '/cadastro-inicial',
            failOnStatusCode: false,
            headers: {
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req(),
                "tipo": 2
            },
        }).should(({status}) => {
            expect(status).to.be.eq(201);
        });
    });

    it('Cadastro Inicial - Tipo não existente', () => {

        cy.request({
            method: 'POST',
            url: '/cadastro-inicial',
            failOnStatusCode: false,
            headers: {
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req(),
                "tipo": 999
            },
        }).should(({status, body}) => {
            expect(status).to.be.eq(400)
            expect(body.message[0]).to.be.eq("tipo deve ser um valor de enum válido")
        });
    });

    it('Cadastro Inicial - Usuário com e-mail já cadastrado', () => {

        cy.request({
            method: 'POST',
            url: '/cadastro-inicial',
            failOnStatusCode: false,
            headers: {
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: req(),
        }).then(({body}) => {

            const {email} = body;

            cy.request({
                method: 'POST',
                url: '/cadastro-inicial',
                failOnStatusCode: false,
                headers: {
                    "accept": '*/*',
                    "Content-Type": 'application/json'
                },
                body: {
                    ...req(),
                    email
                },
            }).should(({status, body}) => {
                console.log('AAA', body);
                expect(status).to.be.eq(409);
                expect(body.message).to.be.eq("e-mail duplicado");
            });
        });
    })

    it('Cadastro Inicial - Usuário com nome menor que 2 caracteres', () => {

        cy.request({
            method: 'POST',
            url: '/cadastro-inicial',
            failOnStatusCode: false,
            headers: {
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
               ...req(),
                "nome": "M",
                "tipo": 0
            },
        }).should(({status, body}) => {
            expect(status).to.be.eq(400);
            expect(body.message[0]).to.be.eq("nome deve ter mais de 2 caracteres");
        });
    });

    it('Cadastro Inicial - Usuário com nome mais que 100 caracteres', () => {

        cy.request({
            method: 'POST',
            url: '/cadastro-inicial',
            failOnStatusCode: false,
            headers: {
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req(),
                nome: lorem.words(100).substring(100),
            },
        }).should(({status, body}) => {
            expect(status).to.be.eq(400);
            expect(body.message[0]).to.be.eq("nome deve ter menos de 100 caracteres");
        });
    });

    it('Cadastro Inicial - Usuário nome com espaços', () => {

        cy.request({
            method: 'POST',
            url: '/cadastro-inicial',
            failOnStatusCode: false,
            headers: {
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req(),
                "nome": "  ",
            },
        }).should(({status}) => {
            expect(status).to.be.eq(400);
        });
    })

    it('Cadastro Inicial - Usuário com e-mail inválido', () => {

        cy.request({
            method: 'POST',
            url: '/cadastro-inicial',
            failOnStatusCode: false,
            headers: {
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req(),
                "email": "teste",
            },
        }).should(({status, body}) => {
            expect(status).to.be.eq(400);
            expect(body.message[0]).to.be.eq("email deve ser um e-mail válido");
        });
    });

    it('Cadastro Inicial - Usuário sem inserir senha', () => {

        cy.request({
            method: 'POST',
            url: '/cadastro-inicial',
            failOnStatusCode: false,
            headers: {
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req(),
                "senha": "",
            },
        }).should(({status, body}) => {
            expect(status).to.be.eq(400);
            expect(body.message[0]).to.be.eq("senha deve ser uma senha forte");
            expect(body.message[1]).to.be.eq("senha não pode ser vazio");
        });
    });
});