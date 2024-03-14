# projeto desafio de estágio
ao baixar o projeto, abrir o arquivo <code>api\appsettings.json</code> e mudar <br/>
<code>"ConnectionStr"</code> para:<code>"ConnectionStr": "server=servidor;initial catalog=nome da database;uid=usuario;pwd=senha"</code>
<br/>
<code>"MysqlVersion"</code> para:<code>"MysqlVersion": "VersaoDoMysql-mysql"</code>
após, rodar em um terminal:<br/>
<code>Add-Migration nome_da_migracao -Context Contexto</code>
<code>Update-Database -Context Contexto</code>
<br/>
Ao terminal, acessar a database criada e adicionar um usuário na tabela Users. Sempre que ser necessário adicionar um usuário, adicionar ele manualmente na tabela (bem como atualizar senha);
<hr/>
<h2>Compilar projeto</h2>
Em um terminal, navegar para a pasta raíz do projeto e rodar:<br/>
<code>dotnet publish aplicacao</code> 
<br/>
Quando terminar, o projeto estará compilado em <code>api\bin\Release\net8.0\publish\api.dll</code>
<br/>
Para rodar o projeto compilado, acessar <code>api\bin\Release\net8.0\publish\</code> em um terminal e rodar <code>dotnet api.dll</code>  
