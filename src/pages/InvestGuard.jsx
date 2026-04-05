import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function InvestGuard() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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

  const handleJoinWaitlist = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Mohon masukkan alamat email Anda.');
      return;
    }
    // Logika pengiriman ke backend bisa ditambahkan di sini nantinya
    setIsSubmitted(true);
    setEmail('');
  };

  // SCHEMA MARKUP UNTUK APLIKASI
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "InvestGuard",
    "operatingSystem": "iOS, Android, Web",
    "applicationCategory": "FinanceApplication",
    "provider": {
      "@type": "Organization",
      "name": "PT ARRIVAR INDONESIA"
    },
    "description": "Aplikasi manajemen finansial dan wealth forecasting berbasis kecerdasan buatan (AI) dari ekosistem ARRIVAR.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    }
  };

  return (
    <>
      <Helmet>
        <title>InvestGuard App: AI Wealth Forecasting & Manajemen Risiko | ARRIVAR.id</title>
        <meta name="description" content="Kendalikan masa depan finansial Anda dengan InvestGuard. Aplikasi AI dari ARRIVAR untuk proyeksi kekayaan, manajemen risiko, dan portofolio cerdas. Gabung waitlist sekarang!" />
        <meta name="keywords" content="Aplikasi Finansial AI, Wealth Management App, InvestGuard ARRIVAR, Perencanaan Keuangan Pintar" />
        <script type="application/ld+json">
          {JSON.stringify(softwareSchema)}
        </script>
      </Helmet>

      {/* NAVBAR */}
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''} style={{ background: isScrolled ? 'rgba(15,26,48,0.95)' : 'transparent', borderBottom: isScrolled ? '1px solid rgba(201,168,76,0.15)' : 'none' }}>
        <Link to="/" className="nav-logo" style={{ color: '#FFF' }}>
          <svg width="34" height="34" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="60,10 15,100 40,100 60,55 80,100 105,100" fill="url(#ng)"/>
            <line x1="35" y1="75" x2="90" y2="35" stroke="url(#ng2)" strokeWidth="10" strokeLinecap="round"/>
            <polygon points="90,35 75,38 88,50" fill="url(#ng)"/>
            <defs>
              <linearGradient id="ng" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#C9A84C"/><stop offset="100%" stopColor="#E2C878"/></linearGradient>
              <linearGradient id="ng2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#C9A84C"/><stop offset="100%" stopColor="#E2C878"/></linearGradient>
            </defs>
          </svg>
          <span style={{ color: '#FFF' }}>ARRIVAR<em style={{ fontStyle: 'normal', color: '#C9A84C' }}>.id</em></span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/" style={{ color: '#FFF' }}>Beranda</Link></li>
          <li><Link to="/catalog" style={{ color: '#FFF' }}>Katalog</Link></li>
          <li><Link to="/services" style={{ color: '#FFF' }}>Layanan</Link></li>
        </ul>
      </nav>

      <div style={{ background: '#0F1A30', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", color: '#FFF', position: 'relative', overflow: 'hidden' }}>
        
        {/* BACKGROUND EFFECTS */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(36,54,96,0.5) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)', backgroundSize: '50px 50px', zIndex: 1, opacity: 0.5 }}></div>

        {/* HERO WAITLIST */}
        <section style={{ padding: '12rem 5vw 8rem', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', padding: '0.4rem 1.2rem', borderRadius: '100px', color: '#E2C878', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem' }}>
              <span style={{ width: '8px', height: '8px', background: '#27AE60', borderRadius: '50%', boxShadow: '0 0 10px #27AE60', animation: 'pulse 2s infinite' }}></span> Beta Access Q4 2026
            </span>
            <h1 className="reveal" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1.5rem', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              Kecerdasan Buatan untuk <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Masa Depan Finansialmu</em>
            </h1>
            <p className="reveal" style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '650px', margin: '0 auto 3rem' }}>
              InvestGuard adalah aplikasi pintar dari ARRIVAR yang merancang proyeksi kekayaan (*wealth forecasting*), manajemen risiko, dan optimasi portofolio investasi secara otomatis.
            </p>

            {/* FORM WAITLIST */}
            {!isSubmitted ? (
              <form onSubmit={handleJoinWaitlist} className="reveal" style={{ display: 'flex', gap: '0.5rem', maxWidth: '500px', margin: '0 auto', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <input 
                  type="email" 
                  placeholder="Masukkan alamat email Anda..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', padding: '1rem 1.5rem', color: '#FFF', fontSize: '1rem' }}
                />
                <button type="submit" style={{ background: '#C9A84C', color: '#0F1A30', border: 'none', padding: '0 2rem', borderRadius: '100px', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s' }}>Gabung Waitlist</button>
              </form>
            ) : (
              <div className="reveal" style={{ background: 'rgba(39, 174, 96, 0.1)', border: '1px solid rgba(39, 174, 96, 0.3)', padding: '1.5rem', borderRadius: '8px', maxWidth: '500px', margin: '0 auto', color: '#E2C878' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', marginBottom: '0.5rem', color: '#FFF' }}>Anda Telah Terdaftar!</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Terima kasih telah bergabung. Kami akan mengabari Anda segera setelah akses Beta InvestGuard dibuka.</p>
              </div>
            )}
            <p className="reveal" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '1rem' }}>Bergabung dengan 4.500+ profesional lainnya.</p>
          </div>
        </section>

        {/* FITUR UNGGULAN */}
        <section style={{ padding: '6rem 5vw', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 className="reveal" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: '#FFF' }}>Fitur <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Unggulan</em></h2>
              <div className="gold-divider centered" style={{ width: '70px', height: '3px', background: 'linear-gradient(90deg, #C9A84C, #E2C878)', margin: '1.5rem auto', borderRadius: '2px' }}></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
              <div className="reveal" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '3rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🤖</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', marginBottom: '1rem', color: '#FFF' }}>AI Wealth Forecasting</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.95rem' }}>Mesin AI kami menganalisa kebiasaan pengeluaran dan profil risiko Anda untuk memproyeksikan target nilai kekayaan (Net Worth) di masa pensiun.</p>
              </div>
              <div className="reveal" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '3rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🛡️</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', marginBottom: '1rem', color: '#FFF' }}>Risk Management</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.95rem' }}>Notifikasi pintar saat alokasi aset Anda bergeser melebihi toleransi risiko. InvestGuard bertindak sebagai "penjaga" dana darurat dan investasi Anda.</p>
              </div>
              <div className="reveal" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '3rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>📊</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', marginBottom: '1rem', color: '#FFF' }}>Unified Portfolio</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.95rem' }}>Pantau seluruh instrumen investasi Anda—saham, reksa dana, kripto, hingga aset riil—dalam satu dashboard elegan yang mudah dipahami.</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer style={{ background: '#0F1A30', padding: '6rem 5vw 2rem', color: 'rgba(255,255,255,.5)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="footer-inner" style={{ maxWidth: '1150px', margin: '0 auto' }}>
          <div className="footer-top" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '5rem' }}>
            <div className="footer-brand">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: 'var(--white)', marginBottom: '.5rem' }}>ARRIVAR<span style={{ color: 'var(--gold)' }}>.id</span></p>
              <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,.5)', maxWidth: '300px', marginTop: '1rem' }}>Ekosistem akselerator terintegrasi untuk karir, finansial, dan startup Indonesia. Satu platform, tiga kekuatan.</p>
              <div style={{ marginTop: '1.8rem', display: 'flex', gap: '1rem' }}>
                <a href="#" className="social-link" style={{ color: 'var(--gold)', fontSize: '.9rem', textDecoration: 'none', border: '1px solid rgba(201,168,76,.3)', width: '36px', height: '36px', display: 'grid', placeItems: 'center', borderRadius: '50%', fontWeight: 600 }}>in</a>
                <a href="#" className="social-link" style={{ color: 'var(--gold)', fontSize: '.9rem', textDecoration: 'none', border: '1px solid rgba(201,168,76,.3)', width: '36px', height: '36px', display: 'grid', placeItems: 'center', borderRadius: '50%', fontWeight: 600 }}>ig</a>
                <a href="#" className="social-link" style={{ color: 'var(--gold)', fontSize: '.9rem', textDecoration: 'none', border: '1px solid rgba(201,168,76,.3)', width: '36px', height: '36px', display: 'grid', placeItems: 'center', borderRadius: '50%', fontWeight: 600 }}>tk</a>
              </div>
            </div>
            <div className="footer-col">
              <h4 style={{ fontSize: '.8rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem', fontWeight: 700 }}>Ekosistem</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><Link to="/catalog" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Katalog Produk</Link></li>
                <li><Link to="/community" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Komunitas</Link></li>
                <li><Link to="/services" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Layanan Jasa</Link></li>
                <li><Link to="/investguard" style={{ fontSize: '.9rem', color: 'var(--gold)', textDecoration: 'none', fontWeight: 'bold' }}>InvestGuard App</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 style={{ fontSize: '.8rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem', fontWeight: 700 }}>Perusahaan</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><Link to="/about" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Tentang Kami</Link></li>
                <li><Link to="/about#visi" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Visi & Misi</Link></li>
                <li><Link to="/about#tim" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Tim Kami</Link></li>
                <li><a href="#" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Karir</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 style={{ fontSize: '.8rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem', fontWeight: 700 }}>Kontak</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><a href="mailto:hello@arrivar.id" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>hello@arrivar.id</a></li>
                <li><a href="#" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Jakarta, Indonesia</a></li>
                <li><a href="#" style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>PT ARRIVAR INDONESIA</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.5)' }}>© 2026 <span style={{ color: 'var(--gold)', fontWeight: 500 }}>PT ARRIVAR INDONESIA</span>. All rights reserved.</p>
            <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.5)' }}>Empowering Indonesia's Future — <span style={{ color: 'var(--gold)', fontWeight: 500 }}>Career · Financial · Startup</span></p>
          </div>
        </div>
      </footer>
    </>
  );
}