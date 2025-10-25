import { useMemo, useState } from 'react';
import Hero from './components/Hero';
import SearchFilters from './components/SearchFilters';
import HackathonList from './components/HackathonList';
import AuthTabs from './components/AuthTabs';

const initialHackathons = [
  {
    id: '1',
    title: 'Campus Innovators Hackathon',
    mode: 'offline',
    location: 'San Francisco, CA',
    distanceKm: 8,
    date: '2025-11-20',
    tags: ['AI', 'Web'],
    organizer: 'TechHub SF',
  },
  {
    id: '2',
    title: 'Global Online Akathon',
    mode: 'online',
    location: 'Remote',
    distanceKm: null,
    date: '2025-12-05',
    tags: ['Open Source', 'Cloud'],
    organizer: 'Open Dev Collective',
  },
  {
    id: '3',
    title: 'Student Fintech Sprint',
    mode: 'offline',
    location: 'Austin, TX',
    distanceKm: 25,
    date: '2025-11-29',
    tags: ['Fintech', 'Mobile'],
    organizer: 'Longhorn Labs',
  },
  {
    id: '4',
    title: 'AI for Good Online Challenge',
    mode: 'online',
    location: 'Remote',
    distanceKm: null,
    date: '2025-11-14',
    tags: ['AI', 'Health'],
    organizer: 'CivicTech',
  },
];

export default function App() {
  const [hackathons, setHackathons] = useState(initialHackathons);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('all'); // all | online | offline
  const [radius, setRadius] = useState(50); // in km

  const filtered = useMemo(() => {
    return hackathons.filter((h) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = q
        ? [h.title, h.location, h.organizer, ...(h.tags || [])]
            .join(' ')
            .toLowerCase()
            .includes(q)
        : true;
      const matchesMode = mode === 'all' ? true : h.mode === mode;
      const matchesRadius = h.mode === 'offline' ? (h.distanceKm ?? 9999) <= radius : true;
      return matchesQuery && matchesMode && matchesRadius;
    });
  }, [hackathons, query, mode, radius]);

  const handleCreateHackathon = (payload) => {
    const id = `${Date.now()}`;
    const newHack = {
      id,
      title: payload.title,
      mode: payload.mode,
      location: payload.mode === 'online' ? 'Remote' : payload.location || 'TBD',
      distanceKm: payload.mode === 'offline' ? Number(payload.distanceKm ?? 5) : null,
      date: payload.date,
      tags: payload.tags?.filter(Boolean) ?? [],
      organizer: payload.organizer || 'Independent Conductor',
    };
    setHackathons((prev) => [newHack, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <Hero />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SearchFilters
              query={query}
              onQueryChange={setQuery}
              mode={mode}
              onModeChange={setMode}
              radius={radius}
              onRadiusChange={setRadius}
            />
            <HackathonList items={filtered} />
          </div>
          <div className="lg:col-span-1">
            <AuthTabs onCreateHackathon={handleCreateHackathon} />
          </div>
        </div>
      </main>

      <footer className="mt-16 py-10 text-center text-sm text-slate-400">
        Built for students and conductors to discover and host akathons. © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
