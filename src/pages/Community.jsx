import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Community() {
  return (
    <>
      {/* IMPLEMENTASI SEO & META TAGS */}
      <Helmet>
        <title>Komunitas Profesional & Startup Founder Indonesia | ARRIVAR.id</title>
        <meta name="description" content="Bergabung dengan ekosistem eksklusif ARRIVAR. Bangun networking, diskusikan pengembangan karir, strategi finansial, dan inkubasi startup bersama para ahli." />
        <meta name="keywords" content="Komunitas Startup Indonesia, Forum Karir, Komunitas Finansial, ARRIVAR, HR Networking" />
      </Helmet>

      {/* NAVBAR SIMPLE */}
      <nav style={{ position: 'sticky', top: 0, background: '#FFF', borderBottom: '1px solid rgba(201,168,76,0.2)', padding: '1rem 5vw', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="nav-logo">
          {/* LOGO ASLI + TEKS ARRIVAR */}
          <img src="/logo.png" alt="ARRIVAR Logo" style={{ height: '34px', width: 'auto', objectFit: 'contain' }} />
          <span>ARRIVAR<em>.id</em></span>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <Link to="/catalog" style={{ color: '#1B2A4A', textDecoration: 'none' }}>Katalog Produk</Link>
        </div>
      </nav>

      <div style={{ background: '#F8F9FA', minHeight: '100vh', padding: '4rem 5vw', fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* HEADER KOMUNITAS */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C9A84C' }}>Ekosistem Kolaborasi</span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3.5rem', color: '#1B2A4A', margin: '1rem 0' }}>Komunitas <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>ARRIVAR</em></h1>
            <p style={{ color: '#8B95A8', maxWidth: '650px', margin: '0 auto', lineHeight: 1.8, fontSize: '1.1rem' }}>
              Ruang diskusi eksklusif untuk para profesional, investor, dan founder startup. Bangun *networking* berkualitas dan akselerasi mimpimu bersama ribuan talenta terbaik Indonesia.
            </p>
          </div>
          
          {/* GRID FORUM DISKUSI */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
            
            <div style={{ background: '#FFF', padding: '2.5rem', borderRadius: '8px', border: '1px solid rgba(201,168,76,0.2)', boxShadow: '0 10px 30px rgba(27,42,74,0.03)', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>💼</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', marginBottom: '1rem' }}>Karir & HR Hub</h2>
              <p style={{ color: '#6B7590', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>Bagikan pengalaman interview, tips negosiasi gaji, dan strategi pengembangan skill untuk menjadi top talent incaran perusahaan.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '1.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#8B95A8', fontWeight: 600 }}>1.2K+ Members</span>
                <button style={{ background: '#1B2A4A', color: '#C9A84C', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gabung</button>
              </div>
            </div>

            <div style={{ background: '#FFF', padding: '2.5rem', borderRadius: '8px', border: '1px solid rgba(201,168,76,0.2)', boxShadow: '0 10px 30px rgba(27,42,74,0.03)', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>📈</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', marginBottom: '1rem' }}>Financial & InvestGuard</h2>
              <p style={{ color: '#6B7590', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>Bahas manajemen portofolio, review reksa dana, analisa saham, dan maksimalkan penggunaan aplikasi InvestGuard.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '1.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#8B95A8', fontWeight: 600 }}>850+ Members</span>
                <button style={{ background: '#1B2A4A', color: '#C9A84C', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gabung</button>
              </div>
            </div>

            <div style={{ background: '#FFF', padding: '2.5rem', borderRadius: '8px', border: '1px solid rgba(201,168,76,0.2)', boxShadow: '0 10px 30px rgba(27,42,74,0.03)', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🚀</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', marginBottom: '1rem' }}>Startup Founders</h2>
              <p style={{ color: '#6B7590', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>Networking antar founder, cari tech/business co-founder, dan pelajari strategi rahasia pitching ke Venture Capital.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '1.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#8B95A8', fontWeight: 600 }}>420+ Members</span>
                <button style={{ background: '#1B2A4A', color: '#C9A84C', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gabung</button>
              </div>
            </div>

          </div>

          {/* UPSELL SECTION (PENTING UNTUK REVENUE) */}
          <div style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1A30 100%)', borderRadius: '12px', padding: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', border: '40px solid rgba(201,168,76,0.05)', borderRadius: '50%' }}></div>
            
            <div style={{ maxWidth: '500px', position: 'relative', zIndex: 2 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: '#FFF', marginBottom: '1rem' }}>Ingin Akses Eksklusif?</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                Dapatkan akses langsung ke mentor, webinar bulanan, review CV, dan analisa portofolio gratis dengan bergabung di <strong>ARRIVAR Pro Membership</strong>.
              </p>
              <Link to="/catalog" style={{ display: 'inline-block', background: '#C9A84C', color: '#0F1A30', padding: '0.9rem 2.2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Lihat Detail Pro</Link>
            </div>

            <div style={{ background: '#FFF', padding: '2rem', borderRadius: '8px', minWidth: '300px', position: 'relative', zIndex: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
              <h4 style={{ fontSize: '0.85rem', color: '#8B95A8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', borderBottom: '1px solid #F5EDD4', paddingBottom: '0.8rem' }}>Event Terdekat</h4>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ background: '#F5EDD4', padding: '0.5rem', borderRadius: '4px', textAlign: 'center', minWidth: '55px' }}>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: '#1B2A4A', fontWeight: 700, textTransform: 'uppercase' }}>APR</span>
                  <span style={{ display: 'block', fontSize: '1.2rem', color: '#C9A84C', fontWeight: 700 }}>15</span>
                </div>
                <div>
                  <h5 style={{ color: '#1B2A4A', fontSize: '0.95rem', marginBottom: '0.2rem' }}>Live Portfolio Review</h5>
                  <p style={{ fontSize: '0.75rem', color: '#6B7590' }}>Khusus Member Pro via Zoom</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ background: '#F5EDD4', padding: '0.5rem', borderRadius: '4px', textAlign: 'center', minWidth: '55px' }}>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: '#1B2A4A', fontWeight: 700, textTransform: 'uppercase' }}>APR</span>
                  <span style={{ display: 'block', fontSize: '1.2rem', color: '#C9A84C', fontWeight: 700 }}>28</span>
                </div>
                <div>
                  <h5 style={{ color: '#1B2A4A', fontSize: '0.95rem', marginBottom: '0.2rem' }}>HR Networking Night</h5>
                  <p style={{ fontSize: '0.75rem', color: '#6B7590' }}>Diskusi tren hiring Q2 2026</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}