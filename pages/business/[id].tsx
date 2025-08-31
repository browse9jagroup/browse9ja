import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Biz = {
  id:number; name:string;
  category?:string|null; city?:string|null;
  phone?:string|null; whatsapp?:string|null; website?:string|null;
  description?:string|null; cac_rc_bn?:string|null; cac_verified?:boolean|null;
};

export default function BusinessDetail() {
  const { query } = useRouter();
  const id = Number(query.id);
  const [biz, setBiz] = useState<Biz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data } = await supabase.from("businesses").select("*").eq("id", id).single();
      setBiz((data as Biz) || null);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <main className="max-w-3xl mx-auto p-6">Loading…</main>;
  if (!biz) return <main className="max-w-3xl mx-auto p-6">Not found.</main>;

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-3">
      <a href="/businesses" className="underline">← Back to list</a>
      <h1 className="text-3xl font-bold">
        {biz.name} {biz.cac_verified ? "✅" : ""}
      </h1>
      <div className="text-gray-700">{[biz.category, biz.city].filter(Boolean).join(" • ")}</div>

      <div className="border rounded p-3">
        <div><b>Website:</b> {biz.website ? <a className="underline" href={biz.website} target="_blank" rel="noreferrer">{biz.website}</a> : "-"}</div>
        <div><b>Phone:</b> {biz.phone || "-"}</div>
        <div><b>WhatsApp:</b> {biz.whatsapp || "-"}</div>
        <div><b>CAC #:</b> {biz.cac_rc_bn || "-"}</div>
      </div>

      {biz.description && <p>{biz.description}</p>}

      <div className="flex gap-3">
        <a href="/claim" className="border rounded px-3 py-2">Claim this profile</a>
        <a href="/submit" className="border rounded px-3 py-2">Submit a new business</a>
      </div>
    </main>
  );
}