const Pool = require("pg").Pool;
var fs = require("fs");
const config = require("./config.json");

const pool = new Pool(config.database);

const fotosreciver = (request, response) => {
  console.log(request);
  var fstream;
  request.pipe(request.busboy);
  request.busboy.on("file", function(fieldname, file, filename) {
    console.log("Uploading: " + filename);
    fstream = fs.createWriteStream("./imagens/" + filename);
    file.pipe(fstream);
    fstream.on("close", function() {
      response.status(200).send("Foto da Obra recebida");
    });
  });
};

module.exports = { fotosreciver };
