"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import BaseMap from "@/components/maps/BaseMap";
import { Plus, Save, RefreshCw, Wifi, WifiOff, Camera, MapPin } from "lucide-react";

export default function FieldWorkerDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [offlineIssues, setOfflineIssues] = useState(3);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 to-slate-900 p-4 space-y-4">
      {/* Header with Network Status */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Field Worker</h1>
          <p className="text-sm text-slate-400">Mobile-first reporting</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
          isOnline 
            ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' 
            : 'bg-orange-500/20 border-orange-500/30 text-orange-400'
        }`}>
          {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          <span className="text-xs font-semibold">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Map Section */}
      <div className="h-[50vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        <BaseMap />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">{offlineIssues}</p>
          <p className="text-xs text-slate-400 mt-1">Saved Offline</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">12</p>
          <p className="text-xs text-slate-400 mt-1">Reported Today</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-purple-400">8</p>
          <p className="text-xs text-slate-400 mt-1">Resolved</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-3">
        <Button 
          className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 text-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Report New Issue
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="py-6 rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white"
          >
            <Camera className="w-5 h-5 mr-2" />
            Quick Photo
          </Button>
          <Button 
            variant="outline"
            className="py-6 rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white"
          >
            <MapPin className="w-5 h-5 mr-2" />
            My Location
          </Button>
        </div>

        <Button 
          variant="secondary"
          className="w-full py-6 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
          disabled={offlineIssues === 0}
        >
          <Save className="w-5 h-5 mr-2" />
          Saved Offline Issues ({offlineIssues})
        </Button>

        <Button 
          variant="secondary"
          className="w-full py-6 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30"
          disabled={!isOnline}
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          {isOnline ? 'Sync Now' : 'Offline - Will sync when online'}
        </Button>
      </div>

      {/* Info Banner */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <p className="text-xs text-slate-400 text-center">
          ✓ Offline-first • GPS mandatory • Auto-sync enabled
        </p>
      </div>
    </div>
  );
}
