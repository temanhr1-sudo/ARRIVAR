import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../supabaseClient';

// ─── FALLBACK DATA (ditampilkan kalau Supabase belum terkoneksi) ───────────────
const FALLBACK_PRODUCTS = [
  { id:1, emoji:'📊', category:'Produk Digital', name:'Template Keuangan Bisnis Pro', description:'Laporan laba rugi, neraca, arus kas, dan dashboard KPI otomatis dalam satu file Excel siap pakai.', price:'Rp 149.000' },
  { id:2, emoji:'💼', category:'Produk Digital', name:'Template HR & Payroll', description:'Sistem penggajian, absensi, slip gaji otomatis, dan rekapitulasi THR untuk bisnis skala UKM hingga korporat.', price:'Rp 129.000' },
  { id:3, emoji:'📈', category:'Produk Digital', name:'Dashboard Analitik Penjualan', description:'Visualisasi data penjualan real-time dengan grafik interaktif, target vs aktual, dan proyeksi otomatis.', price:'Rp 99.000' },
  { id:4, emoji:'🚀', category:'Produk Digital', name:'Template Business Plan', description:'Kerangka business plan lengkap + financial projection 5 tahun yang siap dipresentasikan ke investor.', price:'Rp 179.000' },
  { id:5, emoji:'🎓', category:'Kelas', name:'Bootcamp Excel for Business', description:'Kuasai Excel dari level dasar hingga mahir — pivot table, VLOOKUP, macro, dan dashboard dalam 4 minggu.', price:'Rp 499.000' },
  { id:6, emoji:'💡', category:'Kelas', name:'Personal Finance Mastery', description:'Belajar mengatur keuangan pribadi, strategi investasi, dan membangun aset menuju kebebasan finansial.', price:'Rp 349.000' },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{--navy:#00182A;--navy-mid:#0D2940;--gold:#D4AF37;--gold-dim:#B8962E;--white:#FFFFFF;--off-white:#F4F6F9;--slate:#394B5A;--slate-light:#A7B8C6;--ff:'Poppins',sans-serif;--radius-sm:6px;--radius-md:12px;--radius-lg:20px;--tr:0.3s cubic-bezier(0.4,0,0.2,1);}
  html{scroll-behavior:smooth;}body{font-family:var(--ff);background:var(--off-white);color:var(--navy);-webkit-font-smoothing:antialiased;}

  /* NAVBAR */
  #navbar{position:fixed;top:0;left:0;right:0;z-index:999;display:flex;align-items:center;justify-content:space-between;padding:1.1rem 4rem;background:var(--navy);border-bottom:1px solid rgba(212,175,55,.12);transition:padding var(--tr),box-shadow var(--tr);}
  #navbar.scrolled{padding:.7rem 4rem;box-shadow:0 6px 32px rgba(0,0,0,.5);}
  .nav-logo{display:flex;align-items:center;gap:.55rem;text-decoration:none;}.nav-logo img{height:30px;width:auto;object-fit:contain;}.nav-logo span{font-size:1.2rem;font-weight:800;letter-spacing:.04em;color:var(--white);}.nav-logo em{color:var(--gold);font-style:normal;}
  .nav-links{display:flex;align-items:center;gap:1.8rem;list-style:none;}.nav-links a{color:var(--slate-light);font-size:.74rem;font-weight:500;text-decoration:none;letter-spacing:.07em;text-transform:uppercase;transition:color var(--tr);}.nav-links a:hover{color:var(--gold);}
  .nav-cta{background:var(--gold)!important;color:var(--navy)!important;padding:.48rem 1.25rem!important;border-radius:var(--radius-sm)!important;font-weight:700!important;}

  /* PAGE HERO */
  .page-hero{background:var(--navy);padding:9rem 4rem 5rem;text-align:center;position:relative;overflow:hidden;}
  .page-hero::before{content:'';position:absolute;inset:0;background-image:repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(212,175,55,.04) 59px,rgba(212,175,55,.04) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(212,175,55,.04) 59px,rgba(212,175,55,.04) 60px);}
  .page-hero-inner{position:relative;z-index:1;max-width:680px;margin:0 auto;}
  .eyebrow{font-size:.68rem;font-weight:700;letter-spacing:.17em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;display:block;}
  .page-hero h1{font-size:clamp(2.2rem,4.5vw,3.4rem);font-weight:800;line-height:1.1;color:var(--white);letter-spacing:-.015em;margin-bottom:1.2rem;}
  .page-hero h1 em{color:var(--gold);font-style:normal;}
  .page-hero p{font-size:.95rem;line-height:1.85;color:var(--slate-light);max-width:520px;margin:0 auto;}
  .accent-bar{width:48px;height:3px;background:linear-gradient(90deg,var(--gold),var(--gold-dim));border-radius:2px;margin:1.25rem auto;}

  /* CATALOG BODY */
  .catalog-body{padding:3rem 4rem 6rem;max-width:1280px;margin:0 auto;}

  /* SEARCH + FILTER */
  .catalog-controls{display:flex;flex-direction:column;align-items:center;gap:1.5rem;margin-bottom:3rem;}
  .search-wrap{position:relative;width:100%;max-width:520px;}
  .search-icon{position:absolute;left:1.2rem;top:50%;transform:translateY(-50%);color:var(--slate-light);}
  .search-input{width:100%;padding:.9rem 1.2rem .9rem 3rem;border-radius:100px;border:1.5px solid rgba(0,24,42,.12);background:var(--white);font-family:var(--ff);font-size:.9rem;color:var(--navy);outline:none;transition:border-color var(--tr),box-shadow var(--tr);}
  .search-input:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(212,175,55,.12);}
  .search-input::placeholder{color:var(--slate-light);}
  .filter-pills{display:flex;gap:.75rem;flex-wrap:wrap;justify-content:center;}
  .filter-pill{padding:.45rem 1.25rem;border-radius:100px;border:1.5px solid rgba(0,24,42,.12);background:var(--white);font-family:var(--ff);font-size:.75rem;font-weight:600;color:var(--slate);cursor:pointer;transition:all var(--tr);}
  .filter-pill:hover{border-color:var(--gold);color:var(--gold);}
  .filter-pill.active{background:var(--navy);border-color:var(--navy);color:var(--gold);}

  /* LOADING STATE */
  .loading-state{text-align:center;padding:6rem 2rem;}
  .loading-spinner{width:40px;height:40px;border:3px solid rgba(212,175,55,.2);border-top-color:var(--gold);border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 1.5rem;}
  @keyframes spin{to{transform:rotate(360deg);}}
  .loading-text{font-size:.9rem;font-weight:600;color:var(--slate-light);}

  /* ERROR BANNER */
  .error-banner{background:rgba(212,175,55,.07);border:1px solid rgba(212,175,55,.25);border-left:4px solid var(--gold);border-radius:var(--radius-md);padding:1.25rem 1.5rem;margin-bottom:2.5rem;display:flex;align-items:flex-start;gap:1rem;}
  .error-banner-icon{font-size:1.2rem;flex-shrink:0;margin-top:.1rem;}
  .error-banner-title{font-size:.82rem;font-weight:700;color:var(--navy);margin-bottom:.2rem;}
  .error-banner-body{font-size:.78rem;line-height:1.6;color:var(--slate);}
  .error-banner-body code{background:rgba(0,24,42,.07);padding:.1rem .4rem;border-radius:4px;font-size:.75rem;font-family:monospace;}

  /* PRODUCTS GRID */
  .products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:1.75rem;}
  .product-card{background:var(--white);border-radius:var(--radius-lg);border:1px solid rgba(0,24,42,.07);overflow:hidden;transition:transform var(--tr),box-shadow var(--tr),border-color var(--tr);}
  .product-card:hover{transform:translateY(-6px);box-shadow:0 24px 56px rgba(0,24,42,.1);border-color:rgba(212,175,55,.3);}
  .product-thumb{height:145px;background:var(--navy);display:flex;align-items:center;justify-content:center;position:relative;}
  .product-thumb-badge{position:absolute;top:.75rem;right:.75rem;font-size:.62rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);background:rgba(212,175,55,.12);padding:.25rem .75rem;border-radius:100px;border:1px solid rgba(212,175,55,.25);}
  .product-info{padding:1.5rem;}
  .product-cat{font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem;display:block;}
  .product-name{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.6rem;line-height:1.3;}
  .product-desc{font-size:.8rem;line-height:1.7;color:var(--slate);margin-bottom:1.25rem;}
  .product-footer{display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(0,24,42,.07);padding-top:1.1rem;}
  .product-price{font-size:1.1rem;font-weight:800;color:var(--navy);}
  .product-btn{background:var(--gold);color:var(--navy);border:none;padding:.55rem 1.25rem;border-radius:var(--radius-sm);cursor:pointer;font-weight:700;font-size:.75rem;font-family:var(--ff);letter-spacing:.06em;text-transform:uppercase;transition:background var(--tr),transform var(--tr);}
  .product-btn:hover{background:var(--gold-dim);transform:translateY(-1px);}

  /* EMPTY STATE */
  .empty-state{text-align:center;padding:5rem 2rem;}
  .empty-icon{font-size:3rem;margin-bottom:1rem;}
  .empty-title{font-size:1.1rem;font-weight:700;color:var(--navy);margin-bottom:.5rem;}
  .empty-body{font-size:.86rem;color:var(--slate);}

  /* ── MODAL ── */
  .modal-overlay{position:fixed;inset:0;background:rgba(0,24,42,.88);display:flex;align-items:center;justify-content:center;z-index:1000;padding:1rem;}
  .modal-box{background:var(--white);border-radius:var(--radius-lg);padding:2.75rem 2.5rem;max-width:440px;width:100%;position:relative;max-height:90vh;overflow-y:auto;}
  .modal-close{position:absolute;top:1rem;right:1rem;background:var(--off-white);border:none;width:34px;height:34px;border-radius:50%;font-size:1.1rem;cursor:pointer;color:var(--slate);display:flex;align-items:center;justify-content:center;transition:background var(--tr);}
  .modal-close:hover{background:rgba(212,175,55,.15);color:var(--gold);}
  .modal-eyebrow{font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem;text-align:center;}
  .modal-title{font-size:1.5rem;font-weight:800;color:var(--navy);margin-bottom:.75rem;text-align:center;line-height:1.2;}
  .modal-price-badge{display:inline-block;background:var(--off-white);border:1px solid rgba(0,24,42,.1);padding:.45rem 1.5rem;border-radius:100px;font-weight:800;color:var(--navy);font-size:1.05rem;margin-bottom:1.75rem;}
  .modal-divider{height:1px;background:rgba(0,24,42,.07);margin:1.5rem 0;}
  .form-label{display:block;font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--slate);margin-bottom:.5rem;}
  .form-input{width:100%;padding:.85rem 1rem;border:1.5px solid rgba(0,24,42,.12);border-radius:var(--radius-sm);font-family:var(--ff);font-size:.88rem;color:var(--navy);outline:none;transition:border-color var(--tr),box-shadow var(--tr);margin-bottom:1.1rem;}
  .form-input:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(212,175,55,.1);}
  .form-input::placeholder{color:var(--slate-light);}
  .modal-btn-primary{width:100%;background:var(--gold);color:var(--navy);border:none;padding:1.1rem;border-radius:var(--radius-sm);font-weight:800;font-size:.88rem;letter-spacing:.07em;text-transform:uppercase;cursor:pointer;font-family:var(--ff);transition:background var(--tr);}
  .modal-btn-primary:hover{background:var(--gold-dim);}
  .modal-btn-primary:disabled{opacity:.6;cursor:not-allowed;}
  .modal-btn-ghost{width:100%;background:transparent;color:var(--slate);border:none;padding:.75rem;cursor:pointer;font-size:.82rem;font-family:var(--ff);margin-top:.5rem;}
  .modal-btn-ghost:hover{color:var(--navy);}

  /* QRIS BOX */
  .qris-box{background:var(--off-white);border:1px solid rgba(0,24,42,.1);border-radius:var(--radius-md);padding:1.75rem;text-align:center;margin-bottom:1.75rem;}
  .qris-label{font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--slate);margin-bottom:1rem;}
  .qris-img{width:180px;height:180px;object-fit:contain;border-radius:var(--radius-md);border:1px solid rgba(0,24,42,.1);}
  .qris-name{font-size:.8rem;color:var(--slate);margin-top:.75rem;}
  .total-display{text-align:center;margin-bottom:1.75rem;}
  .total-label{font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--slate);margin-bottom:.3rem;}
  .total-amount{font-size:2rem;font-weight:900;color:var(--navy);}

  /* WAITING STATE */
  .waiting-box{text-align:center;padding:1.5rem 0;}
  .waiting-icon{width:72px;height:72px;border-radius:50%;background:var(--off-white);display:flex;align-items:center;justify-content:center;font-size:1.75rem;margin:0 auto 1.5rem;border:1px solid rgba(0,24,42,.08);}
  .waiting-title{font-size:1.35rem;font-weight:800;color:var(--navy);margin-bottom:.6rem;}
  .waiting-body{font-size:.85rem;line-height:1.7;color:var(--slate);margin-bottom:2rem;}
  .modal-btn-dark{width:100%;background:var(--navy);color:var(--gold);border:none;padding:1.1rem;border-radius:var(--radius-sm);font-weight:800;font-size:.88rem;letter-spacing:.07em;text-transform:uppercase;cursor:pointer;font-family:var(--ff);margin-bottom:.75rem;transition:opacity var(--tr);}
  .modal-btn-dark:disabled{opacity:.6;cursor:not-allowed;}

  /* FOOTER */
  footer{background:#000f1a;color:var(--slate-light);padding:5rem 0 2rem;}
  .footer-inner{max-width:1200px;margin:0 auto;padding:0 4rem;}
  .footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:4rem;}
  .fbrand-name{font-size:1.5rem;font-weight:800;color:var(--white);margin-bottom:.7rem;}.fbrand-name span{color:var(--gold);}
  .fbrand>p{font-size:.82rem;line-height:1.8;max-width:270px;}
  .fsocials{display:flex;gap:.7rem;margin-top:1.5rem;}
  .social-link{width:34px;height:34px;border-radius:var(--radius-sm);border:1px solid rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;font-size:.68rem;font-weight:700;text-transform:uppercase;color:var(--slate-light);text-decoration:none;transition:border-color var(--tr),color var(--tr),background var(--tr);}
  .social-link:hover{border-color:var(--gold);color:var(--gold);background:rgba(212,175,55,.08);}
  .fcol h4{font-size:.67rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--white);margin-bottom:1.2rem;}
  .fcol ul{list-style:none;display:flex;flex-direction:column;gap:.58rem;}.fcol ul li a{font-size:.8rem;color:var(--slate-light);text-decoration:none;transition:color var(--tr);}.fcol ul li a:hover{color:var(--gold);}
  .fbottom{border-top:1px solid rgba(255,255,255,.06);padding-top:2rem;display:flex;justify-content:space-between;align-items:center;font-size:.74rem;color:rgba(167,184,198,.45);}.fbottom span{color:var(--gold);}
  .scroll-top{position:fixed;bottom:2rem;right:2rem;z-index:999;width:44px;height:44px;border-radius:var(--radius-sm);background:var(--gold);color:var(--navy);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:700;opacity:0;transform:translateY(12px);transition:opacity var(--tr),transform var(--tr);pointer-events:none;}
  .scroll-top.visible{opacity:1;transform:none;pointer-events:all;}.scroll-top:hover{background:var(--gold-dim);}

  @media(max-width:960px){#navbar{padding:1rem 1.5rem;}.nav-links{display:none;}.catalog-body{padding:2rem 1.5rem 5rem;}.page-hero{padding:8rem 1.5rem 4rem;}.footer-top{grid-template-columns:1fr 1fr;}.fbottom{flex-direction:column;gap:.5rem;text-align:center;}}
  @media(max-width:600px){.footer-top{grid-template-columns:1fr;}}
`;

const SVG_ICONS = {
  '📈': (size=64,c='#D4AF37') => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  '💰': (size=64,c='#D4AF37') => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8 11l3 3 5-5"/></svg>,
  '🚀': (size=64,c='#D4AF37') => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>,
  '📖': (size=64,c='#D4AF37') => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  '💼': (size=64,c='#D4AF37') => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  '🏢': (size=64,c='#D4AF37') => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/></svg>,
  '💡': (size=64,c='#D4AF37') => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
  '🛠️': (size=64,c='#D4AF37') => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  '🎓': (size=64,c='#D4AF37') => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  '🖥️': (size=64,c='#D4AF37') => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  '📊': (size=64,c='#D4AF37') => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
};
const getIcon = (emoji, size=64) => (SVG_ICONS[emoji] || SVG_ICONS['📊'])(size);

const FILTERS = ['Semua', 'Produk Digital', 'Kelas', 'Jasa'];

export default function Catalog() {
  const [products, setProducts]       = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [loading, setLoading]         = useState(true);
  const [dbError, setDbError]         = useState(null);
  const [isScrolled, setIsScrolled]   = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Modal / payment flow
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData]     = useState({ id:null, name:'', emoji:'', price:'', category:'' });
  const [paymentStep, setPaymentStep] = useState(0);
  const [orderId, setOrderId]         = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isChecking, setIsChecking]   = useState(false);
  const [formName, setFormName]       = useState('');
  const [formPhone, setFormPhone]     = useState('');
  const [formEmail, setFormEmail]     = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const handle = () => { setIsScrolled(window.scrollY > 40); setShowScrollTop(window.scrollY > 400); };
    window.addEventListener('scroll', handle);
    fetchProducts();
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // ── Fetch dengan graceful fallback ────────────────────────────────────────
  async function fetchProducts() {
    setLoading(true);
    setDbError(null);
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      setProducts(data && data.length > 0 ? data : FALLBACK_PRODUCTS);
      if (!data || data.length === 0) setDbError('empty');
    } catch (err) {
      console.warn('[Catalog] Supabase error — tampilkan fallback data:', err.message);
      setProducts(FALLBACK_PRODUCTS);
      setDbError(err.message || 'connection');
    }
    setLoading(false);
  }

  // ── Payment helpers ───────────────────────────────────────────────────────
  const openModal = (p) => {
    setModalData({ id:p.id, name:p.name, emoji:p.emoji, price:p.price, category:p.category });
    setPaymentStep(0); setFormName(''); setFormPhone(''); setFormEmail('');
    setIsModalOpen(true);
  };

  const submitForm = async () => {
    if (!formName || !formPhone || !formEmail) {
      alert('Mohon lengkapi semua data.'); return;
    }
    try {
      const { data, error } = await supabase.from('orders').insert([{
        customer_name:formName, customer_phone:formPhone, customer_email:formEmail,
        product_name:modalData.name, category:modalData.category, status:'pending_payment'
      }]).select();
      if (error) throw error;
      if (data && data[0]) setOrderId(data[0].id);
      setPaymentStep(1);
    } catch(err) {
      alert('Terjadi kesalahan. Coba lagi.');
    }
  };

  const handleConfirmPayment = async () => {
    setIsConfirming(true);
    try {
      const botToken = import.meta.env.VITE_TG_BOT_TOKEN;
      const chatId   = import.meta.env.VITE_TG_CHAT_ID;
      if (!botToken || !chatId) { alert('Konfigurasi Telegram belum diisi di .env'); setIsConfirming(false); return; }
      const text = `🚨 <b>PEMBELIAN BARU</b>\n\n📦 <b>${modalData.name}</b>\n👤 ${formName}\n📱 ${formPhone}\n📧 ${formEmail}\n💰 ${modalData.price}\n🆔 <code>${orderId}</code>`;
      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ chat_id:chatId, text, parse_mode:'HTML',
          reply_markup:{ inline_keyboard:[[{ text:`✅ APPROVE ORDER ${orderId}`, callback_data:`APPROVE_ORDER_${orderId}` }]] }
        })
      });
      if (!res.ok) throw new Error((await res.json()).description);
      setPaymentStep(2);
    } catch(err) { alert('Gagal kirim notifikasi: ' + err.message); }
    setIsConfirming(false);
  };

  const checkApprovalStatus = async () => {
    setIsChecking(true);
    try {
      const { data:dbOrder } = await supabase.from('orders').select('status,customer_name,customer_email,product_name').eq('id', orderId).single();
      if (dbOrder?.status === 'approved') {
        const { data:prod } = await supabase.from('products').select('access_link').eq('name', dbOrder.product_name).single();
        await fetch('/api/sendEmail', { method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ to_email:dbOrder.customer_email, to_name:dbOrder.customer_name, product_name:dbOrder.product_name, access_link:prod?.access_link||'Cek dashboard' })
        });
        alert('🎉 Pembayaran dikonfirmasi! Cek email kamu.'); setIsModalOpen(false);
      } else { alert('⏳ Belum dikonfirmasi. Tunggu admin cek mutasi.'); }
    } catch(err) { console.error(err); }
    setIsChecking(false);
  };

  const filtered = products.filter(p => {
    const q = searchQuery.toLowerCase();
    return p.name?.toLowerCase().includes(q) &&
      (activeFilter === 'Semua' || p.category === activeFilter);
  });

  return (
    <>
      <style>{css}</style>
      <Helmet>
        <title>Katalog Produk Digital & Kelas | ARRIVAR.id</title>
        <meta name="description" content="Template Excel, kelas online, dan tools produktivitas untuk karir dan bisnis Anda. Produk digital berkualitas dari ekosistem ARRIVAR." />
      </Helmet>

      {/* NAVBAR */}
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo"><img src="/logo.png" alt="ARRIVAR Logo" /><span>ARRIVAR<em>.id</em></span></Link>
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/services">Layanan</Link></li>
          <li><Link to="/community">Komunitas</Link></li>
          <li><a href="mailto:admin@arrivar.id" className="nav-cta">Hubungi Kami</a></li>
        </ul>
      </nav>

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Produk & Kelas Digital</span>
          <h1>Katalog <em>Ekosistem ARRIVAR</em></h1>
          <div className="accent-bar" />
          <p>Template Excel, kelas online, dan tools bisnis yang langsung bisa dipakai untuk mengakselerasi karir dan pertumbuhan finansial Anda.</p>
        </div>
      </section>

      {/* CATALOG BODY */}
      <div className="catalog-body">

        {/* SEARCH + FILTER */}
        <div className="catalog-controls">
          <div className="search-wrap">
            <span className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <input className="search-input" type="text" placeholder="Cari produk, template, atau kelas..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <div className="filter-pills">
            {FILTERS.map(f => (
              <button key={f} className={`filter-pill${activeFilter===f?' active':''}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
        </div>

        {/* ERROR BANNER — hanya tampil kalau ada masalah koneksi */}
        {dbError && dbError !== 'empty' && (
          <div className="error-banner">
            <span className="error-banner-icon">⚠️</span>
            <div>
              <div className="error-banner-title">Database belum terhubung</div>
              <div className="error-banner-body">
                Katalog menampilkan data contoh. Untuk menampilkan produk nyata, pastikan variabel <code>VITE_SUPABASE_URL</code> dan <code>VITE_SUPABASE_ANON_KEY</code> sudah diisi dengan benar di file <code>.env</code>, lalu restart Vite.
              </div>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p className="loading-text">Memuat katalog...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <div className="empty-title">Produk tidak ditemukan</div>
            <p className="empty-body">Coba kata kunci lain atau reset filter.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map(p => (
              <div className="product-card" key={p.id}>
                <div className="product-thumb">
                  {getIcon(p.emoji)}
                  <span className="product-thumb-badge">{p.category}</span>
                </div>
                <div className="product-info">
                  <span className="product-cat">{p.category}</span>
                  <div className="product-name">{p.name}</div>
                  <p className="product-desc">{p.description}</p>
                  <div className="product-footer">
                    <span className="product-price">{p.price}</span>
                    <button className="product-btn" onClick={() => openModal(p)}>Pesan Sekarang</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="fbrand"><div className="fbrand-name">ARRIVAR<span>.id</span></div><p>Ekosistem digital pertama di Indonesia untuk karir, finansial, dan startup — dalam satu platform terintegrasi.</p><div className="fsocials"><a href="https://www.linkedin.com/company/arrivar-id" target="_blank" rel="noopener noreferrer" className="social-link">in</a><a href="https://www.instagram.com/arrivar.id" target="_blank" rel="noopener noreferrer" className="social-link">ig</a><a href="https://www.threads.com/@arrivar.id" target="_blank" rel="noopener noreferrer" className="social-link">tr</a></div></div>
            <div className="fcol"><h4>Ekosistem</h4><ul><li><Link to="/catalog">Katalog Produk</Link></li><li><Link to="/community">Komunitas</Link></li><li><Link to="/services">Layanan Jasa</Link></li><li><a href="https://www.investguard.id" target="_blank" rel="noopener noreferrer">InvestGuard App</a></li></ul></div>
            <div className="fcol"><h4>Perusahaan</h4><ul><li><Link to="/about">Tentang Kami</Link></li><li><Link to="/privacy">Kebijakan Privasi</Link></li><li><Link to="/legal">Syarat &amp; Ketentuan</Link></li><li><Link to="/career">Karir</Link></li></ul></div>
            <div className="fcol"><h4>Kontak</h4><ul><li><a href="mailto:admin@arrivar.id">admin@arrivar.id</a></li><li><a href="#">Jakarta, Indonesia</a></li><li><a href="https://www.arrivar.id">PT ARRIVAR INDONESIA</a></li></ul></div>
          </div>
          <div className="fbottom"><p>© 2026 <span>PT ARRIVAR INDONESIA</span>. All rights reserved.</p><p>Empowering Indonesia's Future — <span>Career · Financial · Startup</span></p></div>
        </div>
      </footer>
      <button className={`scroll-top${showScrollTop?' visible':''}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑</button>

      {/* ── MODAL CHECKOUT ── */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={e => { if(e.target.classList.contains('modal-overlay')) setIsModalOpen(false); }}>
          <div className="modal-box">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>✕</button>

            {paymentStep === 0 && (
              <>
                <div className="modal-eyebrow">Detail Pemesanan</div>
                <div className="modal-title">{modalData.name}</div>
                <div style={{textAlign:'center'}}><span className="modal-price-badge">Total: {modalData.price}</span></div>
                <div className="modal-divider" />
                <p style={{fontSize:'.8rem',color:'var(--slate)',marginBottom:'1.5rem',textAlign:'center'}}>Lengkapi data diri untuk pengiriman invoice dan akses produk.</p>

                <label className="form-label">Nama Lengkap</label>
                <input className="form-input" type="text" placeholder="Sesuai KTP/Rekening" value={formName} onChange={e=>setFormName(e.target.value)} />

                <label className="form-label">Nomor WhatsApp</label>
                <input className="form-input" type="tel" placeholder="Contoh: 08123456789" value={formPhone} onChange={e=>setFormPhone(e.target.value)} />

                <label className="form-label">Alamat Email</label>
                <input className="form-input" type="email" placeholder="Untuk pengiriman akses produk" value={formEmail} onChange={e=>setFormEmail(e.target.value)} />

                <button className="modal-btn-primary" onClick={submitForm}>Lanjutkan ke Pembayaran →</button>
              </>
            )}

            {paymentStep === 1 && (
              <>
                <div className="total-display">
                  <div className="total-label">Total Transfer</div>
                  <div className="total-amount">{modalData.price}</div>
                </div>
                <div className="qris-box">
                  <div className="qris-label">Bayar via QRIS</div>
                  <img src="/qris.png" alt="QRIS Pembayaran" className="qris-img" />
                  <div className="qris-name">a.n. PT ARRIVAR INDONESIA</div>
                </div>
                <button className="modal-btn-primary" onClick={handleConfirmPayment} disabled={isConfirming} style={{background:'#27AE60',marginBottom:'.75rem'}}>
                  {isConfirming ? 'Mengirim Notifikasi...' : '✓ Saya Sudah Transfer'}
                </button>
                <button className="modal-btn-ghost" onClick={()=>setPaymentStep(0)}>← Kembali</button>
              </>
            )}

            {paymentStep === 2 && (
              <div className="waiting-box">
                <div className="waiting-icon">⏳</div>
                <div className="waiting-title">Menunggu Konfirmasi</div>
                <p className="waiting-body">Admin sedang memverifikasi dana masuk. Klik tombol di bawah secara berkala untuk mengecek status pesanan Anda.</p>
                <button className="modal-btn-dark" onClick={checkApprovalStatus} disabled={isChecking}>
                  {isChecking ? 'Mengecek...' : 'Cek Status Pembayaran'}
                </button>
                <button className="modal-btn-ghost" onClick={()=>setIsModalOpen(false)}>Tutup — Cek Nanti</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}