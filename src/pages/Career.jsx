import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Career() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
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

  const openPositions = [
    { id: 1, title: 'Growth Marketing Lead', dept: 'Marketing', type: 'Full-time', location: 'Jakarta / Remote' },
    { id: 2, title: 'Fullstack Developer (React/Node)', dept: 'Tech', type: 'Full-time', location: 'Jakarta / Hybrid' },
    { id: 3, title: 'Career Coach & Mentor', dept: 'Education', type: 'Part-time', location: 'Remote' }
  ];

  return (
    <>
      <Helmet>
        <title>Karir & Peluang Bergabung | ARRIVAR.id</title>
        <meta name="description" content="Bergabunglah dengan tim ARRIVAR.id dan bantu kami membangun ekosistem karir serta finansial masa depan Indonesia. Lihat lowongan kerja terbaru di sini." />
        <meta name="keywords" content="Lowongan Kerja Startup, Karir ARRIVAR, Kerja di Fintech, HR Developer Jobs Jakarta" />
      </Helmet>

      {/* NAVBAR */}
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo">
          {/* LOGO ASLI + TEKS ARRIVAR */}
          <img src="/logo.png" alt="ARRIVAR Logo" style={{ height: '34px', width: 'auto', objectFit: 'contain' }} />
          <span>ARRIVAR<em>.id</em></span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/catalog">Katalog</Link></li>
          <li><Link to="/services">Layanan</Link></li>
        </ul>
      </nav>

      <div style={{ background: '#FFF', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
        
        {/* HERO CAREER */}
        <section style={{ padding: '10rem 5vw 6rem', textAlign: 'center', background: 'var(--cream)' }}>
          <div className="reveal" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C9A84C' }}>Work With Us</span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3.5rem', color: '#1B2A4A', margin: '1.5rem 0' }}>Bangun Masa Depan <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Bersama Kami</em></h1>
            <p style={{ color: '#5A6580', fontSize: '1.15rem', lineHeight: 1.8 }}>
              Kami mencari individu yang haus akan inovasi, memiliki empati tinggi, dan ingin memberikan dampak nyata bagi literasi finansial Indonesia.
            </p>
          </div>
        </section>

        {/* WHY JOIN US */}
        <section style={{ padding: '6rem 5vw' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
             <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: '#1B2A4A' }}>Mengapa Bergabung di ARRIVAR?</h2>
              <div style={{ width: '60px', height: '3px', background: '#C9A84C', margin: '1.5rem auto' }}></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              <div className="reveal" style={{ padding: '2rem', background: '#F8F9FA', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚀</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: '#1B2A4A' }}>Pertumbuhan Cepat</h3>
                <p style={{ color: '#6B7590', fontSize: '0.9rem', lineHeight: 1.6 }}>Lingkungan startup yang dinamis memungkinkan Anda belajar banyak hal dalam waktu singkat.</p>
              </div>
              <div className="reveal" style={{ padding: '2rem', background: '#F8F9FA', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🤝</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: '#1B2A4A' }}>Budaya Kolaboratif</h3>
                <p style={{ color: '#6B7590', fontSize: '0.9rem', lineHeight: 1.6 }}>Tidak ada sekat antar departemen. Ide brilian bisa datang dari siapa saja, kapan saja.</p>
              </div>
              <div className="reveal" style={{ padding: '2rem', background: '#F8F9FA', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📈</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: '#1B2A4A' }}>Misi Sosial</h3>
                <p style={{ color: '#6B7590', fontSize: '0.9rem', lineHeight: 1.6 }}>Setiap baris kode dan strategi yang Anda buat membantu orang lain mencapai kebebasan finansial.</p>
              </div>
            </div>
          </div>
        </section>

        {/* OPEN POSITIONS */}
        <section style={{ padding: '6rem 5vw', background: '#F8F9FA' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 className="reveal" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: '#1B2A4A', textAlign: 'center', marginBottom: '3rem' }}>Posisi Terbuka</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {openPositions.map(job => (
                <div key={job.id} className="reveal" style={{ background: '#FFF', padding: '1.5rem 2rem', borderRadius: '8px', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: '#1B2A4A', marginBottom: '0.3rem' }}>{job.title}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#8B95A8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{job.dept} • {job.type} • {job.location}</span>
                  </div>
                  <a href="mailto:karir@arrivar.id" style={{ background: '#1B2A4A', color: '#C9A84C', padding: '0.7rem 1.5rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>Lamar Sekarang</a>
                </div>
              ))}
            </div>

            <div className="reveal" style={{ textAlign: 'center', marginTop: '4rem' }}>
              <p style={{ color: '#8B95A8' }}>Tidak menemukan posisi yang cocok? Kirimkan CV Anda ke <a href="mailto:karir@arrivar.id" style={{ color: '#C9A84C', fontWeight: 'bold' }}>karir@arrivar.id</a></p>
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer style={{ background: '#0F1A30', padding: '6rem 5vw 2rem', color: 'rgba(255,255,255,.5)' }}>
        <div className="footer-inner" style={{ maxWidth: '1150px', margin: '0 auto' }}>
          <div className="footer-top" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '5rem' }}>
            <div className="footer-brand">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: 'var(--white)' }}>ARRIVAR<span style={{ color: 'var(--gold)' }}>.id</span></p>
              <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,.5)', maxWidth: '300px', marginTop: '1rem' }}>Ekosistem akselerator terintegrasi untuk karir, finansial, dan startup Indonesia.</p>
            </div>
            <div className="footer-col">
              <h4 style={{ fontSize: '.8rem', color: 'var(--gold)', marginBottom: '1.5rem', fontWeight: 700 }}>Ekosistem</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><Link to="/catalog" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Katalog Produk</Link></li>
                <li><Link to="/services" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Layanan Jasa</Link></li>
                <li><Link to="/investguard" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>InvestGuard App</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 style={{ fontSize: '.8rem', color: 'var(--gold)', marginBottom: '1.5rem', fontWeight: 700 }}>Perusahaan</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><Link to="/about" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Tentang Kami</Link></li>
                <li><Link to="/career" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 'bold' }}>Karir</Link></li>
                <li><Link to="/privacy" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Kebijakan Privasi</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 style={{ fontSize: '.8rem', color: 'var(--gold)', marginBottom: '1.5rem', fontWeight: 700 }}>Kontak</h4>
              <p style={{ fontSize: '.9rem' }}>hello@arrivar.id<br/>Jakarta, Indonesia</p>
            </div>
          </div>
          <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: '2.5rem', textAlign: 'center' }}>
            <p>© 2026 PT ARRIVAR INDONESIA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}