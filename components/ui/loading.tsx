import Image from "next/image";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function Loading({ size = "md", text = "Loading..." }: LoadingProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6">
      <div className="animate-pulse">
        <Image 
          src="/VMC.webp" 
          alt="VMC Logo" 
          width={size === "lg" ? 64 : size === "md" ? 48 : 24}
          height={size === "lg" ? 64 : size === "md" ? 48 : 24}
          className={`${sizeClasses[size]} object-contain animate-bounce`}
        />
      </div>
      {text && (
        <p className="text-sm text-slate-400 animate-pulse">{text}</p>
      )}
    </div>
  );
}