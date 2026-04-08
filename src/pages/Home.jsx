import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) { 
          setTimeout(() => e.target.classList.add('visible'), i * 80); 
          revealObs.unobserve(e.target); 
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SCHEMA MARKUP UNTUK SEO GOOGLE (WEBSITE TYPE)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ARRIVAR.id",
    "url": "https://arrivar.id",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://arrivar.id/catalog?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Helmet>
        <title>ARRIVAR Indonesia — Ekosistem Karir, Finansial & Startup</title>
        <meta name="description" content="Ekosistem holistik pertama di Indonesia yang mensinergikan Career Development, Financial Intelligence, dan Startup Ecosystem dalam satu platform terintegrasi." />
        <meta name="keywords" content="Pengembangan Karir, Platform Finansial AI, Inkubator Startup, ARRIVAR Indonesia, Ekosistem Profesional" />
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>

      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo">
          {/* LOGO ASLI + TEKS ARRIVAR */}
          <img src="/logo.png" alt="ARRIVAR Logo" style={{ height: '34px', width: 'auto', objectFit: 'contain' }} />
          <span>ARRIVAR<em>.id</em></span>
        </Link>
        <ul className="nav-links">
          <li><a href="#pillars">Ekosistem</a></li>
          <li><a href="#visi">Visi</a></li>
          <li><Link to="/services">Layanan Jasa</Link></li>
          <li><Link to="/catalog">Katalog Produk</Link></li>
          <li><Link to="/community">Komunitas</Link></li>
          <li><a href="#kontak" className="nav-cta">Hubungi Kami</a></li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-badge"><span></span> PT ARRIVAR INDONESIA — ARRIVAR.id</div>
          <h1>Akselerasi Karir, <em>Finansial & Bisnis</em></h1>
          <p className="hero-sub">Ekosistem holistik pertama di Indonesia yang mensinergikan Career Development, Financial Intelligence, dan Startup Ecosystem dalam satu platform terintegrasi.</p>
          <div className="hero-btns">
            <Link to="/catalog" className="btn-primary">Lihat Katalog</Link>
            <a href="#kontak" className="btn-outline">Hubungi Kami</a>
          </div>
          <div className="hero-stats">
            <div className="stat"><div className="stat-num">3</div><div className="stat-label">Pilar Ekosistem</div></div>
            <div className="stat-div"></div>
            <div className="stat"><div className="stat-num">AI</div><div className="stat-label">Berbasis Data & Kecerdasan Buatan</div></div>
            <div className="stat-div"></div>
            <div className="stat"><div className="stat-num">1×</div><div className="stat-label">Platform Terintegrasi</div></div>
          </div>
        </div>
      </section>

      <section className="section" id="pillars">
        <div className="pillars-header reveal">
          <p className="section-label">Tiga Pilar Utama</p>
          <h2 className="section-title">Satu Ekosistem, <em>Tiga Kekuatan</em></h2>
          <div className="gold-divider centered"></div>
          <p className="section-body">ARRIVAR hadir sebagai ekosistem holistik yang menjembatani kesenjangan antara kompetensi profesional, kemandirian finansial, dan pertumbuhan bisnis inovatif.</p>
        </div>
        <div className="pillars-grid">
          
          <div className="pillar reveal">
            <span className="pillar-num">01</span>
            <div className="pillar-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '16px', background: 'var(--navy, #111827)', marginBottom: '1.5rem', boxShadow: '0 4px 14px rgba(212, 175, 55, 0.15)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #D4AF37)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
            </div>
            <h3>Career Accelerator</h3>
            <p>Mentoring, pengembangan skill, dan optimalisasi SDM untuk mencetak profesional yang berdaya saing tinggi di era modern.</p>
            <div className="pillar-tag">Career Development & HR</div>
          </div>
          
          <div className="pillar reveal">
            <span className="pillar-num">02</span>
            <div className="pillar-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '16px', background: 'var(--navy, #111827)', marginBottom: '1.5rem', boxShadow: '0 4px 14px rgba(212, 175, 55, 0.15)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #D4AF37)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M8 11l3 3 5-5"></path>
              </svg>
            </div>
            <h3>Financial Ecosystem</h3>
            <p>Platform cerdas berbasis AI untuk literasi, manajemen risiko, dan wealth forecasting. Termasuk <strong>InvestGuard</strong> — aplikasi finansial unggulan kami.</p>
            <div className="pillar-tag">FinTech & InvestGuard</div>
          </div>
          
          <div className="pillar reveal">
            <span className="pillar-num">03</span>
            <div className="pillar-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '16px', background: 'var(--navy, #111827)', marginBottom: '1.5rem', boxShadow: '0 4px 14px rgba(212, 175, 55, 0.15)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #D4AF37)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
              </svg>
            </div>
            <h3>Startup Funding</h3>
            <p>Inkubasi bisnis dan fasilitasi akses modal ventura. Mendampingi startup potensial hingga terhubung dengan investor yang tepat.</p>
            <div className="pillar-tag">Inkubasi & Pendanaan</div>
          </div>
          
        </div>
      </section>

      <section className="section vision" id="visi">
        <div className="vision-inner">
          <div className="reveal">
            <p className="section-label">Visi & Misi</p>
            <h2 className="section-title">Membangun Masa Depan Indonesia</h2>
            <div className="gold-divider"></div>
            <p className="section-body">Melalui pendekatan berbasis data dan kecerdasan buatan, kami mengakselerasi masyarakat dan profesional Indonesia menuju kemandirian finansial.</p>
            <ul className="vision-list">
              <li>Menyelenggarakan jasa pelatihan dan bimbingan karir profesional untuk meningkatkan daya saing tenaga kerja nasional</li>
              <li>Mengembangkan platform digital yang berfokus pada literasi dan manajemen finansial masyarakat Indonesia</li>
              <li>Bertindak sebagai ekosistem fasilitator antara startup inovatif dan akses pendanaan modal ventura</li>
              <li>Menjadi akselerator terintegrasi terdepan yang menjembatani kompetensi profesional dan kemandirian finansial</li>
            </ul>
          </div>
          <div className="reveal">
            <div className="vision-quote">"Menjadi ekosistem akselerator terintegrasi terdepan di Indonesia yang menjembatani kesenjangan antara kompetensi profesional, kemandirian finansial, dan pertumbuhan bisnis inovatif."</div>
          </div>
        </div>
      </section>

      <section className="section" id="layanan" style={{ background: 'var(--cream)' }}>
        <div className="services-inner">
          <div className="services-top">
            <div className="reveal">
              <p className="section-label">Kegiatan Usaha</p>
              <h2 className="section-title">Layanan <em>Jasa B2B</em></h2>
              <div className="gold-divider"></div>
            </div>
            <p className="section-body reveal" style={{ textAlign: 'right', maxWidth: '400px' }}>
              Klik layanan di bawah ini untuk melihat detail solusi strategis yang kami tawarkan untuk korporasi dan perusahaan rintisan Anda.
            </p>
          </div>
          
          <div className="services-list">
            <Link to="/services" className="service-row reveal" style={{ textDecoration: 'none', display: 'grid' }}>
              <div className="sr-num">01</div>
              <div>
                <div className="sr-title" style={{ transition: 'color 0.3s' }}>Corporate HR & Talent Development</div>
                <div className="sr-desc" style={{ transition: 'color 0.3s' }}>Bimbingan dan konsultasi pengembangan karir profesional serta SDM untuk meningkatkan daya saing tenaga kerja nasional.</div>
              </div>
              <div className="sr-arr">→</div>
            </Link>
            
            <Link to="/services" className="service-row reveal" style={{ textDecoration: 'none', display: 'grid' }}>
              <div className="sr-num">02</div>
              <div>
                <div className="sr-title" style={{ transition: 'color 0.3s' }}>Strategic Business & Financial Consulting</div>
                <div className="sr-desc" style={{ transition: 'color 0.3s' }}>Konsultasi manajemen strategi bisnis jangka panjang, optimalisasi aset, dan roadmap finansial untuk eksekutif dan korporat.</div>
              </div>
              <div className="sr-arr">→</div>
            </Link>
            
            <Link to="/services" className="service-row reveal" style={{ textDecoration: 'none', display: 'grid' }}>
              <div className="sr-num">03</div>
              <div>
                <div className="sr-title" style={{ transition: 'color 0.3s' }}>Startup Incubation & Accelerator</div>
                <div className="sr-desc" style={{ transition: 'color 0.3s' }}>Konsultasi manajemen strategis dan inkubasi bisnis. Menghubungkan startup potensial dengan akses pendanaan modal ventura yang tepat.</div>
              </div>
              <div className="sr-arr">→</div>
            </Link>
          </div>
          
          <div className="reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
             <Link to="/services" className="btn-primary" style={{ display: 'inline-block' }}>Pelajari Semua Layanan Kami</Link>
          </div>
        </div>
      </section>

      <section className="section cta-band" id="kontak">
        <div className="cta-band-inner reveal">
          <p className="section-label" style={{ color: 'var(--gold)' }}>Mulai Perjalanan Anda</p>
          <h2 className="section-title">Siap Naik Level Bersama <em>ARRIVAR</em>?</h2>
          <div className="gold-divider centered"></div>
          <p className="section-body">Bergabunglah dengan ribuan profesional yang telah mengakselerasi karir, keuangan, dan bisnis mereka bersama ekosistem ARRIVAR.id.</p>
          <div className="hero-btns">
            <Link to="/catalog" className="btn-primary">Lihat Katalog</Link>
            <a href="mailto:hello@arrivar.id" className="btn-outline">Email Kami</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: 'var(--white)', marginBottom: '.5rem' }}>ARRIVAR<span style={{ color: 'var(--gold)' }}>.id</span></p>
              <p>Ekosistem akselerator terintegrasi untuk karir, finansial, dan startup Indonesia. Satu platform, tiga kekuatan.</p>
              <div style={{ marginTop: '1.8rem', display: 'flex', gap: '1rem' }}>
                <a href="#" className="social-link">in</a>
                <a href="#" className="social-link">ig</a>
                <a href="#" className="social-link">tk</a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Ekosistem</h4>
              <ul>
                <li><Link to="/catalog">Katalog Produk</Link></li>
                <li><Link to="/community">Komunitas</Link></li>
                <li><Link to="/services">Layanan Jasa</Link></li>
                <li><Link to="/investguard">InvestGuard App</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Perusahaan</h4>
              <ul>
                <li><Link to="/about">Tentang Kami</Link></li>
                <li><Link to="/privacy">Kebijakan Privasi</Link></li>
                <li><Link to="/legal">Syarat & Ketentuan</Link></li>
                <li><a href="#">Karir</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Kontak</h4>
              <ul>
                <li><a href="mailto:hello@arrivar.id">hello@arrivar.id</a></li>
                <li><a href="#">Jakarta, Indonesia</a></li>
                <li><a href="#">PT ARRIVAR INDONESIA</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 <span>PT ARRIVAR INDONESIA</span>. All rights reserved.</p>
            <p>Empowering Indonesia's Future — <span>Career · Financial · Startup</span></p>
          </div>
        </div>
      </footer>

      <button className={`scroll-top ${showScrollTop ? 'visible' : ''}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>↑</button>
    </>
  );
}