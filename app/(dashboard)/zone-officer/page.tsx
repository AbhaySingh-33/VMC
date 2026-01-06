"use client";

import StatCard from "@/components/dashboard/StatCard";
import BaseMap from "@/components/maps/BaseMap";
import { Flame, MapPin, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ZoneOfficerDashboard() {
  const wardData = [
    { ward: "Ward 8", issues: 24, resolved: 18, sla: 87 },
    { ward: "Ward 12", issues: 18, resolved: 12, sla: 85 },
    { ward: "Ward 15", issues: 31, resolved: 21, sla: 71 },
    { ward: "Ward 19", issues: 15, resolved: 13, sla: 92 },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 to-slate-900 p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Zone Officer Dashboard</h1>
        <p className="text-slate-400">Multi-ward Analytics & Hotspot Detection - Zone East</p>
      </div>

      {/* Zone Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Total Wards" 
          value="5" 
          icon={<MapPin className="w-5 h-5" />}
          color="blue"
        />
        <StatCard 
          title="Active Issues" 
          value="88" 
          icon={<Users className="w-5 h-5" />}
          color="orange"
          trend={{ value: "+12 today", isPositive: false }}
        />
        <StatCard 
          title="Resolved Today" 
          value="64" 
          icon={<TrendingUp className="w-5 h-5" />}
          color="emerald"
          trend={{ value: "+21 vs yesterday", isPositive: true }}
        />
        <StatCard 
          title="Hotspots" 
          value="3" 
          icon={<Flame className="w-5 h-5" />}
          color="red"
        />
      </div>

      {/* Heatmap / Map */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Issue Heatmap - Zone East</h2>
          <p className="text-sm text-slate-400 mt-1">Real-time density visualization</p>
        </div>
        <div className="h-[50vh]">
          <BaseMap heatmap />
        </div>
      </div>

      {/* Ward Comparison */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Ward Performance Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Ward</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Active Issues</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Resolved</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">SLA %</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {wardData.map((ward) => (
                <tr key={ward.ward} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white font-semibold">{ward.ward}</td>
                  <td className="px-4 py-3 text-orange-400">{ward.issues}</td>
                  <td className="px-4 py-3 text-emerald-400">{ward.resolved}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/10 rounded-full h-2 max-w-[100px]">
                        <div 
                          className={`h-2 rounded-full ${
                            ward.sla >= 85 ? 'bg-emerald-500' : ward.sla >= 70 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${ward.sla}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-300 font-semibold min-w-[40px]">{ward.sla}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      ward.sla >= 85 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : ward.sla >= 70 
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {ward.sla >= 85 ? 'Good' : ward.sla >= 70 ? 'Fair' : 'Poor'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <TrendingUp className="w-4 h-4 mr-2" />
          Generate Zone Report
        </Button>
        <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white">
          <Flame className="w-4 h-4 mr-2" />
          View Hotspot Details
        </Button>
        <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white">
          Compare Time Periods
        </Button>
      </div>
    </div>
  );
}
