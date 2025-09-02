export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Browse9ja.ng</h1>
      <p className="text-gray-700">
        Nigeria’s trusted business directory & reviews platform. 
        Discover, submit, and review businesses starting in Abuja — scaling nationwide.
      </p>

      {/* 🔗 Navigation Links */}
      <nav className="grid gap-3 mt-6">
        <a href="/about" className="underline">About</a>
        <a href="/contact" className="underline">Contact</a>
        <a href="/privacy" className="underline">Privacy Policy</a>
        <a href="/terms" className="underline">Terms of Use</a>
        <a href="/reviews-policy" className="underline">Reviews Policy</a>

        {/* Contributor links */}
        <a href="/contribute/register" className="underline">Become a Contributor</a>
        <a href="/contribute/login" className="underline">Returning Contributor – Sign in</a>
        <a href="/contribute" className="underline">Contributor Dashboard</a>
        <a href="/contribute/leaderboard" className="underline">Leaderboard</a>

        {/* Businesses */}
        <a href="/businesses" className="underline">Browse Businesses</a>
        <a href="/submit" className="underline">Submit a Business</a>
        <a href="/claim" className="underline">Claim a Business</a>

        {/* Admin (protected later) */}
        <a href="/admin" className="underline">Admin Backend</a>
      </nav>
    </main>
  );
}