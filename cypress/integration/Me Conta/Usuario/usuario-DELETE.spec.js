/// <reference types="Cypress">
import faker from 'faker'
faker.locale = 'pt_BR'

describe('Me Conta ? - Usuário', () =>{
    let token
    
    beforeEach(()=>{
        cy.request({
            method:'POST',
            url: 'https://me-conta-backend.herokuapp.com/auth/login',
            failOnStatusCode: false,
            headers:{
                "accept" : 'application/json',
                "Content-Type" : 'application/json'
            },
            body:{
                "username": "teste@teste.com",
                "password": "s#nh4Valida"
            },
        }).then(response =>{
            token = response.body.token
        })
    })    
 
    it('DELETE - Cria usuário e deleta o mesmo com sucesso', () => {
        let idUser 
        const email = faker.internet.email()

        cy.request({
            method: 'POST',
            url: 'https://me-conta-backend.herokuapp.com/usuario',
            failOnStatusCode: false,
            headers:{ 
                "accept" : 'application/json',
                "Content-Type" : 'application/json'
            },
            body: {
                
                "senha": "s#nh4Valida",
                "dataNascimento": "1988-03-09",
                "telefone": "(81) 91234-5678",
                "email": `email${email}`,
                "nome": "Maria Silva",
                "genero": "M",
                "UF": "AC",
                "cidade": "Acrelândia",
                "tipoUsuario": "ATENDENTE"
            }
        }).then(response =>{
            idUser = response.body.id
            
            cy.request({
                method: 'DELETE',
                url:'https://me-conta-backend.herokuapp.com/usuario/' + `${idUser}`,
                failOnStatusCode: false,
                headers:{
                    Authorization : `Bearer ${token}`,
                    "accept" : 'application/json',
                    "Content-Type" : 'application/json'
                },
            }).as('response')
    
            cy.get('@response').then(res =>{
                cy.expect(res.status).to.be.eq(204)
                
            })
        })
    })
    
    it('DELETE - Deletar usuário sem estar logado', () => {
        cy.request({
            method: 'DELETE',
            url:'https://me-conta-backend.herokuapp.com/usuario/3',
            failOnStatusCode: false,
            headers:{
                Authorization : `Bearer teste`,
                "accept" : 'application/json',
                "Content-Type" : 'application/json'
            },
        }).as('response')

        cy.get('@response').then(res =>{
            cy.expect(res.status).to.be.eq(401)
            cy.expect(res.body.message).to.be.eq("Unauthorized")
        })
    })

    it('DELETE - Deletar usuário que não existe', () => {
        cy.request({
            method: 'DELETE',
            url:'https://me-conta-backend.herokuapp.com/usuario/9999',
            failOnStatusCode: false,
            headers:{
                Authorization : `Bearer ${token}`,
                "accept" : 'application/json',
                "Content-Type" : 'application/json'
            },
        }).as('response')

        cy.get('@response').then(res =>{
            cy.expect(res.status).to.be.eq(404)
            cy.expect(res.body.message).to.be.eq("Não encontrado")
            cy.expect(res.body.error).to.be.eq("Not Found")
        })
    }) 
})