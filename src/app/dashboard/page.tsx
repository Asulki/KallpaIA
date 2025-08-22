import React from 'react';

export default function DashboardPage() {
  return (
    <>
      {/* KPIs */}
      <section className="kd-kpis">
        <article className="kpi">
          <h4>Retos completados</h4>
          <div className="val">18</div>
          <span className="trend up">+3 esta semana</span>
        </article>
        <article className="kpi">
          <h4>Racha</h4>
          <div className="val">7 días</div>
          <span className="trend up">+2</span>
        </article>
        <article className="kpi">
          <h4>Puntos Kallpa</h4>
          <div className="val">1,240</div>
          <span className="trend">Objetivo: 1,500</span>
        </article>
        <article className="kpi">
          <h4>Nivel</h4>
          <div className="val">Explorer II</div>
          <span className="trend ok">88% del nivel</span>
        </article>
      </section>

      {/* Charts */}
      <section className="kd-charts">
        <article className="kd-card chart">
          <header className="kd-card__header">
            <h3>Progreso semanal</h3>
            <button className="ghost">Ver todo</button>
          </header>
          <div className="chart-placeholder">[ Chart: líneas / barras ]</div>
        </article>
        <article className="kd-card chart">
          <header className="kd-card__header">
            <h3>Habilidades (Radar)</h3>
            <button className="ghost">Editar metas</button>
          </header>
          <div className="chart-placeholder">[ Chart: radar / spider ]</div>
        </article>
      </section>

      {/* Activity + Tasks + Mentor */}
      <section className="kd-grid-3">
        <article className="kd-card list">
          <header className="kd-card__header"><h3>Actividad reciente</h3></header>
          <ul className="activity">
            <li><span className="dot"></span> Obtuviste la insignia <b>Cripto Novata</b></li>
            <li><span className="dot"></span> Nuevo reto: “Red Team básico”</li>
            <li><span className="dot"></span> Mentora Sofía dejó feedback</li>
          </ul>
        </article>

        <article className="kd-card list">
          <header className="kd-card__header"><h3>Próximos retos</h3></header>
          <ul className="tasks">
            <li><input type="checkbox" id="task1"/> <label htmlFor="task1">SQL Injection 101</label> <small>Mañana</small></li>
            <li><input type="checkbox" id="task2"/> <label htmlFor="task2">CTF mini: contraseñas</label> <small>Vie</small></li>
            <li><input type="checkbox" id="task3"/> <label htmlFor="task3">Quiz de redes</label> <small>Lun</small></li>
          </ul>
          <footer className="kd-card__footer">
            <button className="btn-secondary small">Ver calendario</button>
          </footer>
        </article>

        <article className="kd-card mentor">
          <header className="kd-card__header"><h3>Mentoría</h3></header>
          <div className="mentor-msg">
            <p><b>Sofía:</b> ¡Buen avance! Practica 15 min de OWASP Top 10.</p>
          </div>
          <div className="mentor-actions">
            <button className="btn-primary small">Abrir chat</button>
            <button className="ghost small">Agendar</button>
          </div>
        </article>
      </section>

      {/* Recursos */}
      <section className="kd-resources">
        <article className="res-card">
          <h4>Video: Criptografía básica</h4>
          <p>5 min • Intro</p>
          <button className="btn-secondary">Ver</button>
        </article>
        <article className="res-card">
          <h4>Artículo: ¿Qué es un CTF?</h4>
          <p>Lectura corta</p>
          <button className="btn-secondary">Leer</button>
        </article>
        <article className="res-card">
          <h4>Proyecto: Mini scanner puertos</h4>
          <p>Python</p>
          <button className="btn-secondary">Abrir</button>
        </article>
      </section>

      {/* Footer */}
      <footer className="kd-footer">
        <small>© 2025 KallpaIA • v1.0.0</small>
      </footer>
    </>
  );
}