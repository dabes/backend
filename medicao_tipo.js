
const Pool = require("pg").Pool;
const config = require("./config.json");

const pool = new Pool(config.database);

const get = (request, response) => {
  pool.query(
    "select id,codigo,descricao from obr_medicao_tipo",
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
    "select id,codigo,descricao from obr_medicao_tipo where id = $1 ",
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
