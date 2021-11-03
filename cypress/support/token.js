import {internet, name} from "faker/locale/pt_BR";

export const getToken = (tipo = 0, usuario) => {
    usuario = {
        email: usuario?.email || internet.email(),
        senha: usuario?.senha || 's#nh4Valida'
    }
    const {email, senha} = usuario;

    cy.request('POST', '/cadastro-inicial', {
        email,
        senha,
        nome: name.findName(),
        tipo
    });

    cy.login(email, senha);

    Cypress.env('token');

    /*return new Promise((async (resolve) => {
        await



        /*cy.request('POST', '/auth/login', {
            username: `${email}`,
            password: `${senha}`
        }).then( ({body}) => {
            const { token } = body;
            resolve(token);
        } );*//*
    }));*/

}