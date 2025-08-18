import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New signup:", email); // later connect to Supabase
    setSubmitted(true);
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
      <div style={{ maxWidth: "600px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Browse9ja.ng
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#555", marginBottom: "1.5rem" }}>
          Nigeria’s trusted business directory and reviews platform. <br />
          Starting in Abuja, scaling nationwide 🚀
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <input
              type="email"
              required
              placeholder="Enter your email to join waitlist"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", flex: "1" }}
            />
            <button type="submit" style={{ padding: "0.5rem 1rem", borderRadius: "5px", background: "black", color: "white", fontWeight: "600", cursor: "pointer" }}>
              Join Waitlist
            </button>
          </form>
        ) : (
          <p style={{ color: "green", fontWeight: "600", marginTop: "1rem" }}>
            ✅ Thanks for joining! We’ll keep you posted.
          </p>
        )}
      </div>
    </main>
  );
}