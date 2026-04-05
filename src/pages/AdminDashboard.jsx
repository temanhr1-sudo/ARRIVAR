import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('catalog'); 

  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ 
    name: '', price: '', category: 'Produk Digital', emoji: '📊', description: '', image_url: '' 
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
      setNewProduct({ name: '', price: '', category: 'Produk Digital', emoji: '📊', description: '', image_url: '' });
      fetchData();
    }
  }

  async function deleteProduct(id) {
    if (window.confirm('Hapus produk ini secara permanen?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchData();
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
        <Link to="/" className="nav-logo">
          {/* LOGO ASLI + TEKS ARRIVAR */}
          <img src="/logo.png" alt="ARRIVAR Logo" style={{ height: '34px', width: 'auto', objectFit: 'contain' }} />
          <span>ARRIVAR<em>.id</em></span>
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

        {/* FORM TAMBAH PRODUK DENGAN DROPDOWN IKON */}
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
                <label style={{ fontSize: '0.75rem', fontWeight: '900', color: '#0B1426' }}>FILE GAMBAR (/PUBLIC)</label>
                <input style={styles.input} value={newProduct.image_url} onChange={e => setNewProduct({...newProduct, image_url: e.target.value})} placeholder="foto.png" />
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
                              <span style={{ fontSize: '1.8rem' }}>{p.emoji}</span>
                            )}
                          </div>
                          <div>
                            <div style={{ fontWeight: '900', color: '#0B1426', fontSize: '1.1rem' }}>{p.name}</div>
                            <div style={{ fontSize: '0.7rem', color: '#C9A84C', fontWeight: '900', textTransform: 'uppercase' }}>{p.category}</div>
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
                      </td>
                      <td style={{ padding: '1.5rem 2.5rem', textAlign: 'center' }}>
                        <a href={`https://wa.me/${o.customer_phone?.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" style={{ background: '#22C55E', color: '#FFF', padding: '0.8rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '900', fontSize: '0.8rem', display: 'inline-block' }}>WHATSAPP</a>
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