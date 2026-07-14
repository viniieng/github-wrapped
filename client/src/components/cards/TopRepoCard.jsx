import { GitFork, Star, Trophy } from 'lucide-react';
import StoryCard, { StoryItem } from '@/components/cards/StoryCard';
import { formatNumber } from '@/lib/utils';

export default function TopRepoCard({ wrapped }) {
  const { topRepo } = wrapped.stats;

  if (!topRepo) {
    return (
      <StoryCard gradient="from-sky-500 via-blue-700 to-indigo-900" className="items-center text-center">
        <StoryItem>
          <p className="text-4xl font-black">Ainda sem repositórios 🌱</p>
          <p className="mt-4 text-white/80">O próximo Wrapped vai ter muito mais história.</p>
        </StoryItem>
      </StoryCard>
    );
  }

  return (
    <StoryCard gradient="from-sky-500 via-blue-700 to-indigo-900" className="items-center text-center">
      <StoryItem>
        <Trophy className="mx-auto size-12 text-yellow-300" />
        <p className="mt-3 text-lg text-white/80">Seu repositório estrela</p>
      </StoryItem>

      <StoryItem>
        <h2 className="break-all text-4xl font-black tracking-tight">{topRepo.name}</h2>
        {topRepo.description && (
          <p className="mx-auto mt-3 max-w-xs text-balance text-sm text-white/80">
            {topRepo.description}
          </p>
        )}
      </StoryItem>

      <StoryItem>
        <div className="flex items-center justify-center gap-8">
          <div>
            <p className="flex items-center justify-center gap-2 text-5xl font-black tabular-nums tracking-tighter">
              <Star className="size-8 fill-yellow-300 text-yellow-300" />
              {formatNumber(topRepo.stars)}
            </p>
            <p className="mt-1 text-sm text-white/70">stars</p>
          </div>
          <div>
            <p className="flex items-center justify-center gap-2 text-5xl font-black tabular-nums tracking-tighter">
              <GitFork className="size-8" />
              {formatNumber(topRepo.forks)}
            </p>
            <p className="mt-1 text-sm text-white/70">forks</p>
          </div>
        </div>
        {topRepo.language && (
          <p className="mt-6 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            {topRepo.language}
          </p>
        )}
      </StoryItem>
    </StoryCard>
  );
}
