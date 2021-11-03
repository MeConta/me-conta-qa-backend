# Objetivo

 - Automatizar Backend Me Conta ?

# Pré Condição

- Instalar Node.js - https://no-dejs.org/en/download/ 

# Instalação de dependências
- No terminal, digitar o comando `npm i`

# Abrir o cypress
- Digitar `npm run cy:open` para abrir o cypress

# Rodar os testes e gerar o Allure report

- Executar o comando `npx cypress run  --reporter mocha-allure-reporter`
- Executar o comando para gerar o Allure Results `npx allure generate allure-results`
- Executar o comando para abrir o Allure Report no navegador `npx allure open allure-report`
- Executar o comando para limpar os relatórios `rm -r allure-results/ allure-report || true`