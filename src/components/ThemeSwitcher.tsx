import React, { useState } from "react";

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light"); 

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const containerStyle: React.CSSProperties =
    theme === "light"
      ? {
          backgroundColor: "#f8f9fa",
          color: "#212529",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }
      : {
          backgroundColor: "#212529",
          color: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(255, 255, 255, 0.1)",
        };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: theme === "light" ? "#212529" : "#f8f9fa",
    color: theme === "light" ? "#f8f9fa" : "#212529",
  };

  return (
    <div style={containerStyle}>
      <h2>{theme === "light" ? "Light Theme" : "Dark Theme"}</h2>
      <p>
        This is a simple example of a {theme === "light" ? "light" : "dark"} theme.
      </p>
      <button onClick={toggleTheme} style={buttonStyle}>
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeSwitcher;
