import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Claim() {
  const [f, setF] = useState({
    business_id: "", claimed_business_name: "",
    applicant_name: "", email: "", whatsapp: "", proof_url: "", message: ""
  });
  const [ok, setOk] = useState(""); const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setOk(""); setErr("");
    const payload: any = {
      claimed_business_name: f.claimed_business_name.trim(),
      applicant_name: f.applicant_name || null,
      email: f.email || null,
      whatsapp: f.whatsapp || null,
      proof_url: f.proof_url || null,
      message: f.message || null
    };
    if (f.business_id) payload.business_id = Number(f.business_id);

    const { error } = await supabase.from("business_claims").insert([payload]);
    if (error) setErr(error.message);
    else {
      setOk("Claim received. Our team will review and get back to you.");
      setF({ business_id:"", claimed_business_name:"", applicant_name:"", email:"", whatsapp:"", proof_url:"", message:"" });
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-3">Claim a Business</h1>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input placeholder="Existing business ID (optional)" value={f.business_id} onChange={e=>setF({...f, business_id:e.target.value})} className="border rounded p-2"/>
        <input required placeholder="Business name" value={f.claimed_business_name} onChange={e=>setF({...f, claimed_business_name:e.target.value})} className="border rounded p-2"/>
        <input placeholder="Your name" value={f.applicant_name} onChange={e=>setF({...f, applicant_name:e.target.value})} className="border rounded p-2"/>
        <input type="email" placeholder="Email" value={f.email} onChange={e=>setF({...f, email:e.target.value})} className="border rounded p-2"/>
        <input placeholder="WhatsApp" value={f.whatsapp} onChange={e=>setF({...f, whatsapp:e.target.value})} className="border rounded p-2"/>
        <input placeholder="Proof URL (CAC cert / website / drive link)" value={f.proof_url} onChange={e=>setF({...f, proof_url:e.target.value})} className="border rounded p-2"/>
        <textarea placeholder="Message" value={f.message} onChange={e=>setF({...f, message:e.target.value})} className="border rounded p-2 min-h-[120px]"/>
        <button className="bg-black text-white rounded p-2 font-semibold">Submit Claim</button>
      </form>
      {ok && <p className="text-green-700 mt-3">{ok}</p>}
      {err && <p className="text-red-700 mt-3">⚠️ {err}</p>}
    </main>
  );
}