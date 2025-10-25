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

  // Getters e Setters
  get nome() { return this._nome; }
  set nome(valor) { this._nome = valor; }

  get idade() { return this._idade; }
  set idade(valor) { this._idade = parseInt(valor); }

  get cargo() { return this._cargo; }
  set cargo(valor) { this._cargo = valor; }

  get salario() { return this._salario; }
  set salario(valor) { this._salario = parseFloat(valor); }

  // Método textual
  toString() {
    return `${this._nome}, ${this._idade} anos, ${this._cargo}, R$ ${this._salario.toFixed(2)}`;
  }
}

// ============================
// CRUD com edição e exclusão
// ============================
let funcionarios = [];
let indiceEdicao = null;

const form = document.getElementById("formFuncionario");
const tabela = document.querySelector("#tabelaFuncionarios tbody");

// Cadastrar ou atualizar funcionário
form.addEventListener("submit", function (e) {
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

// Renderizar tabela
function renderizarTabela() {
  tabela.innerHTML = "";

  funcionarios.forEach(function (funcionario, index) {
    const linha = tabela.insertRow();

    linha.insertCell().textContent = funcionario.nome;
    linha.insertCell().textContent = funcionario.idade;
    linha.insertCell().textContent = funcionario.cargo;
    linha.insertCell().textContent = funcionario.salario.toFixed(2);

    const celAcoes = linha.insertCell();

    // Botão Editar
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = function () {
      document.getElementById("nome").value = funcionario.nome;
      document.getElementById("idade").value = funcionario.idade;
      document.getElementById("cargo").value = funcionario.cargo;
      document.getElementById("salario").value = funcionario.salario;
      indiceEdicao = index;
      console.log(`✏️ Editando: ${funcionario.toString()}`);
    };

    // Botão Excluir
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.onclick = function () {
      if (confirm(`Excluir funcionário ${funcionario.nome}?`)) {
        funcionarios.splice(index, 1);
        renderizarTabela();
        console.log(`🗑️ Excluído: ${funcionario.toString()}`);
      }
    };

    celAcoes.appendChild(btnEditar);
    celAcoes.appendChild(btnExcluir);
  });
}
