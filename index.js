const app = require("./src/main");

//function init() {
app.listen(app.get("PORT"), () =>
  console.log(`Server listening on port ${app.get("PORT")}`)
);
//}
//funcion para inicio del BE
//init();
