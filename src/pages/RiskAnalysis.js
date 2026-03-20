import { useState } from "react";
import { motion } from "framer-motion";

function RiskAnalysis() {
  const [weather, setWeather] = useState("");
  const [pollution, setPollution] = useState("");
  const [risk, setRisk] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false); // 🔥 for dropdown

  const options = [
    { value: "rain", label: "🌧 Rain" },
    { value: "heat", label: "🔥 Heat" },
    { value: "normal", label: "☀ Normal" }
  ];

  function calculateRisk() {
    console.log("clicked");

    if (!weather || !pollution) {
      setStatus("done");
      setRisk("Error");
      setReason("Please enter all inputs");
      return;
    }

    setStatus("analyzing");

    setTimeout(() => {
      let level = "";
      let reasonText = "";

      if (weather === "rain" && pollution > 150) {
        level = "High";
        reasonText = "🌧 Heavy rain + high pollution";
      } else if (weather === "rain") {
        level = "Medium";
        reasonText = "🌧 Rain expected";
      } else if (pollution > 150) {
        level = "High";
        reasonText = "🌫 Severe pollution levels";
      } else if (weather === "heat") {
        level = "Medium";
        reasonText = "🔥 Extreme heat conditions";
      } else {
        level = "Low";
        reasonText = "☀ Normal conditions";
      }

      setRisk(level);
      setReason(reasonText);
      setStatus("done");
    }, 1200);
  }

  function startVoice() {
    const recognition = new window.webkitSpeechRecognition();
    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase();

      if (text.includes("rain")) setWeather("rain");
      if (text.includes("heat")) setWeather("heat");
    };
  }

  const riskColor =
    risk === "High" ? "#ef4444" :
    risk === "Medium" ? "#f59e0b" :
    risk === "Error" ? "#ef4444" :
    "#10b981";

  return (
    <div className="glass full">
      <h1>AI Risk Analysis</h1>

      {/* INPUT SECTION */}
      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "20px",
        flexWrap: "wrap"
      }}>

        {/* 🔥 WEATHER (CUSTOM DROPDOWN) */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <label>Weather</label><br /><br />

          {/* SELECT BOX */}
          <div
            onClick={() => setOpen(!open)}
            style={{
              padding: "10px",
              width: "200px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <span>
              {weather
                ? options.find(o => o.value === weather)?.label
                : "Select"}
            </span>
            <span>▼</span>
          </div>

          {/* DROPDOWN LIST */}
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: "5px",
                width: "200px",
                borderRadius: "8px",
                background: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                overflow: "hidden",
                position: "relative",
                zIndex: 3
              }}
            >
              {options.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    setWeather(opt.value);
                    setOpen(false);
                  }}
                  style={{
                    padding: "10px",
                    cursor: "pointer"
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* AQI */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <label>AQI</label><br />
          <input
            type="number"
            value={pollution}
            onChange={(e) => setPollution(e.target.value)}
            placeholder="Enter AQI"
            style={inputStyle}
          />
        </div>

        {/* VOICE */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <label>Voice Input</label><br />
          <button onClick={startVoice} className="btn">
            🎤 Speak
          </button>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={calculateRisk}
        className="btn"
        style={{
          marginTop: "20px",
          opacity: (weather && pollution) ? 1 : 0.6
        }}
      >
        Analyze Risk
      </button>

      {/* STATUS */}
      {status === "analyzing" && (
        <div style={statusCard("#f59e0b")}>
          🤖 AI analyzing environmental risk...
        </div>
      )}

      {/* RESULT */}
      {status === "done" && (
        <div style={{
          marginTop: "25px",
          textAlign: "center",
          padding: "30px",
          borderRadius: "14px",
          background: "rgba(99,102,241,0.1)",
          border: "1px solid #6366f1"
        }}>
          <h2>AI Risk Score</h2>

          <h1 style={{
            fontSize: "50px",
            color: riskColor
          }}>
            {risk}
          </h1>

          <p style={{ color: "#94a3b8" }}>{reason}</p>
        </div>
      )}
    </div>
  );
}

/* INPUT STYLE */
const inputStyle = {
  padding: "10px",
  width: "200px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.1)",
  backgroundColor: "#0f172a",
  color: "#e2e8f0"
};

/* STATUS CARD */
const statusCard = (color) => ({
  marginTop: "20px",
  padding: "15px",
  borderRadius: "10px",
  background: `${color}20`,
  border: `1px solid ${color}`
});

export default RiskAnalysis;