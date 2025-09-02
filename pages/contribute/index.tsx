import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';

type Sub = {
  id:number; name:string; category:string|null; city:string|null;
  phone:string|null; whatsapp:string|null; website:string|null;
  status:string; created_at:string;
};

export default function ContribHome() {
  const [user, setUser] = useState<any>(null);
  const [rows, setRows] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/contribute/login';
        return;
      }
      setUser(user);

      const { data } = await supabase
        .from('business_submissions')
        .select('id,name,category,city,phone,whatsapp,website,status,created_at')
        .order('created_at', { ascending: false });
      setRows(data || []);
      setLoading(false);
    })();
  }, []);

  return (
    <main style={{maxWidth:1100, margin:'24px auto', padding:'0 16px'}}>
      <h1>Contributor Dashboard</h1>
      <div style={{display:'flex', gap:12, margin:'8px 0 20px'}}>
        <Link href="/contribute/new">+ Add Single</Link>
        <Link href="/contribute/import">+ Bulk Import (CSV)</Link>
        <a href="/businesses">View Directory</a>
        <a href="#" onClick={async () => { await supabase.auth.signOut(); window.location.href='/contribute/login'; }}>Sign out</a>
      </div>

      {loading && <p>Loading…</p>}

      <h2>Your Submissions</h2>
      <div style={{display:'grid', gap:10}}>
        {rows.map(r => (
          <div key={r.id} style={{border:'1px solid #ddd', borderRadius:8, padding:12}}>
            <b>{r.name}</b> • {r.category || '-'} • {r.city || '-'} • {r.status}
            <div style={{fontSize:12, color:'#555'}}>Submitted {new Date(r.created_at).toLocaleString()}</div>
          </div>
        ))}
        {(!loading && rows.length === 0) && <p>No submissions yet.</p>}
      </div>
    </main>
  );
}