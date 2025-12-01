import React from "react";
import "./Header.css"; // Crearemos este archivo

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo-container">
        {/* Podrías poner un SVG o una imagen aquí */}
        <h1 className="app-title">GasistaPro</h1>
      </div>
      <p className="app-subtitle">
        Calculadora de Diámetro para Instalaciones de Gas
      </p>
    </header>
  );
};

export default Header;
