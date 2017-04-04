var ObjectId = require("mongodb").ObjectID;


function EncuestasInit(db){
  var encuestaColl = db.collection('Encuestas');
  var encuestaRespColl = db.collection('Respuestas');
  var modeloEncuesta = {};
  // funcion para agregar Encuestas
  modeloEncuesta.agregarEncuesta = function(data, handler){
        encuestaColl.insert(data, function(err, doc){
          if(err){
            handler(err,null);
          }else{
            handler(null, doc);
          }
        });
    };

  // funcion para obtener todas las encuestas registradas
  modeloEncuesta.obtenerEncuestas = function(handler){
    encuestaColl.find({}).project({"Nombre":1}).sort([["Nombre",1]]).toArray(function(err, Encuestas){
      if(err){
        handler(err, null);
      }else{
        handler(null,Encuestas);
      }
    });
  }
  // funcion para obtener un solo documento
  modeloEncuesta.obtenerEncuestaXId = function(id, handler){
    encuestaColl.findOne({"_id":ObjectId(id)}, function(err, enc){
      if(err){
        handler(err, null);
      }else{
        handler(null, enc);
      }
    });
  }


  return modeloEncuesta;

}





module.exports = EncuestasInit;
