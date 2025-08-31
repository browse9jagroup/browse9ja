import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Biz = { id:number; name:string; category?:string|null; city?:string|null; cac_verified?:boolean|null };

export default function BusinessesList() {
  const [items, setItems] = useState<Biz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("businesses")
          .select("id,name,category,city,cac_verified")
          .order("created_at", { ascending: false })
          .limit(50);
        if (!error && data) setItems(data as Biz[]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Browse Businesses</h1>
      {loading && <p>Loading…</p>}
      {!loading && items.length === 0 && (
        <p>No businesses yet. Check back soon!</p>
      )}
      <div className="grid gap-3">
        {items.map(b => (
          <a key={b.id} href={/business/${b.id}} className="block border rounded p-3 hover:bg-gray-50">
            <div className="flex justify-between">
              <div>
                <b>{b.name}</b> {b.cac_verified ? "✅" : ""}
                <div className="text-sm text-gray-600">
                  {[b.category, b.city].filter(Boolean).join(" • ")}
                </div>
              </div>
              <span className="text-sm underline">View →</span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}