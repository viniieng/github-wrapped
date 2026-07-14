import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import IntroCard from '@/components/cards/IntroCard';
import ReposCard from '@/components/cards/ReposCard';
import LanguagesCard from '@/components/cards/LanguagesCard';
import TopRepoCard from '@/components/cards/TopRepoCard';
import SocialCard from '@/components/cards/SocialCard';
import SummaryCard from '@/components/cards/SummaryCard';

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? '-100%' : '100%', opacity: 0 }),
};

const SWIPE_THRESHOLD = 80;

export default function WrappedStories({ wrapped, onRestart }) {
  const [[index, direction], setPage] = useState([0, 0]);

  const cards = useMemo(
    () => [
      { id: 'intro', Component: IntroCard },
      { id: 'repos', Component: ReposCard },
      { id: 'languages', Component: LanguagesCard },
      { id: 'top-repo', Component: TopRepoCard },
      { id: 'social', Component: SocialCard },
      { id: 'summary', Component: SummaryCard },
    ],
    [],
  );

  const goTo = useCallback(
    (nextIndex) => {
      setPage(([current]) => {
        const clamped = Math.max(0, Math.min(cards.length - 1, nextIndex));
        return clamped === current ? [current, 0] : [clamped, clamped > current ? 1 : -1];
      });
    },
    [cards.length],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'Escape') onRestart();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, previous, onRestart]);

  const { Component } = cards[index];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-dvh items-center justify-center bg-zinc-950 sm:p-6"
    >
      <div className="relative h-dvh w-full max-w-md overflow-hidden bg-zinc-900 sm:h-[min(52rem,calc(100dvh-3rem))] sm:rounded-[2rem] sm:shadow-2xl sm:shadow-black/60">
        {/* barra de progresso estilo stories */}
        <div className="absolute inset-x-0 top-0 z-30 flex gap-1.5 px-4 pt-4">
          {cards.map((card, segmentIndex) => (
            <button
              key={card.id}
              type="button"
              aria-label={`Ir para o card ${segmentIndex + 1}`}
              onClick={() => goTo(segmentIndex)}
              className="h-4 flex-1 cursor-pointer py-1.5"
            >
              <span
                className={`block h-1 w-full rounded-full transition-colors ${
                  segmentIndex <= index ? 'bg-white' : 'bg-white/25'
                }`}
              />
            </button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onRestart}
          aria-label="Fechar e voltar ao início"
          className="absolute right-3 top-8 z-30 rounded-full text-white/80"
        >
          <X />
        </Button>

        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={cards[index].id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: 'spring', stiffness: 320, damping: 32 }, opacity: { duration: 0.18 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_event, info) => {
              if (info.offset.x < -SWIPE_THRESHOLD) next();
              else if (info.offset.x > SWIPE_THRESHOLD) previous();
            }}
            className="absolute inset-0"
          >
            <Component wrapped={wrapped} onRestart={onRestart} />
          </motion.div>
        </AnimatePresence>

        {/* zonas de toque nas laterais (mobile, estilo stories) */}
        <button
          type="button"
          aria-label="Card anterior"
          onClick={previous}
          className="absolute inset-y-16 left-0 z-20 w-1/4 cursor-pointer sm:hidden"
        />
        <button
          type="button"
          aria-label="Próximo card"
          onClick={next}
          className="absolute inset-y-16 right-0 z-20 w-1/4 cursor-pointer sm:hidden"
        />

        {/* setas de navegação (desktop) */}
        <div className="absolute inset-x-0 bottom-5 z-20 hidden justify-between px-5 sm:flex">
          <Button
            variant="secondary"
            size="icon"
            onClick={previous}
            disabled={index === 0}
            aria-label="Card anterior"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={next}
            disabled={index === cards.length - 1}
            aria-label="Próximo card"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </motion.main>
  );
}
