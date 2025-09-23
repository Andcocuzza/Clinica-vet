# Clínica Veterinária

Este é um sistema web para gerenciamento de uma clínica veterinária, permitindo cadastro de animais, atendimento, vacinas, exames e histórico.

## Funcionalidades

- Cadastro de Animais
- Gerenciamento de Atendimentos (Consultas e Vacinas)
- Registro de Exames
- Histórico de Serviços
- Interface web simples e intuitiva

## Tecnologias Utilizadas

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Banco de Dados:** MySQL
- **Ferramentas:** Postman (testes API), Git/GitHub

## Estrutura do Projeto

clinica-vet/
│
├─ backend/
│ ├─ controllers/ # Lógica de cada entidade (animais, vacinas, atendimentos, etc.)
│ ├─ routes/ # Rotas da API
│ ├─ db.js # Configuração do MySQL
│ ├─ server.js # Servidor Express
│ └─ package.json
│
├─ frontend/
│ ├─ index.html # Tela inicial
│ ├─ cadastro.html # Cadastro de animais
│ ├─ atendimento.html # Consultas e vacinas
│ ├─ style.css
│ └─ app.js / atendimento.js
│
└─ README.md
