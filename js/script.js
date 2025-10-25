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

  // Representação textual
  toString() {
    return `${this._nome}, ${this._idade} anos, ${this._cargo}, R$ ${this._salario.toFixed(2)}`;
  }
}

// ============================
// CRUD básico (Exercício 01)
// ============================
let funcionarios = [];

const form = document.getElementById("formFuncionario");
const tabela = document.querySelector("#tabelaFuncionarios tbody");

// Evento de cadastro
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const cargo = document.getElementById("cargo").value;
  const salario = document.getElementById("salario").value;

  const funcionario = new Funcionario(nome, idade, cargo, salario);
  funcionarios.push(funcionario);

  alert(`✅ Funcionário ${funcionario.nome} cadastrado com sucesso!`);
  console.log("Novo funcionário:", funcionario.toString());

  form.reset();
  renderizarTabela();
});

// Renderização da tabela
function renderizarTabela() {
  tabela.innerHTML = "";
  funcionarios.forEach(func => {
    const linha = tabela.insertRow();
    linha.insertCell().textContent = func.nome;
    linha.insertCell().textContent = func.idade;
    linha.insertCell().textContent = func.cargo;
    linha.insertCell().textContent = func.salario.toFixed(2);
  });
}
