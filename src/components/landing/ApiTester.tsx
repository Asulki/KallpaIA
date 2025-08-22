"use client";
import { useState } from "react";

/**
 * Llama a tu backend:
 * - En DEV:  http://127.0.0.1:5000/api/v1
 * - En PROD: /api/v1   (Firebase Hosting con rewrites a Cloud Run)
 */
const API_BASE =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000/api/v1"
    : "/api/v1";

export function ApiTester() {
  const [resEcho, setResEcho] = useState<any>(null);
  const [resContact, setResContact] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const probarEcho = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/echo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: "hola desde Next.js" }),
      });
      setResEcho(await r.json());
    } catch (e: any) {
      setResEcho({ error: e?.message || "Error" });
    } finally {
      setLoading(false);
    }
  };

  const enviarContacto = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setLoading(true);
    const fd = new FormData(ev.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const r = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setResContact(await r.json());
    } catch (e: any) {
      setResContact({ error: e?.message || "Error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto p-6 my-10 rounded-2xl bg-white/70 shadow">
      <h2 className="text-2xl font-semibold mb-4">Probar backend</h2>

      <div className="mb-6">
        <button
          onClick={probarEcho}
          className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Probar /api/v1/echo"}
        </button>
        <pre className="mt-3 p-3 rounded bg-black text-green-200 overflow-auto">
{JSON.stringify(resEcho, null, 2)}
        </pre>
      </div>

      <form onSubmit={enviarContacto} className="space-y-3">
        <h3 className="text-xl font-medium">Formulario de contacto</h3>
        <input
          name="nombre"
          placeholder="Nombre"
          className="w-full p-2 rounded border"
          required
        />
        <input
          name="correo"
          type="email"
          placeholder="Correo"
          className="w-full p-2 rounded border"
          required
        />
        <textarea
          name="mensaje"
          placeholder="Mensaje"
          className="w-full p-2 rounded border"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar a /api/v1/contact"}
        </button>
      </form>

      <pre className="mt-3 p-3 rounded bg-black text-green-200 overflow-auto">
{JSON.stringify(resContact, null, 2)}
      </pre>
    </section>
  );
}

