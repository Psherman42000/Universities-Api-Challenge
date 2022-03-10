**INFORMAÇÕES PARA SETUP**

-   **PRÉ REQUISITOS**
    -   versão do node >= 16.0
    -   versão do npm >= 8.0
    -   lembre-se de dar o comando '**npm i**' no diretório raíz do projeto antes de executar o código na produção

-   **MONGO**
    -   [Suba uma instância do mongo localmente](https://www.mongodb.com/try/download) ou use um que ja tenha sido criado
    -   Coloque a URI do mongo que decidiu usar dentro de './model/dbData.json' no atributo '**uri**'
    -   caso tenha dúvidas sobre a URI do seu Mongo dê uma olhada em alguns exemplos da documentação [aqui](https://docs.mongodb.com/manual/reference/connection-string/)
    -   OBS: tenha certeza de passar a URI correta, caso o contrário a aplicação não conseguirá se conectar ao banco


-   **API REST INFOS**
    -   por padrão o método GET está limitado a retornar somente 20 registros, caso queira pegar todos, é necessesário passar o atributo **allRecords** como um [parametro de query](https://guides.emberjs.com/release/routing/query-params/) na url, 
    -   o atributo **allRecords** recebe um valor booleano
    -   O servidor irá rodar na porta 3001, mas caso necessite trocar você pode ser editar a porta em './routes/Routes.js'

-   **EXECUTANDO**
    -   Para iniciar o servidor de o comando '**node index.js**' na pasta raiz do projeto