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
  .legal-alert{background:rgba(212,175,55,.07);border:1px solid rgba(212,175,55,.25);border-left:4px solid var(--gold);border-radius:var(--radius-md);padding:1.75rem 2rem;}
  .legal-alert h2{color:var(--navy);}
  .legal-alert p{color:var(--slate);}
  footer{background:#000f1a;color:var(--slate-light);padding:3rem 0 2rem;}
  .footer-inner{max-width:1200px;margin:0 auto;padding:0 4rem;}
  .flinks{display:flex;justify-content:center;gap:2rem;flex-wrap:wrap;margin-bottom:2rem;}
  .flinks a{color:rgba(255,255,255,.6);font-size:.85rem;text-decoration:none;transition:color var(--tr);}.flinks a:hover,.flinks a.active{color:var(--gold);}
  .fbottom{border-top:1px solid rgba(255,255,255,.06);padding-top:2rem;text-align:center;font-size:.8rem;color:rgba(255,255,255,.4);}
  .scroll-top{position:fixed;bottom:2rem;right:2rem;z-index:999;width:44px;height:44px;border-radius:var(--radius-sm);background:var(--gold);color:var(--navy);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:700;opacity:0;transform:translateY(12px);transition:opacity var(--tr),transform var(--tr);pointer-events:none;}
  .scroll-top.visible{opacity:1;transform:none;pointer-events:all;}
  @media(max-width:960px){#navbar{padding:1rem 1.5rem;}.legal-hero{padding:4rem 1.5rem 3rem;}.legal-body{padding:3rem 1.5rem 6rem;}}
`;

const SECTIONS = [
  {
    title: '1. Layanan Kami',
    body: 'ARRIVAR.id menyediakan layanan edukasi karir, penjualan produk digital (template, e-book), konsultasi B2B, inkubasi bisnis, serta platform alat finansial (seperti InvestGuard). Spesifikasi, harga, dan ketersediaan layanan dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.',
    alert: false,
  },
  {
    title: '2. Penafian Finansial (Financial Disclaimer)',
    body: 'PENTING: Segala bentuk informasi, modul pembelajaran, panduan investasi, dan proyeksi yang diberikan melalui platform ARRIVAR dan InvestGuard bersifat edukatif dan informasional. Kami bukan penasihat keuangan terdaftar. Informasi di platform ini tidak boleh dianggap sebagai rekomendasi untuk membeli, menjual, atau menahan instrumen investasi tertentu. Segala risiko yang timbul akibat keputusan investasi berada sepenuhnya di tangan Anda.',
    alert: true,
  },
  {
    title: '3. Hak Kekayaan Intelektual',
    body: 'Seluruh materi di situs ini, termasuk desain, teks, logo, grafis, kode perangkat lunak, template, dan video kursus, adalah milik PT ARRIVAR INDONESIA dan dilindungi oleh undang-undang hak cipta Republik Indonesia. Anda tidak diperkenankan menyalin, membagikan ulang secara komersial, atau menduplikasi karya kami tanpa izin tertulis.',
    alert: false,
  },
  {
    title: '4. Kebijakan Pengembalian Dana',
    body: 'Untuk pembelian produk digital (Template dan E-Book), seluruh penjualan bersifat final dan tidak dapat dikembalikan (non-refundable) karena sifat produk yang dapat langsung diunduh. Pengembalian dana untuk layanan konsultasi atau kelas tunduk pada syarat yang disepakati secara terpisah dalam kontrak kerja masing-masing program.',
    alert: false,
  },
  {
    title: '5. Batasan Tanggung Jawab',
    body: 'PT ARRIVAR INDONESIA tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan layanan kami, termasuk kerugian finansial atau hilangnya peluang bisnis.',
    alert: false,
  },
  {
    title: '6. Hukum yang Berlaku',
    body: 'Syarat dan Ketentuan ini tunduk pada dan ditafsirkan sesuai dengan hukum Republik Indonesia. Segala perselisihan yang timbul akan diselesaikan melalui yurisdiksi pengadilan di Jakarta.',
    alert: false,
  },
];

export default function Legal() {
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
        <title>Syarat & Ketentuan | ARRIVAR.id</title>
        <meta name="description" content="Syarat dan ketentuan layanan PT ARRIVAR INDONESIA serta disclaimer finansial." />
      </Helmet>

      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo"><img src="/logo.png" alt="ARRIVAR Logo" /><span>ARRIVAR<em>.id</em></span></Link>
      </nav>

      <section className="legal-hero">
        <div className="legal-hero-inner">
          <span className="eyebrow">Dokumen Legal</span>
          <h1>Syarat &amp; <em>Ketentuan</em></h1>
          <p>Pembaruan Terakhir: 5 April 2026</p>
          <div className="gold-bar" />
        </div>
      </section>

      <div className="legal-body">
        <p style={{fontSize:'.92rem',lineHeight:1.85,color:'var(--slate)',marginBottom:'3rem'}}>
          Dengan mengakses dan menggunakan situs web <strong>ARRIVAR.id</strong> serta seluruh layanan di bawah naungan <strong>PT ARRIVAR INDONESIA</strong>, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak menyetujui sebagian atau seluruh syarat ini, Anda dilarang menggunakan layanan kami.
        </p>
        {SECTIONS.map((s, i) => (
          <div className={`legal-section${s.alert ? ' legal-alert' : ''}`} key={i}>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </div>
        ))}
      </div>

      <footer>
        <div className="footer-inner">
          <div className="flinks">
            <Link to="/about">Tentang Kami</Link>
            <Link to="/privacy">Kebijakan Privasi</Link>
            <Link to="/legal" className="active">Syarat &amp; Ketentuan</Link>
          </div>
          <div className="fbottom">© 2026 <span style={{color:'var(--gold)'}}>PT ARRIVAR INDONESIA</span>. All rights reserved.</div>
        </div>
      </footer>
      <button className={`scroll-top${showScrollTop?' visible':''}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑</button>
    </>
  );
}