import { FolderGit2, Star } from 'lucide-react';
import StoryCard, { StoryItem } from '@/components/cards/StoryCard';
import { formatNumber } from '@/lib/utils';

export default function ReposCard({ wrapped }) {
  const { user, stats } = wrapped;

  return (
    <StoryCard gradient="from-amber-500 via-orange-600 to-rose-700" className="items-center text-center">
      <StoryItem>
        <FolderGit2 className="mx-auto size-10 text-white/80" />
        <p className="mt-3 text-lg text-white/80">Você publicou</p>
        <p className="text-8xl font-black tabular-nums tracking-tighter">
          {formatNumber(user.publicRepos)}
        </p>
        <p className="text-xl font-semibold">
          {user.publicRepos === 1 ? 'repositório público' : 'repositórios públicos'}
        </p>
      </StoryItem>

      <StoryItem>
        <div className="mx-auto h-px w-24 bg-white/30" />
      </StoryItem>

      <StoryItem>
        <p className="text-lg text-white/80">e a comunidade retribuiu com</p>
        <p className="flex items-center justify-center gap-3 text-7xl font-black tabular-nums tracking-tighter">
          <Star className="size-12 fill-yellow-300 text-yellow-300" />
          {formatNumber(stats.totalStars)}
        </p>
        <p className="text-xl font-semibold">
          {stats.totalStars === 1 ? 'estrela' : 'estrelas'} no total
        </p>
      </StoryItem>
    </StoryCard>
  );
}
