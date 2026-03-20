import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { day: "Mon", earnings: 600, city: 650 },
  { day: "Tue", earnings: 500, city: 600 },
  { day: "Wed", earnings: 700, city: 720 },
  { day: "Thu", earnings: 400, city: 500 },
  { day: "Fri", earnings: 800, city: 850 },
];

function Dashboard() {
  return (
    <motion.div
      className="section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 style={{ marginBottom: "20px" }}>Dashboard</h1>

      {/* 🔥 FULL WIDTH GRID */}
      <div className="bento-grid">

        {/* 🛡 SENTINEL */}
        <motion.div
          className="bento-card blue"
          whileHover={{ scale: 1.03 }}
        >
          <h3>🛡 Sentinel Active</h3>

          <div className="big-icon">⬡</div>

          <p>High Rain Risk Detected</p>
        </motion.div>

        {/* 🤖 TRUST SCORE */}
        <div className="bento-card green">
          <h3>🤖 Trust Score</h3>
          <h1>98%</h1>

          <p>✔ GPS Movement Verified</p>
          <p>✔ Delivery Speed Normal</p>
          <p>✔ Peer Pattern Match</p>
        </div>

        {/* 📊 GRAPH */}
        <div className="bento-card purple">
          <h3>📊 Disruption Proof</h3>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data}>
              <CartesianGrid stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="city" fill="#94a3b8" />
              <Bar dataKey="earnings" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🌍 POOL */}
        <div className="bento-card purple">
          <h3>🌍 Community Pool</h3>
          <h2>₹1,50,000</h2>
          <p>👥 14,250 Workers Protected</p>
          <p>💸 Ravi K. received ₹310</p>
        </div>
      </div>

      {/* 🔥 MINI STATS */}
      <div className="mini-grid">
        <MiniCard title="Users" value="1240" />
        <MiniCard title="Policies" value="890" />
        <MiniCard title="Fraud Alerts" value="12" red />
        <MiniCard title="Risk Level" value="Medium" yellow />
      </div>
    </motion.div>
  );
}

/* MINI CARD */
function MiniCard({ title, value, red, yellow }) {
  return (
    <motion.div
      className="mini-card"
      whileHover={{ scale: 1.08 }}
    >
      <h4>{title}</h4>
      <h2 style={{
        color: red ? "#ef4444" : yellow ? "#f59e0b" : "#6366f1"
      }}>
        {value}
      </h2>
    </motion.div>
  );
}

export default Dashboard;