import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const normWA = (v:string) => {
    const x = v.trim().replace(/[\s()-]/g,'');
    if (!x) return "";
    if (x.startsWith('+')) return x;
    if (x.startsWith('0')) return '+234' + x.slice(1);
    if (x.startsWith('234')) return '+' + x;
    return x;
  };

  const submit = async (e:React.FormEvent) => {
    e.preventDefault(); setErr(""); setMsg("");
    const redirect = typeof window !== "undefined" ? ${window.location.origin}/contribute : undefined;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirect, data: { full_name: fullName, whatsapp: normWA(whatsapp) } }
    });
    if (error) setErr(error.message);
    else setMsg("Check your email for a sign-in link. You’ll land in your dashboard.");
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-3">
      <h1 className="text-3xl font-bold">Become a Contributor</h1>
      <p>Earn points (+1 per submission, +10 per approval) while helping verify Nigeria’s ecosystem.</p>

      <form onSubmit={submit} className="grid gap-3 max-w-lg">
        <input required placeholder="Full name" value={fullName} onChange={e=>setFullName(e.target.value)} className="border rounded p-2"/>
        <input placeholder="WhatsApp (080… or +234…)" value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} className="border rounded p-2"/>
        <input required type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border rounded p-2"/>
        <button className="bg-black text-white rounded p-2 font-semibold">Register & Get Magic Link</button>
      </form>

      {msg && <p className="text-green-700">{msg}</p>}
      {err && <p className="text-red-700">⚠️ {err}</p>}
      <p className="text-sm">Already registered? <a className="underline" href="/contribute/login">Sign in</a></p>
    </main>
  );
}