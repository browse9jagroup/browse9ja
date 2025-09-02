import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(""); const [err, setErr] = useState("");

  const send = async (e:React.FormEvent) => {
    e.preventDefault(); setErr(""); setMsg("");
    const redirect = typeof window !== 'undefined' ? ${window.location.origin}/contribute : undefined;
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirect } });
    if (error) setErr(error.message); else setMsg("Check your email for a sign-in link.");
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-3">Contributor Sign In</h1>
      <form onSubmit={send} className="grid gap-3 max-w-md">
        <input required type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} className="border rounded p-2"/>
        <button className="bg-black text-white rounded p-2 font-semibold">Email me a magic link</button>
      </form>
      {msg && <p className="text-green-700 mt-3">{msg}</p>}
      {err && <p className="text-red-700 mt-3">⚠️ {err}</p>}
      <p className="text-sm mt-3">New here? <a className="underline" href="/contribute/register">Become a contributor</a></p>
    </main>
  );
}