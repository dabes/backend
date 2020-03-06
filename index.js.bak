const express = require("express");
const bodyParser = require("body-parser");
const busboy = require("connect-busboy");
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');


const app = express();
const port = 3000;
const host = '';
// const db = require("./queries"); // users
const ptr_bem = require("./ptr_bem");
const mat_centro_custo = require("./mat_centro_custo");
const obras = require("./obras");
const medicao_tipo = require("./medicao_tipo");
const ptr_bem_foto = require("./ptr_bem_foto");
const obras_foto = require("./obras_fotos");
const grl_entidade = require("./grl_entidade");

// app.use(busboy());
// app.use(
// bodyParser.urlencoded({
//   extended: true,
//   limit: "200mb"
// })
// );

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });


app.use(morgan('combined', {stream: accessLogStream }));

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

// app.get("/users", db.getUsers);
// app.get("/users/:id", db.getUserById);
// app.post("/users", db.createUser);
// app.put("/users/:id", db.updateUser);
// app.delete("/users/:id", db.deleteUser);

app.get("/api/bens", bodyParser.json(), ptr_bem.get);
app.get("/api/bens/:id", bodyParser.json(), ptr_bem.getById);
app.post("/api/bens", bodyParser.json(), ptr_bem.reciver);
app.put("/api/bens/:id", bodyParser.json(), ptr_bem.update);

app.post("/api/fotos", busboy(), ptr_bem_foto.fotosreciver);

// app.delete("/bens/:id", bens.deletebem);

app.get("/api/mat", bodyParser.json(), mat_centro_custo.get);
app.get("/api/mat/:id", bodyParser.json(), mat_centro_custo.getById);


app.get("/api/obras", bodyParser.json(), obras.get);
app.get("/api/obras/:id", bodyParser.json(), obras.getById);
app.post("/api/obras", bodyParser.json(), obras.reciver);
app.post("/api/obras_fotos", busboy(), obras_foto.fotosreciver);


app.get("/api/medicao_tipo", bodyParser.json(),  medicao_tipo.get);
app.get("/api/medicao_tipo/:id", bodyParser.json(),  medicao_tipo.getById);

app.get("/api/ente", bodyParser.json(), grl_entidade.get);
app.get("/api/ente/:id", bodyParser.json(), grl_entidade.getById);

app.listen(port,host, () => {
  console.log(`App running on port ${port}.`);
});
