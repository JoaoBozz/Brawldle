# Integração da Brawl Stars API com o site Brawldle

## 1. Contexto

O **Brawldle** é um jogo web no estilo "adivinhe o personagem" (semelhante ao Wordle), em que o usuário tenta descobrir qual **brawler** foi sorteado a partir de dicas de atributos (raridade, classe, vida, alcance de ataque e nome).

Inicialmente, o jogo utilizava um arquivo JavaScript estático com os dados de todos os brawlers. Nesta etapa do trabalho, o Brawldle passou a consumir os dados diretamente da **Brawl Stars API**, desenvolvida em conjunto pelo grupo, eliminando a duplicação de dados e utilizando o banco PostgreSQL (Neon) como fonte única da verdade.

## 2. Arquitetura da integração

```
┌─────────────────────┐        HTTP (fetch)        ┌──────────────────────┐        SQL        ┌────────────┐
│   Brawldle (front)  │ ─────────────────────────▶ │   Brawl Stars API     │ ─────────────────▶ │  Neon DB   │
│   React + Vite      │ ◀───────────────────────── │   Fastify (Node.js)   │ ◀───────────────── │ PostgreSQL │
└─────────────────────┘         JSON                └──────────────────────┘                    └────────────┘
```

- O **frontend** (Brawldle) roda em `http://localhost:5173` durante o desenvolvimento.
- O **backend** (Brawl Stars API) roda em `http://localhost:3333`, com CORS liberado (`origin: true`) para aceitar requisições de outras origens.
- A comunicação acontece via **fetch**, chamando os endpoints REST documentados no Swagger (`/docs`).

## 3. Endpoints consumidos pelo Brawldle

O jogo consome três endpoints da API para montar cada partida:

| Endpoint | Uso no Brawldle |
|---|---|
| `GET /brawlers` | Lista todos os brawlers com seus atributos (nome, vida, alcance, `category_id`, `rarity_id`) e sorteia o brawler secreto da partida. |
| `GET /categories` | Traduz o `category_id` de cada brawler no nome real da classe (ex: Tanque, Suporte). |
| `GET /rarities` | Traduz o `rarity_id` de cada brawler no nome real da raridade (ex: Épico, Lendário). |

> **Observação importante:** os campos `category_id` e `rarity_id` retornados por `/brawlers` são chaves estrangeiras (números). O nome legível dessas classificações só existe nas tabelas `categories` e `rarities`, por isso o front precisa combinar as três respostas antes de exibir qualquer dado ao usuário.

## 4. Fluxo de dados no frontend

1. Ao carregar a tela do jogo, o Brawldle dispara as três requisições em paralelo (`Promise.all`).
2. As respostas de `/categories` e `/rarities` são transformadas em dicionários (mapas `id → nome`), para consulta rápida em O(1).
3. Cada brawler retornado por `/brawlers` é "adaptado": os IDs de categoria e raridade são substituídos pelo nome correspondente, usando os dicionários montados no passo anterior.
4. Um brawler é sorteado aleatoriamente entre a lista adaptada — esse é o "brawler secreto" da rodada.
5. A cada tentativa do usuário, o jogo compara atributo por atributo (raridade, classe, vida, alcance, nome) entre o brawler chutado e o brawler secreto, colorindo cada célula de verde (acerto) ou vermelho (erro, com seta indicando se o valor real é maior ou menor).

## 5. Configuração de ambiente

O frontend usa uma variável de ambiente para saber onde a API está hospedada, permitindo trocar entre ambiente local e produção sem alterar código:

```env
# .env do Brawldle
VITE_API_URL=http://localhost:3333
```

Em produção, essa variável seria apontada para a URL pública da API (ex: um serviço no Render/Railway), sem necessidade de alterar o código-fonte.

## 6. Exemplo de chamada (`services/api.js`)

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

export async function getBrawlers() {
  const res = await fetch(`${API_URL}/brawlers`);
  if (!res.ok) throw new Error('Erro ao buscar brawlers');
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error('Erro ao buscar categorias');
  return res.json();
}

export async function getRarities() {
  const res = await fetch(`${API_URL}/rarities`);
  if (!res.ok) throw new Error('Erro ao buscar raridades');
  return res.json();
}
```

## 7. Desafios enfrentados e soluções

| Problema | Causa | Solução |
|---|---|---|
| Todas as comparações de Raridade e Classe apareciam como "corretas" (verde), mesmo em brawlers diferentes | O frontend tentava ler campos que não existem na resposta da API (`rarity_name`, `category_name`), resultando em `undefined === undefined` | Passou a consumir `/categories` e `/rarities` separadamente e traduzir os IDs para nomes antes de exibir e comparar |
| Erro de conexão entre front e back | Configuração inicial de CORS e variáveis de ambiente | Verificado o `@fastify/cors` no backend (`origin: true`) e padronizada a variável `VITE_API_URL` no frontend |

## 8. Conclusão

A integração permitiu que o Brawldle deixasse de depender de um arquivo estático de dados e passasse a consumir informações reais e centralizadas do banco de dados do grupo, através da API RESTful desenvolvida em Fastify. Isso reforça o conceito de reuso de uma mesma API por diferentes aplicações clientes, um dos objetivos centrais do trabalho.