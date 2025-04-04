import React from "react";
import { Link } from "react-router-dom";
import '../home/style.css';  // Asegúrate de importar el archivo CSS

const PageHome = () => {
  return (
    <div className="page-home">
      <div className="page-home-content">
        <h1>Bienvenido al Instituto de Arte</h1>
        <p>Descubre las obras maestras de la historia y los artistas que las crearon
          <tr/>Desde el esplendor del Renacimiento hasta las vanguardias modernas.
        </p>
        <Link to="/obras-arte" className="button-container">
        <button className="btn">Conocer más</button>
      </Link>
      </div>
    </div>
  );
};

export default PageHome;
