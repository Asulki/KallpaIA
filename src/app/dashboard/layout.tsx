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
                <g stroke="rgba(156,163,175,.35)" strokeWidth="1.2" fill="none">
                    <polyline points="180,220 240,280 320,250 400,320" />
                    <polyline points="1200,180 1260,240 1320,220 1380,300 1460,280" />
                </g>
                <g fill="#fff">
                    <circle cx="180" cy="220" r="1.6"/><circle cx="240" cy="280" r="1.4"/>
                    <circle cx="320" cy="250" r="1.8"/><circle cx="400" cy="320" r="1.3"/>
                    <circle cx="1200" cy="180" r="1.5"/><circle cx="1260" cy="240" r="1.2"/>
                    <circle cx="1320" cy="220" r="1.6"/><circle cx="1380" cy="300" r="1.2"/><circle cx="1460" cy="280" r="1.4"/>
                </g>
            </svg>
        </div>

      <header className="kd-header">
        <div className="brand">
          <span className="logo">🤖</span>
          <strong>KallpaIA</strong>
        </div>
        <div className="hello">
          <h2>Hola, Wawa <span className="wave">🔥</span></h2>
          <small>SUBTÍTULO INFORMATIVO</small>
        </div>
      </header>
      
      <div className="kd-layout">
        <aside className="kd-sidebar">
            <nav>
                <a className="active" href="#">
                    <span className="nav-icn">🏠</span><span className="label">Inicio</span>
                </a>
                <a href="#"><span className="nav-icn">🎯</span><span className="label">Retos</span></a>
                <a href="#"><span className="nav-icn">🧭</span><span className="label">Info vocacional</span></a>
                <a href="#"><span className="nav-icn">🤖</span><span className="label">Chat IA</span></a>
                <a href="#"><span className="nav-icn">✨</span><span className="label">Oportunidades</span></a>
            </nav>
            <div className="extra">🗯️ comics digitales</div>
        </aside>
        
        <main className="kd-main">
          {children}
        </main>
      </div>
    </section>
  );
}
