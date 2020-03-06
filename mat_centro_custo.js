const Pool = require("pg").Pool;
const config = require("./config.json");

const pool = new Pool(config.database);

const get = (request, response) => {
  pool.query(
    "select m.id,m.sigla,m.descricao,u.codigo as unidade from mat_centro_custo m" +
      ", con_unidade u where u.id = m.con_unidade",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "select m.id,m.sigla,m.descricao,u.codigo as unidade from mat_centro_custo m" +
      ", con_unidade u where u.id = m.con_unidade and m.id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  get,
  getById
};
