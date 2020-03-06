const Pool = require("pg").Pool;
const config = require("./config.json");

const pool = new Pool(config.database);

const get = (request, response) => {
  console.log(request,response);
  pool.query(
    "select b.id,b.grl_entidade,b.mat_centro_custo as ccusto,b.codigo as tombamento,b.descricao" +
      ",p.descricao as produto_descricao,COALESCE(b.data_hora_update,b.data_hora_insert) as data_hora " +
      ",false as encontrado,null as photo,null as obs " +
      "from ptr_bem b, prd_produto p " +
      "where b.prd_produto = p.id ORDER BY b.codigo",
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
    "select b.id,b.grl_entidade,b.mat_centro_custo,b.codigo,b.descricao" +
      ",p.descricao as produto_descricao,COALESCE(b.data_hora_update,b.data_hora_insert) as data_hora " +
      " from ptr_bem b, prd_produto p " +
      "where b.prd_produto = p.id and id = $1 ORDER BY codigo limit 10",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(...results.rows);
    }
  );
};

const update = (request, response) => {
  const id = parseInt(request.params.id);
  const { mat_centro_custo } = request.body;
  pool.query(
    "UPDATE ptr_bem SET mat_centro_custo = $1 WHERE id = $2",
    [mat_centro_custo, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`bem modified with ID: ${id}`);
    }
  );
};

const reciver = (request, response) => {
  dados = request.body;
  dados.forEach(cada => {
    console.log(cada);
    pool.query(
      "INSERT INTO app_inventario(grl_entidade,exercicio," +
        "mat_centro_custo,ptr_bem,tombamento,produto_descricao,data_hora,obs)" +
        "values ($1,ano(now()),$2,$3,$4,$5,$6,$7)",
      [
        cada.grl_entidade,
        cada.mat_centro_custo,
        cada.id,
        cada.codigo,
        cada.produto_descricao,
        cada.data_hora,
        cada.obs
      ],
      (error, results) => {
        if (error) {
          throw error;
        }
      }
    );
    console.log(cada);
  });

  response.status(200).send("Bem recebido");
};

module.exports = {
  get,
  getById,
  update,
  reciver
};
