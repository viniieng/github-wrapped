import { UserPlus, Users } from 'lucide-react';
import StoryCard, { StoryItem } from '@/components/cards/StoryCard';
import { formatNumber } from '@/lib/utils';

export default function SocialCard({ wrapped }) {
  const { followers, following } = wrapped.user;

  const punchline =
    followers > following * 2
      ? 'A comunidade te acompanha de perto. Celebridade do git push 🌟'
      : followers > following
        ? 'Mais seguido do que seguindo — seu código fala por você 😎'
        : following > followers
          ? 'Você espalha follows por aí. A comunidade agradece 🤝'
          : 'Equilíbrio perfeito entre seguir e ser seguido ⚖️';

  return (
    <StoryCard gradient="from-pink-500 via-rose-600 to-red-800" className="items-center text-center">
      <StoryItem>
        <p className="text-lg text-white/80">Seu lado social</p>
      </StoryItem>

      <StoryItem>
        <div className="flex items-center justify-center gap-6">
          <div className="flex-1">
            <Users className="mx-auto size-8 text-white/80" />
            <p className="mt-2 text-6xl font-black tabular-nums tracking-tighter">
              {formatNumber(followers)}
            </p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-white/70">
              seguidores
            </p>
          </div>

          <p className="text-2xl font-black text-white/50">vs</p>

          <div className="flex-1">
            <UserPlus className="mx-auto size-8 text-white/80" />
            <p className="mt-2 text-6xl font-black tabular-nums tracking-tighter">
              {formatNumber(following)}
            </p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-white/70">
              seguindo
            </p>
          </div>
        </div>
      </StoryItem>

      <StoryItem>
        <p className="mx-auto max-w-xs text-balance text-lg font-semibold">{punchline}</p>
      </StoryItem>
    </StoryCard>
  );
}
