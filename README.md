# Clínica Veterinária

Este é um sistema web para gerenciamento de uma clínica veterinária, permitindo cadastro de animais, atendimento, vacinas, exames e histórico.

## Funcionalidades

- Cadastro de Animais
- Gerenciamento de Atendimentos (Consultas e Vacinas)
- Registro de Exames
- Histórico de Serviços
- Cadastro de Tutores
- Interface web simples e intuitiva

## Tecnologias Utilizadas

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Banco de Dados:** MySQL

## Estrutura do Projeto

```
clinica-vet/
│
├─ api/           # Backend (Node.js + Express)
│ ├─ controller/  # Lógica de cada entidade
│ ├─ routes/      # Rotas da API
│ ├─ repository/  # Acesso ao banco de dados
│ ├─ db.js        # Configuração do MySQL
│ ├─ server.js    # Servidor Express
│ └─ package.json
│
├─ frontend/      # Interface Web
│ ├─ index.html           # Tela inicial
│ ├─ cadastro.html        # Cadastro de animais
│ ├─ cadastro-tutor.html  # Cadastro de tutores
│ ├─ atendimento.html     # Consultas e vacinas
│ ├─ style.css
│ ├─ app.js / atendimento.js / cadastro-tutor.js
│ └─ apiService.js
│
└─ README.md
```

## Como Utilizar

### 1. Configuração do Banco de Dados

- Crie um banco MySQL e configure as tabelas conforme o modelo utilizado.
- Crie um arquivo `.env` em `api/` com as variáveis:
  ```
  DB_HOST=localhost
  DB_USER=seu_usuario
  DB_PASSWORD=sua_senha
  DB_NAME=clinica_vet
  ```

### 2. Instalação das Dependências

No diretório `api/`, execute:

```sh
npm install
```

### 3. Inicialização do Backend

No diretório `api/`, execute:

```sh
npm start
```

O servidor estará disponível em `http://localhost:3000`.

### 4. Utilização do Frontend

Abra o arquivo `frontend/index.html` em seu navegador.  
Você pode navegar entre as telas de cadastro de tutores, cadastro de animais e atendimentos.

- **Cadastro de Tutores:** Adicione, edite ou exclua tutores.
- **Cadastro de Animais:** Adicione, edite ou exclua animais, vinculando-os a tutores já cadastrados.
- **Atendimento:** Registre consultas, vacinas e visualize os atendimentos realizados.

### 5. Observações

- Certifique-se de que o backend está rodando antes de usar o frontend.
- O frontend se comunica com o backend via API REST.
- Para cadastrar um animal, o tutor deve estar previamente cadastrado.

## Dúvidas ou Problemas

Em caso de dúvidas, consulte o código-fonte ou abra uma issue.

---