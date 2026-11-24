const LOCAL = { nome: 'Cabinda', latitude: -5.5602, longitude: 12.1906 };

const DESCRICOES = {
  0: 'Céu limpo', 1: 'Quase limpo', 2: 'Parcialmente nublado', 3: 'Nublado',
  45: 'Nevoeiro', 48: 'Nevoeiro', 51: 'Chuvisco leve', 53: 'Chuvisco', 55: 'Chuvisco forte',
  61: 'Chuva leve', 63: 'Chuva', 65: 'Chuva forte', 80: 'Aguaceiros leves',
  81: 'Aguaceiros', 82: 'Aguaceiros fortes', 95: 'Trovoada', 96: 'Trovoada com granizo', 99: 'Trovoada forte',
};

export async function obterClima() {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${LOCAL.latitude}&longitude=${LOCAL.longitude}` +
    `&current=temperature_2m,weather_code,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&timezone=auto&forecast_days=5`;

  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Não foi possível obter o clima.');
  const json = await resp.json();

  return {
    cidade: LOCAL.nome,
    temperatura: Math.round(json.current.temperature_2m),
    descricao: DESCRICOES[json.current.weather_code] ?? 'Sem descrição',
    vento: Math.round(json.current.wind_speed_10m),
    dias: json.daily.time.map((data, i) => ({
      data,
      max: Math.round(json.daily.temperature_2m_max[i]),
      min: Math.round(json.daily.temperature_2m_min[i]),
      chuva: json.daily.precipitation_probability_max[i],
    })),
  };
}