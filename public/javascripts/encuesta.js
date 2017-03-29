$(document).on("pagebeforecreate",encuesta_init);
$(document).on("pagecontainerbeforeshow",encuesta_page_load);

//// Utilidades
var pages = {};
function registerCreated(pageCreated){
  pages[pageCreated] = true;
}
function change_page(to) {
    $(":mobile-pagecontainer").pagecontainer("change", "#" + to);
}

function showLoading(){
    $.mobile.loading( 'show');
}
function hideLoading(){
    $.mobile.loading( 'hide');
}

/// Funciones de la Aplicación

/// Cuando Inicia cada Página
function encuesta_init(e){
  var pageToCreate = $(e.target).attr("id");
  registerCreated(pageToCreate);
  switch(pageToCreate){
    case "home":

      break;
    case "new":
      $("#btnAgregarEncuesta").on("vclick", onAddClick);

      break;
  }
}

//// Cuando se Carga y se Muestra cada Página
function encuesta_page_load(e, ui){

  var pageLoading = $(ui.toPage[0]).attr("id");
  console.log(pageLoading);

  switch(pageLoading){
    case "home":
        cargar_encuestas_home();
      break;
    case "new":
        limipar_new_values();
      break;
  }

}



//Eventos de Página New

function onAddClick(e){
    var formValues = $("#new_form").serializeArray();
    //console.log(formValues);
    var dataToSend = {};
    formValues.map(function(obj, i){
      dataToSend[obj.name] = obj.value;
    });
    //console.log(dataToSend);
    showLoading();
    $.post(
      "/encuestas/add",
      dataToSend,
      onAddSuccess,
      'json'
    );
}

function onAddSuccess(data, successTxt, xhrq){
  hideLoading();
  change_page("home");
}

function limipar_new_values(){
    $("#new_form").get()[0].reset();
}

// funciones de la pagina home
function cargar_encuestas_home(){
  // <li><a href="#apply" data-id="asdfasd">Encuesta # 1</a></li>
  $.get(
    'encuestas/',
    {},
    function(_encuestas,successTxt, xhrq){
      console.log(_encuestas);
      $htmlBuffer = _encuestas.map(function(enc, i){
        return '<li><a href="#apply" data-id="'+enc._id+'">'+enc.Nombre+'</a></li>';
      });

      $("#home_encuesta_list").html($htmlBuffer.join('')).listview('refresh');
    },
    'json'
  );
}
