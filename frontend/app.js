const listaAnimais = document.getElementById('lista-animais');
const formAnimal = document.getElementById('form-animal');
const btnSubmit = document.getElementById('btn-submit');

async function listarAnimais() {
  if (!listaAnimais) return;
  listaAnimais.innerHTML = '';
  try {
    const animais = await apiService.getAnimais();

    animais.forEach(animal => {
      const li = document.createElement('li');
      li.textContent = `${animal.nome} - ${animal.especie} - ${animal.raca} - ${animal.idade} anos - Tutor: ${animal.tutor_nome}`;

      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.addEventListener('click', () => preencherFormulario(animal));

      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.addEventListener('click', () => excluirAnimal(animal.id));

      li.appendChild(btnEditar);
      li.appendChild(btnExcluir);
      listaAnimais.appendChild(li);
    });
  } catch (err) {
    console.error('Erro ao listar animais:', err);
    alert('Erro ao carregar lista de animais');
  }
}

function preencherFormulario(animal) {
  if (!formAnimal) return;
  document.getElementById('animal-id').value = animal.id;
  formAnimal.nome.value = animal.nome;
  formAnimal.especie.value = animal.especie;
  formAnimal.raca.value = animal.raca;
  formAnimal.idade.value = animal.idade;
  formAnimal.tutor.value = animal.tutor_id;
  btnSubmit.textContent = 'Salvar Alterações';
}

async function excluirAnimal(id) {
  if (confirm('Deseja realmente excluir este animal?')) {
    try {
      await apiService.deleteAnimal(id);
      listarAnimais();
    } catch (err) {
      console.error('Erro ao excluir animal:', err);
      alert('Erro ao excluir animal');
    }
  }
}

async function buscarTutorPorNome(nome) {
  try {
    const tutores = await apiService.getTutores();
    const tutor = tutores.find(t => t.nome === nome);
    return tutor ? tutor.id : null;
  } catch (err) {
    console.error('Erro ao buscar tutor:', err);
    return null;
  }
}

if (formAnimal) {
  formAnimal.addEventListener('submit', async e => {
    e.preventDefault();
    const id = document.getElementById('animal-id').value;

    const tutorNome = formAnimal.tutor.value;
    const tutor_id = await buscarTutorPorNome(tutorNome);

    if (!tutor_id) {
      alert('Tutor não encontrado. Cadastre o tutor antes.');
      return;
    }

    const dados = {
      nome: formAnimal.nome.value,
      especie: formAnimal.especie.value,
      raca: formAnimal.raca.value,
      idade: Number(formAnimal.idade.value),
      tutorId: tutor_id
    };

    try {
      if (id) {
        await apiService.updateAnimal(id, dados);
        btnSubmit.textContent = 'Cadastrar';
      } else {
        await apiService.createAnimal(dados);
      }
      formAnimal.reset();
      document.getElementById('animal-id').value = '';
      listarAnimais();
    } catch (err) {
      console.error('Erro ao salvar animal:', err);
      alert('Erro ao salvar animal');
    }
  });
}

listarAnimais();
