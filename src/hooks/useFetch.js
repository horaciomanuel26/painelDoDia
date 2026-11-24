import { useCallback, useEffect, useState } from 'react';

// "funcao" deve ser uma função estável (definida fora do componente)
export default function useFetch(funcao) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      setDados(await funcao());
    } catch (e) {
      setErro(e.message || 'Erro desconhecido');
    } finally {
      setCarregando(false);
    }
  }, [funcao]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { dados, carregando, erro, recarregar: carregar };
}