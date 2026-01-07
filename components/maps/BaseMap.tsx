"use client";

import { useState } from "react";
import { Navigation } from "lucide-react";
import Image from "next/image";
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
    <div className="relative w-full h-full bg-gray-50 flex items-center justify-center border border-gray-200 rounded-lg">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 text-center space-y-4 p-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-2 border-2 border-blue-200">
          <Image 
            src="/VMC.webp" 
            alt="VMC Logo" 
            width={32} 
            height={32} 
            className="w-8 h-8 object-contain"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {heatmap ? "Issue Heatmap" : "Interactive Map"}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            MapMyIndia integration placeholder
          </p>
          
          {location && (
            <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm">
              <p className="text-xs text-gray-500">
                Lat: {location.lat.toFixed(6)}
              </p>
              <p className="text-xs text-gray-500">
                Lng: {location.lng.toFixed(6)}
              </p>
            </div>
          )}
        </div>

        <Button 
          onClick={captureLocation}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Capture GPS Location
        </Button>
      </div>

      {heatmap && (
        <div className="absolute bottom-4 left-4 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
          <p className="text-xs text-gray-700 font-semibold mb-2">Issue Density</p>
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded bg-gradient-to-r from-yellow-400 to-red-500"></div>
            <span className="text-xs text-gray-600">Low → High</span>
          </div>
        </div>
      )}
    </div>
  );
}
