import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function About() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Fungsi untuk scroll ke elemen spesifik jika ada hash (#visi, #tim)
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }

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
  }, [location]);

  // SCHEMA MARKUP UNTUK SEO GOOGLE (ORGANIZATION TYPE)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PT ARRIVAR INDONESIA",
    "alternateName": "ARRIVAR.id",
    "url": "https://arrivar.id",
    "logo": "https://arrivar.id/logo.png",
    "description": "Ekosistem akselerator terintegrasi terdepan di Indonesia yang menjembatani kesenjangan antara kompetensi profesional, kemandirian finansial, dan pertumbuhan bisnis inovatif.",
    "foundingDate": "2026",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jakarta",
      "addressCountry": "ID"
    },
    "sameAs": [
      "https://www.linkedin.com/company/arrivar-id",
      "https://www.instagram.com/arrivar.id"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Tentang Kami, Visi & Tim | ARRIVAR.id</title>
        <meta name="description" content="Kenali PT ARRIVAR INDONESIA. Kami adalah ekosistem pertama yang mensinergikan Career Development, Financial Intelligence, dan Startup Funding di Indonesia." />
        <meta name="keywords" content="Tentang ARRIVAR, Visi Misi ARRIVAR, Profil Perusahaan Ekosistem Karir Finansial, Startup Indonesia" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
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
          <li><Link to="/catalog">Katalog Produk</Link></li>
          <li><Link to="/services">Layanan Jasa</Link></li>
          <li><Link to="/community">Komunitas</Link></li>
          <li><a href="#kontak" className="nav-cta">Hubungi Kami</a></li>
        </ul>
      </nav>

      <div style={{ background: '#FFF', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
        
        {/* HERO SECTION ABOUT */}
        <section style={{ padding: '10rem 5vw 6rem', textAlign: 'center', background: 'var(--navy-deep)', color: '#FFF', borderBottom: '5px solid var(--gold)' }}>
          <div className="reveal" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C9A84C' }}>Tentang PT ARRIVAR INDONESIA</span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '4rem', margin: '1.5rem 0' }}>Empowering Indonesia's <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Future</em></h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.15rem', lineHeight: 1.8 }}>
              Kami percaya bahwa kesuksesan finansial tidak bisa dipisahkan dari kapabilitas karir dan inovasi bisnis. Oleh karena itu, ARRIVAR hadir sebagai ekosistem holistik pertama di Indonesia.
            </p>
          </div>
        </section>

        {/* KISAH KAMI */}
        <section style={{ padding: '6rem 5vw' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div className="reveal">
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.8rem', color: '#1B2A4A', marginBottom: '1.5rem' }}>Mengapa <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>ARRIVAR?</em></h2>
              <div style={{ width: '70px', height: '3px', background: 'linear-gradient(90deg, #C9A84C, #E2C878)', margin: '1.5rem 0', borderRadius: '2px' }}></div>
              <p style={{ color: '#5A6580', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Realitanya, banyak profesional bekerja keras setiap hari namun merasa karirnya stagnan dan kondisi finansialnya tidak berkembang. Di sisi lain, para inovator muda seringkali memiliki ide brilian namun terhenti karena kurangnya arah bisnis dan akses pendanaan.
              </p>
              <p style={{ color: '#5A6580', fontSize: '1.05rem', lineHeight: 1.8 }}>
                <strong>ARRIVAR.id</strong> didirikan untuk memecahkan kebuntuan tersebut. Melalui pendekatan berbasis data dan kecerdasan buatan (AI), misi kami adalah mengakselerasi masyarakat dan profesional Indonesia menuju kemandirian finansial sejati, tanpa harus kehilangan arah.
              </p>
            </div>
            <div className="reveal" style={{ background: '#F8F9FA', padding: '3rem', borderRadius: '8px', border: '1px solid rgba(201,168,76,0.2)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-20px', left: '-20px', fontSize: '4rem', color: 'rgba(201,168,76,0.2)', fontFamily: "serif" }}>"</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', lineHeight: 1.4, fontStyle: 'italic', position: 'relative', zIndex: 2 }}>
                Goal kami cuma satu: Membantu kamu mencapai Kebebasan Finansial secepat mungkin, dengan membangun fundamental karir dan bisnis yang tepat.
              </h3>
              <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: '1rem' }}>
                <strong style={{ color: '#1B2A4A', display: 'block' }}>Ari</strong>
                <span style={{ color: '#C9A84C', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Founder & CEO ARRIVAR</span>
              </div>
            </div>
          </div>
        </section>

        {/* VISI & MISI */}
        <section id="visi" className="section vision" style={{ background: '#F8F9FA', padding: '6rem 5vw', position: 'relative', borderTop: '1px solid rgba(201,168,76,0.15)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
          <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C9A84C' }}>Landasan Kami</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: '#1B2A4A', marginTop: '0.5rem' }}>Visi & Misi</h2>
              <div style={{ width: '70px', height: '3px', background: 'linear-gradient(90deg, #C9A84C, #E2C878)', margin: '1.5rem auto', borderRadius: '2px' }}></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
              <div className="reveal" style={{ background: '#FFF', padding: '3rem', borderRadius: '8px', border: '1px solid rgba(201,168,76,0.2)', boxShadow: '0 10px 30px rgba(27,42,74,0.03)' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1.5rem' }}>👁️</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: '#1B2A4A', marginBottom: '1rem' }}>Visi Perseroan</h3>
                <p style={{ color: '#6B7590', fontSize: '1.05rem', lineHeight: 1.8 }}>
                  "Menjadi ekosistem akselerator terintegrasi terdepan di Indonesia yang menjembatani kesenjangan antara kompetensi profesional, kemandirian finansial, dan pertumbuhan bisnis inovatif."
                </p>
              </div>

              <div className="reveal" style={{ background: '#FFF', padding: '3rem', borderRadius: '8px', border: '1px solid rgba(201,168,76,0.2)', boxShadow: '0 10px 30px rgba(27,42,74,0.03)' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1.5rem' }}>🎯</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: '#1B2A4A', marginBottom: '1rem' }}>Misi Perseroan</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <li style={{ display: 'flex', gap: '1rem', color: '#1B2A4A', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500 }}>
                    <span style={{ color: '#C9A84C' }}>✓</span> Menyelenggarakan jasa pelatihan dan bimbingan karir profesional untuk meningkatkan daya saing tenaga kerja nasional.
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', color: '#1B2A4A', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500 }}>
                    <span style={{ color: '#C9A84C' }}>✓</span> Mengembangkan platform digital dan AI (seperti InvestGuard) untuk literasi dan manajemen finansial.
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', color: '#1B2A4A', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500 }}>
                    <span style={{ color: '#C9A84C' }}>✓</span> Bertindak sebagai fasilitator antara startup inovatif dan akses pendanaan modal ventura.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* TIM KAMI */}
        <section id="tim" style={{ padding: '6rem 5vw' }}>
          <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C9A84C' }}>Para Ahli di Balik Layar</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: '#1B2A4A', marginTop: '0.5rem' }}>Tim Kepemimpinan</h2>
              <div style={{ width: '70px', height: '3px', background: 'linear-gradient(90deg, #C9A84C, #E2C878)', margin: '1.5rem auto', borderRadius: '2px' }}></div>
              <p style={{ color: '#5A6580', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>Dibangun oleh profesional berpengalaman lintas industri yang memiliki dedikasi untuk memajukan ekosistem ekonomi Indonesia.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem' }}>
              
              {/* Member 1 */}
              <div className="reveal" style={{ textAlign: 'center' }}>
                <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'linear-gradient(135deg, #1B2A4A, #243660)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A84C', fontSize: '3rem', border: '5px solid #F5EDD4' }}>👨‍💼</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#1B2A4A', marginBottom: '0.2rem' }}>Ari</h3>
                <p style={{ color: '#C9A84C', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Founder & CEO</p>
                <p style={{ color: '#6B7590', fontSize: '0.9rem', lineHeight: 1.6 }}>HR Professional dengan spesialisasi pengembangan organisasi. Memiliki visi membangun ekosistem 3 pilar yang berkelanjutan.</p>
              </div>

              {/* Member 2 */}
              <div className="reveal" style={{ textAlign: 'center' }}>
                <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'linear-gradient(135deg, #1B2A4A, #243660)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A84C', fontSize: '3rem', border: '5px solid #F5EDD4' }}>👩‍💻</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#1B2A4A', marginBottom: '0.2rem' }}>Aisha L.</h3>
                <p style={{ color: '#C9A84C', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Head of FinTech (InvestGuard)</p>
                <p style={{ color: '#6B7590', fontSize: '0.9rem', lineHeight: 1.6 }}>Pakar teknologi finansial & AI. Memastikan setiap algoritma wealth forecasting di InvestGuard akurat dan aman.</p>
              </div>

              {/* Member 3 */}
              <div className="reveal" style={{ textAlign: 'center' }}>
                <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'linear-gradient(135deg, #1B2A4A, #243660)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A84C', fontSize: '3rem', border: '5px solid #F5EDD4' }}>👨‍💻</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#1B2A4A', marginBottom: '0.2rem' }}>Baskara</h3>
                <p style={{ color: '#C9A84C', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>VP of Startup Ecosystem</p>
                <p style={{ color: '#6B7590', fontSize: '0.9rem', lineHeight: 1.6 }}>Berpengalaman di industri Venture Capital. Bertanggung jawab dalam proses kurasi dan inkubasi para founder inovatif.</p>
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* FOOTER UTUH */}
      <footer id="kontak">
        <div className="footer-inner" style={{ maxWidth: '1150px', margin: '0 auto' }}>
          <div className="footer-top" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '5rem' }}>
            <div className="footer-brand">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: 'var(--white)', marginBottom: '.5rem' }}>ARRIVAR<span style={{ color: 'var(--gold)' }}>.id</span></p>
              <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,.5)', maxWidth: '300px', marginTop: '1rem' }}>Ekosistem akselerator terintegrasi untuk karir, finansial, dan startup Indonesia. Satu platform, tiga kekuatan.</p>
              <div style={{ marginTop: '1.8rem', display: 'flex', gap: '1rem' }}>
                <a href="https://www.linkedin.com/company/arrivarid" target="_blank" rel="noopener noreferrer" className="social-link">in</a>
                <a href="https://www.instagram.com/arrivar.id" target="_blank" rel="noopener noreferrer" className="social-link">ig</a>
                <a href="https://www.threads.com/@arrivar.id" target="_blank" rel="noopener noreferrer" className="social-link">tr</a>
              </div>
            </div>
            <div className="footer-col">
              <h4 style={{ fontSize: '.8rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem', fontWeight: 700 }}>Ekosistem</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><Link to="/catalog" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none', transition: 'all .3s' }}>Katalog Produk</Link></li>
                <li><Link to="/community" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none', transition: 'all .3s' }}>Komunitas</Link></li>
                <li><Link to="/services" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none', transition: 'all .3s' }}>Layanan Jasa</Link></li>
                <li><a href="https://www.investguard.id" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none', transition: 'all .3s' }}>InvestGuard App</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 style={{ fontSize: '.8rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem', fontWeight: 700 }}>Perusahaan</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><Link to="/about" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none', transition: 'all .3s' }}>Tentang Kami</Link></li>
                <li><Link to="/about#visi" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none', transition: 'all .3s' }}>Visi & Misi</Link></li>
                <li><Link to="/about#tim" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none', transition: 'all .3s' }}>Tim Kami</Link></li>
                <li><Link to="/career" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none', transition: 'all .3s' }}>Karir</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 style={{ fontSize: '.8rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem', fontWeight: 700 }}>Kontak</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><a href="mailto:admin@arrivar.id" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none', transition: 'all .3s' }}>admin@arrivar.id</a></li>
                <li><a href="https://www.google.com/maps/place/PT+ARRIVAR+INDONESIA" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none', transition: 'all .3s' }}>Jakarta, Indonesia</a></li>
                <li><a href="https://www.arrivar.id" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none', transition: 'all .3s' }}>PT ARRIVAR INDONESIA</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.5)' }}>© 2026 <span style={{ color: 'var(--gold)', fontWeight: 500 }}>PT ARRIVAR INDONESIA</span>. All rights reserved.</p>
            <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.5)' }}>Empowering Indonesia's Future — <span style={{ color: 'var(--gold)', fontWeight: 500 }}>Career · Financial · Startup</span></p>
          </div>
        </div>
      </footer>

      <button className={`scroll-top ${showScrollTop ? 'visible' : ''}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>↑</button>
    </>
  );
}