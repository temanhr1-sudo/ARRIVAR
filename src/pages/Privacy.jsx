import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{--navy:#00182A;--gold:#D4AF37;--gold-dim:#B8962E;--white:#FFFFFF;--off-white:#F4F6F9;--slate:#394B5A;--slate-light:#A7B8C6;--ff:'Poppins',sans-serif;--radius-sm:6px;--radius-md:12px;--radius-lg:20px;--tr:0.3s cubic-bezier(0.4,0,0.2,1);}
  html{scroll-behavior:smooth;}body{font-family:var(--ff);background:var(--white);color:var(--navy);-webkit-font-smoothing:antialiased;}
  #navbar{position:sticky;top:0;z-index:999;display:flex;align-items:center;justify-content:space-between;padding:1.1rem 4rem;background:var(--navy);border-bottom:1px solid rgba(212,175,55,.12);transition:box-shadow var(--tr);}
  #navbar.scrolled{box-shadow:0 6px 32px rgba(0,0,0,.5);}
  .nav-logo{display:flex;align-items:center;gap:.55rem;text-decoration:none;}.nav-logo img{height:30px;width:auto;object-fit:contain;}.nav-logo span{font-size:1.2rem;font-weight:800;letter-spacing:.04em;color:var(--white);}.nav-logo em{color:var(--gold);font-style:normal;}
  .legal-hero{background:var(--navy);padding:5rem 4rem 4rem;position:relative;overflow:hidden;}
  .legal-hero::before{content:'';position:absolute;inset:0;background-image:repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(212,175,55,.04) 59px,rgba(212,175,55,.04) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(212,175,55,.04) 59px,rgba(212,175,55,.04) 60px);}
  .legal-hero-inner{position:relative;z-index:1;max-width:800px;}
  .eyebrow{font-size:.68rem;font-weight:700;letter-spacing:.17em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;display:block;}
  .legal-hero h1{font-size:clamp(2rem,4vw,3.2rem);font-weight:800;line-height:1.1;color:var(--white);margin-bottom:.75rem;}
  .legal-hero h1 em{color:var(--gold);font-style:normal;}
  .legal-hero p{font-size:.86rem;color:var(--slate-light);}
  .gold-bar{width:48px;height:3px;background:linear-gradient(90deg,var(--gold),var(--gold-dim));border-radius:2px;margin:1.25rem 0 0;}
  .legal-body{max-width:820px;margin:0 auto;padding:5rem 4rem 8rem;}
  .legal-section{margin-bottom:3rem;}
  .legal-section h2{font-size:1.1rem;font-weight:700;color:var(--navy);margin-bottom:.9rem;display:flex;align-items:center;gap:.75rem;}
  .legal-section h2::before{content:'';width:4px;height:1.1rem;background:var(--gold);border-radius:2px;flex-shrink:0;}
  .legal-section p{font-size:.92rem;line-height:1.85;color:var(--slate);margin-bottom:.75rem;}
  .legal-section ul{padding-left:1.5rem;margin-top:.5rem;display:flex;flex-direction:column;gap:.5rem;}
  .legal-section ul li{font-size:.92rem;line-height:1.75;color:var(--slate);}
  .contact-block{background:var(--off-white);border:1px solid rgba(212,175,55,.2);border-radius:var(--radius-md);padding:1.75rem 2rem;margin-top:1rem;}
  .contact-block p{font-size:.92rem;line-height:1.85;color:var(--slate);}
  footer{background:#000f1a;color:var(--slate-light);padding:3rem 0 2rem;}
  .footer-inner{max-width:1200px;margin:0 auto;padding:0 4rem;}
  .flinks{display:flex;justify-content:center;gap:2rem;flex-wrap:wrap;margin-bottom:2rem;}
  .flinks a{color:rgba(255,255,255,.6);font-size:.85rem;text-decoration:none;transition:color var(--tr);}.flinks a:hover,.flinks a.active{color:var(--gold);}
  .fbottom{border-top:1px solid rgba(255,255,255,.06);padding-top:2rem;text-align:center;font-size:.8rem;color:rgba(255,255,255,.4);}
  .scroll-top{position:fixed;bottom:2rem;right:2rem;z-index:999;width:44px;height:44px;border-radius:var(--radius-sm);background:var(--gold);color:var(--navy);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:700;opacity:0;transform:translateY(12px);transition:opacity var(--tr),transform var(--tr);pointer-events:none;}
  .scroll-top.visible{opacity:1;transform:none;pointer-events:all;}
  @media(max-width:960px){#navbar{padding:1rem 1.5rem;}.legal-hero{padding:4rem 1.5rem 3rem;}.legal-body{padding:3rem 1.5rem 6rem;}}
`;

export default function Privacy() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handle = () => { setIsScrolled(window.scrollY > 40); setShowScrollTop(window.scrollY > 400); };
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <>
      <style>{css}</style>
      <Helmet>
        <title>Kebijakan Privasi | ARRIVAR.id</title>
        <meta name="description" content="Kebijakan privasi PT ARRIVAR INDONESIA menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda." />
      </Helmet>

      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo"><img src="/logo.png" alt="ARRIVAR Logo" /><span>ARRIVAR<em>.id</em></span></Link>
      </nav>

      <section className="legal-hero">
        <div className="legal-hero-inner">
          <span className="eyebrow">Dokumen Legal</span>
          <h1>Kebijakan <em>Privasi</em></h1>
          <p>Pembaruan Terakhir: 5 April 2026</p>
          <div className="gold-bar" />
        </div>
      </section>

      <div className="legal-body">
        <p style={{fontSize:'.92rem',lineHeight:1.85,color:'var(--slate)',marginBottom:'3rem'}}>
          Selamat datang di <strong>ARRIVAR.id</strong>, platform yang dikelola oleh <strong>PT ARRIVAR INDONESIA</strong>. Kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan membagikan informasi Anda saat menggunakan layanan kami.
        </p>

        <div className="legal-section">
          <h2>1. Informasi yang Kami Kumpulkan</h2>
          <p>Kami mengumpulkan informasi yang Anda berikan secara langsung, seperti saat mengisi formulir pemesanan, mendaftar keanggotaan Pro, atau mendaftar ke waitlist InvestGuard. Informasi ini meliputi:</p>
          <ul><li>Nama lengkap</li><li>Alamat email</li><li>Nomor WhatsApp / Telepon</li><li>Profesi atau pekerjaan</li><li>Data komunikasi saat menghubungi layanan pelanggan kami</li></ul>
        </div>

        <div className="legal-section">
          <h2>2. Penggunaan Informasi</h2>
          <p>Data pribadi Anda digunakan untuk tujuan berikut:</p>
          <ul>
            <li>Memproses transaksi dan penyediaan layanan (kelas, konsultasi, produk digital)</li>
            <li>Menghubungi Anda terkait pemesanan, jadwal konsultasi, atau pembaruan produk</li>
            <li>Mengirimkan informasi pemasaran atau penawaran khusus (Anda dapat berhenti berlangganan kapan saja)</li>
            <li>Meningkatkan kualitas layanan dan optimalisasi AI pada ekosistem kami</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>3. Keamanan Data</h2>
          <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang wajar untuk melindungi data pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Namun, tidak ada metode transmisi di internet yang 100% aman.</p>
        </div>

        <div className="legal-section">
          <h2>4. Berbagi Informasi dengan Pihak Ketiga</h2>
          <p>Kami <strong>tidak menjual, menyewakan, atau memperdagangkan</strong> data pribadi Anda kepada pihak ketiga. Kami hanya dapat membagikan data kepada mitra penyedia layanan (seperti payment gateway atau hosting) semata-mata untuk memfasilitasi operasi bisnis kami, di bawah perjanjian kerahasiaan yang ketat.</p>
        </div>

        <div className="legal-section">
          <h2>5. Hubungi Kami</h2>
          <p>Jika Anda memiliki pertanyaan atau ingin meminta penghapusan data dari sistem kami:</p>
          <div className="contact-block">
            <p><strong>Email:</strong> legal@arrivar.id<br/><strong>Perusahaan:</strong> PT ARRIVAR INDONESIA<br/><strong>Alamat:</strong> Jakarta, Indonesia</p>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-inner">
          <div className="flinks">
            <Link to="/about">Tentang Kami</Link>
            <Link to="/privacy" className="active">Kebijakan Privasi</Link>
            <Link to="/legal">Syarat &amp; Ketentuan</Link>
          </div>
          <div className="fbottom">© 2026 <span style={{color:'var(--gold)'}}>PT ARRIVAR INDONESIA</span>. All rights reserved.</div>
        </div>
      </footer>
      <button className={`scroll-top${showScrollTop?' visible':''}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑</button>
    </>
  );
}