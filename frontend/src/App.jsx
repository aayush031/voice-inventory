import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [inventory, setInventory] = useState([]);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("https://voice-inventory-rd77.onrender.com/api/inventory");
      setInventory(res.data);
    } catch (error) {
      console.error("Error fetching inventory");
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);

      try {
        const res = await axios.post("https://voice-inventory-rd77.onrender.com/api/command", {
          text: transcript
        });

        setResponse(JSON.stringify(res.data, null, 2));
        fetchInventory();
      } catch (err) {
        setResponse("Error processing command");
      }
    };
  };

  const resetInventory = async () => {
    if (window.confirm("Are you sure you want to reset inventory?")) {
      try {
        await axios.delete("https://voice-inventory-rd77.onrender.com/api/reset");
        setResponse("Inventory Reset Successfully");
        fetchInventory();
      } catch (err) {
        setResponse("Error resetting inventory");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4 py-8 sm:px-8">
      <div className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-700/50 bg-slate-900/65 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur sm:p-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">
          Voice Inventory Pro 
        </h1>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Manage inventory with voice commands in a clean, responsive dashboard.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={startListening}
            className="rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            🎤 Start Recording
          </button>

          <button
            onClick={resetInventory}
            className="rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            🔄 Reset Inventory
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-4">
            <p className="mb-2 text-sm font-semibold text-slate-300">You said:</p>
            <p className="min-h-[2rem] text-sm text-slate-200 sm:text-base">{text || "..."}</p>
          </div>

          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-4">
            <p className="mb-2 text-sm font-semibold text-slate-300">Response</p>
            <pre className="max-h-40 overflow-auto whitespace-pre-wrap break-words text-xs text-slate-200 sm:text-sm">
              {response || "..."}
            </pre>
          </div>
        </div>

        <h2 className="mt-8 text-xl font-bold text-slate-100 sm:text-2xl">Current Inventory</h2>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-700/50 bg-slate-900/60">
          <table className="min-w-full text-left text-sm text-slate-200">
            <thead className="bg-slate-800/70 text-xs uppercase tracking-wider text-blue-200">
              <tr>
                <th className="px-4 py-3 sm:px-6">Item</th>
                <th className="px-4 py-3 sm:px-6">Quantity</th>
                <th className="px-4 py-3 sm:px-6">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item._id} className="border-t border-slate-700/60 hover:bg-slate-800/70">
                  <td className="px-4 py-3 font-medium text-slate-100 sm:px-6">{item.name}</td>
                  <td className="px-4 py-3 sm:px-6">{item.quantity}</td>
                  <td className="px-4 py-3 text-slate-300 sm:px-6">{new Date(item.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
