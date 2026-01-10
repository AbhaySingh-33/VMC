"use client";

import { useState, useEffect } from "react";
import StatCard from "@/components/dashboard/StatCard";
import Header from "@/components/Header";
import { Users, FileText, Shield, AlertTriangle, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import SLAMonitoring from "@/components/admin/SLAMonitoring";
import CommunicationHub from "@/components/admin/CommunicationHub";
import AdvancedAnalytics from "@/components/admin/AdvancedAnalytics";
import UserManagementTable from "@/components/admin/UserManagementTable";
import UserProfileView from "@/components/admin/UserProfileView";
import UserEditModal from "@/components/admin/UserEditModal";
import ReassignmentModal from "@/components/admin/ReassignmentModal";
import DeactivationConfirmation from "@/components/admin/DeactivationConfirmation";
import BaseMap from "@/components/maps/BaseMap";
import { offlineStorage } from "@/lib/offline-storage";
import type { User, UserStatistics } from "@/lib/api-client";
import { getAllUsers, getUserStatistics } from "@/lib/api-client";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [statistics, setStatistics] = useState({ total: 0, pending: 0, resolved: 0, inProgress: 0, resolutionRate: 0 });
  
  // User management state
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userStats, setUserStats] = useState<UserStatistics | null>(null);
  
  // Modal states
  const [showProfileView, setShowProfileView] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [deactivationAction, setDeactivationAction] = useState<'deactivate' | 'reactivate'>('deactivate');

  // Mock ward/zone data (replace with real API calls later)
  const wards = [
    { id: 'ward-1', wardNumber: 1, name: 'Fatehgunj' },
    { id: 'ward-2', wardNumber: 2, name: 'Alkapuri' },
    { id: 'ward-3', wardNumber: 3, name: 'Sayajigunj' },
    { id: 'ward-4', wardNumber: 4, name: 'Manjalpur' },
    { id: 'ward-5', wardNumber: 5, name: 'Gotri' },
  ];

  const zones = [
    { id: 'zone-1', name: 'North Zone' },
    { id: 'zone-2', name: 'South Zone' },
    { id: 'zone-3', name: 'East Zone' },
    { id: 'zone-4', name: 'West Zone' },
  ];

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    }
  }, [activeTab]);

  const loadDashboardData = async () => {
    try {
      const stats = await offlineStorage.getStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      
      if (response.success && response.data) {
        setUsers(response.data);
      } else {
        console.error('Failed to load users:', response.message);
        // Fallback to empty array
        setUsers([]);
      }
    } catch (error) {
      console.error('Error loading users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const loadUserStatistics = async (userId: string) => {
    try {
      const response = await getUserStatistics(userId);
      
      if (response.success && response.data) {
        setUserStats(response.data);
      }
    } catch (error) {
      console.error('Error loading user statistics:', error);
    }
  };

  // Event handlers
  const handleViewUser = async (user: User) => {
    setSelectedUser(user);
    setUserStats(null);
    setShowProfileView(true);
    await loadUserStatistics(user.id);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleReassignUser = (user: User) => {
    setSelectedUser(user);
    setShowReassignModal(true);
  };

  const handleDeactivateUser = (user: User) => {
    setSelectedUser(user);
    setDeactivationAction('deactivate');
    setShowDeactivateModal(true);
  };

  const handleReactivateUser = (user: User) => {
    setSelectedUser(user);
    setDeactivationAction('reactivate');
    setShowDeactivateModal(true);
  };

  const handleUserUpdated = (updatedUser: User) => {
    // Update the user in the list
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    loadUsers(); // Reload to get fresh data
  };

  const handleReassignmentSuccess = () => {
    loadUsers(); // Reload users after reassignment
  };

  const handleDeactivationSuccess = () => {
    loadUsers(); // Reload users after deactivation/reactivation
  };

  const handleNeedReassignment = () => {
    setShowDeactivateModal(false);
    setShowReassignModal(true);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Issues" value={statistics.total.toString()} icon={<FileText className="w-6 h-6" />} color="blue" />
        <StatCard title="Active Users" value={users.filter(u => u.isActive).length.toString()} icon={<Users className="w-6 h-6" />} color="emerald" />
        <StatCard title="SLA Performance" value={`${statistics.resolutionRate}%`} icon={<TrendingUp className="w-6 h-6" />} color="purple" />
        <StatCard title="Critical Issues" value="12" icon={<AlertTriangle className="w-6 h-6" />} color="red" />
      </div>

      {/* Geographic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Zone Performance</h3>
          <div className="space-y-3">
            {['Zone A', 'Zone B', 'Zone C', 'Zone D'].map((zone, i) => (
              <div key={zone} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">{zone}</span>
                <div className="flex gap-4 text-sm">
                  <span className="text-orange-600">{25 + i * 5} Open</span>
                  <span className="text-green-600">{85 + i * 2}% SLA</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Issue Heatmap</h3>
          <div className="h-64">
            <BaseMap heatmap={true} />
          </div>
        </Card>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <UserManagementTable
        users={users}
        loading={loading}
        onView={handleViewUser}
        onEdit={handleEditUser}
        onReassign={handleReassignUser}
        onDeactivate={handleDeactivateUser}
        onReactivate={handleReactivateUser}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header showNavigation={true} />
      
      <main className="flex-1 p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Super Admin Dashboard</h1>
              <p className="text-gray-600">Complete system oversight and management</p>
            </div>
          </div>
          
          <div className="flex gap-4 border-b">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`pb-2 px-1 ${activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('users')} 
              className={`pb-2 px-1 ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              User Management
            </button>
            <button 
              onClick={() => setActiveTab('sla')} 
              className={`pb-2 px-1 ${activeTab === 'sla' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              SLA Monitoring
            </button>
            <button 
              onClick={() => setActiveTab('communication')} 
              className={`pb-2 px-1 ${activeTab === 'communication' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              Communications
            </button>
            <button 
              onClick={() => setActiveTab('analytics')} 
              className={`pb-2 px-1 ${activeTab === 'analytics' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              Advanced Analytics
            </button>
          </div>
        </div>

        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUserManagement()}
        {activeTab === 'sla' && <SLAMonitoring />}
        {activeTab === 'communication' && <CommunicationHub />}
        {activeTab === 'analytics' && <AdvancedAnalytics />}
      </main>

      {/* Modals */}
      {showProfileView && selectedUser && (
        <UserProfileView
          user={selectedUser}
          statistics={userStats || undefined}
          onClose={() => { setShowProfileView(false); setSelectedUser(null); setUserStats(null); }}
          onEdit={() => { setShowProfileView(false); setShowEditModal(true); }}
          onReassign={() => { setShowProfileView(false); setShowReassignModal(true); }}
          onDeactivate={() => { setShowProfileView(false); handleDeactivateUser(selectedUser); }}
          onReactivate={() => { setShowProfileView(false); handleReactivateUser(selectedUser); }}
        />
      )}

      {showEditModal && selectedUser && (
        <UserEditModal
          user={selectedUser}
          wards={wards}
          zones={zones}
          onClose={() => { setShowEditModal(false); setSelectedUser(null); }}
          onSuccess={handleUserUpdated}
        />
      )}

      {showReassignModal && selectedUser && (
        <ReassignmentModal
          user={selectedUser}
          onClose={() => { setShowReassignModal(false); setSelectedUser(null); }}
          onSuccess={handleReassignmentSuccess}
        />
      )}

      {showDeactivateModal && selectedUser && (
        <DeactivationConfirmation
          user={selectedUser}
          action={deactivationAction}
          onClose={() => { setShowDeactivateModal(false); setSelectedUser(null); }}
          onSuccess={handleDeactivationSuccess}
          onNeedReassignment={handleNeedReassignment}
        />
      )}
    </div>
  );
}
