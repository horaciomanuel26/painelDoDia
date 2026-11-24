import { ScrollView, StyleSheet, Text } from 'react-native';
import Cartao from '../components/Cartao';
import Carregando from '../components/Carregando';
import Erro from '../components/Erro';
import useFetch from '../hooks/useFetch';
import { obterProximosFeriados } from '../services/feriados';

export default function Feriados() {
  const { dados, carregando, erro, recarregar } = useFetch(obterProximosFeriados);

  return (
    <ScrollView contentContainerStyle={estilos.pagina}>
      {carregando && <Carregando />}
      {erro && <Erro mensagem={erro} aoTentar={recarregar} />}
      {dados?.map((f: any) => (
        <Cartao key={f.date + f.name} titulo={f.date}>
          <Text style={estilos.nome}>{f.localName}</Text>
          <Text>{f.name}</Text>
        </Cartao>
      ))}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pagina: { padding: 16, gap: 12, backgroundColor: '#f3f4f6', flexGrow: 1 },
  nome: { fontSize: 18, fontWeight: '700' },
});