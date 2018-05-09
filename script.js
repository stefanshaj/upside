function callback() {

  //Declaração das Variaves
  var html = "";
  var categorias = "";

  //Trasforma retorno em Json
  var objRetorno = JSON.parse(this.responseText);

  //Cria HTML com todos os dados retornados
  //Cria preenche variavel auxiliar para montagem do select
  objRetorno.forEach(function (i) {
      categorias += (categorias.indexOf(i.category) == -1) ? i.category + "," : "";
      html += criaHTML(i)
  })

  categorias = categorias.split(',');
  htmlCategorias = "<option value='0'>Selecione uma opção</option>";

  //Cria options
  categorias.forEach(function (row) {
      htmlCategorias += "<option value='" + row + "'>" + row + "</option>";
  });

  $("#CATEGORIAS").html(htmlCategorias);

  $("#CATEGORIAS").change(function () {

      var self = this;
      var html = "";

      if(this.value == "0"){
          objRetorno.forEach(function (i) {
              html += criaHTML(i);
          })
      }else{
          objRetorno.forEach(function (i) {
              if(self.value == i.category)
                html += criaHTML(i);
          })
      }
      
      $('#divContent').html(html);


  });

  $('#divContent').html(html);
  $('#secPrincipal').show();
}

function Request() {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", callback);
  oReq.open("GET", "https://private-7cf60-4youseesocialtest.apiary-mock.com/timeline");
  oReq.send();
}

//Cria conteudo HTML para os dados
function criaHTML(obj) {

  var html = ' \
        <div class="col-sm-6 col-md-4"> \
            <div class="thumbnail"> \
                    $content \
                <div class="caption"> \
                    <h3>$title</h3> \
                    <p> \
                        <b>$type </b>- $description\
                    </p> \
                </div> \
            </div> \
        </div> ';

  if (obj.type == 'video') {

      var htmlContent = ' \
            <div class="embed-responsive embed-responsive-16by9"> \
                  <iframe class="embed-responsive-item" src="$file"></iframe> \
            </div> ';
  } else {
      var htmlContent = ' <img src="$file" alt="$type"> ';
  }

  html = html.replaceAll('$content', htmlContent);
  html = html.replaceAll('$title', obj.title);
  html = html.replaceAll('$type', obj.type);
  html = html.replaceAll('$description', obj.description);
  html = html.replaceAll('$file', obj.file);

  return html;

}


/**
* substitui o valor de uma string por outro.
**/
String.prototype.replaceAll = String.prototype.replaceAll || function (needle, replacement) {
  return this.split(needle).join(replacement);
};