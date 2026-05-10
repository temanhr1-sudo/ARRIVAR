import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{--navy:#00182A;--navy-mid:#0D2940;--gold:#D4AF37;--gold-dim:#B8962E;--white:#FFFFFF;--off-white:#F4F6F9;--slate:#394B5A;--slate-light:#A7B8C6;--ff:'Poppins',sans-serif;--radius-sm:6px;--radius-md:12px;--radius-lg:20px;--tr:0.3s cubic-bezier(0.4,0,0.2,1);}
  html{scroll-behavior:smooth;}body{font-family:var(--ff);background:var(--off-white);color:var(--navy);-webkit-font-smoothing:antialiased;}
  #navbar{position:fixed;top:0;left:0;right:0;z-index:999;display:flex;align-items:center;justify-content:space-between;padding:1.1rem 4rem;background:var(--navy);border-bottom:1px solid rgba(212,175,55,.12);transition:padding var(--tr),box-shadow var(--tr);}
  #navbar.scrolled{padding:.7rem 4rem;box-shadow:0 6px 32px rgba(0,0,0,.5);}
  .nav-logo{display:flex;align-items:center;gap:.55rem;text-decoration:none;}
  .nav-logo img{height:30px;width:auto;object-fit:contain;}
  .nav-logo span{font-size:1.2rem;font-weight:800;letter-spacing:.04em;color:var(--white);}
  .nav-logo em{color:var(--gold);font-style:normal;}
  .nav-links{display:flex;align-items:center;gap:1.8rem;list-style:none;}
  .nav-links a{color:var(--slate-light);font-size:.74rem;font-weight:500;text-decoration:none;letter-spacing:.07em;text-transform:uppercase;transition:color var(--tr);}
  .nav-links a:hover{color:var(--gold);}
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
  .section-title em{color:var(--gold);font-style:normal;}
  .section-title.light{color:var(--white);}
  .gold-bar{width:48px;height:3px;background:linear-gradient(90deg,var(--gold),var(--gold-dim));border-radius:2px;margin-bottom:1.5rem;}
  .gold-bar.center{margin-left:auto;margin-right:auto;}
  .reveal{opacity:0;transform:translateY(28px);transition:opacity .65s cubic-bezier(.4,0,.2,1),transform .65s cubic-bezier(.4,0,.2,1);}
  .reveal.visible{opacity:1;transform:none;}
  .story-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;}
  .quote-card{background:var(--navy);border:1px solid rgba(212,175,55,.2);border-radius:var(--radius-lg);padding:2.75rem 2.25rem;position:relative;}
  .quote-card::before{content:'"';position:absolute;top:-1.5rem;left:2rem;font-size:6rem;color:var(--gold);opacity:.18;font-family:Georgia,serif;line-height:1;}
  .quote-text{font-size:1.05rem;font-weight:500;line-height:1.85;color:var(--white);font-style:italic;}
  .quote-meta{margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,.08);}
  .quote-name{font-size:.95rem;font-weight:700;color:var(--white);}
  .quote-role{font-size:.67rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);}
  .vision-section{background:var(--off-white);border-top:1px solid rgba(212,175,55,.12);border-bottom:1px solid rgba(212,175,55,.12);}
  .vision-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;}
  .vcard{background:var(--white);border:1px solid rgba(0,24,42,.07);border-radius:var(--radius-lg);padding:2.75rem 2.25rem;transition:transform var(--tr),box-shadow var(--tr),border-color var(--tr);}
  .vcard:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,24,42,.1);border-color:var(--gold);}
  .vcard-icon{font-size:2rem;margin-bottom:1.25rem;display:block;}
  .vcard h3{font-size:1.1rem;font-weight:700;color:var(--navy);margin-bottom:.9rem;}
  .vcard p,.vcard-body{font-size:.875rem;line-height:1.8;color:var(--slate);}
  .mlist{list-style:none;display:flex;flex-direction:column;gap:.9rem;margin-top:.5rem;}
  .mlist li{display:flex;align-items:flex-start;gap:.75rem;font-size:.875rem;line-height:1.7;color:var(--slate);}
  .mcheck{width:18px;height:18px;border-radius:50%;background:var(--gold);flex-shrink:0;margin-top:.1rem;}
  .values-section{background:var(--navy);position:relative;overflow:hidden;}
  .values-section::before{content:'';position:absolute;inset:0;background-image:repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(212,175,55,.04) 59px,rgba(212,175,55,.04) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(212,175,55,.04) 59px,rgba(212,175,55,.04) 60px);}
  .values-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;position:relative;z-index:1;}
  .vval{border:1px solid rgba(212,175,55,.15);border-radius:var(--radius-md);padding:2rem 1.75rem;}
  .vval-num{font-size:2.5rem;font-weight:900;color:rgba(212,175,55,.15);line-height:1;margin-bottom:1rem;}
  .vval-title{font-size:.95rem;font-weight:700;color:var(--white);margin-bottom:.6rem;}
  .vval-body{font-size:.82rem;line-height:1.75;color:var(--slate-light);}
  .team-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;}
  .tcard{background:var(--white);border:1px solid rgba(0,24,42,.07);border-radius:var(--radius-lg);padding:2.5rem 2rem;text-align:center;transition:transform var(--tr),box-shadow var(--tr),border-color var(--tr);}
  .tcard:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,24,42,.1);border-color:var(--gold);}
  .tavatar{width:90px;height:90px;border-radius:50%;background:var(--navy);margin:0 auto 1.5rem;display:flex;align-items:center;justify-content:center;border:3px solid rgba(212,175,55,.3);}
  .tname{font-size:1.05rem;font-weight:700;color:var(--navy);margin-bottom:.3rem;}
  .trole{font-size:.67rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;}
  .tbio{font-size:.82rem;line-height:1.75;color:var(--slate);}
  footer{background:#000f1a;color:var(--slate-light);padding:5rem 0 2rem;}
  .footer-inner{max-width:1200px;margin:0 auto;padding:0 4rem;}
  .footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:4rem;}
  .fbrand-name{font-size:1.5rem;font-weight:800;color:var(--white);margin-bottom:.7rem;}
  .fbrand-name span{color:var(--gold);}
  .fbrand>p{font-size:.82rem;line-height:1.8;max-width:270px;}
  .fsocials{display:flex;gap:.7rem;margin-top:1.5rem;}
  .social-link{width:34px;height:34px;border-radius:var(--radius-sm);border:1px solid rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;font-size:.68rem;font-weight:700;text-transform:uppercase;color:var(--slate-light);text-decoration:none;transition:border-color var(--tr),color var(--tr),background var(--tr);}
  .social-link:hover{border-color:var(--gold);color:var(--gold);background:rgba(212,175,55,.08);}
  .fcol h4{font-size:.67rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--white);margin-bottom:1.2rem;}
  .fcol ul{list-style:none;display:flex;flex-direction:column;gap:.58rem;}
  .fcol ul li a{font-size:.8rem;color:var(--slate-light);text-decoration:none;transition:color var(--tr);}
  .fcol ul li a:hover{color:var(--gold);}
  .fbottom{border-top:1px solid rgba(255,255,255,.06);padding-top:2rem;display:flex;justify-content:space-between;align-items:center;font-size:.74rem;color:rgba(167,184,198,.45);}
  .fbottom span{color:var(--gold);}
  .scroll-top{position:fixed;bottom:2rem;right:2rem;z-index:999;width:44px;height:44px;border-radius:var(--radius-sm);background:var(--gold);color:var(--navy);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:700;opacity:0;transform:translateY(12px);transition:opacity var(--tr),transform var(--tr);pointer-events:none;}
  .scroll-top.visible{opacity:1;transform:none;pointer-events:all;}
  .scroll-top:hover{background:var(--gold-dim);}
  @media(max-width:960px){#navbar{padding:1rem 1.5rem;}.nav-links{display:none;}.container{padding:0 1.5rem;}.page-hero{padding:8rem 1.5rem 5rem;}.story-grid,.vision-grid,.team-grid,.values-grid{grid-template-columns:1fr;}.footer-top{grid-template-columns:1fr 1fr;}.fbottom{flex-direction:column;gap:.5rem;text-align:center;}}
  @media(max-width:600px){.footer-top{grid-template-columns:1fr;}}
`;

const IcoHR = () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IcoFin = () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8 11l3 3 5-5"/></svg>;
const IcoRkt = () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>;

const TEAM = [
  { name:'Ari', role:'Founder & CEO', bio:'HR professional dengan spesialisasi pengembangan organisasi dan talent management. Pencetus visi ekosistem 3 pilar ARRIVAR.', icon:<IcoHR/> },
  { name:'Aisha L.', role:'Head of FinTech', bio:'Pakar teknologi finansial dan AI. Memimpin pengembangan InvestGuard — platform wealth forecasting berbasis kecerdasan buatan.', icon:<IcoFin/> },
  { name:'Baskara', role:'VP Startup Ecosystem', bio:'Berpengalaman di industri Venture Capital. Bertanggung jawab kurasi dan pendampingan startup dalam ekosistem ARRIVAR.', icon:<IcoRkt/> },
];
const VALUES = [
  { num:'01', title:'Data-Driven', body:'Setiap keputusan dan rekomendasi kami didasarkan pada data dan analisis terukur, bukan asumsi belaka.' },
  { num:'02', title:'Holistic Growth', body:'Pertumbuhan sejati mencakup karir, finansial, dan bisnis secara bersamaan dalam satu ekosistem yang saling mendukung.' },
  { num:'03', title:'Impact First', body:'Dampak nyata bagi masyarakat Indonesia selalu menjadi prioritas utama di atas segalanya dalam setiap produk kami.' },
];

export default function About() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) setTimeout(() => { const y = el.getBoundingClientRect().top + window.pageYOffset - 100; window.scrollTo({ top: y, behavior: 'smooth' }); }, 100);
    } else { window.scrollTo(0, 0); }
    const handle = () => { setIsScrolled(window.scrollY > 40); setShowScrollTop(window.scrollY > 400); };
    window.addEventListener('scroll', handle);
    const obs = new IntersectionObserver((entries) => entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); obs.unobserve(e.target); } }), { threshold: 0.07 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => window.removeEventListener('scroll', handle);
  }, [location]);

  return (
    <>
      <style>{css}</style>
      <Helmet>
        <title>Tentang Kami — Visi, Misi & Tim | ARRIVAR.id</title>
        <meta name="description" content="Kenali PT ARRIVAR INDONESIA. Ekosistem digital pertama yang mensinergikan Career Development, Financial Intelligence, dan Startup Funding di Indonesia." />
      </Helmet>

      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo"><img src="/logo.png" alt="ARRIVAR Logo" /><span>ARRIVAR<em>.id</em></span></Link>
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/catalog">Katalog</Link></li>
          <li><Link to="/services">Layanan</Link></li>
          <li><Link to="/community">Komunitas</Link></li>
          <li><a href="#kontak" className="nav-cta">Hubungi Kami</a></li>
        </ul>
      </nav>

      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow reveal">Tentang PT ARRIVAR INDONESIA</span>
          <h1 className="reveal">Kami Membangun <em>Indonesia yang Lebih Maju</em></h1>
          <div className="accent-bar reveal" />
          <p className="reveal">ARRIVAR didirikan atas keyakinan bahwa pertumbuhan sejati lahir ketika karir, finansial, dan bisnis berkembang bersama — dalam satu ekosistem yang saling mendukung dan terintegrasi.</p>
        </div>
      </section>

      <section className="section" style={{background:'#fff'}}>
        <div className="container">
          <div className="story-grid">
            <div>
              <span className="eyebrow reveal">Latar Belakang</span>
              <h2 className="section-title reveal">Mengapa <em>ARRIVAR</em> Hadir?</h2>
              <div className="gold-bar reveal" />
              <p style={{fontSize:'.93rem',lineHeight:1.85,color:'var(--slate)',marginBottom:'1.5rem'}} className="reveal">Banyak profesional bekerja keras setiap hari namun merasa karirnya stagnan dan kondisi finansialnya tidak berkembang. Di sisi lain, para inovator muda sering terhenti karena kurangnya arah bisnis dan akses pendanaan yang tepat.</p>
              <p style={{fontSize:'.93rem',lineHeight:1.85,color:'var(--slate)'}} className="reveal">ARRIVAR.id hadir untuk memecahkan kebuntuan tersebut. Melalui pendekatan berbasis data dan AI, kami mengakselerasi profesional dan bisnis Indonesia menuju kemandirian yang sesungguhnya.</p>
            </div>
            <div className="reveal">
              <div className="quote-card">
                <p className="quote-text">"Goal kami cuma satu: membantu kamu mencapai kebebasan finansial secepat mungkin, dengan membangun fundamental karir dan bisnis yang tepat."</p>
                <div className="quote-meta"><div className="quote-name">Ari</div><div className="quote-role">Founder & CEO, ARRIVAR</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section vision-section" id="visi">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:620,margin:'0 auto 4rem'}}>
            <span className="eyebrow reveal">Landasan Perseroan</span>
            <h2 className="section-title reveal">Visi &amp; <em>Misi</em></h2>
            <div className="gold-bar center reveal" />
          </div>
          <div className="vision-grid">
            <div className="vcard reveal">
              <span className="vcard-icon">🎯</span>
              <h3>Visi Perseroan</h3>
              <p>Menjadi ekosistem akselerator terintegrasi terdepan di Indonesia yang menjembatani kesenjangan antara kompetensi profesional, kemandirian finansial, dan pertumbuhan bisnis inovatif.</p>
            </div>
            <div className="vcard reveal">
              <span className="vcard-icon">🚀</span>
              <h3>Misi Perseroan</h3>
              <ul className="mlist">
                {['Menyelenggarakan jasa pelatihan dan bimbingan karir untuk meningkatkan daya saing tenaga kerja nasional','Mengembangkan platform digital berbasis AI untuk literasi dan manajemen finansial masyarakat Indonesia','Bertindak sebagai fasilitator antara startup inovatif dan akses pendanaan modal ventura','Membangun solusi digital berkualitas tinggi (website, aplikasi, tools) untuk individu dan korporat'].map((t,i)=>(
                  <li key={i}><span className="mcheck"/>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:580,margin:'0 auto 4rem',position:'relative',zIndex:1}}>
            <span className="eyebrow reveal">Prinsip Kami</span>
            <h2 className="section-title light reveal">Nilai yang <em>Kami Pegang</em></h2>
            <div className="gold-bar center reveal" />
          </div>
          <div className="values-grid">
            {VALUES.map(v=>(
              <div className="vval reveal" key={v.num}>
                <div className="vval-num">{v.num}</div>
                <div className="vval-title">{v.title}</div>
                <div className="vval-body">{v.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="tim" style={{background:'#fff'}}>
        <div className="container">
          <div style={{textAlign:'center',maxWidth:620,margin:'0 auto 4rem'}}>
            <span className="eyebrow reveal">Para Ahli di Balik Layar</span>
            <h2 className="section-title reveal">Tim <em>Kepemimpinan</em></h2>
            <div className="gold-bar center reveal" />
            <p style={{fontSize:'.93rem',lineHeight:1.85,color:'var(--slate)',margin:'0 auto'}} className="reveal">Dibangun oleh profesional berpengalaman lintas industri dengan dedikasi penuh untuk memajukan ekosistem ekonomi Indonesia.</p>
          </div>
          <div className="team-grid">
            {TEAM.map(m=>(
              <div className="tcard reveal" key={m.name}>
                <div className="tavatar">{m.icon}</div>
                <div className="tname">{m.name}</div>
                <div className="trole">{m.role}</div>
                <p className="tbio">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="kontak" style={{background:'var(--off-white)',borderTop:'1px solid rgba(212,175,55,.12)'}}>
        <div className="container">
          <div className="reveal" style={{textAlign:'center',maxWidth:640,margin:'0 auto'}}>
            <span className="eyebrow">Bergabung Bersama Kami</span>
            <h2 className="section-title">Siap Tumbuh Bersama <em>ARRIVAR</em>?</h2>
            <div className="gold-bar center" />
            <p style={{fontSize:'.93rem',lineHeight:1.85,color:'var(--slate)',maxWidth:520,margin:'0 auto 2.5rem'}}>Baik sebagai klien, mitra, atau bagian dari tim — pintu ARRIVAR selalu terbuka untuk kolaborasi yang bermakna.</p>
            <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
              <Link to="/catalog" style={{display:'inline-flex',alignItems:'center',background:'var(--gold)',color:'var(--navy)',fontFamily:'var(--ff)',fontWeight:700,fontSize:'.82rem',letterSpacing:'.07em',textTransform:'uppercase',padding:'.9rem 2.1rem',borderRadius:'var(--radius-sm)',textDecoration:'none'}}>Lihat Katalog →</Link>
              <a href="mailto:admin@arrivar.id" style={{display:'inline-flex',alignItems:'center',background:'transparent',color:'var(--navy)',fontFamily:'var(--ff)',fontWeight:600,fontSize:'.82rem',letterSpacing:'.07em',textTransform:'uppercase',padding:'.9rem 2.1rem',borderRadius:'var(--radius-sm)',border:'1.5px solid rgba(0,24,42,.2)',textDecoration:'none'}}>Hubungi Kami</a>
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