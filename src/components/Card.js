function Card({ title, value }) {
  return (
    <div style={{ background: "#eee", padding: "20px" }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}


export default Card;