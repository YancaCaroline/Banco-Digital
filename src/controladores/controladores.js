const bancodedados = require("../banco_de_dados/bancodedados");
const { format } = require("date-fns");

function validaSenha(req, res) {
  const { senha } = req.query;

  if (!senha) {
    return res.status(404).json({ mensagem: "Necessário informar senha" });
  }
  if (senha !== "Cubos123Bank") {
    return res.status(401).json({
      mensagem: "A senha do banco informada é inválida!",
    });
  } else {
    return res.status(200).json(bancodedados);
  }
}

let numero = 1;
function adicionarConta(req, res) {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome) {
    return res.status(400).json({
      mensagem: "Nome precisa ser informado",
    });
  }
  if (!cpf) {
    return res.status(400).json({
      mensagem: "CPF precisa ser informado",
    });
  }
  if (!data_nascimento) {
    return res.status(400).json({
      mensagem: "Data de nascimento precisa ser informada",
    });
  }
  if (!telefone) {
    return res.status(400).json({
      mensagem: "Telefone precisa ser informado",
    });
  }
  if (!email) {
    return res.status(400).json({
      mensagem: "Email precisa ser informado",
    });
  }
  if (!senha) {
    return res.status(400).json({
      mensagem: "Senha precisa ser informada",
    });
  }
  for (const conta of bancodedados.contas) {
    if (conta.cpf === cpf) {
      return res.status(400).json({
        mensagem: "Já existe uma conta com o cpf informado!",
      });
    }
    if (conta.email === email) {
      return res.status(400).json({
        mensagem: "Já existe uma conta com o e-mail informado!",
      });
    }
  }
  const saldo = 0;
  const conta = {
    numero: numero,
    saldo: saldo,
    usuario: {
      nome: nome,
      cpf: cpf,
      data_nascimento: data_nascimento,
      telefone: telefone,
      email: email,
      senha: senha,
    },
  };
  bancodedados.contas.push(conta);
  numero++;
  return res.status(201).json();
}

function atualizarConta(req, res) {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  if (!nome) {
    return res.status(400).json({
      mensagem: "Nome precisa ser informado",
    });
  }
  if (!cpf) {
    return res.status(400).json({
      mensagem: "CPF precisa ser informado",
    });
  }
  if (!data_nascimento) {
    return res.status(400).json({
      mensagem: "Data de nascimento precisa ser informada",
    });
  }
  if (!telefone) {
    return res.status(400).json({
      mensagem: "Telefone precisa ser informado",
    });
  }
  if (!email) {
    return res.status(400).json({
      mensagem: "Email precisa ser informado",
    });
  }
  if (!senha) {
    return res.status(400).json({
      mensagem: "Senha precisa ser informada",
    });
  }
  const contaExistente = bancodedados.contas.find(
    (conta) => conta.numero === Number(req.params.numeroConta)
  );
  if (!contaExistente) {
    return res.status(404).json({
      mensagem: "Essa conta não é valida!",
    });
  }
  for (const conta of bancodedados.contas) {
    if (conta.cpf === cpf) {
      return res.status(400).json({
        mensagem: "Já existe uma conta com o cpf informado!",
      });
    }
    if (conta.email === email) {
      return res.status(400).json({
        mensagem: "Já existe uma conta com o e-mail informado!",
      });
    }
    if (conta.numero === Number(req.params.numeroConta)) {
      conta.usuario.nome = nome;
      conta.usuario.cpf = cpf;
      conta.usuario.data_nascimento = data_nascimento;
      conta.usuario.telefone = telefone;
      conta.usuario.email = email;
      conta.usuario.senha = senha;
    }
  }
  return res.status(200).json();
}

function deletarConta(req, res) {
  const contaExistente = conta.findIndex(
    (conta) => conta.id === Number(req.params.id)
  );
  if (contaExistente < 0) {
    return res.status(404).json({
      mensagem: "Essa conta não é valida!",
    });
  }

  if (conta.saldo !== 0) {
    return res.status(400).json({
      mensagem: "A conta só pode ser removida se o saldo for zero!",
    });
  }

  const contaExcluida = conta.splice(contaExistente, 1);

  return res.status(200).json(contaExcluida);
}

function depositar(req, res) {
  const { valor, numero_conta } = req.body;

  if (!valor) {
    return res.status(400).json({
      mensagem: "Valor precisa ser informado!",
    });
  }
  if (!numero_conta) {
    return res.status(400).json({
      mensagem: "Conta precisa ser informada!",
    });
  }
  if (valor < 0) {
    return res.status(400).json({
      mensagem: "O valor não pode ser negativo ou zerado!",
    });
  }
  const contaEncontrada = bancodedados.contas.find(
    (conta) => conta.numero === Number(numero_conta)
  );
  if (!contaEncontrada) {
    return res.status(404).json({
      mensagem: "A conta não foi encontrada no sistema!",
    });
  }
  contaEncontrada.saldo = contaEncontrada.saldo + valor;
  const novoDeposito = {
    data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    valor: valor,
    numero_conta: numero_conta,
  };
  bancodedados.depositos.push(novoDeposito);
  res.status(200).json();
}

function sacar(req, res) {
  const { valor, numero_conta, senha } = req.body;

  if (!valor) {
    return res.status(400).json({
      mensagem: "Valor precisa ser informado!",
    });
  }
  if (!numero_conta) {
    return res.status(400).json({
      mensagem: "Conta precisa ser informada!",
    });
  }
  if (!senha) {
    return res.status(400).json({
      mensagem: "Senha precisa ser informada!",
    });
  }
  if (saldo <= 0) {
    return res.status(400).json({
      mensagem: "Não há saldo disponível para saque",
    });
  }
  const contaEncontrada = bancodedados.contas.find(
    (conta) => conta.numero === Number(numero_conta)
  );
  if (!contaEncontrada) {
    return res.status(404).json({
      mensagem: "A conta não foi encontrada no sistema!",
    });
  }
  if (contaEncontrada.usuario.senha !== senha) {
    return res.status(401).json({
      mensagem: "A senha está incorreta!",
    });
  }
  contaEncontrada.saldo = contaEncontrada.saldo - valor;
  const novoSaque = {
    data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    valor: valor,
    numero_conta: numero_conta,
  };
  bancodedados.saques.push(novoSaque);
  res.status(200).json();
}

function transferir(req, res) {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
  if (!numero_conta_origem) {
    return res.status(400).json({
      mensagem: "Conta precisa ser informada!",
    });
  }
  if (!numero_conta_destino) {
    return res.status(400).json({
      mensagem: "Conta precisa ser informada!",
    });
  }
  if (!senha) {
    return res.status(400).json({
      mensagem: "Senha precisa ser informada!",
    });
  }
  if (!valor) {
    return res.status(400).json({
      mensagem: "Valor precisa ser informado!",
    });
  }
  const contaDeOrigemEncontrada = bancodedados.contas.find((usuario) => {
    return usuario.numero === Number(numero_conta_origem);
  });
  if (!contaDeOrigemEncontrada) {
    return res.status(404).json({
      mensagem: "A conta não foi encontrada no sistema!",
    });
  }
  if (contaDeOrigemEncontrada.usuario.senha !== senha) {
    return res.status(401).json({
      mensagem: "A senha está incorreta!",
    });
  }
  const contaDeDestinoEncontrada = bancodedados.contas.find((usuario) => {
    return usuario.numero === Number(numero_conta_destino);
  });
  if (!contaDeDestinoEncontrada) {
    return res.status(404).json({
      mensagem: "A conta não foi encontrada no sistema!",
    });
  }
  if (contaDeOrigemEncontrada.saldo < valor) {
    return res
      .status(401)
      .json({ mensagem: "Não há saldo disponível para transferência" });
  }
  const transferencia = {
    data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    numero_conta_origem: numero_conta_origem,
    numero_conta_destino: numero_conta_destino,
    valor: valor,
  };
  contaDeOrigemEncontrada.saldo = contaDeOrigemEncontrada.saldo - valor;
  contaDeDestinoEncontrada.saldo = contaDeDestinoEncontrada.saldo + valor;
  bancodedados.transferencias.push(transferencia);
  return res.status(201).json();
}

function saldo(req, res) {
  const { numero_conta, senha } = req.query;

  if (!numero_conta) {
    return res.status(400).json({
      mensagem: "Conta precisa ser informada!",
    });
  }
  if (!senha) {
    return res.status(400).json({
      mensagem: "Senha precisa ser informada!",
    });
  }
  const contaEncontrada = bancodedados.contas.find(
    (conta) => conta.numero === Number(numero_conta)
  );
  if (!contaEncontrada) {
    return res.status(404).json({
      mensagem: "A conta não foi encontrada no sistema!",
    });
  }
  if (contaEncontrada.usuario.senha !== senha) {
    return res.status(401).json({
      mensagem: "A senha está incorreta!",
    });
  }
  return res.status(200).json({ saldo: contaEncontrada.saldo });
}

function extrato(req, res) {
  const { numero_conta, senha } = req.query;

  if (!numero_conta) {
    return res.status(400).json({
      mensagem: "Conta precisa ser informada!",
    });
  }
  if (!senha) {
    return res.status(400).json({
      mensagem: "Senha precisa ser informada!",
    });
  }
  const contaEncontrada = bancodedados.contas.find(
    (conta) => conta.numero === Number(numero_conta)
  );
  console.log(contaEncontrada);
  if (!contaEncontrada) {
    return res.status(404).json({
      mensagem: "A conta não foi encontrada no sistema!",
    });
  }
  if (contaEncontrada.usuario.senha !== senha) {
    return res.status(401).json({
      mensagem: "A senha está incorreta!",
    });
  }
  const saquesUsuario = bancodedados.saques.filter(
    (saque) => saque.numero_conta === Number(numero_conta)
  );

  const depositosUsuario = bancodedados.depositos.filter(
    (deposito) => deposito.numero_conta === Number(numero_conta)
  );
  const transferenciasEnviadasUsuario = bancodedados.transferencias.filter(
    (transferencia) =>
      transferencia.numero_conta_origem === Number(numero_conta)
  );
  const transferenciasRecebidasUsuario = bancodedados.transferencias.filter(
    (transferencia) =>
      transferencia.numero_conta_destino === Number(numero_conta)
  );

  return res.status(200).json({
    saques: saquesUsuario,
    depositos: depositosUsuario,
    transferenciasEnviadas: transferenciasEnviadasUsuario,
    transferenciasRecebidas: transferenciasRecebidasUsuario,
  });
}

module.exports = {
  validaSenha,
  adicionarConta,
  atualizarConta,
  deletarConta,
  depositar,
  sacar,
  transferir,
  saldo,
  extrato,
};
