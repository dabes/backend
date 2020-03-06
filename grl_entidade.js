const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "10.0.117.1",
  database: "contab0",
  password: "postgres",
  port: 5433
});

const get = (request, response) => {
  pool.query(
    "select e.id,e.codigo,e.descricao from grl_entidade e",
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
    "select e.id,e.codigo,e.descricao from grl_entidade e where e.id = $1",
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
