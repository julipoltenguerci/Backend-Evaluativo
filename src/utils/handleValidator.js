const { validationResult } = require("express-validator");

//manejador de la validacion de resultados lo extraigo aca
const validateResults = (req, res, next) => {
  try {
    //valida lo que se envia por la peticion, sino cumple con la validacion, crashea y pasa al res.status.. y manda un array con los errors
    validationResult(req).throw();
    return next(); //si no existe error con la validacion, continua hacia el controlador
  } catch (err) {
    res.status(403); //forbidden
    res.send({ errors: err.array() });
  }
};

module.exports = validateResults;
