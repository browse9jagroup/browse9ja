// components/Layout.tsx
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Nav */}
      <header className="bg-black text-white">
        <nav className="max-w-6xl mx-auto flex gap-6 p-4 font-semibold">
          <Link href="/">Home</Link>
          <Link href="/browse">Browse</Link>
          <Link href="/contribute">Contribute</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm py-4">
        © {new Date().getFullYear()} Browse9ja.ng. All rights reserved.
      </footer>
    </div>
  );
}