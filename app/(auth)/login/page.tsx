"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, HardHat, Building2, Shield, Navigation, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type UserRole = "FIELD_WORKER" | "WARD_ENGINEER" | "ZONE_OFFICER" | "SUPER_ADMIN" | null;

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const roleInfo = {
    FIELD_WORKER: {
      title: "Field Worker",
      icon: <HardHat className="w-8 h-8" />,
      color: "emerald",
      description: "Report & capture on-ground issues"
    },
    WARD_ENGINEER: {
      title: "Ward Engineer",
      icon: <Building2 className="w-8 h-8" />,
      color: "blue",
      description: "Monitor & verify ward activities"
    },
    ZONE_OFFICER: {
      title: "Zone Officer",
      icon: <MapPin className="w-8 h-8" />,
      color: "indigo",
      description: "Oversee multi-ward operations"
    },
    SUPER_ADMIN: {
      title: "System Admin",
      icon: <Shield className="w-8 h-8" />,
      color: "purple",
      description: "System-wide management"
    }
  };

  function handleRoleSelect(role: UserRole) {
    setSelectedRole(role);
    setCredentials({ username: "", password: "" }); // Reset credentials
  }

  function handleFormLogin(e: React.FormEvent) {
    e.preventDefault();
    if (selectedRole) {
      localStorage.setItem("role", selectedRole);
      router.push("/dashboard");
    }
  }

  function handleBack() {
    setSelectedRole(null);
    setCredentials({ username: "", password: "" });
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-950 via-slate-900 to-emerald-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-5xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-linear-to-br from-emerald-400 to-blue-500 p-4 rounded-2xl shadow-lg shadow-emerald-500/20">
              <Navigation className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            VMC Civic Portal
          </h1>
          <p className="text-slate-300 text-lg">
            {!selectedRole 
              ? "Select your role to continue"
              : `Sign in as ${roleInfo[selectedRole].title}`}
          </p>
        </div>

        {!selectedRole ? (
          /* Step 1: Role Selection */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <RoleCard
                icon={<HardHat className="w-8 h-8" />}
                title="Field Worker"
                description="Report & capture on-ground issues"
                color="emerald"
                onClick={() => handleRoleSelect("FIELD_WORKER")}
              />
              
              <RoleCard
                icon={<Building2 className="w-8 h-8" />}
                title="Ward Engineer"
                description="Monitor & verify ward activities"
                color="blue"
                onClick={() => handleRoleSelect("WARD_ENGINEER")}
              />
              
              <RoleCard
                icon={<MapPin className="w-8 h-8" />}
                title="Zone Officer"
                description="Oversee multi-ward operations"
                color="indigo"
                onClick={() => handleRoleSelect("ZONE_OFFICER")}
              />
              
              <RoleCard
                icon={<Shield className="w-8 h-8" />}
                title="Admin"
                description="System-wide management"
                color="purple"
                onClick={() => handleRoleSelect("SUPER_ADMIN")}
              />
            </div>
          </>
        ) : (
          /* Step 2: Login Form for Selected Role */
          <div className="max-w-md mx-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
              {/* Role Badge */}
              <div className="flex items-center justify-center gap-3 mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className={`text-${roleInfo[selectedRole].color}-400`}>
                  {roleInfo[selectedRole].icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {roleInfo[selectedRole].title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {roleInfo[selectedRole].description}
                  </p>
                </div>
              </div>

              <form onSubmit={handleFormLogin} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-slate-200 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Username or Employee ID
                  </label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20"
                    required
                    autoFocus
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-slate-200 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-white/20 bg-white/10 text-emerald-500 focus:ring-emerald-500/20" 
                    />
                    Remember me
                  </label>
                  <button type="button" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                    Forgot password?
                  </button>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-emerald-500/40 hover:scale-105"
                >
                  Sign In
                </Button>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white transition-colors pt-4 border-t border-white/10"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Change Role
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">
              Offline-first PWA • GPS mandatory for field operations
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "emerald" | "blue" | "indigo" | "purple";
  onClick: () => void;
}

function RoleCard({ icon, title, description, color, onClick }: RoleCardProps) {
  const colorClasses = {
    emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 hover:border-emerald-400/50 text-emerald-400 hover:shadow-emerald-500/20",
    blue: "from-blue-500/20 to-blue-600/10 border-blue-500/30 hover:border-blue-400/50 text-blue-400 hover:shadow-blue-500/20",
    indigo: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 hover:border-indigo-400/50 text-indigo-400 hover:shadow-indigo-500/20",
    purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30 hover:border-purple-400/50 text-purple-400 hover:shadow-purple-500/20",
  };

  return (
    <button
      onClick={onClick}
      className={`
        group relative bg-linear-to-br ${colorClasses[color]}
        backdrop-blur-sm border rounded-2xl p-6
        hover:scale-105 transition-all duration-300 hover:shadow-2xl
        text-left
      `}
    >
      <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-300">
        {description}
      </p>
      
      {/* Hover indicator */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
    </button>
  );
}
