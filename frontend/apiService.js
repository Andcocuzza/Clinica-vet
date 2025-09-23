class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:3000';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erro na requisição' }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro na requisição ${endpoint}:`, error);
      throw error;
    }
  }

  async getTutores() {
    return this.request('/tutores');
  }

  async getTutorById(id) {
    return this.request(`/tutores/${id}`);
  }

  async createTutor(data) {
    return this.request('/tutores', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateTutor(id, data) {
    return this.request(`/tutores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteTutor(id) {
    return this.request(`/tutores/${id}`, {
      method: 'DELETE'
    });
  }

  async getAnimais() {
    return this.request('/animais');
  }

  async getAnimalById(id) {
    return this.request(`/animais/${id}`);
  }

  async createAnimal(data) {
    return this.request('/animais', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateAnimal(id, data) {
    return this.request(`/animais/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteAnimal(id) {
    return this.request(`/animais/${id}`, {
      method: 'DELETE'
    });
  }

  async getAtendimentos() {
    return this.request('/atendimentos');
  }

  async getAtendimentoById(id) {
    return this.request(`/atendimentos/${id}`);
  }

  async createAtendimento(data) {
    return this.request('/atendimentos', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateAtendimento(id, data) {
    return this.request(`/atendimentos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteAtendimento(id) {
    return this.request(`/atendimentos/${id}`, {
      method: 'DELETE'
    });
  }

  async getExames() {
    return this.request('/exames');
  }

  async getExameById(id) {
    return this.request(`/exames/${id}`);
  }

  async createExame(data) {
    return this.request('/exames', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateExame(id, data) {
    return this.request(`/exames/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteExame(id) {
    return this.request(`/exames/${id}`, {
      method: 'DELETE'
    });
  }

  async getVacinas() {
    return this.request('/vacinas');
  }

  async getVacinaById(id) {
    return this.request(`/vacinas/${id}`);
  }

  async createVacina(data) {
    return this.request('/vacinas', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateVacina(id, data) {
    return this.request(`/vacinas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteVacina(id) {
    return this.request(`/vacinas/${id}`, {
      method: 'DELETE'
    });
  }

  async getHistorico() {
    return this.request('/historico');
  }

  async getHistoricoById(id) {
    return this.request(`/historico/${id}`);
  }

  async createHistorico(data) {
    return this.request('/historico', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateHistorico(id, data) {
    return this.request(`/historico/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteHistorico(id) {
    return this.request(`/historico/${id}`, {
      method: 'DELETE'
    });
  }

  async getServicos() {
    return this.request('/servicos');
  }

  async getServicoById(id) {
    return this.request(`/servicos/${id}`);
  }

  async createServico(data) {
    return this.request('/servicos', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateServico(id, data) {
    return this.request(`/servicos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteServico(id) {
    return this.request(`/servicos/${id}`, {
      method: 'DELETE'
    });
  }
}

const apiService = new ApiService();
