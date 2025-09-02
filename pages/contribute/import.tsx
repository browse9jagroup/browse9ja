import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { supabase } from '../../lib/supabaseClient';

type Row = {
  name:string; category?:string; city?:string; phone?:string; whatsapp?:string; website?:string; description?:string; cac_rc_bn?:string;
};

function normWA(v?:string){ if(!v) return null; const x=v.trim().replace(/[\s()-]/g,''); if(!x) return null; if(x.startsWith('+')) return x; if(x.startsWith('0')) return '+234'+x.slice(1); if(x.startsWith('234')) return '+'+x; return x; }

export default function ImportCSV() {
  const [user,setUser] = useState<any>(null);
  const [rows,setRows] = useState<Row[]>([]);
  const [log,setLog] = useState<string[]>([]);
  const [busy,setBusy] = useState(false);

  useEffect(()=>{ (async ()=>{
    const { data:{ user } } = await supabase.auth.getUser();
    if(!user){ window.location.href='/contribute/login'; return; }
    setUser(user);
  })(); },[]);

  function onFile(e:any){
    const file = e.target.files?.[0];
    if(!file) return;
    Papa.parse<Row>(file, {
      header:true,
      skipEmptyLines:true,
      complete: (res) => {
        const clean = (res.data || []).map(r => ({
          name: r.name?.trim() || '',
          category: r.category?.trim() || null,
          city: r.city?.trim() || null,
          phone: r.phone?.trim() || null,
          whatsapp: normWA(r.whatsapp),
          website: r.website?.trim() || null,
          description: r.description?.trim() || null,
          cac_rc_bn: r.cac_rc_bn?.trim() || null,
        })).filter(r => r.name);
        setRows(clean);
      }
    });
  }

  async function upload() {
    if(!user || rows.length===0) return;
    setBusy(true); setLog([]);
    const batchSize = 200;
    for(let i=0; i<rows.length; i+=batchSize){
      const slice = rows.slice(i, i+batchSize).map(r => ({...r, user_id: user.id}));
      const { error } = await supabase.from('business_submissions').insert(slice);
      if(error){ setLog(l => [...l, Batch ${i/batchSize+1} error: ${error.message}]); setBusy(false); return; }
      setLog(l => [...l, Uploaded ${Math.min(i+batchSize, rows.length)} / ${rows.length}]);
    }
    setBusy(false);
  }

  return (
    <main style={{maxWidth:900, margin:'24px auto', padding:'0 16px'}}>
      <h1>Bulk Import (CSV)</h1>
      <p>Columns supported: <code>name,category,city,phone,whatsapp,website,description,cac_rc_bn</code></p>
      <input type="file" accept=".csv" onChange={onFile} />
      {rows.length>0 && (
        <>
          <p>Preview: {rows.length} rows</p>
          <button disabled={busy} onClick={upload}>{busy? 'Uploading…' : 'Start Upload'}</button>
          <div style={{marginTop:12, whiteSpace:'pre-line', fontFamily:'monospace'}}>
            {log.map((l,i)=><div key={i}>{l}</div>)}
          </div>
        </>
      )}
    </main>
  );
}