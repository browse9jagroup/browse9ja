export default function About() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">About Browse9ja.ng</h1>
      <p>
        Browse9ja is Nigeria’s trusted business directory and reviews platform.
        We’re starting in Abuja, then scaling nationwide, to help people find
        verified startups, service providers, hubs, training centers, jobs,
        grants, and events.
      </p>

      <section>
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p>
          Make it easy to discover legitimate Nigerian businesses and real
          opportunities—while protecting users with moderation, CAC/SMEDAN
          verification, and transparent reviews.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Businesses can be added by owners or community contributors.</li>
          <li>Our team reviews submissions and verifies details where possible.</li>
          <li>Users can leave respectful, authentic reviews per our policy.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Trust & Compliance</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Data protection aligned with Nigeria’s NDPA 2023.</li>
          <li>CAC checks via approved KYB vendors for higher-tier verification.</li>
          <li>Clear Reviews Policy, right-of-reply, and takedowns.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Get Involved</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li><a className="underline" href="/contribute/register">Become a contributor</a> and earn points.</li>
          <li><a className="underline" href="/submit">Submit your business</a> for review.</li>
          <li><a className="underline" href="/claim">Claim your profile</a> if it already exists.</li>
        </ul>
      </section>
    </main>
  );
}