"use client";

import StatCard from "@/components/dashboard/StatCard";
import { Users, FileText, Map, Layers, Download, Upload, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 to-slate-900 p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">System Administrator</h1>
        <p className="text-slate-400">Complete system control & configuration</p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Total Users" 
          value="214" 
          icon={<Users className="w-5 h-5" />}
          color="blue"
          trend={{ value: "+12 this month", isPositive: true }}
        />
        <StatCard 
          title="Total Issues" 
          value="1,248" 
          icon={<FileText className="w-5 h-5" />}
          color="emerald"
          trend={{ value: "+156 this week", isPositive: true }}
        />
        <StatCard 
          title="Zones" 
          value="4" 
          icon={<Layers className="w-5 h-5" />}
          color="purple"
        />
        <StatCard 
          title="Wards" 
          value="19" 
          icon={<Map className="w-5 h-5" />}
          color="orange"
        />
      </div>

      {/* Admin Actions */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">System Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <Button className="w-full bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 justify-start h-auto py-4">
            <Users className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Manage Users</div>
              <div className="text-xs opacity-70">Add, edit, delete user accounts</div>
            </div>
          </Button>
          
          <Button className="w-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 justify-start h-auto py-4">
            <Map className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Configure Wards</div>
              <div className="text-xs opacity-70">Manage ward boundaries & zones</div>
            </div>
          </Button>
          
          <Button className="w-full bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 justify-start h-auto py-4">
            <Settings className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-semibold">System Settings</div>
              <div className="text-xs opacity-70">Configure global parameters</div>
            </div>
          </Button>
          
          <Button className="w-full bg-orange-500/20 border border-orange-500/30 text-orange-400 hover:bg-orange-500/30 justify-start h-auto py-4">
            <Upload className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Upload Boundaries</div>
              <div className="text-xs opacity-70">Import GeoJSON/KML files</div>
            </div>
          </Button>
          
          <Button className="w-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/30 justify-start h-auto py-4">
            <Download className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Export Reports</div>
              <div className="text-xs opacity-70">Generate system-wide analytics</div>
            </div>
          </Button>
          
          <Button className="w-full bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 justify-start h-auto py-4">
            <FileText className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Audit Logs</div>
              <div className="text-xs opacity-70">View system activity logs</div>
            </div>
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent System Activity</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-white font-semibold">New user created</p>
              <p className="text-xs text-slate-400">Field Worker #87 added to Ward 12 • 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-white font-semibold">Ward boundary updated</p>
              <p className="text-xs text-slate-400">Ward 8 geo-fence modified by admin • 5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-white font-semibold">Report exported</p>
              <p className="text-xs text-slate-400">Monthly analytics report generated • 1 day ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Database Status</h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold">Healthy</span>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">API Status</h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold">Online</span>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Storage</h3>
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">67% Used</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 mt-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '67%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
