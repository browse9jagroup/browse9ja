import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

function normWA(v:string){ const x=v.trim().replace(/[\s()-]/g,''); if(!x) return ''; if(x.startsWith('+')) return x; if(x.startsWith('0')) return '+234'+x.slice(1); if(x.startsWith('234')) return '+'+x; return x; }

export default function ContribNew() {
  const [f,setF] = useState({ name:'', category:'', city:'', phone:'', whatsapp:'', website:'', description:'', cac_rc_bn:'' });
  const [ok,setOk] = useState(''); const [err,setErr] = useState('');

  const submit = async (e:React.FormEvent) => {
    e.preventDefault(); setErr(''); setOk('');
    const { data: { user } } = await supabase.auth.getUser();
    if(!user){ window.location.href='/contribute/login'; return; }

    const payload:any = { ...f, whatsapp: normWA(f.whatsapp) || null };
    // Stamp the user_id client-side (also set on server via policy/trigger below is optional)
    (payload as any).user_id = user.id;

    const { error } = await supabase.from('business_submissions').insert([payload]);
    if(error) setErr(error.message); else { setOk('Saved!'); setF({ name:'', category:'', city:'', phone:'', whatsapp:'', website:'', description:'', cac_rc_bn:'' }); }
  };

  return (
    <main style={{maxWidth:720, margin:'40px auto', padding:'0 16px'}}>
      <h1>Add a Business</h1>
      <form onSubmit={submit} style={{display:'grid', gap:12}}>
        <input required placeholder="Name" value={f.name} onChange={e=>setF({...f, name:e.target.value})}/>
        <input placeholder="Category" value={f.category} onChange={e=>setF({...f, category:e.target.value})}/>
        <input placeholder="City" value={f.city} onChange={e=>setF({...f, city:e.target.value})}/>
        <input placeholder="Phone" value={f.phone} onChange={e=>setF({...f, phone:e.target.value})}/>
        <input placeholder="WhatsApp" value={f.whatsapp} onChange={e=>setF({...f, whatsapp:e.target.value})}/>
        <input placeholder="Website (https://…)" value={f.website} onChange={e=>setF({...f, website:e.target.value})}/>
        <input placeholder="CAC RC/BN" value={f.cac_rc_bn} onChange={e=>setF({...f, cac_rc_bn:e.target.value})}/>
        <textarea placeholder="Short description" value={f.description} onChange={e=>setF({...f, description:e.target.value})}/>
        <button type="submit">Save</button>
      </form>
      {ok && <p style={{color:'green'}}>{ok}</p>}
      {err && <p style={{color:'crimson'}}>⚠️ {err}</p>}
    </main>
  );
}