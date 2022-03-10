**INFORMAÇÕES PARA SETUP**

-   **PRÉ REQUISITOS**
    -   versão do node >= 16.0
    -   versão do npm >= 8.0

-   **MONGO**
    -   Suba uma instância do mongo localmente ou em uma máquina remota
    -   Coloque a URI do mongo que decidiu usar dentro de './model/dbData.json' no atributo '**uri**'
    -   caso tenha dúvidas sobre a URI do seu Mongo dê uma olhada em alguns exemplos da documentação [aqui](https://docs.mongodb.com/manual/reference/connection-string/)
    -   OBS: tenha certeza de passar a URI correta, caso o contrário a aplicação não conseguirá conectar no banco

-   lembre-se de dar o comando '**npm i**' no diretório raíz do projeto antes de executar o código na produção

-   O servidor irá rodar na porta 3000

-   **API REST INFOS**
    -   por padrão o método GET está limitado a retornar somente 20 registros, caso queira pegar todos, é necessesário passar o atributo **allRecords** como um **parametro de query** na url, 
    -   o atributo **allRecords** recebe um valor booleano