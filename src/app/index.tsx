import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Cartao from '../components/Cartao';
import useFetch from '../hooks/useFetch';
import { obterCambio } from '../services/cambio';
import { obterClima } from '../services/clima';
import { obterProximosFeriados } from '../services/feriados';

export default function Inicio() {
  const router = useRouter();
  const clima = useFetch(obterClima);
  const cambio = useFetch(obterCambio);
  const feriados = useFetch(obterProximosFeriados);

  const proximo = feriados.dados?.[0];

  return (
    <ScrollView contentContainerStyle={estilos.pagina}>
      <Cartao titulo="Clima" aoPressionar={() => router.push('/clima')}>
        <Text style={estilos.grande}>
          {clima.dados ? `${clima.dados.temperatura}°C` : '...'}
        </Text>
        <Text>{clima.erro ?? clima.dados?.descricao ?? 'A carregar...'}</Text>
      </Cartao>

      <Cartao titulo="Câmbio" aoPressionar={() => router.push('/cambio')}>
        <Text style={estilos.grande}>
          {cambio.dados ? `1 USD = ${cambio.dados.usdParaKz.toFixed(0)} Kz` : '...'}
        </Text>
        {cambio.erro && <Text>{cambio.erro}</Text>}
      </Cartao>

      <Cartao titulo="Próximo feriado" aoPressionar={() => router.push('/feriados')}>
        <Text style={estilos.grande}>{proximo ? proximo.localName : '...'}</Text>
        <Text>{feriados.erro ?? proximo?.date ?? 'A carregar...'}</Text>
      </Cartao>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pagina: { padding: 16, gap: 14, backgroundColor: '#f3f4f6', flexGrow: 1 },
  grande: { fontSize: 24, fontWeight: '700' },
});