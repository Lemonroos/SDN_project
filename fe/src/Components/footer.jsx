import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer
      style={{
        backgroundColor: "#202020", // A dark shade for the footer
        color: "#fff",
        textAlign: "center", // Centers the text
        lineHeight: "15px", // Adjusts the line height for vertical alignment
        position: "fixed", // Fixes the footer to the bottom
        bottom: 0,
        width: "100%",
        zIndex: 10, // Ensures the footer stays above other content
      }}
    >
      © 2024 Life House. All rights reserved.
    </Footer>
  );
};

export default AppFooter;
