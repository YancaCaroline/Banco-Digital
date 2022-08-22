const express = require("express");
const {
  validaSenha,
  adicionarConta,
  atualizarConta,
  deletarConta,
  depositar,
  sacar,
  transferir,
  saldo,
  extrato,
} = require("./controladores/controladores");

const rotas = express();

rotas.get("/contas", validaSenha);

rotas.post("/contas", adicionarConta);

rotas.put("/contas/:numeroConta/usuario", atualizarConta);

rotas.delete("/contas/:numeroConta", deletarConta);

rotas.post("/transacoes/depositar", depositar);

rotas.post("/transacoes/sacar", sacar);

rotas.post("/transacoes/transferir", transferir);

rotas.get("/contas/saldo", saldo);

rotas.get("/contas/extrato", extrato);

module.exports = rotas;
