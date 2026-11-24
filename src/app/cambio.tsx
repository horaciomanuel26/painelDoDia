import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import Cartao from '../components/Cartao';
import Carregando from '../components/Carregando';
import Erro from '../components/Erro';
import useFetch from '../hooks/useFetch';
import { obterCambio } from '../services/cambio';

export default function Cambio() {
  const { dados, carregando, erro, recarregar } = useFetch(obterCambio);
  const [kz, setKz] = useState('100000');
  const valor = parseFloat(kz.replace(',', '.')) || 0;

  return (
    <ScrollView contentContainerStyle={estilos.pagina} keyboardShouldPersistTaps="handled">
      {carregando && <Carregando />}
      {erro && <Erro mensagem={erro} aoTentar={recarregar} />}
      {dados && (
        <>
          <Cartao titulo="Cotação">
            <Text style={estilos.linha}>1 USD = {dados.usdParaKz.toFixed(2)} Kz</Text>
            <Text style={estilos.linha}>1 EUR = {dados.eurParaKz.toFixed(2)} Kz</Text>
            <Text style={estilos.pequeno}>Atualizado: {dados.atualizadoEm}</Text>
          </Cartao>

          <Cartao titulo="Conversor (Kz)">
            <TextInput
              value={kz}
              onChangeText={setKz}
              keyboardType="numeric"
              style={estilos.input}
            />
            <Text style={estilos.linha}>= {(valor / dados.usdParaKz).toFixed(2)} USD</Text>
            <Text style={estilos.linha}>= {(valor / dados.eurParaKz).toFixed(2)} EUR</Text>
          </Cartao>
        </>
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pagina: { padding: 16, gap: 12, backgroundColor: '#f3f4f6', flexGrow: 1 },
  linha: { fontSize: 18, fontWeight: '600' },
  pequeno: { fontSize: 12, color: '#6b7280' },
  input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 10, padding: 10, fontSize: 18 },
});