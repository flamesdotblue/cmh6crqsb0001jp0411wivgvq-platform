import { Calendar, MapPin, Globe } from 'lucide-react';

function HackathonCard({ item }) {
  const isOnline = item.mode === 'online';
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-cyan-600/50 hover:shadow-[0_0_0_1px_rgba(8,145,178,0.4)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-medium text-white group-hover:text-cyan-300">{item.title}</h3>
          <p className="mt-1 text-sm text-slate-400">by {item.organizer}</p>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-xs ${isOnline ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-600/40' : 'bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-600/40'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-cyan-400" />
          <span>{new Date(item.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          {isOnline ? <Globe className="h-4 w-4 text-cyan-400" /> : <MapPin className="h-4 w-4 text-cyan-400" />}
          <span>
            {item.location}
            {!isOnline && typeof item.distanceKm === 'number' ? ` · ${item.distanceKm} km` : ''}
          </span>
        </div>
      </div>

      {item.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span key={t} className="rounded-md border border-slate-700 bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300">
              #{t}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function HackathonList({ items }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-300">
        No akathons match your filters. Try expanding your radius or adjusting the search.
      </div>
    );
  }
  return (
    <section className="space-y-4">
      {items.map((item) => (
        <HackathonCard key={item.id} item={item} />
      ))}
    </section>
  );
}
