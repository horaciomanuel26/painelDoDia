import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Carregando() {
  return (
    <View style={estilos.centro}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const estilos = StyleSheet.create({
  centro: { padding: 24, alignItems: 'center' },
});