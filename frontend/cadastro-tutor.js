const listaTutores = document.getElementById('lista-tutores');
const formTutor = document.getElementById('form-tutor');
const btnSubmit = document.getElementById('btn-submit');

async function listarTutores() {
  if (!listaTutores) return;
  listaTutores.innerHTML = '';
  try {
    const tutores = await apiService.getTutores();
    
    tutores.forEach(tutor => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <strong>${tutor.nome}</strong><br>
          <small> ${tutor.telefone} | ✉️ ${tutor.email}</small>
        </div>
        <div>
          <button onclick="preencherFormulario(${tutor.id})">Editar</button>
          <button onclick="excluirTutor(${tutor.id})">Excluir</button>
        </div>
      `;

      listaTutores.appendChild(li);
    });
  } catch (err) {
    console.error('Erro ao carregar tutores:', err);
    alert('Erro ao carregar lista de tutores');
  }
}

async function preencherFormulario(id) {
  if (!formTutor) return;
  
  try {
    const tutor = await apiService.getTutorById(id);
    
    document.getElementById('tutor-id').value = tutor.id;
    formTutor.nome.value = tutor.nome;
    formTutor.telefone.value = tutor.telefone;
    formTutor.email.value = tutor.email;
    btnSubmit.textContent = 'Salvar Alterações';
    
    formTutor.scrollIntoView({ behavior: 'smooth' });
  } catch (err) {
    console.error('Erro ao carregar tutor:', err);
    alert('Erro ao carregar dados do tutor');
  }
}

async function excluirTutor(id) {
  if (confirm('Deseja realmente excluir este tutor? Esta ação não pode ser desfeita.')) {
    try {
      await apiService.deleteTutor(id);
      alert('Tutor excluído com sucesso!');
      listarTutores();
    } catch (err) {
      console.error('Erro ao excluir tutor:', err);
      alert('Erro ao excluir tutor');
    }
  }
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarTelefone(telefone) {
  const regex = /^[\d\s\(\)\-\+]+$/;
  return regex.test(telefone) && telefone.replace(/\D/g, '').length >= 10;
}

if (formTutor) {
  formTutor.addEventListener('submit', async e => {
    e.preventDefault();
    
    const id = document.getElementById('tutor-id').value;
    const nome = formTutor.nome.value.trim();
    const telefone = formTutor.telefone.value.trim();
    const email = formTutor.email.value.trim();

    if (!nome) {
      alert('Nome é obrigatório');
      return;
    }

    if (!validarTelefone(telefone)) {
      alert('Telefone inválido. Digite um telefone válido.');
      return;
    }

    if (!validarEmail(email)) {
      alert('E-mail inválido. Digite um e-mail válido.');
      return;
    }

    const dados = {
      nome: nome,
      telefone: telefone,
      email: email
    };

    try {
      let result;
      if (id) {
        result = await apiService.updateTutor(id, dados);
      } else {
        result = await apiService.createTutor(dados);
      }

      alert(id ? 'Tutor atualizado com sucesso!' : 'Tutor cadastrado com sucesso!');
      formTutor.reset();
      document.getElementById('tutor-id').value = '';
      btnSubmit.textContent = 'Cadastrar';
      listarTutores();
    } catch (err) {
      console.error('Erro na requisição:', err);
      alert('Erro ao salvar tutor. Tente novamente.');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  listarTutores();
});
