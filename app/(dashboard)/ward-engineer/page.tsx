"use client";

import StatCard from "@/components/dashboard/StatCard";
import IssueTable from "@/components/dashboard/IssueTable";
import { CheckCircle2, Clock, AlertTriangle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WardEngineerDashboard() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 to-slate-900 p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Ward Engineer Dashboard</h1>
        <p className="text-slate-400">Verification & SLA Monitoring - Ward 12</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Open Issues" 
          value="18" 
          icon={<AlertTriangle className="w-5 h-5" />}
          color="orange"
          trend={{ value: "+3 today", isPositive: false }}
        />
        <StatCard 
          title="In Progress" 
          value="7" 
          icon={<Clock className="w-5 h-5" />}
          color="blue"
        />
        <StatCard 
          title="Resolved" 
          value="112" 
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="emerald"
          trend={{ value: "+8 today", isPositive: true }}
        />
        <StatCard 
          title="SLA Breached" 
          value="3" 
          icon={<XCircle className="w-5 h-5" />}
          color="red"
        />
      </div>

      {/* SLA Overview */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">SLA Performance</h2>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Potholes (24h SLA)</span>
              <span className="text-emerald-400 font-semibold">85%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Garbage (12h SLA)</span>
              <span className="text-blue-400 font-semibold">92%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Drainage (48h SLA)</span>
              <span className="text-orange-400 font-semibold">78%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Verify Resolved Issues
        </Button>
        <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white">
          Upload After Photos
        </Button>
        <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white">
          Download Ward Report
        </Button>
      </div>

      {/* Issue List */}
      <IssueTable role="WARD_ENGINEER" />
    </div>
  );
}
