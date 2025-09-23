const formAtendimento = document.getElementById("form-atendimento");
const tabelaAtendimentos = document.querySelector("#tabela-atendimentos tbody");

let atendimentoEditandoId = null;

async function carregarAnimais() {
  try {
    const animais = await apiService.getAnimais();

    const selectAnimal = document.getElementById("animal");
    selectAnimal.innerHTML = "";
    animais.forEach(a => {
      const option = document.createElement("option");
      option.value = a.id;
      option.textContent = a.nome;
      selectAnimal.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar animais:", error);
    alert("Erro ao carregar lista de animais");
  }
}

async function carregarAtendimentos() {
  try {
    const atendimentos = await apiService.getAtendimentos();

    tabelaAtendimentos.innerHTML = "";

    atendimentos.forEach(atendimento => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${atendimento.id}</td>
        <td>${atendimento.animal_nome || "—"}</td>
        <td>${atendimento.tutor_nome || "—"}</td>
        <td>${atendimento.tipo}</td>
        <td>${new Date(atendimento.data_atendimento).toLocaleDateString()}</td>
        <td>
          <button class="editar">Editar</button>
          <button class="excluir">Excluir</button>
        </td>
      `;

      tr.querySelector(".editar").addEventListener("click", () => preencherFormulario(atendimento));

      tr.querySelector(".excluir").addEventListener("click", () => excluirAtendimento(atendimento.id));

      tabelaAtendimentos.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao carregar atendimentos:", error);
    alert("Erro ao carregar lista de atendimentos");
  }
}

function preencherFormulario(atendimento) {
  atendimentoEditandoId = atendimento.id;
  document.getElementById("animal").value = atendimento.animal_id;
  document.getElementById("servico").value = atendimento.tipo;
  document.getElementById("data").value = atendimento.data_atendimento.split("T")[0];

  formAtendimento.querySelector("button[type='submit']").textContent = "Salvar Alterações";
}

async function excluirAtendimento(id) {
  if (confirm("Deseja realmente excluir este atendimento?")) {
    try {
      await apiService.deleteAtendimento(id);
      carregarAtendimentos();
    } catch (error) {
      console.error("Erro ao excluir atendimento:", error);
      alert("Erro ao excluir atendimento");
    }
  }
}

formAtendimento.addEventListener("submit", async (e) => {
  e.preventDefault();

  const atendimentoDados = {
    animal_id: document.getElementById("animal").value,
    data_atendimento: document.getElementById("data").value,
    tipo: document.getElementById("servico").value,
    descricao: ""
  };

  try {
    if (atendimentoEditandoId) {
      await apiService.updateAtendimento(atendimentoEditandoId, atendimentoDados);
      atendimentoEditandoId = null;
      formAtendimento.querySelector("button[type='submit']").textContent = "Cadastrar";
    } else {
      console.log(atendimentoDados);
      await apiService.createAtendimento(atendimentoDados);
    }

    formAtendimento.reset();
    carregarAtendimentos();
  } catch (error) {
    console.log("Erro ao salvar atendimento:", error);
    //alert("Erro ao salvar atendimento");
  }
});

carregarAnimais();
carregarAtendimentos();
