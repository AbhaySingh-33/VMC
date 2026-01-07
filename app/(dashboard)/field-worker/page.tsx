"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BaseMap from "@/components/maps/BaseMap";
import IssueReport from "@/components/IssueReport";
import SavedIssues from "@/components/SavedIssues";
import Header from "@/components/Header";
import { Plus, Camera, List, User, Wifi, WifiOff, RefreshCw } from "lucide-react";
import Image from "next/image";
import { offlineStorage } from "@/lib/offline-storage";
import { useLanguage } from "@/lib/language-context";

export default function FieldWorkerDashboard() {
  const { t } = useLanguage();
  const [isOnline, setIsOnline] = useState(true);
  const [offlineIssues, setOfflineIssues] = useState(0);
  const [draftIssues, setDraftIssues] = useState(0);
  const [showIssueReport, setShowIssueReport] = useState(false);
  const [showSavedIssues, setShowSavedIssues] = useState(false);
  const [todayReported, setTodayReported] = useState(12);
  const [resolved, setResolved] = useState(8);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    loadOfflineData();
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const loadOfflineData = async () => {
    try {
      const pending = await offlineStorage.getPendingIssues();
      const drafts = await offlineStorage.getDraftIssues();
      setOfflineIssues(pending.length);
      setDraftIssues(drafts.length);
    } catch (error) {
      console.error('Error loading offline data:', error);
    }
  };

  const handleIssueReported = () => {
    loadOfflineData();
    setTodayReported(prev => prev + 1);
  };

  const handleQuickPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        alert(t('photo.captured'));
      }
    };
    input.click();
  };

  const handleSync = async () => {
    if (!isOnline) {
      alert(t('network.no.connection'));
      return;
    }
    try {
      alert(t('network.syncing'));
      setTimeout(() => {
        alert(t('network.sync.complete'));
        setOfflineIssues(0);
      }, 2000);
    } catch (error) {
      alert(t('network.sync.error'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header showNavigation={true} />
      
      <main className="flex-1 p-6 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Field Worker Dashboard
                </h1>
                <p className="text-gray-600">Mobile Issue Reporting System</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isOnline 
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                : 'bg-orange-100 text-orange-700 border border-orange-200'
            }`}>
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span className="text-sm font-semibold">
                {isOnline ? 'Online' : 'Offline Mode'}
              </span>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Location Map</h2>
          </div>
          <div className="h-[300px]">
            <BaseMap />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-orange-600 mb-1">{offlineIssues + draftIssues}</p>
            <p className="text-sm text-gray-600">Saved Issues</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-blue-600 mb-1">{todayReported}</p>
            <p className="text-sm text-gray-600">Today's Reports</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-emerald-600 mb-1">{resolved}</p>
            <p className="text-sm text-gray-600">Resolved</p>
          </div>
        </div>

        {/* Main Actions */}
        <div className="space-y-4">
          <Button 
            onClick={() => setShowIssueReport(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-8 rounded-xl text-lg shadow-sm"
          >
            <Plus className="w-6 h-6 mr-3" />
            Report New Issue
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={handleQuickPhoto}
              className="py-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm"
            >
              <Camera className="w-5 h-5 mr-2" />
              Quick Photo
            </Button>
            <Button 
              className="py-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-sm"
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (pos) => alert(`Location: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`),
                    () => alert('Location not available')
                  );
                }
              }}
            >
              <Image 
                src="/VMC.webp" 
                alt="VMC Logo" 
                width={20} 
                height={20} 
                className="w-5 h-5 object-contain mr-2"
              />
              My Location
            </Button>
          </div>
        </div>

        {/* Secondary Actions */}
        {(offlineIssues > 0 || draftIssues > 0) && (
          <Button 
            onClick={() => setShowSavedIssues(true)}
            className="w-full py-6 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-sm"
          >
            <List className="w-5 h-5 mr-2" />
            View Saved Issues ({offlineIssues + draftIssues})
          </Button>
        )}

        <Button 
          onClick={handleSync}
          className="w-full py-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm"
          disabled={!isOnline || offlineIssues === 0}
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          {isOnline 
            ? offlineIssues > 0 
              ? `Sync Now (${offlineIssues})` 
              : 'All Synced'
            : 'Will Sync When Online'
          }
        </Button>
      </main>

      {/* Modals */}
      {showIssueReport && (
        <IssueReport
          onClose={() => setShowIssueReport(false)}
          onSave={handleIssueReported}
        />
      )}

      {showSavedIssues && (
        <SavedIssues
          onClose={() => setShowSavedIssues(false)}
        />
      )}
    </div>
  );
}
