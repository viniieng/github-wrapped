import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 22 } },
};

/**
 * Casca comum dos cards do carrossel: gradiente de fundo, blobs decorativos
 * e animação em cascata dos filhos (use <StoryItem> para cada bloco).
 */
export default function StoryCard({ gradient, gradientStyle, className, children }) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col overflow-hidden',
        !gradientStyle && 'bg-gradient-to-br',
        gradient,
      )}
      style={gradientStyle}
    >
      <div className="pointer-events-none absolute -top-16 -right-16 size-48 animate-float rounded-full bg-white/10 blur-2xl sm:-top-20 sm:-right-20 sm:size-72 sm:blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-12 size-56 animate-float-slow rounded-full bg-black/20 blur-2xl sm:-bottom-24 sm:-left-16 sm:size-80 sm:blur-3xl" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={cn(
          'relative z-10 flex h-full flex-col justify-center gap-6 px-8 pb-20 pt-16',
          className,
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function StoryItem({ className, children }) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}
