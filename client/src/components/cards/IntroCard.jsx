import StoryCard, { StoryItem } from '@/components/cards/StoryCard';

export default function IntroCard({ wrapped }) {
  const { user, year } = wrapped;
  const yearsOnGitHub = year - user.since;

  return (
    <StoryCard gradient="from-violet-600 via-purple-700 to-fuchsia-900" className="items-center text-center">
      <StoryItem>
        <img
          src={user.avatarUrl}
          alt={`Avatar de ${user.name}`}
          crossOrigin="anonymous"
          className="mx-auto size-28 rounded-full ring-4 ring-white/40"
          draggable={false}
        />
      </StoryItem>

      <StoryItem>
        <h2 className="text-3xl font-black tracking-tight">{user.name}</h2>
        <p className="mt-1 text-white/70">@{user.login}</p>
      </StoryItem>

      {user.bio && (
        <StoryItem>
          <p className="text-balance text-sm text-white/80">“{user.bio}”</p>
        </StoryItem>
      )}

      <StoryItem>
        <p className="text-lg text-white/80">Você está no GitHub desde</p>
        <p className="text-7xl font-black tabular-nums tracking-tighter">{user.since}</p>
        {yearsOnGitHub > 0 && (
          <p className="mt-2 text-white/70">
            São {yearsOnGitHub} {yearsOnGitHub === 1 ? 'ano' : 'anos'} de código. Vamos ver o que você aprontou 👀
          </p>
        )}
      </StoryItem>
    </StoryCard>
  );
}
