"use client";

import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BaseMapProps {
  heatmap?: boolean;
}

export default function BaseMap({ heatmap = false }: BaseMapProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const captureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get location. Please enable GPS.");
        }
      );
    }
  };

  return (
    <div className="relative w-full h-full bg-linear-to-br from-blue-900/20 to-emerald-900/20 flex items-center justify-center">
      {/* Placeholder Map UI */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 text-center space-y-4 p-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 border border-emerald-500/50 rounded-full mb-2">
          <MapPin className="w-8 h-8 text-emerald-400" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {heatmap ? "Heatmap View" : "Interactive Map"}
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            MapMyIndia integration placeholder
          </p>
          
          {location && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 mb-4">
              <p className="text-xs text-slate-300">
                Lat: {location.lat.toFixed(6)}
              </p>
              <p className="text-xs text-slate-300">
                Lng: {location.lng.toFixed(6)}
              </p>
            </div>
          )}
        </div>

        <Button 
          onClick={captureLocation}
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Capture GPS Location
        </Button>
      </div>

      {heatmap && (
        <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3">
          <p className="text-xs text-slate-300 font-semibold mb-2">Issue Density</p>
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded bg-linear-to-r from-yellow-500 to-red-500"></div>
            <span className="text-xs text-slate-400">Low → High</span>
          </div>
        </div>
      )}
    </div>
  );
}
