function Navbar() {
  return (
    <div style={{
      height: "60px",
      background: "#020617",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      borderBottom: "1px solid #1e293b"
    }}>
      <input
        placeholder="Search..."
        style={{
          padding: "8px",
          borderRadius: "8px",
          border: "none",
          width: "250px",
          background: "#1e293b",
          color: "white"
        }}
      />

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        🔔
        <div style={{
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          background: "#6366f1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          H
        </div>
      </div>
    </div>
  );
}

export default Navbar;