const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

export async function getBrawlers() {
  const res = await fetch(`${API_URL}/brawlers`);
  if (!res.ok) throw new Error('Erro ao buscar brawlers');
  return res.json();
}

export async function getBrawlerById(id) {
  const res = await fetch(`${API_URL}/brawlers/${id}`);
  if (!res.ok) throw new Error('Brawler não encontrado');
  return res.json();
}

// NOVO: busca as categorias (classes)
export async function getCategorias() {
  const res = await fetch(`${API_URL}/categorias`);
  if (!res.ok) throw new Error('Erro ao buscar categorias');
  return res.json();
}

// NOVO: busca as raridades
export async function getRaridades() {
  const res = await fetch(`${API_URL}/raridades`);
  if (!res.ok) throw new Error('Erro ao buscar raridades');
  return res.json();
}