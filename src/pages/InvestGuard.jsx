import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{--navy:#00182A;--navy-mid:#0D2940;--gold:#D4AF37;--gold-dim:#B8962E;--white:#FFFFFF;--off-white:#F4F6F9;--slate:#394B5A;--slate-light:#A7B8C6;--ff:'Poppins',sans-serif;--radius-sm:6px;--radius-md:12px;--radius-lg:20px;--tr:0.3s cubic-bezier(0.4,0,0.2,1);}
  html{scroll-behavior:smooth;}body{font-family:var(--ff);background:var(--navy);color:var(--white);-webkit-font-smoothing:antialiased;}
  #navbar{position:fixed;top:0;left:0;right:0;z-index:999;display:flex;align-items:center;justify-content:space-between;padding:1.1rem 4rem;background:rgba(0,24,42,.8);border-bottom:1px solid rgba(212,175,55,.1);backdrop-filter:blur(12px);transition:padding var(--tr),box-shadow var(--tr);}
  #navbar.scrolled{padding:.7rem 4rem;box-shadow:0 6px 32px rgba(0,0,0,.5);background:rgba(0,24,42,.95);}
  .nav-logo{display:flex;align-items:center;gap:.55rem;text-decoration:none;}.nav-logo img{height:30px;width:auto;object-fit:contain;}.nav-logo span{font-size:1.2rem;font-weight:800;letter-spacing:.04em;color:var(--white);}.nav-logo em{color:var(--gold);font-style:normal;}
  .nav-links{display:flex;align-items:center;gap:1.8rem;list-style:none;}.nav-links a{color:var(--slate-light);font-size:.74rem;font-weight:500;text-decoration:none;letter-spacing:.07em;text-transform:uppercase;transition:color var(--tr);}.nav-links a:hover{color:var(--gold);}
  .nav-cta{background:var(--gold)!important;color:var(--navy)!important;padding:.48rem 1.25rem!important;border-radius:var(--radius-sm)!important;font-weight:700!important;}
  .hero-ig{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:8rem 4rem 5rem;}
  .hero-ig::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 70% at 50% 40%,rgba(212,175,55,.08) 0%,transparent 65%);}
  .hero-pattern{position:absolute;inset:0;background-image:repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(212,175,55,.03) 59px,rgba(212,175,55,.03) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(212,175,55,.03) 59px,rgba(212,175,55,.03) 60px);opacity:.6;}
  .hero-ig-inner{position:relative;z-index:2;text-align:center;max-width:820px;margin:0 auto;}
  .ig-badge{display:inline-flex;align-items:center;gap:.6rem;background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.3);padding:.4rem 1.2rem;border-radius:100px;color:var(--gold);font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:2rem;}
  .ig-badge-dot{width:8px;height:8px;background:#27AE60;border-radius:50%;box-shadow:0 0 10px #27AE60;animation:pulse 2s infinite;}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.6;transform:scale(1.4);}}
  .hero-ig h1{font-size:clamp(2.4rem,5vw,4.2rem);font-weight:800;line-height:1.1;letter-spacing:-.015em;margin-bottom:1.5rem;}
  .hero-ig h1 em{color:var(--gold);font-style:normal;display:block;}
  .hero-ig p{font-size:1rem;line-height:1.85;color:var(--slate-light);max-width:580px;margin:0 auto 3rem;}
  .waitlist-form{display:flex;gap:.5rem;max-width:480px;margin:0 auto;background:rgba(255,255,255,.05);padding:.5rem;border-radius:100px;border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(10px);}
  .waitlist-form input{flex:1;background:transparent;border:none;outline:none;padding:.85rem 1.5rem;color:var(--white);font-size:.9rem;font-family:var(--ff);}
  .waitlist-form input::placeholder{color:var(--slate-light);}
  .waitlist-btn{background:var(--gold);color:var(--navy);border:none;padding:0 1.75rem;border-radius:100px;font-weight:700;font-size:.78rem;letter-spacing:.07em;text-transform:uppercase;cursor:pointer;font-family:var(--ff);white-space:nowrap;transition:background var(--tr);}
  .waitlist-btn:hover{background:var(--gold-dim);}
  .success-box{background:rgba(39,174,96,.1);border:1px solid rgba(39,174,96,.3);padding:1.75rem;border-radius:var(--radius-md);max-width:480px;margin:0 auto;text-align:center;}
  .hero-note{font-size:.75rem;color:rgba(255,255,255,.4);margin-top:1rem;}
  .section{padding:6rem 0;}.container{max-width:1200px;margin:0 auto;padding:0 4rem;}
  .eyebrow{font-size:.68rem;font-weight:700;letter-spacing:.17em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;display:block;}
  .section-title{font-size:clamp(1.8rem,3.5vw,2.75rem);font-weight:800;line-height:1.15;color:var(--white);margin-bottom:1rem;}
  .section-title em{color:var(--gold);font-style:normal;}
  .gold-bar{width:48px;height:3px;background:linear-gradient(90deg,var(--gold),var(--gold-dim));border-radius:2px;margin-bottom:1.5rem;}.gold-bar.center{margin-left:auto;margin-right:auto;}
  .reveal{opacity:0;transform:translateY(28px);transition:opacity .65s cubic-bezier(.4,0,.2,1),transform .65s cubic-bezier(.4,0,.2,1);}.reveal.visible{opacity:1;transform:none;}
  .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
  .feat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:var(--radius-lg);padding:2.5rem 2rem;transition:transform var(--tr),box-shadow var(--tr),border-color var(--tr);}
  .feat-card:hover{transform:translateY(-6px);box-shadow:0 24px 56px rgba(0,0,0,.3);border-color:rgba(212,175,55,.3);}
  .feat-icon{width:52px;height:52px;border-radius:var(--radius-md);background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.2);display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;}
  .feat-title{font-size:1.05rem;font-weight:700;color:var(--white);margin-bottom:.75rem;}
  .feat-body{font-size:.86rem;line-height:1.8;color:var(--slate-light);}
  .comparison-section{background:rgba(255,255,255,.02);border-top:1px solid rgba(212,175,55,.1);border-bottom:1px solid rgba(212,175,55,.1);}
  .compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;}
  .compare-card{border-radius:var(--radius-lg);padding:2.5rem 2rem;}
  .compare-before{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);}
  .compare-after{background:rgba(212,175,55,.07);border:1px solid rgba(212,175,55,.2);}
  .compare-label{font-size:.67rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:1.5rem;display:block;}
  .compare-before .compare-label{color:var(--slate-light);}
  .compare-after .compare-label{color:var(--gold);}
  .compare-list{list-style:none;display:flex;flex-direction:column;gap:.9rem;}
  .compare-list li{display:flex;align-items:flex-start;gap:.75rem;font-size:.86rem;line-height:1.7;color:var(--slate-light);}
  .compare-after .compare-list li{color:var(--white);}
  .compare-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;margin-top:.5rem;}
  .compare-before .compare-dot{background:var(--slate);}
  .compare-after .compare-dot{background:var(--gold);}
  .stats-section{background:var(--navy);}
  .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;text-align:center;}
  .stat-item{padding:2rem 1rem;}
  .stat-num{font-size:2.5rem;font-weight:900;color:var(--gold);line-height:1;margin-bottom:.5rem;}
  .stat-label{font-size:.75rem;color:var(--slate-light);font-weight:500;letter-spacing:.04em;}
  .cta-section{position:relative;overflow:hidden;padding:8rem 4rem;}
  .cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 70% at 50% 50%,rgba(212,175,55,.06) 0%,transparent 70%);}
  .cta-inner{position:relative;z-index:1;text-align:center;max-width:680px;margin:0 auto;}
  footer{background:#000f1a;color:var(--slate-light);padding:5rem 0 2rem;}
  .footer-inner{max-width:1200px;margin:0 auto;padding:0 4rem;}
  .footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:4rem;}
  .fbrand-name{font-size:1.5rem;font-weight:800;color:var(--white);margin-bottom:.7rem;}.fbrand-name span{color:var(--gold);}
  .fbrand>p{font-size:.82rem;line-height:1.8;max-width:270px;}
  .fsocials{display:flex;gap:.7rem;margin-top:1.5rem;}
  .social-link{width:34px;height:34px;border-radius:var(--radius-sm);border:1px solid rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;font-size:.68rem;font-weight:700;text-transform:uppercase;color:var(--slate-light);text-decoration:none;transition:border-color var(--tr),color var(--tr),background var(--tr);}
  .social-link:hover{border-color:var(--gold);color:var(--gold);background:rgba(212,175,55,.08);}
  .fcol h4{font-size:.67rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--white);margin-bottom:1.2rem;}
  .fcol ul{list-style:none;display:flex;flex-direction:column;gap:.58rem;}.fcol ul li a{font-size:.8rem;color:var(--slate-light);text-decoration:none;transition:color var(--tr);}.fcol ul li a:hover{color:var(--gold);}
  .fbottom{border-top:1px solid rgba(255,255,255,.06);padding-top:2rem;display:flex;justify-content:space-between;align-items:center;font-size:.74rem;color:rgba(167,184,198,.45);}.fbottom span{color:var(--gold);}
  .scroll-top{position:fixed;bottom:2rem;right:2rem;z-index:999;width:44px;height:44px;border-radius:var(--radius-sm);background:var(--gold);color:var(--navy);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:700;opacity:0;transform:translateY(12px);transition:opacity var(--tr),transform var(--tr);pointer-events:none;}
  .scroll-top.visible{opacity:1;transform:none;pointer-events:all;}.scroll-top:hover{background:var(--gold-dim);}
  @media(max-width:960px){#navbar{padding:1rem 1.5rem;}.nav-links{display:none;}.container{padding:0 1.5rem;}.hero-ig{padding:8rem 1.5rem 5rem;}.features-grid,.compare-grid,.stats-grid{grid-template-columns:1fr;}.footer-top{grid-template-columns:1fr 1fr;}.fbottom{flex-direction:column;gap:.5rem;text-align:center;}.cta-section{padding:5rem 1.5rem;}}
  @media(max-width:600px){.footer-top{grid-template-columns:1fr;}.waitlist-form{flex-direction:column;border-radius:var(--radius-lg);}.waitlist-btn{padding:.85rem;border-radius:var(--radius-sm);}}
`;

const FEATURES = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h1v6H9z"/><path d="M14 9h1v4h-1z"/></svg>,
    title: 'AI Wealth Forecasting',
    body: 'Mesin AI kami menganalisa kebiasaan pengeluaran dan profil risiko Anda untuk memproyeksikan target nilai kekayaan (Net Worth) di masa pensiun secara otomatis.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8 11l3 3 5-5"/></svg>,
    title: 'Risk Management',
    body: 'Notifikasi pintar saat alokasi aset bergeser melebihi toleransi risiko. InvestGuard bertindak sebagai "penjaga" cerdas untuk dana darurat dan investasi Anda.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    title: 'Portfolio Optimizer',
    body: 'Rebalancing portofolio otomatis berdasarkan kondisi pasar terkini dan tujuan finansial jangka panjang yang sudah Anda tetapkan.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    title: 'Spending Tracker',
    body: 'Kategorisasi pengeluaran otomatis dengan insight berbasis AI yang membantu Anda menemukan kebocoran keuangan dan area penghematan yang optimal.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: 'Goal-Based Planning',
    body: 'Tetapkan target finansial spesifik — rumah, pensiun, dana pendidikan — dan biarkan AI merancang jalur investasi paling efisien untuk mencapainya.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    title: 'Smart Alerts',
    body: 'Laporan mingguan dan peringatan real-time langsung ke email dan notifikasi app saat ada perubahan signifikan yang perlu perhatian segera.',
  },
];

const STATS = [
  { num: '4.5K+', label: 'Profesional di Waitlist' },
  { num: 'Q4', label: 'Beta Access 2026' },
  { num: '6', label: 'Fitur AI Unggulan' },
  { num: '100%', label: 'Data Terenkripsi' },
];

export default function InvestGuard() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handle = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handle);
    const obs = new IntersectionObserver((entries) => entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); obs.unobserve(e.target); } }), { threshold: 0.07 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) { alert('Mohon masukkan alamat email Anda.'); return; }
    setIsSubmitted(true); setEmail('');
  };

  return (
    <>
      <style>{css}</style>
      <Helmet>
        <title>InvestGuard — AI Wealth Forecasting & Manajemen Risiko | ARRIVAR.id</title>
        <meta name="description" content="Kendalikan masa depan finansial Anda dengan InvestGuard. Aplikasi AI dari ARRIVAR untuk proyeksi kekayaan, manajemen risiko, dan portofolio cerdas." />
      </Helmet>

      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo"><img src="/logo.png" alt="ARRIVAR Logo" /><span>ARRIVAR<em>.id</em></span></Link>
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/catalog">Katalog</Link></li>
          <li><Link to="/services">Layanan</Link></li>
        </ul>
      </nav>

      <section className="hero-ig">
        <div className="hero-pattern" />
        <div className="hero-ig-inner">
          <div className="ig-badge reveal"><span className="ig-badge-dot"/>Beta Access Q4 2026</div>
          <h1 className="reveal">Kecerdasan Buatan untuk <em>Masa Depan Finansialmu</em></h1>
          <p className="reveal">InvestGuard adalah aplikasi pintar dari ARRIVAR yang merancang proyeksi kekayaan, manajemen risiko, dan optimasi portofolio investasi secara otomatis — sehingga Anda bisa fokus membangun kekayaan tanpa kebingungan.</p>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="waitlist-form reveal">
              <input type="email" placeholder="Masukkan alamat email Anda..." value={email} onChange={e => setEmail(e.target.value)} required />
              <button type="submit" className="waitlist-btn">Gabung Waitlist</button>
            </form>
          ) : (
            <div className="success-box reveal">
              <div style={{fontSize:'1.75rem',marginBottom:'.5rem'}}>🎉</div>
              <div style={{fontSize:'1rem',fontWeight:700,color:'var(--white)',marginBottom:'.3rem'}}>Anda Telah Terdaftar!</div>
              <p style={{fontSize:'.86rem',color:'var(--slate-light)'}}>Kami akan mengabari Anda segera setelah akses Beta InvestGuard dibuka.</p>
            </div>
          )}
          <p className="hero-note reveal">Bergabung dengan 4.500+ profesional lainnya.</p>
        </div>
      </section>

      <section className="section" style={{background:'rgba(13,41,64,.4)'}}>
        <div className="container">
          <div style={{textAlign:'center',maxWidth:580,margin:'0 auto 4rem'}}>
            <span className="eyebrow reveal">Fitur Unggulan</span>
            <h2 className="section-title reveal">Dirancang untuk <em>Semua Kebutuhan</em> Finansialmu</h2>
            <div className="gold-bar center reveal" />
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div className="feat-card reveal" key={i}>
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <p className="feat-body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section comparison-section">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:580,margin:'0 auto 4rem'}}>
            <span className="eyebrow reveal">Perbandingan</span>
            <h2 className="section-title reveal">Sebelum vs <em>Sesudah InvestGuard</em></h2>
            <div className="gold-bar center reveal" />
          </div>
          <div className="compare-grid">
            <div className="compare-card compare-before reveal">
              <span className="compare-label">❌ Tanpa InvestGuard</span>
              <ul className="compare-list">
                {['Investasi berdasarkan feeling dan rekomendasi asal','Tidak tahu apakah portofolio sudah seimbang','Tidak ada gambaran kapan bisa pensiun','Panik saat pasar turun karena tidak ada strategi','Pengeluaran tidak terkontrol dan bocor di mana-mana'].map((t,i)=><li key={i}><span className="compare-dot"/>{t}</li>)}
              </ul>
            </div>
            <div className="compare-card compare-after reveal">
              <span className="compare-label">✓ Dengan InvestGuard</span>
              <ul className="compare-list">
                {['Investasi berbasis data dan profil risiko personal','Rebalancing otomatis sesuai kondisi pasar terkini','Proyeksi Net Worth yang jelas hingga hari pensiun','Notifikasi cerdas saat ada risiko yang perlu diambil','Laporan pengeluaran mingguan dengan insight AI'].map((t,i)=><li key={i}><span className="compare-dot"/>{t}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div className="stat-item reveal" key={i}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-inner reveal">
          <span className="eyebrow" style={{textAlign:'center',display:'block'}}>Ambil Posisimu</span>
          <h2 className="section-title" style={{textAlign:'center',marginBottom:'1rem'}}>Jangan Ketinggalan <em>Akses Beta</em></h2>
          <div className="gold-bar center" style={{marginBottom:'1.5rem'}} />
          <p style={{fontSize:'.93rem',lineHeight:1.85,color:'var(--slate-light)',textAlign:'center',maxWidth:520,margin:'0 auto 2.5rem'}}>Slot beta terbatas. Daftar sekarang dan jadilah yang pertama merasakan masa depan manajemen finansial berbasis AI di Indonesia.</p>
          <div style={{display:'flex',justifyContent:'center',gap:'1rem',flexWrap:'wrap'}}>
            <a href="#" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});}} style={{display:'inline-flex',alignItems:'center',background:'var(--gold)',color:'var(--navy)',fontFamily:'var(--ff)',fontWeight:700,fontSize:'.82rem',letterSpacing:'.07em',textTransform:'uppercase',padding:'.9rem 2.1rem',borderRadius:'var(--radius-sm)',textDecoration:'none'}}>Gabung Waitlist Sekarang →</a>
            <Link to="/community" style={{display:'inline-flex',alignItems:'center',background:'transparent',color:'var(--white)',fontFamily:'var(--ff)',fontWeight:600,fontSize:'.82rem',letterSpacing:'.07em',textTransform:'uppercase',padding:'.9rem 2.1rem',borderRadius:'var(--radius-sm)',border:'1.5px solid rgba(255,255,255,.22)',textDecoration:'none'}}>Gabung Komunitas</Link>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="fbrand"><div className="fbrand-name">ARRIVAR<span>.id</span></div><p>Ekosistem digital pertama di Indonesia untuk karir, finansial, dan startup — dalam satu platform terintegrasi.</p><div className="fsocials"><a href="https://www.linkedin.com/company/arrivar-id" target="_blank" rel="noopener noreferrer" className="social-link">in</a><a href="https://www.instagram.com/arrivar.id" target="_blank" rel="noopener noreferrer" className="social-link">ig</a><a href="https://www.threads.com/@arrivar.id" target="_blank" rel="noopener noreferrer" className="social-link">tr</a></div></div>
            <div className="fcol"><h4>Ekosistem</h4><ul><li><Link to="/catalog">Katalog Produk</Link></li><li><Link to="/community">Komunitas</Link></li><li><Link to="/services">Layanan Jasa</Link></li><li><Link to="/investguard">InvestGuard App</Link></li></ul></div>
            <div className="fcol"><h4>Perusahaan</h4><ul><li><Link to="/about">Tentang Kami</Link></li><li><Link to="/privacy">Kebijakan Privasi</Link></li><li><Link to="/legal">Syarat &amp; Ketentuan</Link></li><li><Link to="/career">Karir</Link></li></ul></div>
            <div className="fcol"><h4>Kontak</h4><ul><li><a href="mailto:admin@arrivar.id">admin@arrivar.id</a></li><li><a href="#">Jakarta, Indonesia</a></li><li><a href="https://www.arrivar.id">PT ARRIVAR INDONESIA</a></li></ul></div>
          </div>
          <div className="fbottom"><p>© 2026 <span>PT ARRIVAR INDONESIA</span>. All rights reserved.</p><p>Empowering Indonesia's Future — <span>Career · Financial · Startup</span></p></div>
        </div>
      </footer>
    </>
  );
}