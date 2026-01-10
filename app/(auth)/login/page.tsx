"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HardHat, Building2, Shield, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type UserRole = "FIELD_WORKER" | "WARD_ENGINEER" | "ZONE_OFFICER" | "SUPER_ADMIN" | null;

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const roleInfo = {
    FIELD_WORKER: {
      title: t('role.field.worker'),
      icon: <HardHat className="w-8 h-8" />,
      description: t('role.field.worker.desc')
    },
    WARD_ENGINEER: {
      title: t('role.ward.engineer'),
      icon: <Building2 className="w-8 h-8" />,
      description: t('role.ward.engineer.desc')
    },
    ZONE_OFFICER: {
      title: t('role.zone.officer'),
      icon: <Image src="/VMC.webp" alt="VMC" width={32} height={32} className="w-8 h-8 object-contain" />,
      description: t('role.zone.officer.desc')
    },
    SUPER_ADMIN: {
      title: t('role.admin'),
      icon: <Shield className="w-8 h-8" />,
      description: t('role.admin.desc')
    }
  };

  function handleRoleSelect(role: UserRole) {
    setSelectedRole(role);
    setCredentials({ username: "", password: "" });
  }

  function handleFormLogin(e: React.FormEvent) {
    e.preventDefault();
    if (selectedRole) {
      localStorage.setItem("role", selectedRole);
      localStorage.setItem("employeeId", credentials.username || "DEMO_USER");
      
      // Route based on role
      switch(selectedRole) {
        case "FIELD_WORKER":
          router.push("/field-worker");
          break;
        case "WARD_ENGINEER":
          router.push("/ward-engineer");
          break;
        case "ZONE_OFFICER":
          router.push("/zone-officer");
          break;
        case "SUPER_ADMIN":
          router.push("/admin");
          break;
        default:
          router.push("/dashboard");
      }
    }
  }

  function handleBack() {
    setSelectedRole(null);
    setCredentials({ username: "", password: "" });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-xl border-2 border-blue-200">
                <Image 
                  src="/VMC.webp" 
                  alt="VMC Logo" 
                  width={48} 
                  height={48} 
                  className="w-12 h-12 object-contain"
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              {t('app.title')}
            </h1>
            <p className="text-gray-600 text-lg">
              {!selectedRole 
                ? t('login.select.role')
                : `${t('login.signin.as')} ${roleInfo[selectedRole].title}`}
            </p>
          </div>

          {!selectedRole ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <RoleCard
                icon={<HardHat className="w-8 h-8" />}
                title={t('role.field.worker')}
                description={t('role.field.worker.desc')}
                onClick={() => handleRoleSelect("FIELD_WORKER")}
                bgColor="bg-yellow-50 border-yellow-200"
              />
              
              <RoleCard
                icon={<Building2 className="w-8 h-8" />}
                title={t('role.ward.engineer')}
                description={t('role.ward.engineer.desc')}
                onClick={() => handleRoleSelect("WARD_ENGINEER")}
                bgColor="bg-gray-100 border-gray-300"
              />
              
              <RoleCard
                icon={<Image src="/VMC.webp" alt="VMC" width={32} height={32} className="w-8 h-8 object-contain" />}
                title={t('role.zone.officer')}
                description={t('role.zone.officer.desc')}
                onClick={() => handleRoleSelect("ZONE_OFFICER")}
                bgColor="bg-white border-gray-200"
              />
              
              <RoleCard
                icon={<Shield className="w-8 h-8" />}
                title={t('role.admin')}
                description={t('role.admin.desc')}
                onClick={() => handleRoleSelect("SUPER_ADMIN")}
                bgColor="bg-yellow-50 border-yellow-200"
              />
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <div className="flex items-center justify-center gap-3 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-blue-600">
                    {roleInfo[selectedRole].icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {roleInfo[selectedRole].title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {roleInfo[selectedRole].description}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleFormLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {t('login.username')}
                    </label>
                    <Input
                      id="username"
                      type="text"
                      placeholder={t('login.username')}
                      value={credentials.username}
                      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      className="bg-white border-gray-300 text-gray-800 placeholder:text-gray-400"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      {t('login.password')}
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t('login.password')}
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        className="bg-white border-gray-300 text-gray-800 placeholder:text-gray-400 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 bg-white text-blue-600" 
                      />
                      {t('login.remember')}
                    </label>
                    <Link 
                      href="/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {t('login.forgot')}
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                  >
                    {t('login.signin')}
                  </Button>

                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors pt-4 border-t border-gray-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t('login.change.role')}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  bgColor?: string;
}

function RoleCard({ icon, title, description, onClick, bgColor = "bg-white border-gray-200" }: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} border rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition-all text-left group`}
    >
      <div className="mb-4 text-blue-600 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600">
        {description}
      </p>
    </button>
  );
}
