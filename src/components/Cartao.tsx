import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = { titulo: string; children: ReactNode; aoPressionar?: () => void };

export default function Cartao({ titulo, children, aoPressionar }: Props) {
  return (
    <Pressable onPress={aoPressionar} disabled={!aoPressionar} style={estilos.cartao}>
      <Text style={estilos.titulo}>{titulo}</Text>
      {children}
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16, gap: 6,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  titulo: { fontSize: 13, fontWeight: '700', color: '#6b7280', textTransform: 'uppercase' },
});