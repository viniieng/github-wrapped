import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Check, Download, RotateCcw } from 'lucide-react';
import StoryCard, { StoryItem } from '@/components/cards/StoryCard';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils';

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="truncate text-3xl font-black tabular-nums tracking-tighter">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/60">{label}</p>
    </div>
  );
}

export default function SummaryCard({ wrapped, onRestart }) {
  const shareRef = useRef(null);
  const [downloadState, setDownloadState] = useState('idle'); // idle | busy | done

  const { user, stats, year } = wrapped;

  async function handleDownload() {
    if (!shareRef.current || downloadState === 'busy') return;
    setDownloadState('busy');
    try {
      const dataUrl = await toPng(shareRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `github-wrapped-${user.login}-${year}.png`;
      link.href = dataUrl;
      link.click();
      setDownloadState('done');
      setTimeout(() => setDownloadState('idle'), 2500);
    } catch (error) {
      console.error('Falha ao gerar a imagem:', error);
      setDownloadState('idle');
    }
  }

  return (
    <StoryCard gradient="from-zinc-900 via-zinc-950 to-black" className="justify-center gap-5 px-6">
      {/* área capturada pelo html-to-image */}
      <StoryItem>
        <div
          ref={shareRef}
          className="rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-700 to-rose-600 p-1"
        >
          <div className="rounded-[calc(1.5rem-4px)] bg-zinc-950/90 p-6">
            <div className="flex items-center gap-4">
              <img
                src={user.avatarUrl}
                alt={`Avatar de ${user.name}`}
                crossOrigin="anonymous"
                className="size-14 rounded-full ring-2 ring-fuchsia-400"
                draggable={false}
              />
              <div className="min-w-0">
                <p className="truncate text-lg font-black leading-tight">{user.name}</p>
                <p className="truncate text-sm text-white/60">@{user.login}</p>
              </div>
            </div>

            <p className="mt-5 bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-200 bg-clip-text text-2xl font-black tracking-tight text-transparent">
              GitHub Wrapped {year}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Stat label="repositórios" value={formatNumber(user.publicRepos)} />
              <Stat label="stars recebidas" value={`⭐ ${formatNumber(stats.totalStars)}`} />
              <Stat label="linguagem top" value={stats.topLanguage ?? '—'} />
              <Stat label="seguidores" value={formatNumber(user.followers)} />
            </div>

            {stats.topRepo && (
              <p className="mt-4 truncate text-sm text-white/60">
                🏆 Repo destaque: <span className="font-semibold text-white/90">{stats.topRepo.name}</span>
              </p>
            )}

            <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
              github wrapped · desde {user.since}
            </p>
          </div>
        </div>
      </StoryItem>

      {/* ações — fora da área capturada */}
      <StoryItem className="flex flex-col gap-3">
        <Button size="lg" onClick={handleDownload} disabled={downloadState === 'busy'}>
          {downloadState === 'done' ? <Check /> : <Download />}
          {downloadState === 'busy'
            ? 'Gerando imagem…'
            : downloadState === 'done'
              ? 'Imagem baixada!'
              : 'Baixar e compartilhar'}
        </Button>
        <Button variant="outline" size="lg" onClick={onRestart}>
          <RotateCcw />
          Gerar outro Wrapped
        </Button>
      </StoryItem>
    </StoryCard>
  );
}
