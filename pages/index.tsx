import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState<null | string>(null);
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    // Create the client only in the browser (no build-time usage)
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    if (!url || !key) {
      setErr("Supabase keys are missing in the environment.");
      return;
    }

    const supabase = createClient(url, key);

    const { error } = await supabase.from("waitlist").insert([{ email }]);
    if (error) setErr(error.message);
    else {
      setOk("Thanks for joining! ✅");
      setEmail("");
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        padding: 16,
      }}
    >
      <div style={{ width: "100%", maxWidth: 600, textAlign: "center" }}>
        <h1 style={{ fontSize: 32, margin: 0, fontWeight: 800 }}>Browse9ja.ng</h1>
        <p style={{ color: "#555", margin: "12px 0 20px" }}>
          Nigeria’s trusted business directory and reviews platform 🚀
        </p>

        <form onSubmit={submit} style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1,
              minWidth: 220,
              padding: "10px 12px",
              border: "1px solid #ccc",
              borderRadius: 6,
              fontSize: 16,
              background: "#fff",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 16px",
              borderRadius: 6,
              border: "none",
              background: "#000",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Join Waitlist
          </button>
        </form>

        {ok && <p style={{ color: "green", marginTop: 12 }}>{ok}</p>}
        {err && <p style={{ color: "crimson", marginTop: 12 }}>⚠️ {err}</p>}
      </div>
    </main>
  );
}