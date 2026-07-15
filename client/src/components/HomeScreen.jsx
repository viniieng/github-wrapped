import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function HomeScreen({ onSubmit, error }) {
  const [username, setUsername] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const value = username.trim().replace(/^@/, '');
    if (value) onSubmit(value);
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* blobs decorativos ao fundo */}
      <div className="pointer-events-none absolute -top-32 -left-32 size-64 animate-float rounded-full bg-violet-600/30 blur-2xl sm:size-96 sm:blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 size-72 animate-float-slow rounded-full bg-fuchsia-600/25 blur-2xl sm:size-[28rem] sm:blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 size-40 animate-float rounded-full bg-cyan-500/15 blur-2xl sm:size-64 sm:blur-3xl" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-fuchsia-900/50"
        >
          <Github className="size-8" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-black tracking-tight sm:text-6xl"
        >
          GitHub{' '}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
            Wrapped
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-balance text-zinc-400"
        >
          Sua retrospectiva do GitHub no estilo Spotify Wrapped. Digite seu
          username e descubra seus números.
        </motion.p>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="mt-8 flex w-full flex-col gap-3"
        >
          <Input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Seu username do GitHub (ex: torvalds)"
            autoFocus
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Username do GitHub"
          />
          <Button type="submit" size="lg" disabled={!username.trim()}>
            <Sparkles />
            Gerar meu Wrapped
          </Button>
        </motion.form>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {error}
          </motion.p>
        )}
      </div>
    </motion.main>
  );
}
