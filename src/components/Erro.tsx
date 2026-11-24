import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = { mensagem: string; aoTentar: () => void };

export default function Erro({ mensagem, aoTentar }: Props) {
  return (
    <View style={estilos.caixa}>
      <Text style={estilos.texto}>{mensagem}</Text>
      <Pressable onPress={aoTentar} style={estilos.botao}>
        <Text style={estilos.botaoTexto}>Tentar de novo</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  caixa: { padding: 16, backgroundColor: '#fdecea', borderRadius: 12, gap: 10 },
  texto: { color: '#b3261e' },
  botao: { alignSelf: 'flex-start', backgroundColor: '#b3261e', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  botaoTexto: { color: '#fff', fontWeight: '600' },
});