import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{--navy:#00182A;--navy-mid:#0D2940;--gold:#D4AF37;--gold-dim:#B8962E;--white:#FFFFFF;--off-white:#F4F6F9;--slate:#394B5A;--slate-light:#A7B8C6;--ff:'Poppins',sans-serif;--radius-sm:6px;--radius-md:12px;--radius-lg:20px;--tr:0.3s cubic-bezier(0.4,0,0.2,1);}
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
  .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;}
  .svc-card{background:var(--white);border:1px solid rgba(0,24,42,.07);border-radius:var(--radius-lg);padding:2.5rem 2rem;border-top:3px solid transparent;transition:transform var(--tr),box-shadow var(--tr),border-top-color var(--tr);}
  .svc-card:hover{transform:translateY(-6px);box-shadow:0 24px 56px rgba(0,24,42,.1);border-top-color:var(--gold);}
  .svc-icon{width:52px;height:52px;border-radius:var(--radius-md);background:var(--navy);display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;}
  .svc-title{font-size:1.1rem;font-weight:700;color:var(--navy);margin-bottom:.75rem;}
  .svc-body{font-size:.86rem;line-height:1.8;color:var(--slate);margin-bottom:1.75rem;}
  .svc-list{list-style:none;display:flex;flex-direction:column;gap:.65rem;}
  .svc-list li{display:flex;align-items:center;gap:.65rem;font-size:.8rem;font-weight:600;color:var(--navy);}
  .svc-check{width:6px;height:6px;border-radius:50%;background:var(--gold);flex-shrink:0;}
  .process-section{background:var(--off-white);border-top:1px solid rgba(212,175,55,.12);border-bottom:1px solid rgba(212,175,55,.12);}
  .process-list{display:flex;flex-direction:column;gap:1.5rem;max-width:860px;margin:0 auto;}
  .process-item{display:flex;gap:2rem;align-items:flex-start;padding:2rem;background:var(--white);border-radius:var(--radius-md);border:1px solid rgba(0,24,42,.07);transition:border-color var(--tr),box-shadow var(--tr);}
  .process-item:hover{border-color:var(--gold);box-shadow:0 8px 24px rgba(0,24,42,.07);}
  .process-num{font-size:2.5rem;font-weight:900;color:rgba(212,175,55,.2);line-height:1;flex-shrink:0;min-width:60px;}
  .process-title{font-size:.98rem;font-weight:700;color:var(--navy);margin-bottom:.5rem;}
  .process-body{font-size:.86rem;line-height:1.75;color:var(--slate);}
  .cta-section{background:var(--navy);position:relative;overflow:hidden;}
  .cta-section::before{content:'';position:absolute;inset:0;background-image:repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(212,175,55,.04) 59px,rgba(212,175,55,.04) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(212,175,55,.04) 59px,rgba(212,175,55,.04) 60px);}
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
  @media(max-width:960px){#navbar{padding:1rem 1.5rem;}.nav-links{display:none;}.container{padding:0 1.5rem;}.page-hero{padding:8rem 1.5rem 5rem;}.services-grid{grid-template-columns:1fr;}.footer-top{grid-template-columns:1fr 1fr;}.fbottom{flex-direction:column;gap:.5rem;text-align:center;}}
  @media(max-width:600px){.footer-top{grid-template-columns:1fr;}}
`;

const SERVICES = [
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Corporate HR & Talent Management',
    body: 'Transformasi SDM berbasis data. Kami menyediakan asesmen talenta, desain sistem kompensasi, dan program pelatihan kepemimpinan yang disesuaikan dengan industri Anda.',
    list: ['Talent Assessment & Analytics', 'Employee Engagement Strategy', 'HR Digital Transformation'],
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    title: 'Strategic Business & Finance',
    body: 'Konsultasi tingkat eksekutif untuk market analysis, go-to-market strategy, serta audit kondisi keuangan komprehensif untuk merancang roadmap bisnis yang aman dan terukur.',
    list: ['Financial Health Audit', 'Go-to-Market Strategy', 'Business Model Optimization'],
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>,
    title: 'Startup Incubation & Accelerator',
    body: 'Menjembatani inovasi dengan kapital. Program intensif untuk validasi produk, pengembangan operasional, hingga persiapan pitching ke Venture Capital.',
    list: ['MVP Development Guidance', 'Investor Readiness Program', 'Access to ARRIVAR VC Network'],
  },
];

const PROCESS = [
  { num:'01', title:'Discovery & Assessment', body:'Tim ahli kami melakukan audit menyeluruh terhadap infrastruktur HR, finansial, atau model bisnis Anda untuk menemukan akar permasalahan dan potensi yang tersembunyi.' },
  { num:'02', title:'Strategic Roadmap Design', body:'Berdasarkan data, kami menyusun cetak biru strategi yang terukur, lengkap dengan KPI dan timeline eksekusi yang realistis dan dapat dicapai.' },
  { num:'03', title:'Implementation & Evaluation', body:'Pendampingan intensif selama masa eksekusi. Kami melakukan evaluasi berkala untuk memastikan strategi berjalan optimal dan memberikan ROI yang dijanjikan.' },
];

export default function Services() {
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
        <title>Layanan Profesional & Inkubasi Bisnis | ARRIVAR.id</title>
        <meta name="description" content="Layanan konsultasi SDM korporat, inkubasi startup, dan perencanaan keuangan strategis untuk pertumbuhan eksponensial karir dan bisnis Anda." />
      </Helmet>

      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo"><img src="/logo.png" alt="ARRIVAR Logo" /><span>ARRIVAR<em>.id</em></span></Link>
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/catalog">Katalog</Link></li>
          <li><Link to="/community">Komunitas</Link></li>
          <li><a href="#kontak" className="nav-cta">Hubungi Kami</a></li>
        </ul>
      </nav>

      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow reveal">Solusi B2B & Eksekutif</span>
          <h1 className="reveal">Layanan Profesional untuk <em>Pertumbuhan Eksponensial</em></h1>
          <div className="accent-bar reveal" />
          <p className="reveal">Kami membantu korporasi mengoptimalkan SDM, merancang strategi finansial yang tangguh, dan mendampingi inovator membangun startup masa depan melalui ekosistem yang terintegrasi.</p>
        </div>
      </section>

      <section className="section" style={{background:'#fff'}}>
        <div className="container">
          <div style={{textAlign:'center',maxWidth:620,margin:'0 auto 4rem'}}>
            <span className="eyebrow reveal">Tiga Pilar Layanan</span>
            <h2 className="section-title reveal">Apa yang <em>Bisa Kami Bantu?</em></h2>
            <div className="gold-bar center reveal" />
            <p style={{fontSize:'.93rem',lineHeight:1.85,color:'var(--slate)',margin:'0 auto'}} className="reveal">Setiap layanan dirancang untuk memberikan dampak terukur — dari level individu hingga korporat.</p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div className="svc-card reveal" key={i}>
                <div className="svc-icon">{s.icon}</div>
                <div className="svc-title">{s.title}</div>
                <p className="svc-body">{s.body}</p>
                <ul className="svc-list">{s.list.map((l,j)=><li key={j}><span className="svc-check"/>{l}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:580,margin:'0 auto 4rem'}}>
            <span className="eyebrow reveal">Metodologi</span>
            <h2 className="section-title reveal">Cara Kami <em>Bekerja</em></h2>
            <div className="gold-bar center reveal" />
          </div>
          <div className="process-list">
            {PROCESS.map(p => (
              <div className="process-item reveal" key={p.num}>
                <div className="process-num">{p.num}</div>
                <div><div className="process-title">{p.title}</div><p className="process-body">{p.body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section" id="kontak">
        <div className="container">
          <div className="cta-inner reveal">
            <span className="eyebrow" style={{textAlign:'center',display:'block'}}>Mulai Kolaborasi</span>
            <h2 className="section-title light" style={{textAlign:'center',marginBottom:'1rem'}}>Siap <em>Berkolaborasi?</em></h2>
            <div className="gold-bar center" style={{marginBottom:'1.5rem'}} />
            <p style={{fontSize:'.93rem',lineHeight:1.85,color:'var(--slate-light)',textAlign:'center',maxWidth:520,margin:'0 auto 2.5rem'}}>Diskusikan kebutuhan spesifik perusahaan Anda dengan tim ahli kami untuk mendapatkan proposal solusi yang personal dan berdampak nyata.</p>
            <div style={{display:'flex',justifyContent:'center',gap:'1rem',flexWrap:'wrap'}}>
              <a href="mailto:admin@arrivar.id" style={{display:'inline-flex',alignItems:'center',background:'var(--gold)',color:'var(--navy)',fontFamily:'var(--ff)',fontWeight:700,fontSize:'.82rem',letterSpacing:'.07em',textTransform:'uppercase',padding:'.9rem 2.1rem',borderRadius:'var(--radius-sm)',textDecoration:'none'}}>Jadwalkan Diskusi →</a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" style={{display:'inline-flex',alignItems:'center',background:'transparent',color:'var(--white)',fontFamily:'var(--ff)',fontWeight:600,fontSize:'.82rem',letterSpacing:'.07em',textTransform:'uppercase',padding:'.9rem 2.1rem',borderRadius:'var(--radius-sm)',border:'1.5px solid rgba(255,255,255,.22)',textDecoration:'none'}}>Hubungi via WhatsApp</a>
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