import React from "react";

function Home(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <div style={{ width: "30%", backgroundColor: "#a4a4a4" }}>contacts</div>
      <div style={{ width: "70%", backgroundColor: "#888888" }}>Messages</div>
    </div>
  );
}

export default Home;
