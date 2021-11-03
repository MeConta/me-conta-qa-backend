/// <reference types="Cypress">

import {getToken} from "../../../support/token";
import {internet} from "faker/locale/pt_BR";

describe('Me Conta ? - Auth',() => {

    const req = {
        username: internet.email(),
        password: 's#nh4Valida'
    }

    before(() => {
        getToken(0, {
            email: req.username,
            senha: req.password
        });
    });

    it('POST - Login - Logado com sucesso',() => {
        cy.request({
            method: 'POST',
            url:'/auth/login',
            failOnStatusCode: false,
            headers:{
                "accept" : 'application/json',
                "Content-Type" : 'application/json'
            },
            body: req,
        }).should(({status, body}) =>{
            expect(status).to.be.eq(200)
            expect(body['token']).to.be.not.null
        })
    })

    it('POST - Login - Senha inválida',()=>{
        cy.request({
            method: 'POST',
            url: '/auth/login',
            failOnStatusCode: false,
            headers:{
                "accept" : 'application/json',
                "Content-Type" : 'application/json'
            },
            body: {
                ...req,
                password: 'invalida'
            },
        }).should(({status, body}) => {
            expect(status).to.be.eq(401);
            expect(body.message).to.be.eq("Unauthorized");
        });
    });
});