function ProgressBar() {
  return (
    <div style={{ width: "200px", background: "#ddd", height: "10px", borderRadius: "5px" }}>
      <div style={{
        width: "100%",
        height: "10px",
        background: "#2563eb",
        borderRadius: "5px"
      }} />
    </div>
  );
}

export default ProgressBar;