import './dashboard.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="kallpa-dashboard">
      {/* Header */}
      <header className="kd-header">
        <div className="kd-logo">
          <span className="badge">🤖</span>
          <strong>KallpaIA</strong>
        </div>

        <div className="kd-search">
          <input type="search" placeholder="Buscar retos, recursos, mentoras…" />
          <button aria-label="Buscar">🔍</button>
        </div>

        <div className="kd-actions">
          <button className="icon-btn" aria-label="Notificaciones">🔔</button>
          <button className="icon-btn" aria-label="Cambiar tema">🌓</button>
          <div className="kd-user">
            <img src="https://placehold.co/32x32.png" alt="Perfil" />
            <span>Carla</span>
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="kd-layout">
        {/* Sidebar */}
        <aside className="kd-sidebar">
          <nav>
            <a className="active" href="#">Inicio</a>
            <a href="#">Retos</a>
            <a href="#">Progreso</a>
            <a href="#">Mentoría</a>
            <a href="#">Biblioteca</a>
            <a href="#">Ajustes</a>
          </nav>
        </aside>

        {/* Main */}
        <main className="kd-main">
          {children}
          {/* Footer */}
          <footer className="kd-footer">
            <small>© 2025 KallpaIA • v1.0.0</small>
          </footer>
        </main>
      </div>
    </section>
  );
}
