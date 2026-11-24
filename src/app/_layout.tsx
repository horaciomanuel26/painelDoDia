import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Painel do Dia' }} />
      <Stack.Screen name="cambio" options={{ title: 'Câmbio' }} />
      <Stack.Screen name="clima" options={{ title: 'Clima' }} />
      <Stack.Screen name="feriados" options={{ title: 'Feriados' }} />
    </Stack>
  );
}