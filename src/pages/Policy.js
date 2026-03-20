import { useState } from "react";

function Policy() {
  const [selectedPlan, setSelectedPlan] = useState("");

  return (
    <div className="glass">
      <h1>Policy Plans</h1>

      {/* Plans */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <PlanCard
          title="Basic"
          price="₹20 / week"
          desc="Low Risk Coverage"
          selected={selectedPlan}
          setSelected={setSelectedPlan}
        />

        <PlanCard
          title="Moderate"
          price="₹30 / week"
          desc="Medium Risk Coverage"
          selected={selectedPlan}
          setSelected={setSelectedPlan}
        />

        <PlanCard
          title="Premium"
          price="₹50 / week"
          desc="High Risk + Peak Bonus"
          selected={selectedPlan}
          setSelected={setSelectedPlan}
          highlight
        />
      </div>

      {/* Gamification */}
      {selectedPlan && (
        <div style={{
          marginTop: "30px",
          padding: "20px",
          borderRadius: "14px",
          background: "rgba(99,102,241,0.1)",
          border: "1px solid #6366f1",
          textAlign: "center"
        }}>
          <h3>🎉 You selected: {selectedPlan}</h3>

          {/* Progress Bar */}
          <div style={{
            width: "250px",
            height: "10px",
            background: "#1e293b",
            borderRadius: "6px",
            margin: "10px auto"
          }}>
            <div style={{
              width: "100%",
              height: "10px",
              background: "#6366f1",
              borderRadius: "6px"
            }} />
          </div>

          <p>🏆 Badge: Smart Insured Worker</p>
        </div>
      )}
    </div>
  );
}

/* 🔥 Plan Card Component */
function PlanCard({ title, price, desc, selected, setSelected, highlight }) {
  const isSelected = selected === title;

  return (
    <div
      onClick={() => setSelected(title)}
      style={{
        flex: 1,
        padding: "20px",
        borderRadius: "14px",
        background: "rgba(255,255,255,0.05)",
        border: isSelected
          ? "2px solid #6366f1"
          : "1px solid rgba(255,255,255,0.08)",
        cursor: "pointer",
        transition: "0.3s",
        transform: isSelected ? "scale(1.05)" : "scale(1)"
      }}
    >
      <h3 style={{ color: highlight ? "#6366f1" : "#e2e8f0" }}>
        {title}
      </h3>

      <h2 style={{ margin: "10px 0" }}>{price}</h2>

      <p style={{ color: "#94a3b8" }}>✔ {desc}</p>

      <button
        className="btn"
        style={{ marginTop: "10px", width: "100%" }}
      >
        {isSelected ? "Selected" : "Select"}
      </button>
    </div>
  );
}

export default Policy;