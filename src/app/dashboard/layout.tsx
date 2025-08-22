import './dashboard.css';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="kallpa-dashboard">
        <div className="kd-space" aria-hidden="true">
            <svg className="kd-constellations" viewBox="0 0 1920 1080">
                <g stroke="rgba(156,163,175,.35)" strokeWidth="1.2">
                <polyline points="200,220 260,280 340,250 420,320" />
                <polyline points="1200,180 1260,240 1320,220 1380,300 1460,280" />
                </g>
                <g fill="#fff">
                <circle cx="200" cy="220" r="1.6"/><circle cx="260" cy="280" r="1.4"/>
                <circle cx="340" cy="250" r="1.8"/><circle cx="420" cy="320" r="1.3"/>
                <circle cx="1200" cy="180" r="1.5"/><circle cx="1260" cy="240" r="1.2"/>
                <circle cx="1320" cy="220" r="1.6"/><circle cx="1380" cy="300" r="1.2"/><circle cx="1460" cy="280" r="1.4"/>
                </g>
            </svg>
        </div>

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
            <img src="https://i.ibb.co/V3F7499/vicuna-bot.png" alt="Perfil" width="32" height="32" />
            <span>Carla</span>
          </div>
        </div>
      </header>
      
      <div className="kd-layout">
        <aside className="kd-sidebar">
          <nav>
            <Link className="active" href="#">Inicio</Link>
            <Link href="#">Retos</Link>
            <Link href="#">Progreso</Link>
            <Link href="#">Mentoría</Link>
            <Link href="#">Biblioteca</Link>
            <Link href="#">Ajustes</Link>
          </nav>
        </aside>
        
        <main className="kd-main">
          {children}
        </main>
      </div>
    </section>
  );
}
