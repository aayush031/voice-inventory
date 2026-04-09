import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [inventory, setInventory] = useState([]);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("https://voice-inventory-pro.onrender.com/api/inventory");
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
        const res = await axios.post("https://voice-inventory-pro.onrender.com/api/command", {
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
        await axios.delete("https://voice-inventory-pro.onrender.com/api/reset");
        setResponse("Inventory Reset Successfully");
        fetchInventory();
      } catch (err) {
        setResponse("Error resetting inventory");
      }
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Voice Inventory Pro 🚀</h1>

      <button onClick={startListening}>
        🎤 Start Recording
      </button>

      <button
        onClick={resetInventory}
        style={{ marginLeft: 10, backgroundColor: "red", color: "white" }}
      >
        🔄 Reset Inventory
      </button>
              

      <p><strong>You said:</strong> {text}</p>
      <pre>{response}</pre>

      <h2>Current Inventory</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{new Date(item.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
