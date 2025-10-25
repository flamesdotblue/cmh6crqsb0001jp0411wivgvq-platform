import { Search, MapPin, Globe } from 'lucide-react';

export default function SearchFilters({ query, onQueryChange, mode, onModeChange, radius, onRadiusChange }) {
  return (
    <section id="search" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-sm text-slate-300">Search</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search by title, tag, or organizer"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-9 pr-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
            />
          </div>
        </div>

        <div className="w-full md:w-40">
          <label className="mb-1 block text-sm text-slate-300">Mode</label>
          <div className="grid grid-cols-3 gap-1 rounded-lg border border-slate-800 bg-slate-950 p-1">
            <button
              onClick={() => onModeChange('all')}
              className={`rounded-md px-2 py-1.5 text-sm ${mode === 'all' ? 'bg-cyan-500 text-slate-900' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              All
            </button>
            <button
              onClick={() => onModeChange('online')}
              className={`flex items-center justify-center gap-1 rounded-md px-2 py-1.5 text-sm ${mode === 'online' ? 'bg-cyan-500 text-slate-900' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <Globe className="h-4 w-4" />
              Online
            </button>
            <button
              onClick={() => onModeChange('offline')}
              className={`flex items-center justify-center gap-1 rounded-md px-2 py-1.5 text-sm ${mode === 'offline' ? 'bg-cyan-500 text-slate-900' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <MapPin className="h-4 w-4" /> Offline
            </button>
          </div>
        </div>

        <div className="w-full md:w-64">
          <label className="mb-1 block text-sm text-slate-300 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-cyan-400" /> Nearby radius: {radius} km
          </label>
          <input
            type="range"
            min={5}
            max={200}
            step={5}
            value={radius}
            onChange={(e) => onRadiusChange(Number(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>
      </div>
    </section>
  );
}
