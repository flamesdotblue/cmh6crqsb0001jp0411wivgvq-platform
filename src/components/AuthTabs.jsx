import { useState } from 'react';
import { User, PlusCircle } from 'lucide-react';

export default function AuthTabs({ onCreateHackathon }) {
  const [tab, setTab] = useState('student'); // student | conductor
  const [authMode, setAuthMode] = useState('signin'); // signin | signup

  // Conductor form state
  const [form, setForm] = useState({
    organizer: '',
    title: '',
    mode: 'online',
    location: '',
    distanceKm: 5,
    date: '',
    tags: '',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    const payload = {
      organizer: form.organizer.trim(),
      title: form.title.trim(),
      mode: form.mode,
      location: form.location.trim(),
      distanceKm: Number(form.distanceKm),
      date: form.date,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };
    if (!payload.title || !payload.date) return;
    onCreateHackathon?.(payload);
    setForm({ organizer: '', title: '', mode: 'online', location: '', distanceKm: 5, date: '', tags: '' });
    setTab('student');
  };

  return (
    <section id="auth" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="inline-flex rounded-lg border border-slate-800 p-1 bg-slate-950">
          <button
            onClick={() => setTab('student')}
            className={`px-3 py-1.5 text-sm rounded-md ${tab === 'student' ? 'bg-cyan-500 text-slate-900' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            Student
          </button>
          <button
            onClick={() => setTab('conductor')}
            className={`px-3 py-1.5 text-sm rounded-md ${tab === 'conductor' ? 'bg-cyan-500 text-slate-900' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            Conductor
          </button>
        </div>
        <User className="h-5 w-5 text-cyan-400" />
      </div>

      {tab === 'student' ? (
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex rounded-lg border border-slate-800 p-1 bg-slate-950">
              <button
                onClick={() => setAuthMode('signin')}
                className={`px-3 py-1.5 text-sm rounded-md ${authMode === 'signin' ? 'bg-slate-800 text-slate-100' : 'text-slate-300 hover:bg-slate-800/60'}`}
              >
                Sign in
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`px-3 py-1.5 text-sm rounded-md ${authMode === 'signup' ? 'bg-slate-800 text-slate-100' : 'text-slate-300 hover:bg-slate-800/60'}`}
              >
                Sign up
              </button>
            </div>
          </div>
          <form className="space-y-3">
            <div>
              <label className="mb-1 block text-sm text-slate-300">Email</label>
              <input type="email" placeholder="you@school.edu" className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/60" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Password</label>
              <input type="password" placeholder="••••••••" className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/60" />
            </div>
            <button type="button" className="w-full rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-900 hover:bg-cyan-400 transition">
              {authMode === 'signin' ? 'Sign in as Student' : 'Create Student Account'}
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-4">
          <div className="mb-4 text-sm text-slate-300">
            Conductors can publish their akathon. Fill in details below and click Create.
          </div>
          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="mb-1 block text-sm text-slate-300">Organizer name</label>
              <input
                value={form.organizer}
                onChange={(e) => setForm((f) => ({ ...f, organizer: e.target.value }))}
                placeholder="Your organization or name"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Akathon title</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g., Winter AI Challenge"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm text-slate-300">Mode</label>
                <select
                  value={form.mode}
                  onChange={(e) => setForm((f) => ({ ...f, mode: e.target.value }))}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-300">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
                  required
                />
              </div>
            </div>

            {form.mode === 'offline' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm text-slate-300">Location</label>
                  <input
                    value={form.location}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    placeholder="City, State"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-slate-300">Approx distance (km)</label>
                  <input
                    type="number"
                    min={1}
                    value={form.distanceKm}
                    onChange={(e) => setForm((f) => ({ ...f, distanceKm: e.target.value }))}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm text-slate-300">Tags (comma separated)</label>
              <input
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                placeholder="AI, Web, Cloud"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
              />
            </div>

            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-medium text-slate-900 hover:bg-emerald-400 transition">
              <PlusCircle className="h-4 w-4" /> Create Akathon
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
