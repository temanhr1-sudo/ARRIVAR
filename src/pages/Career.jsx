import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{--navy:#00182A;--navy-mid:#0D2940;--gold:#D4AF37;--gold-dim:#B8962E;--white:#FFFFFF;--off-white:#F4F6F9;--slate:#394B5A;--slate-light:#A7B8C6;--ff:'Poppins',sans-serif;--radius-sm:6px;--radius-md:12px;--radius-lg:20px;--tr:0.3s cubic-bezier(0.4,0,0.2,1);}
  html{scroll-behavior:smooth;}body{font-family:var(--ff);background:var(--off-white);color:var(--navy);-webkit-font-smoothing:antialiased;}

  /* NAVBAR */
  #navbar{position:fixed;top:0;left:0;right:0;z-index:999;display:flex;align-items:center;justify-content:space-between;padding:1.1rem 4rem;background:var(--navy);border-bottom:1px solid rgba(212,175,55,.12);transition:padding var(--tr),box-shadow var(--tr);}
  #navbar.scrolled{padding:.7rem 4rem;box-shadow:0 6px 32px rgba(0,0,0,.5);}
  .nav-logo{display:flex;align-items:center;gap:.55rem;text-decoration:none;}.nav-logo img{height:30px;width:auto;object-fit:contain;}.nav-logo span{font-size:1.2rem;font-weight:800;letter-spacing:.04em;color:var(--white);}.nav-logo em{color:var(--gold);font-style:normal;}
  .nav-links{display:flex;align-items:center;gap:1.8rem;list-style:none;}.nav-links a{color:var(--slate-light);font-size:.74rem;font-weight:500;text-decoration:none;letter-spacing:.07em;text-transform:uppercase;transition:color var(--tr);}.nav-links a:hover{color:var(--gold);}
  .nav-cta{background:var(--gold)!important;color:var(--navy)!important;padding:.48rem 1.25rem!important;border-radius:var(--radius-sm)!important;font-weight:700!important;}

  /* PAGE HERO */
  .page-hero{background:var(--navy);padding:10rem 4rem 6rem;text-align:center;position:relative;overflow:hidden;}
  .page-hero::before{content:'';position:absolute;inset:0;background-image:repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(212,175,55,.04) 59px,rgba(212,175,55,.04) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(212,175,55,.04) 59px,rgba(212,175,55,.04) 60px);}
  .page-hero-inner{position:relative;z-index:1;max-width:780px;margin:0 auto;}
  .eyebrow{font-size:.68rem;font-weight:700;letter-spacing:.17em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;display:block;}
  .page-hero h1{font-size:clamp(2.2rem,4.5vw,3.8rem);font-weight:800;line-height:1.1;color:var(--white);letter-spacing:-.015em;margin-bottom:1.5rem;}
  .page-hero h1 em{color:var(--gold);font-style:normal;}
  .page-hero p{font-size:1rem;line-height:1.85;color:var(--slate-light);max-width:560px;margin:0 auto;}
  .accent-bar{width:48px;height:3px;background:linear-gradient(90deg,var(--gold),var(--gold-dim));border-radius:2px;margin:1.5rem auto;}

  /* UTILS */
  .section{padding:6rem 0;}.container{max-width:1200px;margin:0 auto;padding:0 4rem;}
  .section-title{font-size:clamp(1.8rem,3.5vw,2.75rem);font-weight:800;line-height:1.15;color:var(--navy);margin-bottom:1rem;}
  .section-title em{color:var(--gold);font-style:normal;}.section-title.light{color:var(--white);}
  .gold-bar{width:48px;height:3px;background:linear-gradient(90deg,var(--gold),var(--gold-dim));border-radius:2px;margin-bottom:1.5rem;}.gold-bar.center{margin-left:auto;margin-right:auto;}
  .reveal{opacity:0;transform:translateY(28px);transition:opacity .65s cubic-bezier(.4,0,.2,1),transform .65s cubic-bezier(.4,0,.2,1);}.reveal.visible{opacity:1;transform:none;}

  /* WHY JOIN */
  .why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;}
  .why-card{background:var(--white);border:1px solid rgba(0,24,42,.07);border-radius:var(--radius-lg);padding:2.5rem 2rem;border-top:3px solid transparent;transition:transform var(--tr),box-shadow var(--tr),border-top-color var(--tr);}
  .why-card:hover{transform:translateY(-6px);box-shadow:0 24px 56px rgba(0,24,42,.1);border-top-color:var(--gold);}
  .why-icon{width:52px;height:52px;border-radius:var(--radius-md);background:var(--navy);display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;}
  .why-title{font-size:1.05rem;font-weight:700;color:var(--navy);margin-bottom:.65rem;}
  .why-body{font-size:.86rem;line-height:1.8;color:var(--slate);}

  /* PERKS */
  .perks-section{background:var(--navy);position:relative;overflow:hidden;}
  .perks-section::before{content:'';position:absolute;inset:0;background-image:repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(212,175,55,.04) 59px,rgba(212,175,55,.04) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(212,175,55,.04) 59px,rgba(212,175,55,.04) 60px);}
  .perks-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;position:relative;z-index:1;}
  .perk{border:1px solid rgba(212,175,55,.15);border-radius:var(--radius-md);padding:1.75rem 1.5rem;}
  .perk-num{font-size:2rem;font-weight:900;color:rgba(212,175,55,.2);line-height:1;margin-bottom:.75rem;}
  .perk-title{font-size:.88rem;font-weight:700;color:var(--white);margin-bottom:.45rem;}
  .perk-body{font-size:.78rem;line-height:1.7;color:var(--slate-light);}

  /* POSITIONS */
  .positions-section{background:var(--off-white);border-top:1px solid rgba(212,175,55,.12);border-bottom:1px solid rgba(212,175,55,.12);}
  .positions-list{display:flex;flex-direction:column;gap:1rem;max-width:860px;margin:0 auto;}
  .job-card{background:var(--white);border:1px solid rgba(0,24,42,.07);border-radius:var(--radius-md);padding:1.75rem 2rem;display:flex;justify-content:space-between;align-items:center;gap:1.5rem;flex-wrap:wrap;transition:border-color var(--tr),box-shadow var(--tr),transform var(--tr);}
  .job-card:hover{border-color:var(--gold);box-shadow:0 8px 28px rgba(0,24,42,.08);transform:translateX(4px);}
  .job-dept-badge{display:inline-block;font-size:.62rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);background:rgba(212,175,55,.1);padding:.25rem .75rem;border-radius:100px;border:1px solid rgba(212,175,55,.25);margin-bottom:.5rem;}
  .job-title{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.35rem;}
  .job-meta{font-size:.75rem;color:var(--slate-light);font-weight:500;display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;}
  .job-meta-dot{width:3px;height:3px;border-radius:50%;background:var(--slate-light);}
  .job-apply{display:inline-flex;align-items:center;background:var(--navy);color:var(--gold);padding:.6rem 1.4rem;border-radius:var(--radius-sm);text-decoration:none;font-weight:700;font-size:.74rem;letter-spacing:.07em;text-transform:uppercase;white-space:nowrap;transition:background var(--tr),color var(--tr);}
  .job-apply:hover{background:var(--gold);color:var(--navy);}

  /* OPEN APPLICATION */
  .open-app{background:var(--white);border:1.5px dashed rgba(212,175,55,.35);border-radius:var(--radius-lg);padding:3rem 2.5rem;text-align:center;margin-top:2rem;}
  .open-app-title{font-size:1.1rem;font-weight:700;color:var(--navy);margin-bottom:.6rem;}
  .open-app-body{font-size:.86rem;line-height:1.8;color:var(--slate);margin-bottom:1.5rem;}
  .open-app a{color:var(--gold);font-weight:700;text-decoration:none;}
  .open-app a:hover{text-decoration:underline;}

  /* FOOTER */
  footer{background:#000f1a;color:var(--slate-light);padding:5rem 0 2rem;}
  .footer-inner{max-width:1200px;margin:0 auto;padding:0 4rem;}
  .footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:4rem;}
  .fbrand-name{font-size:1.5rem;font-weight:800;color:var(--white);margin-bottom:.7rem;}.fbrand-name span{color:var(--gold);}
  .fbrand>p{font-size:.82rem;line-height:1.8;max-width:270px;}
  .fsocials{display:flex;gap:.7rem;margin-top:1.5rem;}
  .social-link{width:34px;height:34px;border-radius:var(--radius-sm);border:1px solid rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;font-size:.68rem;font-weight:700;text-transform:uppercase;color:var(--slate-light);text-decoration:none;transition:border-color var(--tr),color var(--tr),background var(--tr);}
  .social-link:hover{border-color:var(--gold);color:var(--gold);background:rgba(212,175,55,.08);}
  .fcol h4{font-size:.67rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--white);margin-bottom:1.2rem;}
  .fcol ul{list-style:none;display:flex;flex-direction:column;gap:.58rem;}.fcol ul li a{font-size:.8rem;color:var(--slate-light);text-decoration:none;transition:color var(--tr);}.fcol ul li a:hover,.fcol ul li a.active{color:var(--gold);}
  .fbottom{border-top:1px solid rgba(255,255,255,.06);padding-top:2rem;display:flex;justify-content:space-between;align-items:center;font-size:.74rem;color:rgba(167,184,198,.45);}.fbottom span{color:var(--gold);}
  .scroll-top{position:fixed;bottom:2rem;right:2rem;z-index:999;width:44px;height:44px;border-radius:var(--radius-sm);background:var(--gold);color:var(--navy);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:700;opacity:0;transform:translateY(12px);transition:opacity var(--tr),transform var(--tr);pointer-events:none;}
  .scroll-top.visible{opacity:1;transform:none;pointer-events:all;}.scroll-top:hover{background:var(--gold-dim);}

  @media(max-width:960px){
    #navbar{padding:1rem 1.5rem;}.nav-links{display:none;}
    .container{padding:0 1.5rem;}.page-hero{padding:8rem 1.5rem 5rem;}
    .why-grid{grid-template-columns:1fr;}.perks-grid{grid-template-columns:repeat(2,1fr);}
    .job-card{flex-direction:column;align-items:flex-start;}
    .footer-top{grid-template-columns:1fr 1fr;}.fbottom{flex-direction:column;gap:.5rem;text-align:center;}
  }
  @media(max-width:600px){.footer-top{grid-template-columns:1fr;}.perks-grid{grid-template-columns:1fr;}}
`;

const IcoRocket = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
  </svg>
);
const IcoTeam = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IcoImpact = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);

const WHY = [
  { icon: <IcoRocket />, title: 'Pertumbuhan Cepat', body: 'Lingkungan startup yang dinamis memungkinkan Anda belajar banyak hal dalam waktu singkat dan langsung memberi dampak pada produk nyata.' },
  { icon: <IcoTeam />, title: 'Budaya Kolaboratif', body: 'Tidak ada sekat antar departemen. Ide brilian bisa datang dari siapa saja dan kapan saja — dan kami selalu mendengarkan.' },
  { icon: <IcoImpact />, title: 'Misi yang Berarti', body: 'Setiap baris kode dan strategi yang Anda buat secara langsung membantu masyarakat Indonesia mencapai kebebasan finansial.' },
];

const PERKS = [
  { num: '01', title: 'Remote-Friendly', body: 'Fleksibilitas kerja dari mana saja untuk sebagian besar posisi.' },
  { num: '02', title: 'Learning Budget', body: 'Anggaran khusus untuk kursus, buku, dan konferensi industri.' },
  { num: '03', title: 'Equity & Bonus', body: 'Program insentif berbasis performa yang transparan dan kompetitif.' },
  { num: '04', title: 'Health Coverage', body: 'Asuransi kesehatan untuk karyawan tetap dan keluarga inti.' },
];

const JOBS = [
  { id:1, dept:'Marketing',  title:'Growth Marketing Lead',             type:'Full-time',  location:'Jakarta / Remote' },
  { id:2, dept:'Tech',       title:'Fullstack Developer (React / Node)', type:'Full-time',  location:'Jakarta / Hybrid' },
  { id:3, dept:'Education',  title:'Career Coach & Mentor',              type:'Part-time',  location:'Remote' },
  { id:4, dept:'Finance',    title:'Financial Content Strategist',       type:'Full-time',  location:'Remote' },
  { id:5, dept:'Design',     title:'UI/UX Designer',                     type:'Contract',   location:'Remote / Jakarta' },
];

export default function Career() {
  const [isScrolled, setIsScrolled]     = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handle = () => { setIsScrolled(window.scrollY > 40); setShowScrollTop(window.scrollY > 400); };
    window.addEventListener('scroll', handle);
    const obs = new IntersectionObserver((entries) => entries.forEach((e, i) => {
      if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); obs.unobserve(e.target); }
    }), { threshold: 0.07 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <>
      <style>{css}</style>
      <Helmet>
        <title>Karir & Peluang Bergabung | ARRIVAR.id</title>
        <meta name="description" content="Bergabunglah dengan tim ARRIVAR.id dan bantu kami membangun ekosistem karir serta finansial masa depan Indonesia." />
      </Helmet>

      {/* NAVBAR */}
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo"><img src="/logo.png" alt="ARRIVAR Logo" /><span>ARRIVAR<em>.id</em></span></Link>
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/catalog">Katalog</Link></li>
          <li><Link to="/services">Layanan</Link></li>
          <li><Link to="/about">Tentang Kami</Link></li>
        </ul>
      </nav>

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow reveal">Work With Us</span>
          <h1 className="reveal">Bangun Masa Depan <em>Bersama Kami</em></h1>
          <div className="accent-bar reveal" />
          <p className="reveal">Kami mencari individu yang haus akan inovasi, memiliki empati tinggi, dan ingin memberikan dampak nyata bagi literasi finansial dan ekosistem karir Indonesia.</p>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="section" style={{background:'#fff'}}>
        <div className="container">
          <div style={{textAlign:'center',maxWidth:580,margin:'0 auto 4rem'}}>
            <span className="eyebrow reveal">Alasan Bergabung</span>
            <h2 className="section-title reveal">Mengapa <em>ARRIVAR?</em></h2>
            <div className="gold-bar center reveal" />
            <p style={{fontSize:'.93rem',lineHeight:1.85,color:'var(--slate)',margin:'0 auto'}} className="reveal">Kami bukan sekadar startup — kami membangun ekosistem yang akan mengubah cara Indonesia tumbuh secara profesional dan finansial.</p>
          </div>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <div className="why-card reveal" key={i}>
                <div className="why-icon">{w.icon}</div>
                <div className="why-title">{w.title}</div>
                <p className="why-body">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="section perks-section">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:520,margin:'0 auto 4rem',position:'relative',zIndex:1}}>
            <span className="eyebrow reveal">Yang Kami Tawarkan</span>
            <h2 className="section-title light reveal">Benefit &amp; <em>Fasilitas</em></h2>
            <div className="gold-bar center reveal" />
          </div>
          <div className="perks-grid">
            {PERKS.map(p => (
              <div className="perk reveal" key={p.num}>
                <div className="perk-num">{p.num}</div>
                <div className="perk-title">{p.title}</div>
                <div className="perk-body">{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="section positions-section">
        <div className="container">
          <div style={{textAlign:'center',maxWidth:580,margin:'0 auto 4rem'}}>
            <span className="eyebrow reveal">Posisi Terbuka</span>
            <h2 className="section-title reveal">Temukan <em>Peran yang Tepat</em></h2>
            <div className="gold-bar center reveal" />
            <p style={{fontSize:'.93rem',lineHeight:1.85,color:'var(--slate)',margin:'0 auto'}} className="reveal">Semua posisi menyambut individu yang bersemangat untuk belajar dan tumbuh bersama ARRIVAR.</p>
          </div>

          <div className="positions-list">
            {JOBS.map(job => (
              <div className="job-card reveal" key={job.id}>
                <div>
                  <span className="job-dept-badge">{job.dept}</span>
                  <div className="job-title">{job.title}</div>
                  <div className="job-meta">
                    <span>{job.type}</span>
                    <span className="job-meta-dot" />
                    <span>{job.location}</span>
                  </div>
                </div>
                <a href="mailto:karir@arrivar.id" className="job-apply">Lamar Sekarang →</a>
              </div>
            ))}
          </div>

          <div className="open-app reveal">
            <div className="open-app-title">Tidak menemukan posisi yang cocok?</div>
            <p className="open-app-body">Kami selalu terbuka untuk talenta luar biasa. Kirimkan CV dan portofolio Anda beserta posisi yang ingin Anda lamar.</p>
            <a href="mailto:karir@arrivar.id">karir@arrivar.id →</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="fbrand">
              <div className="fbrand-name">ARRIVAR<span>.id</span></div>
              <p>Ekosistem digital pertama di Indonesia untuk karir, finansial, dan startup — dalam satu platform terintegrasi.</p>
              <div className="fsocials">
                <a href="https://www.linkedin.com/company/arrivar-id" target="_blank" rel="noopener noreferrer" className="social-link">in</a>
                <a href="https://www.instagram.com/arrivar.id" target="_blank" rel="noopener noreferrer" className="social-link">ig</a>
                <a href="https://www.threads.com/@arrivar.id" target="_blank" rel="noopener noreferrer" className="social-link">tr</a>
              </div>
            </div>
            <div className="fcol"><h4>Ekosistem</h4><ul>
              <li><Link to="/catalog">Katalog Produk</Link></li>
              <li><Link to="/community">Komunitas</Link></li>
              <li><Link to="/services">Layanan Jasa</Link></li>
              <li><a href="https://www.investguard.id" target="_blank" rel="noopener noreferrer">InvestGuard App</a></li>
            </ul></div>
            <div className="fcol"><h4>Perusahaan</h4><ul>
              <li><Link to="/about">Tentang Kami</Link></li>
              <li><Link to="/privacy">Kebijakan Privasi</Link></li>
              <li><Link to="/legal">Syarat &amp; Ketentuan</Link></li>
              <li><Link to="/career" className="active">Karir</Link></li>
            </ul></div>
            <div className="fcol"><h4>Kontak</h4><ul>
              <li><a href="mailto:admin@arrivar.id">admin@arrivar.id</a></li>
              <li><a href="mailto:karir@arrivar.id">karir@arrivar.id</a></li>
              <li><a href="#">Jakarta, Indonesia</a></li>
              <li><a href="https://www.arrivar.id">PT ARRIVAR INDONESIA</a></li>
            </ul></div>
          </div>
          <div className="fbottom">
            <p>© 2026 <span>PT ARRIVAR INDONESIA</span>. All rights reserved.</p>
            <p>Empowering Indonesia's Future — <span>Career · Financial · Startup</span></p>
          </div>
        </div>
      </footer>
      <button className={`scroll-top${showScrollTop?' visible':''}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑</button>
    </>
  );
}