import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// ─── SVG ICONS ───────────────────────────────────────────────────────────────
const SVG_ICONS = {
  '📈': (s,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  '💰': (s,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8 11l3 3 5-5"/></svg>,
  '🚀': (s,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>,
  '📖': (s,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  '💼': (s,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  '🏢': (s,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/></svg>,
  '💡': (s,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
  '🛠️': (s,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  '🎓': (s,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  '🖥️': (s,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  '📊': (s,c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
};
const getIcon = (emoji, size = 28, color = '#D4AF37') =>
  (SVG_ICONS[emoji] || SVG_ICONS['📊'])(size, color);

const ICON_OPTIONS = [
  { label:'Grafik (Default)', value:'📊' }, { label:'Pertumbuhan', value:'📈' },
  { label:'Uang / Finansial', value:'💰' }, { label:'Roket / Akselerasi', value:'🚀' },
  { label:'Buku / Panduan', value:'📖' }, { label:'Tas Kerja / Karir', value:'💼' },
  { label:'Gedung / Korporat', value:'🏢' }, { label:'Ide / Startup', value:'💡' },
  { label:'Tools / Alat', value:'🛠️' }, { label:'Pendidikan', value:'🎓' },
  { label:'Teknologi', value:'🖥️' },
];

const EMPTY_PRODUCT = { name:'', price:'', category:'Produk Digital', emoji:'📊', description:'', image_url:'', access_type:'File Publik', access_link:'' };
const EMPTY_JOB = { title:'', dept:'', type:'Full-time', location:'', is_open: true };

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --navy:#00182A;--navy-mid:#0D2940;--gold:#D4AF37;--gold-dim:#B8962E;
    --white:#FFFFFF;--bg:#F0F2F5;--slate:#394B5A;--slate-light:#A7B8C6;
    --green:#16A34A;--red:#DC2626;
    --ff:'Poppins',sans-serif;--radius-sm:6px;--radius-md:10px;--radius-lg:16px;
    --tr:0.25s cubic-bezier(0.4,0,0.2,1);
  }
  html,body{font-family:var(--ff);background:var(--bg);color:var(--navy);-webkit-font-smoothing:antialiased;height:100%;overflow:hidden;}

  /* ── LAYOUT ── */
  .admin-root{display:flex;width:100vw;height:100vh;position:fixed;top:0;left:0;z-index:2000;overflow:hidden;}

  /* ── SIDEBAR ── */
  .sidebar{width:260px;min-width:260px;background:var(--navy);height:100vh;display:flex;flex-direction:column;border-right:2px solid rgba(212,175,55,.2);}
  .sidebar-brand{padding:2.5rem 2rem 2rem;}
  .sidebar-logo{font-size:1.3rem;font-weight:800;color:var(--white);letter-spacing:.04em;}
  .sidebar-logo span{color:var(--gold);}
  .sidebar-sub{font-size:.58rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--slate-light);margin-top:.35rem;}
  .sidebar-nav{flex:1;display:flex;flex-direction:column;gap:2px;padding:0 1rem;}
  .nav-btn{display:flex;align-items:center;gap:.85rem;width:100%;padding:.9rem 1.25rem;border:none;border-radius:var(--radius-md);cursor:pointer;font-family:var(--ff);font-size:.75rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;transition:all var(--tr);text-align:left;}
  .nav-btn.active{background:var(--gold);color:var(--navy);}
  .nav-btn:not(.active){background:transparent;color:var(--slate-light);}
  .nav-btn:not(.active):hover{background:rgba(255,255,255,.06);color:var(--white);}
  .nav-btn-icon{width:34px;height:34px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;flex-shrink:0;background:rgba(255,255,255,.06);}
  .nav-btn.active .nav-btn-icon{background:rgba(0,24,42,.15);}
  .nav-badge{margin-left:auto;background:var(--red);color:#fff;font-size:.6rem;font-weight:800;padding:.15rem .5rem;border-radius:100px;min-width:20px;text-align:center;}
  .nav-btn.active .nav-badge{background:var(--navy);}
  .sidebar-footer{padding:1.5rem 1.5rem 2rem;border-top:1px solid rgba(255,255,255,.07);}
  .sidebar-back{display:flex;align-items:center;gap:.6rem;text-decoration:none;font-size:.72rem;font-weight:600;color:var(--slate-light);transition:color var(--tr);}
  .sidebar-back:hover{color:var(--gold);}
  .sidebar-back svg{flex-shrink:0;}

  /* ── MAIN ── */
  .main{flex:1;height:100vh;overflow-y:auto;background:var(--bg);}
  .main-header{background:var(--white);padding:1.5rem 2.5rem;border-bottom:1px solid rgba(0,24,42,.07);display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10;}
  .main-header-left h1{font-size:1.35rem;font-weight:800;color:var(--navy);}
  .main-header-left p{font-size:.75rem;color:var(--slate-light);font-weight:500;margin-top:.15rem;}
  .main-body{padding:2rem 2.5rem;}

  /* ── STAT CARDS ── */
  .stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2rem;}
  .stat-card{background:var(--white);border:1px solid rgba(0,24,42,.07);border-radius:var(--radius-lg);padding:1.5rem;border-left:3px solid var(--gold);}
  .stat-card-label{font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--slate-light);margin-bottom:.5rem;}
  .stat-card-val{font-size:2rem;font-weight:900;color:var(--navy);line-height:1;}

  /* ── PANEL ── */
  .panel{background:var(--white);border:1px solid rgba(0,24,42,.07);border-radius:var(--radius-lg);overflow:hidden;margin-bottom:2rem;}
  .panel-header{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.75rem;border-bottom:1px solid rgba(0,24,42,.07);}
  .panel-title{font-size:.9rem;font-weight:700;color:var(--navy);}
  .panel-body{padding:1.75rem;}

  /* ── BUTTONS ── */
  .btn{display:inline-flex;align-items:center;gap:.45rem;font-family:var(--ff);font-weight:700;font-size:.74rem;letter-spacing:.07em;text-transform:uppercase;border:none;cursor:pointer;border-radius:var(--radius-sm);transition:all var(--tr);padding:.6rem 1.25rem;}
  .btn-gold{background:var(--gold);color:var(--navy);}.btn-gold:hover{background:var(--gold-dim);}
  .btn-navy{background:var(--navy);color:var(--gold);}.btn-navy:hover{background:var(--navy-mid);}
  .btn-ghost{background:rgba(0,24,42,.05);color:var(--slate);}.btn-ghost:hover{background:rgba(0,24,42,.1);color:var(--navy);}
  .btn-danger{background:rgba(220,38,38,.08);color:var(--red);border:1.5px solid rgba(220,38,38,.2);}.btn-danger:hover{background:rgba(220,38,38,.15);}
  .btn-success{background:rgba(22,163,74,.08);color:var(--green);border:1.5px solid rgba(22,163,74,.2);}.btn-success:hover{background:rgba(22,163,74,.15);}
  .btn-full{width:100%;justify-content:center;padding:.9rem;font-size:.82rem;}

  /* ── FORM ── */
  .form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.25rem;}
  .form-group{display:flex;flex-direction:column;gap:.45rem;}
  .form-label{font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--slate);}
  .form-input,.form-select,.form-textarea{font-family:var(--ff);font-size:.875rem;color:var(--navy);padding:.8rem 1rem;border:1.5px solid rgba(0,24,42,.12);border-radius:var(--radius-sm);outline:none;background:var(--white);transition:border-color var(--tr),box-shadow var(--tr);width:100%;}
  .form-input:focus,.form-select:focus,.form-textarea:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(212,175,55,.1);}
  .form-textarea{min-height:90px;resize:vertical;}
  .form-actions{display:flex;gap:.75rem;margin-top:1.5rem;}

  /* ── TABLE ── */
  .data-table{width:100%;border-collapse:collapse;}
  .data-table thead tr{background:var(--navy);}
  .data-table th{padding:1rem 1.25rem;text-align:left;font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);}
  .data-table tbody tr{border-bottom:1px solid rgba(0,24,42,.05);transition:background var(--tr);}
  .data-table tbody tr:hover{background:rgba(0,24,42,.025);}
  .data-table td{padding:1rem 1.25rem;font-size:.85rem;vertical-align:middle;}
  .data-table tbody tr:last-child{border-bottom:none;}

  /* ── PRODUCT THUMB ── */
  .prod-thumb{width:48px;height:48px;background:var(--navy);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;}
  .prod-thumb img{width:100%;height:100%;object-fit:cover;}
  .prod-name{font-size:.9rem;font-weight:700;color:var(--navy);}
  .prod-sub{font-size:.68rem;font-weight:600;color:var(--gold);letter-spacing:.06em;text-transform:uppercase;margin-top:.2rem;}

  /* ── STATUS BADGE ── */
  .badge{display:inline-block;font-size:.65rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;padding:.25rem .75rem;border-radius:100px;}
  .badge-pending{background:rgba(234,179,8,.12);color:#854D0E;border:1px solid rgba(234,179,8,.3);}
  .badge-approved{background:rgba(22,163,74,.1);color:var(--green);border:1px solid rgba(22,163,74,.25);}
  .badge-open{background:rgba(212,175,55,.1);color:var(--gold-dim);border:1px solid rgba(212,175,55,.25);}
  .badge-closed{background:rgba(0,24,42,.07);color:var(--slate);border:1px solid rgba(0,24,42,.12);}

  /* ── ACTIONS ROW ── */
  .action-row{display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;}

  /* ── EMPTY ── */
  .empty-row td{text-align:center;padding:4rem;color:var(--slate-light);font-size:.86rem;}

  /* ── LOADING ── */
  .loading-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem;gap:1rem;}
  .spinner{width:36px;height:36px;border:3px solid rgba(212,175,55,.2);border-top-color:var(--gold);border-radius:50%;animation:spin .8s linear infinite;}
  @keyframes spin{to{transform:rotate(360deg);}}
  .loading-text{font-size:.82rem;font-weight:600;color:var(--slate-light);}

  /* ── DIVIDER ── */
  .divider{height:1px;background:rgba(0,24,42,.07);margin:1.5rem 0;}
`;

export default function AdminDashboard() {
  const [view, setView]         = useState('catalog');
  const [loading, setLoading]   = useState(true);
  const [products, setProducts] = useState([]);
  const [orders, setOrders]     = useState([]);
  const [jobs, setJobs]         = useState([]);

  // Product form
  const [showProductForm, setShowProductForm] = useState(false);
  const [newProduct, setNewProduct]           = useState(EMPTY_PRODUCT);

  // Job form
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob]   = useState(null); // null = add, object = edit
  const [jobForm, setJobForm]         = useState(EMPTY_JOB);

  useEffect(() => { fetchAll(); }, []);

  // ── Data fetching ──────────────────────────────────────────────────────────
  async function fetchAll() {
    setLoading(true);
    try {
      const [{ data: pData }, { data: oData }, { data: jData }] = await Promise.all([
        supabase.from('products').select('*').order('id', { ascending: false }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('jobs').select('*').order('id', { ascending: false }),
      ]);
      setProducts(pData || []);
      setOrders(oData || []);
      setJobs(jData || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  }

  // ── Product CRUD ───────────────────────────────────────────────────────────
  async function handleAddProduct() {
    if (!newProduct.name || !newProduct.price) { alert('Nama dan Harga wajib diisi.'); return; }
    const { error } = await supabase.from('products').insert([newProduct]);
    if (error) { alert('Gagal: ' + error.message); return; }
    setShowProductForm(false); setNewProduct(EMPTY_PRODUCT); fetchAll();
  }

  async function deleteProduct(id) {
    if (!window.confirm('Hapus produk ini secara permanen?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchAll();
  }

  // ── Order actions ──────────────────────────────────────────────────────────
  async function approveOrder(order) {
    if (!window.confirm(`Verifikasi pembayaran dari ${order.customer_name}?`)) return;
    const { error } = await supabase.from('orders').update({ status: 'approved' }).eq('id', order.id);
    if (error) { alert('Gagal approve: ' + error.message); return; }
    fetchAll();
    try {
      const { data: prod } = await supabase.from('products').select('access_link').eq('name', order.product_name).single();
      const linkAkses = prod?.access_link || 'Hubungi admin';
      await fetch('/api/sendEmail', { method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ to_email:order.customer_email, to_name:order.customer_name, product_name:order.product_name, access_link:linkAkses })
      });
      const botToken = import.meta.env.VITE_TG_BOT_TOKEN;
      const chatId   = import.meta.env.VITE_TG_CHAT_ID;
      if (botToken && chatId) {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ chat_id:chatId, parse_mode:'HTML',
            text:`✅ <b>PESANAN DISETUJUI</b>\n\n🆔 #${order.id}\n👤 ${order.customer_name}\n📦 ${order.product_name}\n\nProduk dikirim ke <code>${order.customer_email}</code>` })
        });
      }
      alert('Berhasil di-approve! Produk terkirim ke email pembeli.');
    } catch(e) { console.error(e); }
  }

  // ── Job CRUD ───────────────────────────────────────────────────────────────
  function openAddJob() {
    setEditingJob(null); setJobForm(EMPTY_JOB); setShowJobForm(true);
  }
  function openEditJob(job) {
    setEditingJob(job);
    setJobForm({ title:job.title, dept:job.dept, type:job.type, location:job.location, is_open:job.is_open });
    setShowJobForm(true);
  }
  async function handleSaveJob() {
    if (!jobForm.title || !jobForm.dept || !jobForm.location) { alert('Judul, departemen, dan lokasi wajib diisi.'); return; }
    if (editingJob) {
      const { error } = await supabase.from('jobs').update(jobForm).eq('id', editingJob.id);
      if (error) { alert('Gagal update: ' + error.message); return; }
    } else {
      const { error } = await supabase.from('jobs').insert([jobForm]);
      if (error) { alert('Gagal simpan: ' + error.message); return; }
    }
    setShowJobForm(false); setEditingJob(null); setJobForm(EMPTY_JOB); fetchAll();
  }
  async function toggleJobStatus(job) {
    await supabase.from('jobs').update({ is_open: !job.is_open }).eq('id', job.id);
    fetchAll();
  }
  async function deleteJob(id) {
    if (!window.confirm('Hapus posisi ini?')) return;
    await supabase.from('jobs').delete().eq('id', id);
    fetchAll();
  }

  // ── Derived stats ──────────────────────────────────────────────────────────
  const pendingOrders = orders.filter(o => o.status !== 'approved').length;
  const openJobs      = jobs.filter(j => j.is_open).length;

  // ── Sidebar items ──────────────────────────────────────────────────────────
  const NAV = [
    { key:'catalog', label:'Manajemen Katalog',  badge: null },
    { key:'orders',  label:'Pesanan Masuk',       badge: pendingOrders || null },
    { key:'jobs',    label:'Lowongan Kerja',       badge: null },
  ];
  const NAV_ICONS = {
    catalog: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    orders:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8 11l3 3 5-5"/></svg>,
    jobs:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  };

  const VIEW_LABELS = { catalog:'Manajemen Katalog', orders:'Monitoring Pesanan', jobs:'Manajemen Lowongan' };

  return (
    <>
      <style>{css}</style>
      <div className="admin-root">

        {/* ── SIDEBAR ──────────────────────────────────────────────────── */}
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="sidebar-logo">ARRIVAR<span>.id</span></div>
            <div className="sidebar-sub">Management Console</div>
          </div>

          <nav className="sidebar-nav">
            {NAV.map(n => (
              <button key={n.key} className={`nav-btn${view===n.key?' active':''}`} onClick={()=>setView(n.key)}>
                <span className="nav-btn-icon">{NAV_ICONS[n.key]}</span>
                {n.label}
                {n.badge ? <span className="nav-badge">{n.badge}</span> : null}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <Link to="/" className="sidebar-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Kembali ke Website
            </Link>
          </div>
        </aside>

        {/* ── MAIN ─────────────────────────────────────────────────────── */}
        <main className="main">

          {/* Top header */}
          <div className="main-header">
            <div className="main-header-left">
              <h1>{VIEW_LABELS[view]}</h1>
              <p>PT ARRIVAR INDONESIA — Data Terintegrasi</p>
            </div>
            <div style={{display:'flex',gap:'.75rem'}}>
              {view === 'catalog' && (
                <button className="btn btn-navy" onClick={()=>{setShowProductForm(!showProductForm);}}>
                  {showProductForm ? '✕ Batal' : '+ Tambah Produk'}
                </button>
              )}
              {view === 'jobs' && (
                <button className="btn btn-navy" onClick={openAddJob}>
                  + Tambah Posisi
                </button>
              )}
            </div>
          </div>

          <div className="main-body">

            {/* ── STAT CARDS ── */}
            <div className="stat-row">
              <div className="stat-card"><div className="stat-card-label">Total Produk</div><div className="stat-card-val">{products.length}</div></div>
              <div className="stat-card"><div className="stat-card-label">Pesanan Masuk</div><div className="stat-card-val">{orders.length}</div></div>
              <div className="stat-card"><div className="stat-card-label">Menunggu Approve</div><div className="stat-card-val" style={{color:'var(--red)'}}>{pendingOrders}</div></div>
              <div className="stat-card"><div className="stat-card-label">Lowongan Aktif</div><div className="stat-card-val" style={{color:'var(--green)'}}>{openJobs}</div></div>
            </div>

            {/* ══════════════════ VIEW: CATALOG ══════════════════ */}
            {view === 'catalog' && (
              <>
                {/* Add Product Form */}
                {showProductForm && (
                  <div className="panel" style={{borderTop:'3px solid var(--gold)',marginBottom:'2rem'}}>
                    <div className="panel-header">
                      <div className="panel-title">Input Produk Baru</div>
                    </div>
                    <div className="panel-body">
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">Nama Produk *</label>
                          <input className="form-input" placeholder="Contoh: Template Keuangan Pro" value={newProduct.name} onChange={e=>setNewProduct({...newProduct,name:e.target.value})} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Harga Jual *</label>
                          <input className="form-input" placeholder="Rp 99.000" value={newProduct.price} onChange={e=>setNewProduct({...newProduct,price:e.target.value})} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Kategori</label>
                          <select className="form-select" value={newProduct.category} onChange={e=>setNewProduct({...newProduct,category:e.target.value})}>
                            <option>Produk Digital</option><option>Kelas</option><option>Jasa</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Ikon</label>
                          <select className="form-select" value={newProduct.emoji} onChange={e=>setNewProduct({...newProduct,emoji:e.target.value})}>
                            {ICON_OPTIONS.map(o=><option key={o.value} value={o.value}>{o.value} {o.label}</option>)}
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Tipe Akses</label>
                          <select className="form-select" value={newProduct.access_type} onChange={e=>setNewProduct({...newProduct,access_type:e.target.value})}>
                            <option value="File Publik">File Tersimpan di Publik</option>
                            <option value="Link Eksternal">Link Eksternal (GDrive / Zoom)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">File / Link Akses</label>
                          <input className="form-input" placeholder={newProduct.access_type==='File Publik'?'template.pdf':'https://drive.google.com/...'} value={newProduct.access_link} onChange={e=>setNewProduct({...newProduct,access_link:e.target.value})} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Gambar Produk (opsional)</label>
                          <input className="form-input" placeholder="foto.png (dari folder /public)" value={newProduct.image_url} onChange={e=>setNewProduct({...newProduct,image_url:e.target.value})} />
                        </div>
                      </div>
                      <div className="form-group" style={{marginTop:'1.25rem'}}>
                        <label className="form-label">Deskripsi</label>
                        <textarea className="form-textarea" placeholder="Deskripsi singkat produk..." value={newProduct.description} onChange={e=>setNewProduct({...newProduct,description:e.target.value})} />
                      </div>
                      <div className="form-actions">
                        <button className="btn btn-gold btn-full" onClick={handleAddProduct}>Simpan ke Katalog →</button>
                        <button className="btn btn-ghost" onClick={()=>{setShowProductForm(false);setNewProduct(EMPTY_PRODUCT);}}>Batal</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Products table */}
                <div className="panel">
                  <div className="panel-header">
                    <div className="panel-title">Daftar Produk ({products.length})</div>
                  </div>
                  {loading ? (
                    <div className="loading-wrap"><div className="spinner"/><div className="loading-text">Memuat data...</div></div>
                  ) : (
                    <table className="data-table">
                      <thead><tr>
                        <th>Produk</th><th>Harga</th><th>Kategori</th><th>Akses</th><th style={{textAlign:'center'}}>Aksi</th>
                      </tr></thead>
                      <tbody>
                        {products.length === 0 ? (
                          <tr className="empty-row"><td colSpan={5}>Belum ada produk. Tambahkan produk pertama Anda.</td></tr>
                        ) : products.map(p => (
                          <tr key={p.id}>
                            <td>
                              <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                                <div className="prod-thumb">
                                  {p.image_url ? <img src={`/${p.image_url}`} alt="" /> : getIcon(p.emoji, 24, '#D4AF37')}
                                </div>
                                <div>
                                  <div className="prod-name">{p.name}</div>
                                  <div className="prod-sub">{p.access_type || 'Default'}</div>
                                </div>
                              </div>
                            </td>
                            <td style={{fontWeight:800,color:'var(--navy)'}}>{p.price}</td>
                            <td><span className="badge badge-open">{p.category}</span></td>
                            <td style={{fontSize:'.78rem',color:'var(--slate)',maxWidth:180,wordBreak:'break-all'}}>{p.access_link || '—'}</td>
                            <td>
                              <div className="action-row" style={{justifyContent:'center'}}>
                                <button className="btn btn-danger" onClick={()=>deleteProduct(p.id)}>Hapus</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </>
            )}

            {/* ══════════════════ VIEW: ORDERS ══════════════════ */}
            {view === 'orders' && (
              <div className="panel">
                <div className="panel-header">
                  <div className="panel-title">Semua Pesanan ({orders.length})</div>
                  <span className="badge badge-pending">{pendingOrders} Menunggu</span>
                </div>
                {loading ? (
                  <div className="loading-wrap"><div className="spinner"/><div className="loading-text">Memuat pesanan...</div></div>
                ) : (
                  <table className="data-table">
                    <thead><tr>
                      <th>Pembeli</th><th>Produk</th><th>Waktu</th><th>Status</th><th style={{textAlign:'center'}}>Aksi</th>
                    </tr></thead>
                    <tbody>
                      {orders.length === 0 ? (
                        <tr className="empty-row"><td colSpan={5}>Belum ada pesanan masuk.</td></tr>
                      ) : orders.map(o => (
                        <tr key={o.id}>
                          <td>
                            <div style={{fontWeight:700,color:'var(--navy)',marginBottom:'.2rem'}}>{o.customer_name}</div>
                            <div style={{fontSize:'.75rem',color:'var(--slate-light)'}}>{o.customer_email}</div>
                            <div style={{fontSize:'.72rem',color:'var(--slate-light)'}}>{o.customer_phone}</div>
                          </td>
                          <td style={{fontWeight:600,color:'var(--navy)'}}>{o.product_name}</td>
                          <td style={{fontSize:'.78rem',color:'var(--slate-light)',whiteSpace:'nowrap'}}>
                            {new Date(o.created_at).toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'})}
                          </td>
                          <td>
                            <span className={`badge ${o.status==='approved'?'badge-approved':'badge-pending'}`}>
                              {o.status==='approved' ? 'Disetujui' : 'Menunggu'}
                            </span>
                          </td>
                          <td>
                            <div className="action-row" style={{justifyContent:'center'}}>
                              <a href={`https://wa.me/${o.customer_phone?.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
                                className="btn btn-success">WA</a>
                              {o.status !== 'approved' && (
                                <button className="btn btn-navy" onClick={()=>approveOrder(o)}>✓ Approve</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* ══════════════════ VIEW: JOBS ══════════════════ */}
            {view === 'jobs' && (
              <>
                {/* Add / Edit Job Form */}
                {showJobForm && (
                  <div className="panel" style={{borderTop:'3px solid var(--gold)',marginBottom:'2rem'}}>
                    <div className="panel-header">
                      <div className="panel-title">{editingJob ? 'Edit Posisi Lowongan' : 'Tambah Posisi Baru'}</div>
                    </div>
                    <div className="panel-body">
                      <div className="form-grid">
                        <div className="form-group" style={{gridColumn:'1/-1'}}>
                          <label className="form-label">Judul Posisi *</label>
                          <input className="form-input" placeholder="Contoh: Fullstack Developer (React/Node)" value={jobForm.title} onChange={e=>setJobForm({...jobForm,title:e.target.value})} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Departemen *</label>
                          <input className="form-input" placeholder="Contoh: Tech / Marketing / Design" value={jobForm.dept} onChange={e=>setJobForm({...jobForm,dept:e.target.value})} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Tipe Kontrak</label>
                          <select className="form-select" value={jobForm.type} onChange={e=>setJobForm({...jobForm,type:e.target.value})}>
                            <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Lokasi *</label>
                          <input className="form-input" placeholder="Contoh: Jakarta / Remote" value={jobForm.location} onChange={e=>setJobForm({...jobForm,location:e.target.value})} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Status Lowongan</label>
                          <select className="form-select" value={jobForm.is_open?'open':'closed'} onChange={e=>setJobForm({...jobForm,is_open:e.target.value==='open'})}>
                            <option value="open">🟢 Dibuka</option>
                            <option value="closed">🔴 Ditutup</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-actions">
                        <button className="btn btn-gold btn-full" onClick={handleSaveJob}>
                          {editingJob ? 'Simpan Perubahan →' : 'Tambahkan Posisi →'}
                        </button>
                        <button className="btn btn-ghost" onClick={()=>{setShowJobForm(false);setEditingJob(null);setJobForm(EMPTY_JOB);}}>Batal</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Jobs table */}
                <div className="panel">
                  <div className="panel-header">
                    <div className="panel-title">Semua Posisi ({jobs.length})</div>
                    <div style={{display:'flex',gap:'.75rem',alignItems:'center'}}>
                      <span style={{fontSize:'.75rem',color:'var(--slate-light)',fontWeight:500}}>{openJobs} Aktif</span>
                      <span style={{fontSize:'.75rem',color:'var(--slate-light)',fontWeight:500}}>• {jobs.length - openJobs} Ditutup</span>
                    </div>
                  </div>
                  {loading ? (
                    <div className="loading-wrap"><div className="spinner"/><div className="loading-text">Memuat lowongan...</div></div>
                  ) : (
                    <table className="data-table">
                      <thead><tr>
                        <th>Posisi</th><th>Departemen</th><th>Tipe</th><th>Lokasi</th><th>Status</th><th style={{textAlign:'center'}}>Aksi</th>
                      </tr></thead>
                      <tbody>
                        {jobs.length === 0 ? (
                          <tr className="empty-row"><td colSpan={6}>Belum ada lowongan. Tambahkan posisi pertama.</td></tr>
                        ) : jobs.map(j => (
                          <tr key={j.id}>
                            <td style={{fontWeight:700,color:'var(--navy)'}}>{j.title}</td>
                            <td><span className="badge badge-open">{j.dept}</span></td>
                            <td style={{fontSize:'.82rem',color:'var(--slate)'}}>{j.type}</td>
                            <td style={{fontSize:'.82rem',color:'var(--slate)'}}>{j.location}</td>
                            <td>
                              <span className={`badge ${j.is_open?'badge-approved':'badge-closed'}`}>
                                {j.is_open ? '🟢 Dibuka' : '🔴 Ditutup'}
                              </span>
                            </td>
                            <td>
                              <div className="action-row" style={{justifyContent:'center'}}>
                                <button className="btn btn-ghost" onClick={()=>openEditJob(j)}>Edit</button>
                                <button className={`btn ${j.is_open?'btn-danger':'btn-success'}`} onClick={()=>toggleJobStatus(j)}>
                                  {j.is_open ? 'Tutup' : 'Buka'}
                                </button>
                                <button className="btn btn-danger" onClick={()=>deleteJob(j.id)}>Hapus</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Info card — SQL hint */}
                <div style={{background:'rgba(212,175,55,.06)',border:'1px solid rgba(212,175,55,.2)',borderRadius:'var(--radius-md)',padding:'1.25rem 1.5rem',marginTop:'1rem'}}>
                  <div style={{fontSize:'.72rem',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--gold-dim)',marginBottom:'.5rem'}}>Catatan Setup Database</div>
                  <div style={{fontSize:'.78rem',lineHeight:1.7,color:'var(--slate)'}}>
                    Pastikan tabel <code style={{background:'rgba(0,24,42,.07)',padding:'.1rem .4rem',borderRadius:'4px',fontFamily:'monospace'}}>jobs</code> sudah dibuat di Supabase dengan kolom: <code style={{background:'rgba(0,24,42,.07)',padding:'.1rem .4rem',borderRadius:'4px',fontFamily:'monospace'}}>id, title, dept, type, location, is_open (boolean), created_at</code>. Data lowongan ini akan otomatis terhubung ke halaman Career.
                  </div>
                </div>
              </>
            )}

          </div>
        </main>
      </div>
    </>
  );
}