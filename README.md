# Catálogo de Filmes

[![CI](https://github.com/Kenjihidehira/catalogo-filmes/actions/workflows/ci.yml/badge.svg)](https://github.com/Kenjihidehira/catalogo-filmes/actions/workflows/ci.yml)

Aplicação front-end para pesquisar, filtrar, ordenar e favoritar filmes.

## Persistência local segura

O módulo `storage.js` centraliza leitura e escrita no `localStorage`, valida o formato salvo, recupera JSON corrompido sem derrubar a interface e trata falhas de quota. Os cenários negativos são executados por `npm test` e pela CI.

## Funcionalidades

- Busca por título, diretor e ano
- Filtro por gênero
- Ordenação por nota, ano e título
- Favoritos com `localStorage`
- Estatísticas dinâmicas
- Layout responsivo

## Como rodar

Abra o arquivo `index.html` no navegador.

## Tecnologias

- HTML
- CSS
- JavaScript
- localStorage
