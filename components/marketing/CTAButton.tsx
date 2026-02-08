export default function CTAButton({
  href,
  label,
  variant = "primary",
  size = "md"
}: {
  href: string
  label: string
  variant?: "primary" | "outline"
  size?: "sm" | "md" | "lg"
}) {
  const sizeCls =
    size === "lg"
      ? "px-7 py-4 text-base rounded-2xl"
      : size === "sm"
      ? "px-4 py-2 text-sm rounded-xl"
      : "px-6 py-3 text-sm rounded-2xl"

  const cls =
    variant === "primary"
      ? `inline-flex items-center justify-center font-black text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition-all shadow-lg ${sizeCls}`
      : `inline-flex items-center justify-center font-bold text-gray-200 border border-gray-700 hover:border-gray-500 bg-black/20 transition-colors ${sizeCls}`

  return (
    <a href={href} className={cls} rel={href.startsWith("http") ? "nofollow" : undefined}>
      {label}
    </a>
  )
}
