import {internet, name} from "faker/locale/pt_BR";

export const getToken = async (tipo = 0, usuario) => {
    usuario = {
        email: usuario?.email || internet.email(),
        senha: usuario?.senha || 's#nh4Valida'
    }
    const {email, senha} = usuario;
    return new Promise((async (resolve) => {
        await cy.request('POST', '/cadastro-inicial', {
            email,
            senha,
            nome: name.findName(),
            tipo
        });

        cy.request('POST', '/auth/login', {
            username: `${email}`,
            password: `${senha}`
        }).then( ({body}) => {
            const { token } = body;
            resolve(token);
        } );
    }));

}