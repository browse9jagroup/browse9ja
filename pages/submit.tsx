import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

function normWA(v: string) {
  const x = v.trim().replace(/[\s()-]/g, "");
  if (!x) return "";
  if (x.startsWith("+")) return x;
  if (x.startsWith("0")) return "+234" + x.slice(1);
  if (x.startsWith("234")) return "+" + x;
  return x;
}

export default function Submit() {
  const [f, setF] = useState({
    name: "", category: "", city: "", phone: "", whatsapp: "", website: "",
    submitter_email: "", cac_rc_bn: "", description: ""
  });
  const [ok, setOk] = useState(""); const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setOk(""); setErr("");
    const payload: any = {
      name: f.name.trim(),
      category: f.category || null,
      city: f.city || null,
      phone: f.phone || null,
      whatsapp: normWA(f.whatsapp) || null,
      website: f.website || null,
      submitter_email: f.submitter_email || null,
      cac_rc_bn: f.cac_rc_bn || null,
      description: f.description || null
    };
    const { error } = await supabase.from("business_submissions").insert([payload]);
    if (error) setErr(error.message);
    else {
      setOk("Thanks! Your business was submitted for review.");
      setF({ name:"", category:"", city:"", phone:"", whatsapp:"", website:"", submitter_email:"", cac_rc_bn:"", description:"" });
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-3">Submit a Business</h1>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input required placeholder="Business name" value={f.name} onChange={e=>setF({...f, name:e.target.value})} className="border rounded p-2"/>
        <input placeholder="Category (e.g., Hubs, Dev Shops)" value={f.category} onChange={e=>setF({...f, category:e.target.value})} className="border rounded p-2"/>
        <input placeholder="City (e.g., Abuja)" value={f.city} onChange={e=>setF({...f, city:e.target.value})} className="border rounded p-2"/>
        <input placeholder="Phone" value={f.phone} onChange={e=>setF({...f, phone:e.target.value})} className="border rounded p-2"/>
        <input placeholder="WhatsApp (+234… or 080…)" value={f.whatsapp} onChange={e=>setF({...f, whatsapp:e.target.value})} className="border rounded p-2"/>
        <input placeholder="Website (https://…)" value={f.website} onChange={e=>setF({...f, website:e.target.value})} className="border rounded p-2"/>
        <input type="email" placeholder="Your email (for follow-up)" value={f.submitter_email} onChange={e=>setF({...f, submitter_email:e.target.value})} className="border rounded p-2"/>
        <input placeholder="CAC RC/BN (optional)" value={f.cac_rc_bn} onChange={e=>setF({...f, cac_rc_bn:e.target.value})} className="border rounded p-2"/>
        <textarea placeholder="Short description" value={f.description} onChange={e=>setF({...f, description:e.target.value})} className="border rounded p-2 min-h-[120px]"/>
        <button className="bg-black text-white rounded p-2 font-semibold">Submit for Review</button>
      </form>
      {ok && <p className="text-green-700 mt-3">{ok}</p>}
      {err && <p className="text-red-700 mt-3">⚠️ {err}</p>}
    </main>
  );
}