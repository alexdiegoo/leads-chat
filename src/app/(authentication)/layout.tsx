import "../globals.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full mx-auto max-w-5xl flex justify-center items-center min-h-screen">
      {children}
    </div>
  )
}
