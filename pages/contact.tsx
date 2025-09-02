import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [ok, setOk] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const onChange = (k: string, v: string) => setForm({ ...form, [k]: v });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOk(""); setErr("");

    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErr("Please fill in your name, email, and message.");
      return;
    }

    const { error } = await supabase.from("contact_messages").insert([{
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject?.trim() || null,
      message: form.message.trim(),
    }]);

    if (error) setErr(error.message);
    else {
      setOk("Thanks! We received your message and will reply soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-4">
        Questions, partnerships, or feedback? Send us a note.
      </p>

      <form onSubmit={onSubmit} className="grid gap-3">
        <input
          className="border rounded p-2"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
        <input
          className="border rounded p-2"
          placeholder="Your email"
          type="email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        <input
          className="border rounded p-2"
          placeholder="Subject (optional)"
          value={form.subject}
          onChange={(e) => onChange("subject", e.target.value)}
        />
        <textarea
          className="border rounded p-2 min-h-[140px]"
          placeholder="Your message"
          value={form.message}
          onChange={(e) => onChange("message", e.target.value)}
          required
        />

        <button type="submit" className="bg-black text-white font-semibold rounded p-2">
          Send Message
        </button>
      </form>

      {ok && <p className="text-green-700 mt-3">{ok}</p>}
      {err && <p className="text-red-700 mt-3">⚠️ {err}</p>}

      <div className="mt-6 text-sm text-gray-600">
        Or email us:{" "}
        <a className="underline" href="mailto:support@browse9ja.ng">support@browse9ja.ng</a>
      </div>
    </main>
  );
}