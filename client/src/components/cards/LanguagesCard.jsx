import { motion } from 'framer-motion';
import StoryCard, { StoryItem } from '@/components/cards/StoryCard';

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C#': '#178600',
  'C++': '#f34b7d',
  C: '#555555',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  Elixir: '#6e4a7e',
  Lua: '#000080',
};

const FALLBACK_COLORS = ['#facc15', '#fb923c', '#f472b6', '#a78bfa', '#38bdf8'];

export default function LanguagesCard({ wrapped }) {
  const { languages, topLanguage } = wrapped.stats;

  if (!topLanguage) {
    return (
      <StoryCard gradient="from-emerald-500 via-teal-600 to-cyan-800" className="items-center text-center">
        <StoryItem>
          <p className="text-4xl font-black">Mistério total 🕵️</p>
          <p className="mt-4 text-white/80">
            Não encontramos linguagens nos seus repositórios públicos.
          </p>
        </StoryItem>
      </StoryCard>
    );
  }

  return (
    <StoryCard gradient="from-emerald-500 via-teal-600 to-cyan-800">
      <StoryItem className="text-center">
        <p className="text-lg text-white/80">Sua linguagem favorita foi</p>
        <p className="text-6xl font-black tracking-tighter">{topLanguage}</p>
      </StoryItem>

      <StoryItem>
        <ul className="mt-4 space-y-4">
          {languages.map((language, position) => (
            <li key={language.name}>
              <div className="mb-1 flex items-baseline justify-between text-sm font-semibold">
                <span>{language.name}</span>
                <span className="tabular-nums text-white/80">{language.percent}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-black/25">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${language.percent}%` }}
                  transition={{ delay: 0.5 + position * 0.12, type: 'spring', stiffness: 80, damping: 20 }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor:
                      LANGUAGE_COLORS[language.name] ??
                      FALLBACK_COLORS[position % FALLBACK_COLORS.length],
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </StoryItem>

      <StoryItem className="text-center">
        <p className="text-sm text-white/70">
          % calculada pelos seus repositórios públicos (sem forks)
        </p>
      </StoryItem>
    </StoryCard>
  );
}
