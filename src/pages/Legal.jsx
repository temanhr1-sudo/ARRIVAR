import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Legal() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Syarat & Ketentuan (Legal) | ARRIVAR.id</title>
        <meta name="description" content="Syarat dan ketentuan layanan PT ARRIVAR INDONESIA serta disclaimer finansial." />
      </Helmet>

      <nav id="navbar" className={isScrolled ? 'scrolled' : ''} style={{ position: 'sticky', top: 0, background: '#FFF', borderBottom: '1px solid rgba(201,168,76,0.2)', padding: '1rem 5vw', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="nav-logo">
          {/* LOGO ASLI + TEKS ARRIVAR */}
          <img src="/logo.png" alt="ARRIVAR Logo" style={{ height: '34px', width: 'auto', objectFit: 'contain' }} />
          <span>ARRIVAR<em>.id</em></span>
        </Link>
      </nav>

      <div style={{ background: '#FFF', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", padding: '4rem 5vw 8rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: '#1B2A4A', marginBottom: '1rem' }}>Syarat & <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Ketentuan</em></h1>
          <p style={{ color: '#8B95A8', fontSize: '0.9rem', marginBottom: '3rem' }}>Pembaruan Terakhir: 5 April 2026</p>

          <div style={{ color: '#5A6580', lineHeight: 1.8, fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <p>
              Dengan mengakses dan menggunakan situs web <strong>ARRIVAR.id</strong> serta seluruh layanan di bawah naungan <strong>PT ARRIVAR INDONESIA</strong>, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak menyetujui sebagian atau seluruh syarat ini, Anda dilarang menggunakan layanan kami.
            </p>

            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', marginBottom: '1rem' }}>1. Layanan Kami</h2>
              <p>ARRIVAR.id menyediakan layanan edukasi karir, penjualan produk digital (template, e-book), konsultasi B2B, inkubasi bisnis, serta platform alat finansial (seperti InvestGuard). Spesifikasi, harga, dan ketersediaan layanan dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.</p>
            </div>

            <div style={{ background: '#F5EDD4', padding: '2rem', borderRadius: '8px', borderLeft: '4px solid #C9A84C', color: '#1B2A4A' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', marginBottom: '1rem' }}>2. Penafian Finansial (Financial Disclaimer)</h2>
              <p><strong>PENTING:</strong> Segala bentuk informasi, modul pembelajaran, panduan investasi, dan proyeksi (forecasting) yang diberikan melalui platform ARRIVAR dan InvestGuard bersifat edukatif dan informasional. <strong>Kami bukan penasihat keuangan terdaftar.</strong></p>
              <p style={{ marginTop: '0.5rem' }}>Informasi di platform ini tidak boleh dianggap sebagai rekomendasi untuk membeli, menjual, atau menahan instrumen investasi tertentu. Segala risiko yang timbul akibat keputusan investasi berada sepenuhnya di tangan Anda sebagai individu atau entitas bisnis.</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', marginBottom: '1rem' }}>3. Hak Kekayaan Intelektual</h2>
              <p>Seluruh materi di situs ini, termasuk namun tidak terbatas pada desain, teks, logo, grafis, kode perangkat lunak, template, dan video kursus, adalah milik PT ARRIVAR INDONESIA dan dilindungi oleh undang-undang hak cipta Republik Indonesia. Anda tidak diperkenankan menyalin, membagikan ulang secara komersial, atau menduplikasi karya kami tanpa izin tertulis.</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', marginBottom: '1rem' }}>4. Kebijakan Pengembalian Dana (Refund Policy)</h2>
              <p>Untuk pembelian produk digital (Template dan E-Book), seluruh penjualan bersifat final dan tidak dapat dikembalikan (non-refundable) karena sifat produk yang dapat langsung diunduh. Pengembalian dana untuk layanan konsultasi atau kelas (Bootcamp) tunduk pada syarat yang disepakati secara terpisah dalam kontrak kerja atau Terms of Agreement masing-masing program.</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', marginBottom: '1rem' }}>5. Batasan Tanggung Jawab</h2>
              <p>PT ARRIVAR INDONESIA tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan layanan kami, termasuk namun tidak terbatas pada kerugian finansial atau hilangnya peluang bisnis.</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', marginBottom: '1rem' }}>6. Hukum yang Berlaku</h2>
              <p>Syarat dan Ketentuan ini tunduk pada dan ditafsirkan sesuai dengan hukum Republik Indonesia. Segala perselisihan yang timbul akan diselesaikan melalui yurisdiksi pengadilan di Jakarta.</p>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ background: '#0F1A30', padding: '4rem 5vw 2rem', color: 'rgba(255,255,255,.5)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="footer-inner" style={{ maxWidth: '1150px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <Link to="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>Tentang Kami</Link>
            <Link to="/privacy" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>Kebijakan Privasi</Link>
            <Link to="/legal" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>Syarat & Ketentuan</Link>
          </div>
          <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: '2rem' }}>
            <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.5)' }}>© 2026 PT ARRIVAR INDONESIA. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <button className={`scroll-top ${showScrollTop ? 'visible' : ''}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>↑</button>
    </>
  );
}