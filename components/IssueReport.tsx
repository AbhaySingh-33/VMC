"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, Save, Send, X, CheckCircle, Lightbulb } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { offlineStorage, CivicIssue } from "@/lib/offline-storage";
import { aiSuggestions, AIAnalysis } from "@/lib/ai-suggestions";
import { useLanguage } from "@/lib/language-context";

interface IssueReportProps {
  onClose: () => void;
  onSave: () => void;
}

const ISSUE_TYPES = [
  { id: "pothole", icon: "🕳️" },
  { id: "garbage", icon: "🗑️" },
  { id: "drainage", icon: "🌊" },
  { id: "streetlight", icon: "💡" },
  { id: "road", icon: "🛣️" },
  { id: "water", icon: "💧" },
];

export default function IssueReport({ onClose, onSave }: IssueReportProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [description, setDescription] = useState("");
  const [isCapturingLocation, setIsCapturingLocation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [ward, setWard] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    offlineStorage.initializeWards();
  }, []);

  useEffect(() => {
    if (selectedType || photos.length > 0) {
      const analysis = aiSuggestions.analyzeIssue(
        photos[0], 
        location || undefined, 
        selectedType
      );
      setAiAnalysis(analysis);
    }
  }, [selectedType, photos, location]);

  const captureLocation = () => {
    setIsCapturingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          
          const detectedWard = await offlineStorage.getWardByLocation(
            newLocation.lat, 
            newLocation.lng
          );
          setWard(detectedWard?.name || "Unknown Ward");
          
          setIsCapturingLocation(false);
        },
        (error) => {
          console.error("Location error:", error);
          alert(t('issue.location.error'));
          setIsCapturingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  };

  const handlePhotoCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setPhotos([...photos, base64]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSave = async (asDraft = false) => {
    if (!selectedType || !location) {
      alert(t('issue.fill.required'));
      return;
    }

    setIsSaving(true);
    
    try {
      const issue: Omit<CivicIssue, 'id'> = {
        type: selectedType,
        description: description || aiAnalysis?.description || "No description provided",
        location,
        ward: ward || "Unknown Ward",
        photos,
        timestamp: new Date(),
        reportedBy: "Field Worker",
        status: asDraft ? 'draft' : 'pending_sync',
        priority: aiAnalysis?.priority || 'medium',
        aiSuggestion: aiAnalysis?.description
      };

      await offlineStorage.saveIssue(issue);
      
      alert(asDraft ? t('issue.saved.draft') : t('issue.reported.success'));
      
      onSave();
      onClose();
    } catch (error) {
      console.error("Save error:", error);
      alert(t('issue.save.error'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700 max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              {t('issue.report.title')}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= num ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400'
                }`}
              >
                {step > num ? <CheckCircle className="w-4 h-4" /> : num}
              </div>
            ))}
          </div>

          {/* Step 1: Issue Type */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                {t('issue.select.type')}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {ISSUE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedType === type.id
                        ? 'border-emerald-500 bg-emerald-600/20'
                        : 'border-slate-600 bg-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="text-sm font-medium text-white text-center">
                      {t(`issue.type.${type.id}`)}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* AI Suggestion */}
              {aiAnalysis && selectedType && (
                <div className="bg-blue-600/20 border border-blue-500 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-1">
                        {t('issue.ai.suggestion')}
                      </h4>
                      <p className="text-xs text-slate-300">
                        {aiAnalysis.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded ${aiSuggestions.getPriorityColor(aiAnalysis.priority)}`}>
                          {aiAnalysis.priority.toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-400">
                          {t('issue.estimated.time')}: {aiAnalysis.estimatedResolutionTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedType}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                {t('next')}
              </Button>
            </div>
          )}

          {/* Step 2: Location & Photos */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                {t('issue.location.photos')}
              </h3>
              
              {/* Location */}
              <div className="space-y-2">
                <Button
                  onClick={captureLocation}
                  disabled={isCapturingLocation}
                  className={`w-full ${
                    location ? 'bg-emerald-600' : 'bg-blue-600'
                  } hover:opacity-90`}
                >
                  <Image 
                    src="/VMC.webp" 
                    alt="VMC Logo" 
                    width={16} 
                    height={16} 
                    className="w-4 h-4 object-contain mr-2"
                  />
                  {isCapturingLocation 
                    ? t('issue.getting.location')
                    : location 
                    ? t('issue.location.captured')
                    : t('issue.get.location')
                  }
                </Button>
                {location && ward && (
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <div className="text-xs text-slate-400">
                      📍 {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                    </div>
                    <div className="text-sm text-emerald-400 font-medium">
                      🏛️ {ward}
                    </div>
                  </div>
                )}
              </div>

              {/* Photos */}
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoCapture}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full border-slate-600 bg-slate-700 text-white hover:bg-slate-600"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {t('issue.take.photo')} ({photos.length})
                </Button>
                
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-20 object-cover rounded border border-slate-600"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-slate-600 bg-slate-700 text-white"
                >
                  {t('back')}
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!location}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  {t('next')}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Description & Submit */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                {t('issue.description.submit')}
              </h3>
              
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={aiAnalysis?.description || t('issue.description.optional')}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 resize-none"
                rows={3}
              />

              {/* AI Analysis Summary */}
              {aiAnalysis && (
                <div className="bg-slate-700 p-4 rounded-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-semibold text-blue-400">
                      {t('issue.ai.suggestion')}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300">
                    {aiAnalysis.description}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${aiSuggestions.getPriorityColor(aiAnalysis.priority)}`}>
                      {t('issue.priority')}: {aiAnalysis.priority.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-400">
                      {t('issue.estimated.time')}: {aiAnalysis.estimatedResolutionTime}
                    </span>
                  </div>
                </div>
              )}

              {/* Summary */}
              <div className="bg-slate-700 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {ISSUE_TYPES.find(t => t.id === selectedType)?.icon}
                  </span>
                  <span className="text-white font-medium">
                    {t(`issue.type.${selectedType}`)}
                  </span>
                </div>
                <div className="text-sm text-slate-400">
                  📍 {t('issue.location')}: {location ? "Captured" : "Not captured"}
                </div>
                <div className="text-sm text-slate-400">
                  📷 {t('issue.photos')}: {photos.length}
                </div>
                {ward && (
                  <div className="text-sm text-emerald-400">
                    🏛️ {t('issue.ward')}: {ward}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1 border-slate-600 bg-slate-700 text-white"
                >
                  {t('back')}
                </Button>
                <Button
                  onClick={() => handleSave(true)}
                  disabled={isSaving}
                  variant="outline"
                  className="flex-1 border-blue-600 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                >
                  <Save className="w-4 h-4 mr-1" />
                  {t('draft')}
                </Button>
                <Button
                  onClick={() => handleSave(false)}
                  disabled={isSaving}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  <Send className="w-4 h-4 mr-1" />
                  {isSaving ? (
                    <Image 
                      src="/VMC.webp" 
                      alt="Loading" 
                      width={12} 
                      height={12} 
                      className="w-3 h-3 object-contain animate-pulse"
                    />
                  ) : t('send')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}