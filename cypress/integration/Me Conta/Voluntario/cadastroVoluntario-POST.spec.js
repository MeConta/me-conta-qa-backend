/// <reference types="Cypress" >

import {lorem, date} from "faker/locale/pt_BR";
import moment from 'moment';
import {getToken} from "../../../support/token";


describe('Me Conta ? - Cadastro Voluntário', () => {
    let token;

    let req = () => ({
        "telefone": "11912345678",
        "dataNascimento": moment().subtract(18, 'years').format('YYYY-MM-DD'),
        "cidade": "Acrelândia",
        "UF": "AC",
        "genero": "ND",
        "formado": true,
        "anoFormacao": +moment(date.past()).format('YYYY'),
        "areaAtuacao": "psicologo",
        "crp": lorem.words(3),
        "instituicao": "Faculdade",
        "especializacoes": "Especializações",
        "tipo": 1,
        "frentes": [0, 1, 2],
        "bio": lorem.paragraphs(3)
    });


    beforeEach(() => {
        getToken(1).then(_token => token = _token);
    });

    it('Cadastro Voluntário - Sucesso', () => {
        console.log('TOK', token);
        cy.request({
            method: 'POST',
            url: '/cadastro-voluntario',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: req(),
        }).should(({status}) => {
            expect(status).to.be.eq(201)
        });
    });

    it('Cadastro Voluntário - Telefone inserido no formato errado', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-voluntario',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req(),
                "telefone": "a0000-0000",
            },
        }).should(({status, body}) => {
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
                Authorization: `Bearer ${token}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req(),
                telefone: "",
            },
        }).should(({status, body}) => {
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
                Authorization: `Bearer ${token}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req(),
                "crp": "",
            },
        }).should(({status, body}) => {
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
                Authorization: `Bearer ${token}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                ...req(),
                dataNascimento: moment().format('YYYY-MM-DD'),
            },
        }).should(({status, body}) => {
            expect(status).to.be.eq(400);
            expect(body.message[0]).to.be.eq("dataNascimento deve ser superior a 18 anos");
        });
    });

});

describe('Me Conta ? - Cadastro Voluntário - Erro de credenciais', () => {
    let token

    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: '/auth/login',
            failOnStatusCode: false,
            headers: {
                "accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: {
                "username": "teste@teste.com",
                "password": "s#nh4Valida"
            },
        }).then(response => {
            token = response.body.token
        })
    })

    it('Cadastro Voluntário - Login com usuário perfil aluno', () => {
        cy.request({
            method: 'POST',
            url: '/cadastro-voluntario',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}`,
                "accept": '*/*',
                "Content-Type": 'application/json'
            },
            body: {
                "telefone": "(11) 91234-5678",
                "dataNascimento": "1988-03-09",
                "cidade": "Acrelândia",
                "estado": "AC",
                "genero": "ND",
                "instituicao": "Faculdade",
                "formado": true,
                "frentes": [
                    0
                ],
                "semestre": 10,
                "anoFormacao": 2020,
                "crp": "00/000000",
                "areaAtuacao": "professor",
                "especializacoes": "ND"
            },
        }).as('response')
        cy.get('@response').then(res => {
            cy.expect(res.status).to.be.eq(403)
            cy.expect(res.body.message).to.be.eq("Forbidden resource")
        })
    })
})