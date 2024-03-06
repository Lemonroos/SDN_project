import React from "react";

const AppFooter = () => {
  return (
    <footer
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "20px 0",
        position: "fixed",
        bottom: "0",
        width: "100%",
        borderTop: "3px solid #f8f9fa",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "1.5em",
              marginBottom: "0.5em",
              color: "#f8f9fa",
            }}
          >
            HomeTalk
          </h3>
          <p style={{ margin: "0", color: "#ddd" }}>
            Details about your project...
          </p>
        </div>
        <div>
          <p style={{ margin: "0", color: "#ddd" }}>
            © 2024 HomeTalk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
