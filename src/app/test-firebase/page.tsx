"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";

export default function TestFirebase() {
  const [docs, setDocs] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      // login anónimo para pasar reglas de Firestore
      await signInAnonymously(auth);

      // agrega un documento de prueba
      await addDoc(collection(db, "planetas"), {
        nombre: "Machu",
        likes: Math.floor(Math.random() * 100),
        ts: Date.now(),
      });

      // lee todos los documentos
      const snap = await getDocs(collection(db, "planetas"));
      setDocs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    })();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Test Firebase</h1>
      <pre className="mt-4 bg-gray-100 p-3 rounded">
        {JSON.stringify(docs, null, 2)}
      </pre>
    </main>
  );
}
