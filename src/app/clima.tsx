import { ScrollView, StyleSheet, Text } from 'react-native';
import Cartao from '../components/Cartao';
import Carregando from '../components/Carregando';
import Erro from '../components/Erro';
import useFetch from '../hooks/useFetch';
import { obterClima } from '../services/clima';

export default function Clima() {
  const { dados, carregando, erro, recarregar } = useFetch(obterClima);

  return (
    <ScrollView contentContainerStyle={estilos.pagina}>
      {carregando && <Carregando />}
      {erro && <Erro mensagem={erro} aoTentar={recarregar} />}
      {dados && (
        <>
          <Cartao titulo={dados.cidade}>
            <Text style={estilos.grande}>{dados.temperatura}°C</Text>
            <Text>{dados.descricao} · vento {dados.vento} km/h</Text>
          </Cartao>
          {dados.dias.map((d: any) => (
            <Cartao key={d.data} titulo={d.data}>
              <Text style={estilos.linha}>
                {d.min}° / {d.max}° · chuva {d.chuva}%
              </Text>
            </Cartao>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pagina: { padding: 16, gap: 12, backgroundColor: '#f3f4f6', flexGrow: 1 },
  grande: { fontSize: 40, fontWeight: '700' },
  linha: { fontSize: 16 },
});