import Spline from '@splinetool/react-spline';
import { Rocket, Calendar, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[620px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-300 backdrop-blur">
            <Rocket className="h-3.5 w-3.5 text-cyan-400" />
            A modern hub for akathons
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Find and host akathons near you or online
          </h1>
          <p className="mt-3 text-slate-300">
            Students can discover upcoming challenges nearby or remote. Conductors can publish their event details and reach highly engaged participants.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#search" className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-slate-900 hover:bg-cyan-400 transition">
              <Calendar className="h-4 w-4" /> Explore events
            </a>
            <a href="#auth" className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-slate-200 hover:bg-slate-800/60 transition">
              <Users className="h-4 w-4" /> Join as student or conductor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
