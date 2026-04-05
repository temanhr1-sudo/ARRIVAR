import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Privacy() {
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
        <title>Kebijakan Privasi | ARRIVAR.id</title>
        <meta name="description" content="Kebijakan privasi PT ARRIVAR INDONESIA menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda." />
      </Helmet>

      {/* NAVBAR */}
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''} style={{ position: 'sticky', top: 0, background: '#FFF', borderBottom: '1px solid rgba(201,168,76,0.2)', padding: '1rem 5vw', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1B2A4A', fontWeight: 'bold', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem' }}>
          <span style={{ color: '#C9A84C' }}>←</span> ARRIVAR<em style={{ fontStyle: 'normal', color: '#C9A84C' }}>.id</em>
        </Link>
      </nav>

      <div style={{ background: '#FFF', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", padding: '4rem 5vw 8rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: '#1B2A4A', marginBottom: '1rem' }}>Kebijakan <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Privasi</em></h1>
          <p style={{ color: '#8B95A8', fontSize: '0.9rem', marginBottom: '3rem' }}>Pembaruan Terakhir: 5 April 2026</p>

          <div style={{ color: '#5A6580', lineHeight: 1.8, fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <p>
              Selamat datang di <strong>ARRIVAR.id</strong>, platform yang dikelola oleh <strong>PT ARRIVAR INDONESIA</strong>. Kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan membagikan informasi Anda saat Anda menggunakan layanan kami, termasuk Katalog Produk, Komunitas, dan aplikasi InvestGuard.
            </p>

            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', marginBottom: '1rem' }}>1. Informasi yang Kami Kumpulkan</h2>
              <p>Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, seperti saat Anda mengisi formulir pemesanan produk, mendaftar keanggotaan (ARRIVAR Pro), atau mendaftar ke *waitlist* InvestGuard. Informasi ini meliputi:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Nama lengkap</li>
                <li>Alamat email</li>
                <li>Nomor WhatsApp / Telepon</li>
                <li>Profesi atau pekerjaan</li>
                <li>Data komunikasi saat Anda menghubungi layanan pelanggan kami</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', marginBottom: '1rem' }}>2. Penggunaan Informasi</h2>
              <p>Data pribadi Anda digunakan untuk tujuan berikut:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Memproses transaksi dan penyediaan layanan (kelas, konsultasi, produk digital).</li>
                <li>Menghubungi Anda terkait pemesanan, jadwal konsultasi, atau pembaruan produk.</li>
                <li>Mengirimkan informasi pemasaran, buletin, atau penawaran khusus (Anda dapat berhenti berlangganan kapan saja).</li>
                <li>Meningkatkan kualitas layanan, analisis data, dan optimalisasi kecerdasan buatan (AI) pada ekosistem kami.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', marginBottom: '1rem' }}>3. Keamanan Data</h2>
              <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang wajar untuk melindungi data pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Namun, harap diingat bahwa tidak ada metode transmisi di internet yang 100% aman.</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', marginBottom: '1rem' }}>4. Berbagi Informasi dengan Pihak Ketiga</h2>
              <p>Kami <strong>tidak menjual, menyewakan, atau memperdagangkan</strong> data pribadi Anda kepada pihak ketiga. Kami hanya dapat membagikan data Anda kepada mitra penyedia layanan (seperti *payment gateway* atau layanan *hosting*) semata-mata untuk memfasilitasi operasi bisnis kami, di bawah perjanjian kerahasiaan yang ketat (NDA).</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#1B2A4A', marginBottom: '1rem' }}>5. Hubungi Kami</h2>
              <p>Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, atau ingin meminta penghapusan data Anda dari sistem kami, silakan hubungi tim kami di:</p>
              <p style={{ marginTop: '0.5rem' }}><strong>Email:</strong> legal@arrivar.id<br/><strong>Perusahaan:</strong> PT ARRIVAR INDONESIA<br/><strong>Alamat:</strong> Jakarta, Indonesia</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#0F1A30', padding: '4rem 5vw 2rem', color: 'rgba(255,255,255,.5)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="footer-inner" style={{ maxWidth: '1150px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <Link to="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>Tentang Kami</Link>
            <Link to="/privacy" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>Kebijakan Privasi</Link>
            <Link to="/legal" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>Syarat & Ketentuan</Link>
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