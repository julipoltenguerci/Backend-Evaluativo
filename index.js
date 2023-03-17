const app = require("./src/main");

//Se inicia el servidor de la app escuchando conexiones entrantes en el puerto
app.listen(app.get("PORT"), () =>
  console.log(`Server listening on port ${app.get("PORT")}`)
);
