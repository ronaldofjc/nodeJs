/*
Aplicativo que faz uma requisição na API 'htt´p://loripsum.net/api'
e grava um arquivo com o nome e a quantidade de paráfragos especificados
*/

var http = require('http'); //associando o módulo http na variável http
var fs = require('fs'); //associando o módulo fs na variável fs

var arquivo = String (process.argv[2] || '').replace(/[^a-z0-9\.]/gi, '');
var qtdeParagrafos = String(process.argv[3] || '').replace(/[^\d]/g, '');

const USO = 'USO: node loremipsum.js {nomeArquivo} {quantidadeParágrafos}';
//Verifica se os parâmetros foram passados antes de fazer a requisição
if(!arquivo || !qtdeParagrafos){
  return console.log(USO);
}

http.get('http://loripsum.net/api' + qtdeParagrafos, function(res){
  var text = '';
  res.on('data', function(chunk){
    text += chunk;
  });
  res.on('end', function(){
    //função writeFile que escreve o conteúdo no arquivo
    fs.writeFile(arquivo, text, function(){
      console.log('Arquivo ' + arquivo + ' gravado!')
    });
  });
//Caso ocorra algum erro
}).on('erro', function(e){
  console.log('Erro: ' + e.message);
});
