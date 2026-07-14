import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

const MESSAGES = [
  'Contando seus commits…',
  'Somando as estrelas ⭐',
  'Analisando suas linguagens…',
  'Procurando seu repositório favorito…',
  'Preparando seu Wrapped ✨',
];

export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setMessageIndex((index) => (index + 1) % MESSAGES.length),
      1800,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-dvh items-center justify-center px-6"
    >
      <div className="flex w-full max-w-md flex-col items-center gap-8">
        <div className="w-full space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="flex items-center gap-4">
            <Skeleton className="size-16 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-3">
            <Skeleton className="h-16 flex-1" />
            <Skeleton className="h-16 flex-1" />
          </div>
        </div>

        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-zinc-400"
        >
          {MESSAGES[messageIndex]}
        </motion.p>
      </div>
    </motion.main>
  );
}
