import { useState } from "react";

export default function HomeSimple() {
  const [message, setMessage] = useState("French Verb Master - Working!");

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{message}</h1>
        <button 
          onClick={() => setMessage("Button clicked!")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Button
        </button>
      </div>
    </div>
  );
}