import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Dock from "./components/Dock";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Policy from "./pages/Policy";
import Claims from "./pages/Claims";
import RiskAnalysis from "./pages/RiskAnalysis";

/* 🔥 MAIN WRAPPER (handles animations) */
function AppWrapper() {
  const location = useLocation();

  return (
    <div className="app">

      {/* 🔥 NAVBAR */}
      <Navbar />

      {/* 🔥 BACKGROUND */}
      <div className="bg"></div>

      {/* 🔥 CONTENT */}
      <div className="content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />

            <Route
              path="/dashboard"
              element={
                <PageWrapper>
                  <Dashboard />
                </PageWrapper>
              }
            />

            <Route
              path="/policy"
              element={
                <PageWrapper>
                  <Policy />
                </PageWrapper>
              }
            />

            <Route
              path="/claims"
              element={
                <PageWrapper>
                  <Claims />
                </PageWrapper>
              }
            />

            <Route
              path="/risk"
              element={
                <PageWrapper>
                  <RiskAnalysis />
                </PageWrapper>
              }
            />

            {/* 🔥 REDIRECT UNKNOWN ROUTES */}
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </AnimatePresence>
      </div>

      {/* 🔥 DOCK NAVIGATION */}
      <Dock />
    </div>
  );
}

/* 🔥 PAGE TRANSITION WRAPPER */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

/* 🔥 ROOT APP */
function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;