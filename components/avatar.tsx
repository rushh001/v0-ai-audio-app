interface AvatarProps {
  role: "user" | "assistant"
  size?: "sm" | "md" | "lg"
}

export default function Avatar({ role, size = "md" }: AvatarProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-12 h-12 text-lg",
  }

  if (role === "assistant") {
    return (
      <div
        className={`${sizeClasses[size]} rounded-lg bg-primary flex items-center justify-center flex-shrink-0 ring-1 ring-primary/30 animate-scaleIn`}
      >
        <span className="text-primary-foreground font-bold">✧</span>
      </div>
    )
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-secondary border border-accent-thin flex items-center justify-center flex-shrink-0 animate-scaleIn`}
    >
      <span className="text-foreground font-semibold">U</span>
    </div>
  )
}
