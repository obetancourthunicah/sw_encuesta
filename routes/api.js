var express = require('express');
var router = express.Router();
var EncuestasFabric = require('../models/encuesta.model.js');
var ObjectID = require("mongodb").ObjectID;

function initRouter(db){
  var encuestaMdl = EncuestasFabric(db);
  console.log(encuestaMdl);

  router.get('/', function(req, res, next) {
    encuestaMdl.obtenerEncuestas(function(err, Encuestas){
        if(err) return res.status(404).json({"error":"No se obtiene Datos"});
        return res.status(200).json(Encuestas);
    });
  }); // end /

    router.get('/get/:id' , function(req,res,next){
      encuestaMdl.obtenerEncuestaXId(req.params.id, function(err, enc){
          if(err) return res.status(404).json({"error":"No se Encontro Encuesta"});
          return res.status(200).json(enc);
        }
      );
    }); // end get/:id

    router.post('/add',function(req,res,next){
      var nuevaEncuesta = {};
      nuevaEncuesta.Nombre = req.body.txtEncuesta;
      nuevaEncuesta.Pregunta1 = req.body.txtPregunta1;
      nuevaEncuesta.Pregunta2 = req.body.txtPregunta2;
      nuevaEncuesta.Pregunta3 = req.body.txtPregunta3;

      encuestaMdl.agregarEncuesta(nuevaEncuesta,function(err,EncuestaAgregada){
        if(err) return res.status(403).json({"error":"error al ingresar encuesta."});
        return res.status(200).json(EncuestaAgregada);
      });

    }); // end /add

    router.post("/:idencuesta/resp", function(req,res,next){
      var response = {"encuestaId":ObjectID(req.params.idencuesta),
                        "respuesta1": req.body.resp1,
                        "respuesta2": req.body.resp2,
                        "respuesta3": req.body.resp3,
                        "comentario": req.body.comment
                      };
        encuestaMdl.agregarRespuesta(response, function(err, respAgregada){
          if(err) return res.status(404).json({"error":"Error al grabar Respuesta de encuesta"});
          return res.status(200).json(respAgregada);
        });
    });//end post resp

  return router;
}


module.exports = initRouter;
