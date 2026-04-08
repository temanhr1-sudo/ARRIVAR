import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('catalog'); 

  // PERUBAHAN: Tambah field access_type dan access_link
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ 
    name: '', price: '', category: 'Produk Digital', emoji: '📊', description: '', image_url: '', access_type: 'File Publik', access_link: ''
  });

  // DAFTAR IKON DROPDOWN
  const iconOptions = [
    { label: 'Grafik (Default)', value: '📊' },
    { label: 'Buku / Panduan', value: '📖' },
    { label: 'Tas Kerja / Karir', value: '💼' },
    { label: 'Pertumbuhan', value: '📈' },
    { label: 'Gedung / Korporat', value: '🏢' },
    { label: 'Ide / Startup', value: '💡' },
    { label: 'Uang / Finansial', value: '💰' },
    { label: 'Roket / Akselerasi', value: '🚀' },
    { label: 'Tools / Alat', value: '🛠️' },
    { label: 'Pendidikan', value: '🎓' },
    { label: 'Teknologi', value: '🖥️' }
  ];

  // FUNGSI PEMBANTU UNTUK RENDER SVG MINIMALIS BERDASARKAN EMOJI
  const renderSVGIcon = (emoji, size = 32, color = '#C9A84C') => {
    const svgProps = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" };
    switch (emoji) {
      case '📈': return <svg {...svgProps}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>;
      case '💰': return <svg {...svgProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M8 11l3 3 5-5"></path></svg>;
      case '🚀': return <svg {...svgProps}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>;
      case '📖': return <svg {...svgProps}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
      case '💼': return <svg {...svgProps}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
      case '🏢': return <svg {...svgProps}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>;
      case '💡': return <svg {...svgProps}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>;
      case '🛠️': return <svg {...svgProps}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>;
      case '🎓': return <svg {...svgProps}><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>;
      case '🖥️': return <svg {...svgProps}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
      case '📊': default: return <svg {...svgProps}><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const { data: pData } = await supabase.from('products').select('*').order('id', { ascending: false });
      const { data: oData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      setProducts(pData || []);
      setOrders(oData || []);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddProduct() {
    if (!newProduct.name || !newProduct.price) {
      alert('Nama dan Harga wajib diisi!');
      return;
    }
    const { error } = await supabase.from('products').insert([newProduct]);
    if (error) alert('Gagal: ' + error.message);
    else {
      setShowAddForm(false);
      setNewProduct({ name: '', price: '', category: 'Produk Digital', emoji: '📊', description: '', image_url: '', access_type: 'File Publik', access_link: '' });
      fetchData();
    }
  }

  async function deleteProduct(id) {
    if (window.confirm('Hapus produk ini secara permanen?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchData();
    }
  }

  // 🟢 FUNGSI UPDATE: Approve & Kirim Akses ke Email User + Telegram
  async function approveOrder(order) {
    if (window.confirm(`Verifikasi pembayaran dari ${order.customer_name} dan kirim akses ke email user ini?`)) {
      const { error } = await supabase.from('orders').update({ status: 'approved' }).eq('id', order.id);
      if (error) {
        alert('Gagal Approve: ' + error.message);
      } else {
        fetchData();
        
        // 1. Ambil Link / Akses Produk dari tabel products
        const { data: prod } = await supabase.from('products').select('access_link').eq('name', order.product_name).single();
        const linkAkses = prod ? prod.access_link : 'Hubungi Admin untuk link produk';

        // 2. KIRIM EMAIL MENGGUNAKAN EMAILJS API
        try {
          const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

          if (serviceId && templateId && publicKey) {
            await fetch('https://api.emailjs.com/api/v1.0/email/send', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                template_params: {
                  to_name: order.customer_name,
                  to_email: order.customer_email,
                  product_name: order.product_name,
                  access_link: linkAkses
                }
              })
            });
          }
        } catch (e) { 
          console.error("Gagal mengirim email akses:", e); 
        }

        // 3. KIRIM NOTIFIKASI KE TELEGRAM BAHWA SUDAH DI-APPROVE
        try {
          const botToken = import.meta.env.VITE_TG_BOT_TOKEN;
          const chatId = import.meta.env.VITE_TG_CHAT_ID;
          if (botToken && chatId) {
            const text = `✅ <b>PESANAN DISETUJUI & TERKIRIM</b>\n\n🆔 Order ID: #${order.id}\n👤 Pembeli: ${order.customer_name}\n📦 Produk: ${order.product_name}\n\nSistem telah mengirimkan produk (${linkAkses}) ke email klien.`;
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: "HTML" })
            });
          }
        } catch (e) { console.error("Gagal kirim balik ke TG:", e); }
      }
    }
  }

  // --- STYLES RE-ENGINEERED (ISOLASI TOTAL) ---
  const styles = {
    adminBody: {
      display: 'flex',
      minHeight: '100vh',
      width: '100vw',
      background: '#F0F2F5',
      position: 'fixed', // Mengunci agar tidak terpengaruh scroll landing page
      top: 0,
      left: 0,
      zIndex: 2000,
      fontFamily: "'DM Sans', sans-serif",
    },
    sidebar: {
      width: '300px',
      background: '#0B1426',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '3px solid #C9A84C',
      boxSizing: 'border-box',
    },
    navButton: (active) => ({
      width: '100%',
      padding: '1.2rem 2.5rem',
      cursor: 'pointer',
      textAlign: 'left',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      fontSize: '0.85rem',
      fontWeight: '800',
      letterSpacing: '1px',
      transition: 'all 0.3s',
      background: active ? '#C9A84C' : 'transparent',
      color: active ? '#0B1426' : '#FFF',
      outline: 'none'
    }),
    contentArea: {
      flex: 1,
      height: '100vh',
      overflowY: 'auto',
      padding: '3rem',
      boxSizing: 'border-box',
    },
    headerCard: {
      background: '#FFF',
      padding: '1.5rem 2.5rem',
      borderRadius: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2.5rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      border: '1px solid #E2E8F0'
    },
    input: {
      width: '100%',
      padding: '1rem',
      border: '2px solid #E2E8F0',
      borderRadius: '8px',
      fontSize: '0.95rem',
      marginTop: '0.5rem',
      boxSizing: 'border-box'
    },
    btnGold: {
      background: '#C9A84C',
      color: '#0B1426',
      padding: '1.2rem',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '900',
      cursor: 'pointer',
      fontSize: '1rem',
      letterSpacing: '1px',
      width: '100%',
      marginTop: '2rem'
    }
  };

  return (
    <div style={styles.adminBody}>
      
      {/* SIDEBAR NAVIGATION */}
      <aside style={styles.sidebar}>
        <div style={{ padding: '3.5rem 2.5rem' }}>
          <h2 style={{ fontFamily: "serif", color: '#FFF', fontSize: '2rem', margin: 0 }}>
            ARRIVAR<span style={{ color: '#C9A84C' }}>.id</span>
          </h2>
          <p style={{ color: '#8B95A8', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '10px', fontWeight: 800 }}>
              Management Console
          </p>
        </div>

        <nav style={{ flex: 1 }}>
          <button onClick={() => setView('catalog')} style={styles.navButton(view === 'catalog')}>
            <span style={{fontSize: '1.5rem'}}>📦</span> MANAJEMEN KATALOG
          </button>
          <button onClick={() => setView('orders')} style={styles.navButton(view === 'orders')}>
            <span style={{fontSize: '1.5rem'}}>💰</span> PESANAN MASUK
          </button>
        </nav>

        <div style={{ padding: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#FFF' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #D4AF37)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 22L12 2l8 20"></path>
            <path d="M8 14h8"></path>
          </svg>
          <span>ARRIVAR<em style={{ color: '#C9A84C', fontStyle: 'normal' }}>.id</em></span>
        </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={styles.contentArea}>
        
        {/* TOP HEADER */}
        <div style={styles.headerCard}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', color: '#0B1426', fontFamily: 'serif', fontWeight: 800 }}>
              {view === 'catalog' ? 'Manajemen Katalog' : 'Monitoring Leads'}
            </h1>
            <p style={{ margin: '5px 0 0', color: '#888', fontSize: '0.9rem', fontWeight: 600 }}>
              PT ARRIVAR INDONESIA — Data Terintegrasi
            </p>
          </div>
          
          {view === 'catalog' && (
            <button onClick={() => setShowAddForm(!showAddForm)} style={{ background: '#0B1426', color: '#FFF', padding: '0.9rem 1.8rem', borderRadius: '8px', border: 'none', fontWeight: '900', cursor: 'pointer' }}>
              {showAddForm ? '✕ BATALKAN' : '+ TAMBAH DATA'}
            </button>
          )}
        </div>

        {/* FORM TAMBAH PRODUK DENGAN DROPDOWN IKON & AKSES */}
        {showAddForm && view === 'catalog' && (
          <div style={{ background: '#FFF', padding: '2.5rem', borderRadius: '15px', marginBottom: '2.5rem', border: '2px solid #C9A84C', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '2rem', color: '#0B1426', borderBottom: '1px solid #EEE', paddingBottom: '1rem', fontFamily: 'serif', fontSize: '1.5rem' }}>Input Produk Baru</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '900', color: '#0B1426' }}>NAMA PRODUK</label>
                <input style={styles.input} value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="Misal: Mastery Template" />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '900', color: '#0B1426' }}>HARGA JUAL</label>
                <input style={styles.input} value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} placeholder="Rp 99.000" />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '900', color: '#0B1426' }}>IKON (DROPDOWN)</label>
                <select 
                  style={{ ...styles.input, background: '#FFF' }} 
                  value={newProduct.emoji} 
                  onChange={e => setNewProduct({...newProduct, emoji: e.target.value})}
                >
                  {iconOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.value} {opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '900', color: '#0B1426' }}>FILE GAMBAR TAMPILAN (/PUBLIC)</label>
                <input style={styles.input} value={newProduct.image_url} onChange={e => setNewProduct({...newProduct, image_url: e.target.value})} placeholder="foto.png (Opsional)" />
              </div>
              
              {/* PERUBAHAN: Field Khusus Akses Produk */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '900', color: '#0B1426' }}>TIPE AKSES PRODUK</label>
                <select 
                  style={{ ...styles.input, background: '#FFF', borderColor: '#C9A84C' }} 
                  value={newProduct.access_type} 
                  onChange={e => setNewProduct({...newProduct, access_type: e.target.value})}
                >
                  <option value="File Publik">File Tersimpan di Publik</option>
                  <option value="Link Eksternal">Link (Kelas / Jasa / GDrive)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '900', color: '#0B1426' }}>NAMA FILE / LINK AKSES</label>
                <input 
                  style={{ ...styles.input, borderColor: '#C9A84C' }} 
                  value={newProduct.access_link} 
                  onChange={e => setNewProduct({...newProduct, access_link: e.target.value})} 
                  placeholder={newProduct.access_type === 'File Publik' ? 'Contoh: template.pdf' : 'Contoh: https://zoom.us/xyz'} 
                />
              </div>

            </div>
            <div style={{marginTop: '1.5rem'}}>
              <label style={{ fontSize: '0.75rem', fontWeight: '900', color: '#0B1426' }}>DESKRIPSI PRODUK</label>
              <textarea style={{ ...styles.input, height: '100px', fontFamily: 'inherit' }} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
            </div>
            <button onClick={handleAddProduct} style={styles.btnGold}>SIMPAN KE KATALOG</button>
          </div>
        )}

        {/* LIST DATA */}
        <div style={{ background: '#FFF', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #EEE' }}>
          {loading ? (
            <div style={{ padding: '5rem', textAlign: 'center', fontWeight: 900 }}>Sinkronisasi Database...</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#0B1426' }}>
                  <th style={{ padding: '1.5rem 2.5rem', textAlign: 'left', color: '#C9A84C', fontSize: '0.85rem' }}>INFORMASI</th>
                  <th style={{ padding: '1.5rem 2.5rem', textAlign: 'left', color: '#C9A84C', fontSize: '0.85rem' }}>HARGA</th>
                  <th style={{ padding: '1.5rem 2.5rem', textAlign: 'center', color: '#C9A84C', fontSize: '0.85rem' }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {view === 'catalog' ? (
                  products.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F0F0F0' }}>
                      <td style={{ padding: '1.5rem 2.5rem' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                          <div style={{ width: '60px', height: '60px', background: '#F8F9FA', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #EEE' }}>
                            {p.image_url ? (
                              <img src={`/${p.image_url}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              renderSVGIcon(p.emoji, 32, '#0B1426')
                            )}
                          </div>
                          <div>
                            <div style={{ fontWeight: '900', color: '#0B1426', fontSize: '1.1rem' }}>{p.name}</div>
                            <div style={{ fontSize: '0.7rem', color: '#C9A84C', fontWeight: '900', textTransform: 'uppercase' }}>
                              {p.category} • {p.access_type || 'Akses Default'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1.5rem 2.5rem', fontWeight: '900', fontSize: '1.2rem', color: '#0B1426' }}>{p.price}</td>
                      <td style={{ padding: '1.5rem 2.5rem', textAlign: 'center' }}>
                        <button onClick={() => deleteProduct(p.id)} style={{ color: '#D64045', background: 'rgba(214,64,69,0.05)', border: '2px solid #D64045', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '900' }}>HAPUS</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  orders.map(o => (
                    <tr key={o.id} style={{ borderBottom: '1px solid #F0F0F0' }}>
                      <td style={{ padding: '1.5rem 2.5rem' }}>
                        <div style={{ fontWeight: '900', color: '#0B1426', fontSize: '1.1rem' }}>{o.customer_name}</div>
                        <div style={{ fontSize: '0.9rem', color: '#666', fontWeight: 600 }}>{o.customer_email}</div>
                      </td>
                      <td style={{ padding: '1.5rem 2.5rem' }}>
                        <div style={{ fontWeight: '900', color: '#0B1426' }}>{o.product_name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#C9A84C', fontWeight: '900' }}>{new Date(o.created_at).toLocaleDateString('id-ID')}</div>
                        {/* Status dari Database */}
                        <div style={{ fontSize: '0.75rem', marginTop: '5px', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', background: o.status === 'approved' ? '#DCFCE7' : '#FEF9C3', color: o.status === 'approved' ? '#166534' : '#854D0E', fontWeight: 'bold' }}>
                          {o.status === 'approved' ? 'Disetujui' : 'Menunggu Pembayaran'}
                        </div>
                      </td>
                      <td style={{ padding: '1.5rem 2.5rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                          <a href={`https://wa.me/${o.customer_phone?.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" style={{ background: '#22C55E', color: '#FFF', padding: '0.8rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '900', fontSize: '0.8rem', display: 'inline-block' }}>WHATSAPP</a>
                          {/* 🟢 TOMBOL APPROVE KHUSUS JIKA STATUS MASIH PENDING */}
                          {o.status !== 'approved' && (
                            <button onClick={() => approveOrder(o)} style={{ background: '#0B1426', color: '#C9A84C', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer' }}>
                              ✅ APPROVE
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}