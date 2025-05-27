# OBS: Por enquanto, não tive tempo de colocar o projeto em produção. Por hora, será necessário baixar as dependências e rodar localmente. Colocarei em produção algum dia dessa semana.

# 📚 BookTracker

Aplicação fullstack para gerenciar sua lista de livros lidos, em leitura ou desejados.  
Frontend em **React + Vite + Tailwind**, backend em **ASP.NET Core Web API**.

---

## 🖥️ Tecnologias

- ⚛️ React + Vite
- 🌐 ASP.NET Core 6+
- Fetch API
- 🚀 Swagger para testes de API

---

## 📦 Requisitos

- [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download)
- [Node.js + npm](https://nodejs.org/)
- (opcional) Postman para testar a API

---

## 🧑‍💻 Rodando localmente

### 🔹 1. Clone o repositório

```bash
git clone https://github.com/marcelosarinho/book-tracker.git
cd book-tracker
```

---

### 🔹 2. Rodando o Backend (.NET API)

```bash
cd BookTrackerApi
dotnet restore
dotnet run
```

> A API estará rodando em `http://localhost:5040`

---

### 🔹 3. Rodando o Frontend (React + Vite)

```bash
cd BookTrackerFrontend
npm install
npm run dev
```

> O frontend estará disponível em `http://localhost:5173`

---

### ⚙️ Configuração opcional: Proxy do Vite para API

Já está configurado em `vite.config.js`:

```js
server: {
  proxy: {
    '/api': 'http://localhost:5040'
  }
}
```

Assim, chamadas como `fetch('/api/books')` funcionarão normalmente.

---

## 🚀 Funcionalidades

- 📥 Criar livro com título, autor, gênero, número de páginas
- 📖 Acompanhar progresso de leitura
- ⭐ Avaliar livros lidos
- 🔁 Atualizar ou excluir livros
- 🧾 Visualização dos livros cadastrados

---

## 🧪 Testando a API no Swagger

Com o backend rodando, acesse:  
[http://localhost:5040/swagger](http://localhost:5040/swagger)
