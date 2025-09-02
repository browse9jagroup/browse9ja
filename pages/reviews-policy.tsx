export default function ReviewsPolicy() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Reviews Policy — Browse9ja.ng</h1>
      <p>Last updated: August 2025</p>

      <h2 className="text-xl font-semibold mt-6">Principles</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>Reviews must reflect real experiences. Be honest and respectful.</li>
        <li>Disclose conflicts of interest (employees, agents, competitors).</li>
        <li>No hate speech, threats, harassment, or doxxing.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">Moderation</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>We use automated filters and human review.</li>
        <li>Content may be hidden while under review.</li>
        <li>Businesses have a right of reply; we process valid takedown requests.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">Evidence</h2>
      <p>
        For disputes, we may request proof of service or engagement (e.g., invoice or job ID).
      </p>

      <h2 className="text-xl font-semibold mt-6">Enforcement</h2>
      <p>
        We may remove reviews or suspend accounts that break this policy or applicable law.
        Appeals can be sent to{" "}
        <a className="underline" href="mailto:moderation@browse9ja.ng">moderation@browse9ja.ng</a>.
      </p>
    </main>
  );
}