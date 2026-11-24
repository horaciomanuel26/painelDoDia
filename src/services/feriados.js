const PAIS = 'AO';

async function feriadosDoAno(ano) {
  const resp = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${ano}/${PAIS}`);
  if (!resp.ok) throw new Error('Não foi possível obter os feriados.');
  return resp.json();
}

export async function obterProximosFeriados(limite = 6) {
  const ano = new Date().getFullYear();
  const [atual, proximo] = await Promise.all([
    feriadosDoAno(ano),
    feriadosDoAno(ano + 1).catch(() => []),
  ]);

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return [...atual, ...proximo]
    .filter((f) => new Date(f.date + 'T00:00:00') >= hoje)
    .slice(0, limite);
}