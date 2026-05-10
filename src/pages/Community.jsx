import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{--navy:#00182A;--gold:#D4AF37;--gold-dim:#B8962E;--white:#FFFFFF;--off-white:#F4F6F9;--slate:#394B5A;--slate-light:#A7B8C6;--ff:'Poppins',sans-serif;--radius-sm:6px;--radius-md:12px;--radius-lg:20px;--tr:0.3s cubic-bezier(0.4,0,0.2,1);}
  html{scroll-behavior:smooth;}body{font-family:var(--ff);background:var(--off-white);color:var(--navy);-webkit-font-smoothing:antialiased;}
  #navbar{position:fixed;top:0;left:0;right:0;z-index:999;display:flex;align-items:center;justify-content:space-between;padding:1.1rem 4rem;background:var(--navy);border-bottom:1px solid rgba(212,175,55,.12);transition:padding var(--tr),box-shadow var(--tr);}
  #navbar.scrolled{padding:.7rem 4rem;box-shadow:0 6px 32px rgba(0,0,0,.5);}
  .nav-logo{display:flex;align-items:center;gap:.55rem;text-decoration:none;}.nav-logo img{height:30px;width:auto;object-fit:contain;}.nav-logo span{font-size:1.2rem;font-weight:800;letter-spacing:.04em;color:var(--white);}.nav-logo em{color:var(--gold);font-style:normal;}
  .nav-links{display:flex;align-items:center;gap:1.8rem;list-style:none;}.nav-links a{color:var(--slate-light);font-size:.74rem;font-weight:500;text-decoration:none;letter-spacing:.07em;text-transform:uppercase;transition:color var(--tr);}.nav-links a:hover{color:var(--gold);}
  .nav-cta{background:var(--gold)!important;color:var(--navy)!important;padding:.48rem 1.25rem!important;border-radius:var(--radius-sm)!important;font-weight:700!important;}
  .page-hero{background:var(--navy);padding:10rem 4rem 6rem;text-align:center;position:relative;overflow:hidden;}
  .page-hero::before{content:'';position:absolute;inset:0;background-image:repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(212,175,55,.04) 59px,rgba(212,175,55,.04) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(212,175,55,.04) 59px,rgba(212,175,55,.04) 60px);}
  .page-hero-inner{position:relative;z-index:1;max-width:780px;margin:0 auto;}
  .eyebrow{font-size:.68rem;font-weight:700;letter-spacing:.17em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;display:block;}
  .page-hero h1{font-size:clamp(2.2rem,4.5vw,3.8rem);font-weight:800;line-height:1.1;color:var(--white);letter-spacing:-.015em;margin-bottom:1.5rem;}
  .page-hero h1 em{color:var(--gold);font-style:normal;}
  .page-hero p{font-size:1rem;line-height:1.85;color:var(--slate-light);max-width:580px;margin:0 auto;}
  .accent-bar{width:48px;height:3px;background:linear-gradient(90deg,var(--gold),var(--gold-dim));border-radius:2px;margin:1.5rem auto;}
  .section{padding:6rem 0;}.container{max-width:1200px;margin:0 auto;padding:0 4rem;}
  .section-title{font-size:clamp(1.8rem,3.5vw,2.75rem);font-weight:800;line-height:1.15;color:var(--navy);margin-bottom:1rem;}
  .section-title em{color:var(--gold);font-style:normal;}.section-title.light{color:var(--white);}
  .gold-bar{width:48px;height:3px;background:linear-gradient(90deg,var(--gold),var(--gold-dim));border-radius:2px;margin-bottom:1.5rem;}.gold-bar.center{margin-left:auto;margin-right:auto;}
  .reveal{opacity:0;transform:translateY(28px);transition:opacity .65s cubic-bezier(.4,0,.2,1),transform .65s cubic-bezier(.4,0,.2,1);}.reveal.visible{opacity:1;transform:none;}
  .forum-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;}
  .forum-card{background:var(--white);border:1px solid rgba(0,24,42,.07);border-radius:var(--radius-lg);padding:2.5rem 2rem;display:flex;flex-direction:column;transition:transform var(--tr),box-shadow var(--tr),border-color var(--tr);}
  .forum-card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,24,42,.1);border-color:var(--gold);}
  .forum-icon{width:56px;height:56px;border-radius:var(--radius-md);background:var(--navy);display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;}
  .forum-title{font-size:1.1rem;font-weight:700;color:var(--navy);margin-bottom:.75rem;}
  .forum-body{font-size:.86rem;line-height:1.8;color:var(--slate);flex:1;margin-bottom:1.75rem;}
  .forum-footer{display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(0,24,42,.07);padding-top:1.25rem;}
  .forum-count{font-size:.75rem;color:var(--slate-light);font-weight:600;}
  .forum-btn{background:var(--navy);color:var(--gold);border:none;padding:.55rem 1.2rem;border-radius:var(--radius-sm);cursor:pointer;font-weight:700;font-size:.75rem;text-transform:uppercase;letter-spacing:.06em;font-family:var(--ff);transition:background var(--tr);}
  .forum-btn:hover{background:var(--gold);color:var(--navy);}
  .upsell-section{background:var(--navy);position:relative;overflow:hidden;}
  .upsell-section::before{content:'';position:absolute;inset:0;background-image:repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(212,175,55,.04) 59px,rgba(212,175,55,.04) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(212,175,55,.04) 59px,rgba(212,175,55,.04) 60px);}
  .upsell-grid{display:grid;grid-template-columns:1fr auto;gap:4rem;align-items:center;position:relative;z-index:1;}
  .upsell-text h2{font-size:clamp(1.8rem,3vw,2.5rem);font-weight:800;color:var(--white);margin-bottom:1rem;}
  .upsell-text h2 em{color:var(--gold);font-style:normal;}
  .upsell-text p{font-size:.93rem;line-height:1.85;color:var(--slate-light);max-width:520px;margin-bottom:2rem;}
  .event-card{background:var(--white);border-radius:var(--radius-lg);padding:2rem;min-width:300px;}
  .event-card h4{font-size:.67rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--slate);margin-bottom:1.5rem;padding-bottom:.8rem;border-bottom:1px solid rgba(0,24,42,.08);}
  .event-item{display:flex;gap:1rem;align-items:flex-start;margin-bottom:1.5rem;}
  .event-item:last-child{margin-bottom:0;}
  .event-date{background:var(--off-white);padding:.5rem;border-radius:var(--radius-sm);text-align:center;min-width:52px;flex-shrink:0;}
  .event-month{font-size:.6rem;font-weight:700;text-transform:uppercase;color:var(--navy);}
  .event-day{font-size:1.2rem;font-weight:800;color:var(--gold);line-height:1;}
  .event-title{font-size:.88rem;font-weight:600;color:var(--navy);margin-bottom:.15rem;}
  .event-desc{font-size:.75rem;color:var(--slate-light);}
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
  @media(max-width:960px){#navbar{padding:1rem 1.5rem;}.nav-links{display:none;}.container{padding:0 1.5rem;}.page-hero{padding:8rem 1.5rem 5rem;}.forum-grid{grid-template-columns:1fr;}.upsell-grid{grid-template-columns:1fr;}.event-card{min-width:unset;}.footer-top{grid-template-columns:1fr 1fr;}.fbottom{flex-direction:column;gap:.5rem;text-align:center;}}
  @media(max-width:600px){.footer-top{grid-template-columns:1fr;}}
`;

const FORUMS = [
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    title: 'Karir & HR Hub',
    body: 'Bagikan pengalaman interview, tips negosiasi gaji, dan strategi pengembangan skill untuk menjadi top talent incaran perusahaan.',
    count: '1.2K+ Members',
    tag: 'Career Development & HR',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
    title: 'Financial & InvestGuard',
    body: 'Bahas manajemen portofolio, analisa saham, reksa dana, dan maksimalkan penggunaan aplikasi InvestGuard untuk kebebasan finansial.',
    count: '850+ Members',
    tag: 'FinTech & InvestGuard',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>,
    title: 'Startup Founders',
    body: 'Networking antar founder, cari co-founder, dan pelajari strategi pitching ke Venture Capital dari para praktisi berpengalaman.',
    count: '420+ Members',
    tag: 'Inkubasi & Pendanaan',
  },
];

export default function Community() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handle = () => { setIsScrolled(window.scrollY > 40); setShowScrollTop(window.scrollY > 400); };
    window.addEventListener('scroll', handle);
    const obs = new IntersectionObserver((entries) => entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); obs.unobserve(e.target); } }), { threshold: 0.07 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <>
      <style>{css}</style>
      <Helmet>
        <title>Komunitas Profesional & Startup Founder Indonesia | ARRIVAR.id</title>
        <meta name="description" content="Bergabung dengan ekosistem eksklusif ARRIVAR. Bangun networking, diskusikan pengembangan karir, strategi finansial, dan inkubasi startup bersama para ahli." />
      </Helmet>

      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo"><img src="/logo.png" alt="ARRIVAR Logo" /><span>ARRIVAR<em>.id</em></span></Link>
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/catalog">Katalog</Link></li>
          <li><Link to="/services">Layanan</Link></li>
          <li><a href="#upsell" className="nav-cta">Pro Membership</a></li>
        </ul>
      </nav>

      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow reveal">Ekosistem Kolaborasi</span>
          <h1 className="reveal">Komunitas <em>ARRIVAR</em></h1>
          <div className="accent-bar reveal" />
          <p className="reveal">Ruang diskusi eksklusif untuk profesional, investor, dan startup founder. Bangun networking berkualitas dan akselerasi karir serta bisnismu bersama ribuan talenta terbaik Indonesia.</p>
        </div>
      </section>

      <section className="section" style={{background:'#fff'}}>
        <div className="container">
          <div style={{textAlign:'center',maxWidth:620,margin:'0 auto 4rem'}}>
            <span className="eyebrow reveal">Forum Diskusi</span>
            <h2 className="section-title reveal">Pilih <em>Komunitas</em> yang Tepat</h2>
            <div className="gold-bar center reveal" />
            <p style={{fontSize:'.93rem',lineHeight:1.85,color:'var(--slate)',margin:'0 auto'}} className="reveal">Tiga forum khusus yang masing-masing dirancang untuk kebutuhan spesifik perjalanan profesional dan bisnis Anda.</p>
          </div>
          <div className="forum-grid">
            {FORUMS.map((f, i) => (
              <div className="forum-card reveal" key={i}>
                <div className="forum-icon">{f.icon}</div>
                <div className="forum-title">{f.title}</div>
                <p className="forum-body">{f.body}</p>
                <div style={{marginBottom:'1rem'}}><span style={{display:'inline-block',fontSize:'.67rem',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--gold)',background:'rgba(212,175,55,.1)',padding:'.28rem .85rem',borderRadius:'100px',border:'1px solid rgba(212,175,55,.25)'}}>{f.tag}</span></div>
                <div className="forum-footer">
                  <span className="forum-count">{f.count}</span>
                  <button className="forum-btn">Gabung</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section upsell-section" id="upsell">
        <div className="container">
          <div className="upsell-grid reveal">
            <div className="upsell-text">
              <span className="eyebrow">Pro Membership</span>
              <h2>Ingin Akses <em>Eksklusif?</em></h2>
              <p>Dapatkan akses langsung ke mentor, webinar bulanan, review CV, dan analisa portofolio gratis dengan bergabung di <strong style={{color:'var(--gold)'}}>ARRIVAR Pro Membership</strong>.</p>
              <Link to="/catalog" style={{display:'inline-flex',alignItems:'center',background:'var(--gold)',color:'var(--navy)',fontFamily:'var(--ff)',fontWeight:700,fontSize:'.82rem',letterSpacing:'.07em',textTransform:'uppercase',padding:'.9rem 2.1rem',borderRadius:'var(--radius-sm)',textDecoration:'none'}}>Lihat Detail Pro →</Link>
            </div>
            <div className="event-card">
              <h4>Event Terdekat</h4>
              <div className="event-item">
                <div className="event-date"><div className="event-month">JUN</div><div className="event-day">15</div></div>
                <div><div className="event-title">Live Portfolio Review</div><div className="event-desc">Khusus Member Pro via Zoom</div></div>
              </div>
              <div className="event-item">
                <div className="event-date"><div className="event-month">JUN</div><div className="event-day">28</div></div>
                <div><div className="event-title">HR Networking Night</div><div className="event-desc">Diskusi tren hiring Q3 2026</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="fbrand"><div className="fbrand-name">ARRIVAR<span>.id</span></div><p>Ekosistem digital pertama di Indonesia untuk karir, finansial, dan startup — dalam satu platform terintegrasi.</p><div className="fsocials"><a href="https://www.linkedin.com/company/arrivar-id" target="_blank" rel="noopener noreferrer" className="social-link">in</a><a href="https://www.instagram.com/arrivar.id" target="_blank" rel="noopener noreferrer" className="social-link">ig</a><a href="https://www.threads.com/@arrivar.id" target="_blank" rel="noopener noreferrer" className="social-link">tr</a></div></div>
            <div className="fcol"><h4>Ekosistem</h4><ul><li><Link to="/catalog">Katalog Produk</Link></li><li><Link to="/community">Komunitas</Link></li><li><Link to="/services">Layanan Jasa</Link></li><li><a href="https://www.investguard.id" target="_blank" rel="noopener noreferrer">InvestGuard App</a></li></ul></div>
            <div className="fcol"><h4>Perusahaan</h4><ul><li><Link to="/about">Tentang Kami</Link></li><li><Link to="/privacy">Kebijakan Privasi</Link></li><li><Link to="/legal">Syarat &amp; Ketentuan</Link></li><li><Link to="/career">Karir</Link></li></ul></div>
            <div className="fcol"><h4>Kontak</h4><ul><li><a href="mailto:admin@arrivar.id">admin@arrivar.id</a></li><li><a href="#">Jakarta, Indonesia</a></li><li><a href="https://www.arrivar.id">PT ARRIVAR INDONESIA</a></li></ul></div>
          </div>
          <div className="fbottom"><p>© 2026 <span>PT ARRIVAR INDONESIA</span>. All rights reserved.</p><p>Empowering Indonesia's Future — <span>Career · Financial · Startup</span></p></div>
        </div>
      </footer>
      <button className={`scroll-top${showScrollTop?' visible':''}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑</button>
    </>
  );
}