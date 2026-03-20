import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

function Claims() {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [payout, setPayout] = useState(null);
  const [reason, setReason] = useState("");

  const dropdownRef = useRef();

  const options = [
    { value: "rain", label: "🌧 Heavy Rain" },
    { value: "pollution", label: "🌫 High Pollution" },
    { value: "heat", label: "🔥 Extreme Heat" },
    { value: "curfew", label: "🚫 Curfew" }
  ];

  /* 🔥 CLOSE DROPDOWN ON OUTSIDE CLICK */
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleApply() {
    console.log("clicked");

    if (!selected) {
      setStatus("rejected");
      setReason("Please select a disruption first");
      return;
    }

    setStatus("verifying");
    setPayout(null);

    setTimeout(() => {
      const isValid = selected !== "curfew";

      if (!isValid) {
        setStatus("rejected");
        setReason("No matching disruption detected in your area");
        return;
      }

      const weeklyIncome = 4200;
      const hourlyIncome = (weeklyIncome / 7) / 8;

      let hoursLost = 0;
      let reasonText = "";

      if (selected === "rain") {
        hoursLost = 3;
        reasonText = "🌧 Heavy Rain Verified";
      } else if (selected === "pollution") {
        hoursLost = 2;
        reasonText = "🌫 High Pollution Verified";
      } else if (selected === "heat") {
        hoursLost = 4;
        reasonText = "🔥 Extreme Heat Verified";
      }

      let loss = hourlyIncome * hoursLost;
      loss *= 2;

      setReason(reasonText);
      setPayout(loss);
      setStatus("approved");
    }, 1500);
  }

  return (
    <motion.div
      className="glass full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}

      style={{ position: "relative", zIndex: 2 }}
    >
      <h1>Claims</h1>

      {/* 🔥 DROPDOWN */}
      <div
        ref={dropdownRef}
        style={{
          marginTop: "20px",
          position: "relative",
          zIndex: 999
        }}
      >
        <label>Select Disruption</label><br /><br />

        {/* SELECT BOX */}
        <div
          onClick={() => setOpen(prev => !prev)}
          className="dropdown"
        >
          <span>
            {selected
              ? options.find(o => o.value === selected)?.label
              : "Choose option"}
          </span>

          {/* 🔥 ROTATING ARROW */}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.span>
        </div>

        {/* 🔥 DROPDOWN LIST */}
        {open && (
  <motion.div
    className="dropdown-list"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2 }}
    exit={{ opacity: 0 }}
    style={{
      position: "relative",
      top: "110%",          // slightly below
      left: 0,
      zIndex: 1,
      width: "240px"
    }}
  >
    {options.map((opt) => (
      <div
        key={opt.value}
        onClick={() => {
          setSelected(opt.value);
          setOpen(false);
        }}
        className="dropdown-item"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span>{opt.label}</span>

        {selected === opt.value && (
          <span style={{ color: "#22c55e" }}>✔</span>
        )}
      </div>
    ))}
  </motion.div>
)}
      </div>

      {/* BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleApply}
        className="btn"
        style={{
          marginTop: "20px",
          opacity: selected ? 1 : 0.6
        }}
      >
        Apply Claim
      </motion.button>

      {/* VERIFYING */}
      {status === "verifying" && (
        <div className="loading-text">Processing...</div>
      )}

      {/* REJECTED */}
      {status === "rejected" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={statusCard("#ef4444")}
        >
          ❌ {reason}
        </motion.div>
      )}

      {/* APPROVED */}
      {status === "approved" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            marginTop: "20px",
            padding: "25px",
            borderRadius: "14px",
            background: "rgba(34,197,94,0.1)",
            border: "1px solid #22c55e",
            textAlign: "center"
          }}
        >
          <h3>{reason}</h3>
          <h1 style={{ color: "#22c55e" }}>₹{payout}</h1>
          <p style={{ color: "#94a3b8" }}>
            ✅ Approved & Sent via UPI
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

/* STATUS CARD */
const statusCard = (color) => ({
  marginTop: "20px",
  padding: "15px",
  borderRadius: "10px",
  background: `${color}20`,
  border: `1px solid ${color}`
});

export default Claims;