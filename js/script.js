// ============================
// Classe Funcionario
// ============================
class Funcionario {
  constructor(nome, idade, cargo, salario) {
    this._nome = nome;
    this._idade = parseInt(idade);
    this._cargo = cargo;
    this._salario = parseFloat(salario);
  }

  get nome() { return this._nome; }
  set nome(valor) { this._nome = valor; }

  get idade() { return this._idade; }
  set idade(valor) { this._idade = parseInt(valor); }

  get cargo() { return this._cargo; }
  set cargo(valor) { this._cargo = valor; }

  get salario() { return this._salario; }
  set salario(valor) { this._salario = parseFloat(valor); }

  toString = () =>
    `${this._nome}, ${this._idade} anos, ${this._cargo}, R$ ${this._salario.toFixed(2)}`;
}

// ============================
// CRUD (com arrow functions)
// ============================
let funcionarios = [];
let indiceEdicao = null;

const form = document.getElementById("formFuncionario");
const tabela = document.querySelector("#tabelaFuncionarios tbody");
const saidaRelatorio = document.getElementById("saidaRelatorio");

// Cadastrar ou atualizar
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const cargo = document.getElementById("cargo").value;
  const salario = document.getElementById("salario").value;

  if (indiceEdicao === null) {
    const funcionario = new Funcionario(nome, idade, cargo, salario);
    funcionarios.push(funcionario);
    alert(`✅ Funcionário ${funcionario.nome} cadastrado com sucesso!`);
  } else {
    const func = funcionarios[indiceEdicao];
    func.nome = nome;
    func.idade = idade;
    func.cargo = cargo;
    func.salario = salario;
    alert(`✏️ Funcionário ${func.nome} atualizado com sucesso!`);
    indiceEdicao = null;
  }

  form.reset();
  renderizarTabela();
});

// Renderização da tabela
const renderizarTabela = () => {
  tabela.innerHTML = "";

  funcionarios.forEach((funcionario, index) => {
    const linha = tabela.insertRow();
    linha.insertCell().textContent = funcionario.nome;
    linha.insertCell().textContent = funcionario.idade;
    linha.insertCell().textContent = funcionario.cargo;
    linha.insertCell().textContent = funcionario.salario.toFixed(2);

    const celAcoes = linha.insertCell();

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => {
      document.getElementById("nome").value = funcionario.nome;
      document.getElementById("idade").value = funcionario.idade;
      document.getElementById("cargo").value = funcionario.cargo;
      document.getElementById("salario").value = funcionario.salario;
      indiceEdicao = index;
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.addEventListener("click", () => {
      if (confirm(`Excluir funcionário ${funcionario.nome}?`)) {
        funcionarios = funcionarios.filter((_, i) => i !== index);
        renderizarTabela();
      }
    });

    celAcoes.appendChild(btnEditar);
    celAcoes.appendChild(btnExcluir);
  });
};

// ============================
// RELATÓRIOS (Ex04)
// ============================

// Salários acima de R$5000
document.getElementById("btnSalariosAltos").addEventListener("click", () => {
  const altos = funcionarios.filter(f => f.salario > 5000);
  saidaRelatorio.innerHTML = altos.length
    ? "💰 Funcionários com salário > R$5000:<br>" + altos.map(f => f.nome).join(", ")
    : "Nenhum funcionário com salário acima de R$5000.";
  console.log("💰 Salários altos:", altos.map(f => f.toString()));
});

// Média Salarial
document.getElementById("btnMediaSalarial").addEventListener("click", () => {
  if (funcionarios.length === 0) {
    saidaRelatorio.textContent = "Nenhum funcionário cadastrado.";
    return;
  }
  const media = funcionarios.map(f => f.salario).reduce((a, b) => a + b, 0) / funcionarios.length;
  saidaRelatorio.textContent = `📊 Média salarial: R$ ${media.toFixed(2)}`;
  console.log("📊 Média salarial:", media);
});

// Cargos únicos
document.getElementById("btnCargosUnicos").addEventListener("click", () => {
  const cargos = [...new Set(funcionarios.map(f => f.cargo))];
  saidaRelatorio.innerHTML = "🏢 Cargos únicos:<br>" + cargos.join(", ");
  console.log("🏢 Cargos únicos:", cargos);
});

// Nomes em maiúsculo
document.getElementById("btnNomesMaiusculo").addEventListener("click", () => {
  const nomes = funcionarios.map(f => f.nome.toUpperCase());
  saidaRelatorio.innerHTML = "🧍‍♂️ Nomes em maiúsculo:<br>" + nomes.join(", ");
  console.log("🧍‍♂️ Nomes maiúsculos:", nomes);
});
