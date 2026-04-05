import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Services() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Memastikan selalu mulai dari atas saat pindah halaman

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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Business Consulting",
    "provider": {
      "@type": "Organization",
      "name": "PT ARRIVAR INDONESIA",
      "url": "https://arrivar.id"
    },
    "areaServed": "Indonesia",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Layanan Konsultasi ARRIVAR",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate HR Consulting" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Startup Incubation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Financial Strategic Planning" } }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Layanan Jasa Profesional & Inkubasi Bisnis | ARRIVAR.id</title>
        <meta name="description" content="Layanan konsultasi SDM korporat, inkubasi startup, dan perencanaan keuangan strategis untuk pertumbuhan eksponensial karir dan bisnis Anda." />
        <meta name="keywords" content="Konsultasi HR, Inkubator Startup Jakarta, Strategic Business Consultant Indonesia, Penilaian Talenta" />
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>

      {/* NAVBAR UTUH */}
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo">
          <svg width="34" height="34" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="60,10 15,100 40,100 60,55 80,100 105,100" fill="url(#ng)"/>
            <line x1="35" y1="75" x2="90" y2="35" stroke="url(#ng2)" strokeWidth="10" strokeLinecap="round"/>
            <polygon points="90,35 75,38 88,50" fill="url(#ng)"/>
            <defs>
              <linearGradient id="ng" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#C9A84C"/><stop offset="100%" stopColor="#E2C878"/></linearGradient>
              <linearGradient id="ng2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#C9A84C"/><stop offset="100%" stopColor="#E2C878"/></linearGradient>
            </defs>
          </svg>
          <span>ARRIVAR<em>.id</em></span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/catalog">Katalog Produk</Link></li>
          <li><Link to="/community">Komunitas</Link></li>
          <li><a href="#kontak" className="nav-cta">Hubungi Kami</a></li>
        </ul>
      </nav>

      <div style={{ background: '#FFF', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
        
        {/* HERO SECTION LAYANAN */}
        <section style={{ padding: '10rem 5vw 6rem', textAlign: 'center', background: 'var(--cream)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          <div className="reveal" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C9A84C' }}>Solusi B2B & Eksekutif</span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3.5rem', color: '#1B2A4A', margin: '1.5rem 0' }}>Layanan Profesional untuk <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Pertumbuhan Eksponensial</em></h1>
            <p style={{ color: '#5A6580', fontSize: '1.15rem', lineHeight: 1.8 }}>
              Kami membantu korporasi mengoptimalkan SDM, merancang strategi finansial yang tangguh, dan mendampingi inovator membangun startup masa depan melalui ekosistem yang terintegrasi.
            </p>
          </div>
        </section>

        {/* DETAIL LAYANAN TIGA PILAR */}
        <section style={{ padding: '6rem 5vw' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
              
              {/* Jasa 1: HR */}
              <div className="reveal" style={{ background: '#F8F9FA', padding: '3rem', borderRadius: '8px', borderTop: '5px solid #1B2A4A', boxShadow: '0 10px 30px rgba(27,42,74,0.03)' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1.5rem' }}>🏢</span>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', marginBottom: '1rem' }}>Corporate HR & Talent Management</h2>
                <p style={{ color: '#6B7590', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>
                  Transformasi SDM berbasis data. Kami menyediakan jasa asesmen talenta, desain sistem kompensasi (Salary Structure), hingga program pelatihan kepemimpinan yang disesuaikan dengan industri Anda.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, color: '#1B2A4A', fontWeight: 600, fontSize: '0.9rem' }}>
                  <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.8rem' }}><span style={{ color: '#C9A84C' }}>✓</span> Talent Assessment & Analytics</li>
                  <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.8rem' }}><span style={{ color: '#C9A84C' }}>✓</span> Employee Engagement Strategy</li>
                  <li style={{ display: 'flex', gap: '0.8rem' }}><span style={{ color: '#C9A84C' }}>✓</span> HR Digital Transformation</li>
                </ul>
              </div>

              {/* Jasa 2: Business & Finance */}
              <div className="reveal" style={{ background: '#F8F9FA', padding: '3rem', borderRadius: '8px', borderTop: '5px solid #C9A84C', boxShadow: '0 10px 30px rgba(27,42,74,0.03)' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1.5rem' }}>🤝</span>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', marginBottom: '1rem' }}>Strategic Business & Finance</h2>
                <p style={{ color: '#6B7590', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>
                  Konsultasi tingkat eksekutif untuk market analysis, go-to-market strategy, serta audit kondisi keuangan komprehensif untuk merancang roadmap bisnis dan investasi yang aman.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, color: '#1B2A4A', fontWeight: 600, fontSize: '0.9rem' }}>
                  <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.8rem' }}><span style={{ color: '#C9A84C' }}>✓</span> Financial Health Audit</li>
                  <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.8rem' }}><span style={{ color: '#C9A84C' }}>✓</span> Go-to-Market Strategy</li>
                  <li style={{ display: 'flex', gap: '0.8rem' }}><span style={{ color: '#C9A84C' }}>✓</span> Business Model Optimization</li>
                </ul>
              </div>

              {/* Jasa 3: Startup */}
              <div className="reveal" style={{ background: '#F8F9FA', padding: '3rem', borderRadius: '8px', borderTop: '5px solid #1B2A4A', boxShadow: '0 10px 30px rgba(27,42,74,0.03)' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1.5rem' }}>💡</span>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', marginBottom: '1rem' }}>Startup Incubation & Accelerator</h2>
                <p style={{ color: '#6B7590', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>
                  Menjembatani inovasi dengan kapital. Program intensif untuk validasi produk (PMF), pengembangan operasional, hingga persiapan pitching untuk mendapatkan pendanaan modal ventura.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, color: '#1B2A4A', fontWeight: 600, fontSize: '0.9rem' }}>
                  <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.8rem' }}><span style={{ color: '#C9A84C' }}>✓</span> MVP Development Guidance</li>
                  <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.8rem' }}><span style={{ color: '#C9A84C' }}>✓</span> Investor Readiness Program</li>
                  <li style={{ display: 'flex', gap: '0.8rem' }}><span style={{ color: '#C9A84C' }}>✓</span> Access to ARRIVAR VC Network</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* METODOLOGI (PROSES KERJA) - PENTING UNTUK SEO & TRUST */}
        <section style={{ padding: '6rem 5vw', background: 'var(--white)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p className="section-label" style={{ color: 'var(--gold)', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' }}>Metodologi</p>
              <h2 className="section-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.8rem', color: 'var(--navy)' }}>Cara Kami Bekerja</h2>
              <div className="gold-divider centered" style={{ width: '70px', height: '3px', background: 'linear-gradient(90deg, var(--gold), var(--gold-light))', margin: '1.5rem auto' }}></div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="reveal" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', padding: '2rem', background: '#F8F9FA', borderRadius: '8px', border: '1px solid rgba(201,168,76,.15)' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 700, color: 'rgba(201,168,76,.3)', lineHeight: 1 }}>01</div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: '#1B2A4A', marginBottom: '0.5rem' }}>Discovery & Assessment</h3>
                  <p style={{ color: '#6B7590', lineHeight: 1.7, fontSize: '0.95rem' }}>Tim ahli kami akan melakukan audit menyeluruh terhadap infrastruktur HR, finansial, atau model bisnis perusahaan Anda untuk menemukan akar permasalahan dan potensi yang tersembunyi.</p>
                </div>
              </div>
              <div className="reveal" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', padding: '2rem', background: '#F8F9FA', borderRadius: '8px', border: '1px solid rgba(201,168,76,.15)' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 700, color: 'rgba(201,168,76,.3)', lineHeight: 1 }}>02</div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: '#1B2A4A', marginBottom: '0.5rem' }}>Strategic Roadmap Design</h3>
                  <p style={{ color: '#6B7590', lineHeight: 1.7, fontSize: '0.95rem' }}>Berdasarkan data (Data-Driven), kami menyusun cetak biru (blueprint) strategi yang terukur, lengkap dengan KPI (Key Performance Indicators) dan timeline eksekusi yang realistis.</p>
                </div>
              </div>
              <div className="reveal" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', padding: '2rem', background: '#F8F9FA', borderRadius: '8px', border: '1px solid rgba(201,168,76,.15)' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 700, color: 'rgba(201,168,76,.3)', lineHeight: 1 }}>03</div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: '#1B2A4A', marginBottom: '0.5rem' }}>Implementation & Evaluation</h3>
                  <p style={{ color: '#6B7590', lineHeight: 1.7, fontSize: '0.95rem' }}>Pendampingan secara intensif selama masa eksekusi. Kami melakukan evaluasi berkala untuk memastikan strategi berjalan optimal dan memberikan ROI (Return on Investment) yang dijanjikan.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION B2B */}
        <section id="kontak" className="reveal" style={{ padding: '6rem 5vw', background: '#1B2A4A', textAlign: 'center', color: '#FFF' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.8rem', marginBottom: '1.5rem' }}>Siap Berkolaborasi?</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: 1.8 }}>
              Diskusikan kebutuhan spesifik perusahaan Anda dengan tim ahli kami untuk mendapatkan proposal solusi yang personal dan berdampak nyata.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="mailto:hello@arrivar.id" style={{ background: '#C9A84C', color: '#0F1A30', padding: '1rem 2.5rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'transform 0.2s', display: 'inline-block' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>Jadwalkan Diskusi</a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" style={{ background: 'transparent', border: '2px solid #FFF', color: '#FFF', padding: '1rem 2.5rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'all 0.2s', display: 'inline-block' }} onMouseOver={e => {e.currentTarget.style.background = '#FFF'; e.currentTarget.style.color = '#1B2A4A';}} onMouseOut={e => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FFF';}}>Hubungi via WhatsApp</a>
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER UTUH */}
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
                <li><a href="#">InvestGuard App</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Perusahaan</h4>
              <ul>
                <li><a href="#">Tentang Kami</a></li>
                <li><a href="#visi">Visi & Misi</a></li>
                <li><a href="#">Tim Kami</a></li>
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