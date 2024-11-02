<div>
  <div align="center">
    <img src="./repository-assets/MindGroup-Logo-Light.png" width="400" />
  </div>

  <h2>Case Estágio Mind Group - Backend para sistema de estoque</h2>
</div>

**Desafio:** Criar backend utilizando NodeJS, Express e MySQL. Banco de dados contendo Produto (nome, descrição, imagem, valor) e Usuário (nome, email, senha). Sistema deve informar a quantidade atual de cada produto, sem necessitar de um histórico.

[Link para o repositório Frontend](https://github.com/VDRBreno/MindGroup-TesteEstagio-Estoque-Frontend)

<br/>

## Instalação ( Docker )

> Aplicação completamente conteinerizada, banco de dados MySQL + API NodeJS

```bash
git clone https://github.com/VDRBreno/MindGroup-TesteEstagio-Estoque-Backend.git

cd MindGroup-TesteEstagio-Estoque-Backend

docker compose up -d

# Servidor rodando em localhost:3333
```

<br/>

## Tecnologias usadas

- Docker
- TypeScript
- Node
- Express
- Prisma
- Joi
- JWT (jsonwebtoken)
- bcrypt