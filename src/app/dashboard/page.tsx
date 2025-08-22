import React from 'react';

export default function DashboardPage() {
  return (
    <>
      <section className="planet-card">
        <header className="planet-head">
          <span className="tag">PLANETA ACTIVO</span>
          <h3>Planeta Inti – Ciencia</h3>
        </header>

        <div className="planet-content">
          <div className="hp">
            <div className="hp-top">
              <span>HP (Puntos de Habilidad)</span>
              <b>85 / 100</b>
            </div>
            <div className="hp-bar">
              <div className="hp-fill" style={{ width: '85%' }}></div>
              <span className="spark" aria-hidden="true"></span>
            </div>
          </div>

          <div className="skills">
            <button className="pill">🧠 Tejido Lógico</button>
            <button className="pill">🧬 Bio-estructuras</button>
            <button className="pill">🎨 Mente Creativa</button>
          </div>
        </div>
      </section>

      <div className="hero-bubble">Videojuegos vocacionales</div>
    </>
  );
}
