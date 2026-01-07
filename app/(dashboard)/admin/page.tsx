"use client";

import StatCard from "@/components/dashboard/StatCard";
import { Users, FileText, Map, Layers, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">System Administration</h1>
        <p className="text-gray-600">Complete system oversight and management</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value="214" 
          icon={<Users className="w-6 h-6" />}
          color="blue"
          trend={{ value: "+12 this month", isPositive: true }}
        />
        <StatCard 
          title="Active Issues" 
          value="1,248" 
          icon={<FileText className="w-6 h-6" />}
          color="emerald"
          trend={{ value: "+156 this week", isPositive: true }}
        />
        <StatCard 
          title="Total Zones" 
          value="4" 
          icon={<Layers className="w-6 h-6" />}
          color="purple"
        />
        <StatCard 
          title="Total Wards" 
          value="19" 
          icon={<Map className="w-6 h-6" />}
          color="orange"
        />
      </div>

      {/* Management Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">System Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-8 justify-start text-left">
            <Users className="w-6 h-6 mr-4" />
            <div>
              <div className="font-semibold text-lg">User Management</div>
              <div className="text-sm opacity-90">Add, edit, and manage user accounts</div>
            </div>
          </Button>
          
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-8 justify-start text-left">
            <Map className="w-6 h-6 mr-4" />
            <div>
              <div className="font-semibold text-lg">Ward Configuration</div>
              <div className="text-sm opacity-90">Configure ward boundaries and zones</div>
            </div>
          </Button>
          
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-8 justify-start text-left">
            <Settings className="w-6 h-6 mr-4" />
            <div>
              <div className="font-semibold text-lg">System Settings</div>
              <div className="text-sm opacity-90">Configure global system parameters</div>
            </div>
          </Button>
          
          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-8 justify-start text-left">
            <BarChart3 className="w-6 h-6 mr-4" />
            <div>
              <div className="font-semibold text-lg">Analytics & Reports</div>
              <div className="text-sm opacity-90">Generate comprehensive reports</div>
            </div>
          </Button>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">System Health Monitor</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="w-4 h-4 bg-emerald-500 rounded-full mx-auto mb-3 animate-pulse"></div>
            <p className="text-gray-800 font-semibold text-lg">Database</p>
            <p className="text-emerald-600 font-medium">Healthy</p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-3 animate-pulse"></div>
            <p className="text-gray-800 font-semibold text-lg">API Services</p>
            <p className="text-blue-600 font-medium">Online</p>
          </div>
          <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-200">
            <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mb-3"></div>
            <p className="text-gray-800 font-semibold text-lg">Storage</p>
            <p className="text-orange-600 font-medium">67% Used</p>
            <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '67%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
