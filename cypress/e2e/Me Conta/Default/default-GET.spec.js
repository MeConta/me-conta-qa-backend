/// <reference types="Cypress">

describe('Me Conta ? - GET Default',() => {
    it('Default - Consulta get default',() => {
        cy.request('GET', '/').should(({status}) => {
            expect(status).to.be.eq(200);
        });
    });
});
