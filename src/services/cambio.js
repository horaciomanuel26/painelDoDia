const URL = 'https://open.er-api.com/v6/latest/USD';

export async function obterCambio() {
  const resp = await fetch(URL);
  if (!resp.ok) throw new Error('Não foi possível obter o câmbio.');
  const json = await resp.json();
  if (json.result !== 'success') throw new Error('Resposta inválida da API de câmbio.');

  const { AOA, EUR } = json.rates;
  return {
    usdParaKz: AOA,
    eurParaKz: AOA / EUR,
    atualizadoEm: json.time_last_update_utc,
  };
}