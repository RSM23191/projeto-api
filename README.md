# Consumo de APIs Públicas – Front-End

**RAY SILVA MATOS:**   
**Descrição/Objetivo:** **Projeto front-end que consome uma API pública de dados para CRUD (JSONPlaceholder) e uma API pública de imagens (Picsum), demonstrando **GET, POST, PUT e DELETE** e exibindo uma galeria de imagens trazidas da API.**

## APIs Públicas Utilizadas
- **JSONPlaceholder** – https://jsonplaceholder.typicode.com/ (posts)
- **Picsum Photos** – https://picsum.photos/ (lista de imagens)

> Observação: o JSONPlaceholder é uma API *fake* para testes; as operações de escrita são **simuladas** (a API responde com sucesso, porém sem persistência real).

##  Tecnologias
- HTML5, CSS3, JavaScript (Fetch API)
- Sem dependências externas

##  Estrutura
index.html create.html edit.html css/estilo.css js/main.js

##  Como executar
1. Faça o clone do repositório.
2. Abra o index.html no navegador **ou** publique com GitHub Pages:
   - Settings → Pages → Deploy from a branch → main e /root.
   - Acesse a URL informada pelo GitHub Pages.

## 🧪 Como testar rapidamente
- Em index.html, confirme a listagem de posts e a galeria de imagens.
- Em create.html, envie o formulário e observe o ID retornado.
- Em edit.html, digite um ID (1–100) e clique “Carregar”, altere e salve (PUT) ou exclua (DELETE).

## 🙌 Créditos e Referências
- JSONPlaceholder – Documentação
- Picsum Photos – Documentação
- MDN Web Docs – Fetch API, HTML, CSS
