import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Dock() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  const items = [
  { path: "/", icon: "🏠", label: "Home" },
  { path: "/dashboard", icon: "📊", label: "Dashboard" },
  { path: "/policy", icon: "📄", label: "Policy" },
  { path: "/claims", icon: "💰", label: "Claims" },
  { path: "/risk", icon: "⚡", label: "Risk Analysis" }
];

  return (
    <div className="dock">
      {items.map((item) => (
        <div
          key={item.path}
          onClick={() => navigate(item.path)}
          onMouseEnter={() => setHovered(item.path)}
          onMouseLeave={() => setHovered(null)}
          className={`dock-item ${
            location.pathname === item.path ? "active" : ""
          }`}
        >
          <span className="icon">{item.icon}</span>

          {/* 🔥 ONLY TOOLTIP */}
          {hovered === item.path && (
            <div className="tooltip">{item.label}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dock;