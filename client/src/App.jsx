import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HomeScreen from '@/components/HomeScreen';
import LoadingScreen from '@/components/LoadingScreen';
import WrappedStories from '@/components/WrappedStories';

// Em produção, aponte para a URL do backend via VITE_API_URL.
// Em dev, o proxy do Vite redireciona /api para http://localhost:3001.
const API_URL = import.meta.env.VITE_API_URL ?? '';

export default function App() {
  const [status, setStatus] = useState('idle'); // idle | loading | ready
  const [error, setError] = useState(null);
  const [wrapped, setWrapped] = useState(null);

  async function generateWrapped(username) {
    setStatus('loading');
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/wrapped/${encodeURIComponent(username)}`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error ?? `Erro ${res.status} ao buscar os dados.`);
      }
      setWrapped(data);
      setStatus('ready');
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Não foi possível conectar ao servidor. O backend está rodando?'
          : err.message,
      );
      setStatus('idle');
    }
  }

  function restart() {
    setWrapped(null);
    setError(null);
    setStatus('idle');
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'idle' && (
        <HomeScreen key="home" onSubmit={generateWrapped} error={error} />
      )}
      {status === 'loading' && <LoadingScreen key="loading" />}
      {status === 'ready' && (
        <WrappedStories key="stories" wrapped={wrapped} onRestart={restart} />
      )}
    </AnimatePresence>
  );
}
