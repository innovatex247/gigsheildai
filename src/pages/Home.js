import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* HERO */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1>Protect Your Income with GigShield AI</h1>

        <p>
          Real-time AI protection for delivery partners against weather,
          disruptions, and unpredictable income loss.
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="btn"
          onClick={() => navigate("/dashboard")}
        >
          View Dashboard →
        </motion.button>
      </motion.div>

      {/* STORY FLOW */}
      <div className="story">

        <Section text="🚴 You work daily, but earnings are never guaranteed." />

        <Section text="🌧 Rain, heat, or pollution silently reduce your income." />

        <Section text="📉 Losses happen — but there’s no instant support system." />

        <Section text="🤖 GigShield AI predicts risks before they impact you." />

        <Section text="💰 Get compensated instantly when disruptions are verified." />

      </div>

    </div>
  );
}

function Section({ text }) {
  return (
    <motion.div
      className="story-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2>{text}</h2>
    </motion.div>
  );
}

export default Home;