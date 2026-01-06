import Link from "next/link";
import {
  MapPin,
  ClipboardList,
  Users,
  ShieldCheck,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">
          Vadodara Municipal Corporation
        </h1>
        <p className="text-lg text-slate-300 mb-12">
          AI-Based Geo-Fenced Civic Issue Monitoring System
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Tile
            icon={<MapPin />}
            title="Geo-Fenced Reporting"
            desc="Auto ward detection using GPS"
          />
          <Tile
            icon={<ClipboardList />}
            title="Civic Issue Tracking"
            desc="Potholes, garbage, drainage & more"
          />
          <Tile
            icon={<Users />}
            title="Role-Based Dashboards"
            desc="Field staff to commissioner"
          />
          <Tile
            icon={<ShieldCheck />}
            title="Offline-First PWA"
            desc="Works without network"
          />
        </div>

        <div className="mt-14">
          <Link
            href="/login"
            className="inline-block bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold"
          >
            Login to System
          </Link>
        </div>
      </div>
    </main>
  );
}

function Tile({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white/10 rounded-xl p-6 backdrop-blur">
      <div className="mb-4 text-green-400">{icon}</div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-slate-300">{desc}</p>
    </div>
  );
}
