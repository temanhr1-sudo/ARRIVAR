import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../supabaseClient'; // Import koneksi

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [loading, setLoading] = useState(true);

  // State Payment Gateway (Semi-Auto)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ id: null, name: '', emoji: '', price: '', category: '' });
  const [paymentStep, setPaymentStep] = useState(0); // 0: Form Data, 1: Instruksi Transfer, 2: Menunggu Approve
  const [orderId, setOrderId] = useState(null); // Menyimpan ID pesanan untuk polling
  const [isConfirming, setIsConfirming] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');

  // FUNGSI PEMBANTU UNTUK RENDER SVG MINIMALIS BERDASARKAN EMOJI
  const renderSVGIcon = (emoji, size = 64, color = '#C9A84C') => {
    const svgProps = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" };
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

  // AMBIL DATA DARI SUPABASE
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*');
    if (error) console.error('Error:', error);
    else setProducts(data);
    setLoading(false);
  }

  // Fungsi Step 1 (Simpan Data Pemesan & Bawa ke Layar Transfer)
  const submitForm = async () => {
    if (!formName || !formPhone || !formEmail) {
      alert('Mohon lengkapi data Anda untuk keperluan pembayaran dan pengiriman.');
      return;
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([
        { 
          customer_name: formName, 
          customer_phone: formPhone, 
          customer_email: formEmail,
          product_name: modalData.name,
          category: modalData.category,
          status: 'pending_payment' // Menandai status awal
        }
      ]).select();

    if (error) {
      alert('Terjadi kesalahan sistem. Coba lagi.');
    } else {
      if (data && data.length > 0) setOrderId(data[0].id);
      setPaymentStep(1); // Lanjut ke layar instruksi transfer
    }
  };

  // 🟢 PERUBAHAN & PERBAIKAN: Fungsi Step 2 (Kirim Notif ke Telegram Admin)
  const handleConfirmPayment = async () => {
    setIsConfirming(true);
    
    try {
      const botToken = import.meta.env.VITE_TG_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TG_CHAT_ID;

      // Proteksi jika .env belum diisi/direstart
      if (!botToken || !chatId) {
        alert("Konfigurasi Telegram API belum dimasukkan di .env atau server Vite belum di-restart.");
        setIsConfirming(false);
        return;
      }
      
      const text = `🚨 <b>PEMBELIAN BARU KATALOG ARRIVAR</b> 🚨\n\n` +
                   `📦 Produk: <b>${modalData.name}</b>\n` +
                   `👤 Klien: ${formName}\n` +
                   `📱 WhatsApp: ${formPhone}\n` +
                   `📧 Email: ${formEmail}\n` +
                   `💰 Nominal: <b>${modalData.price}</b>\n` +
                   `🆔 Order ID: <code>${orderId}</code>\n\n` +
                   `👉 <i>Cek mutasi, jika dana sudah masuk, klik APPROVE di Dashboard Admin ARRIVAR atau lewat tombol di bawah ini.</i>`;

      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          chat_id: chatId, 
          text: text, 
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [{ text: `✅ APPROVE PESANAN INI`, callback_data: `APPROVE_ORDER_${orderId}` }]
            ]
          }
        })
      });

      const jsonRes = await res.json();

      if (!res.ok) {
        console.error("Detail Error Telegram:", jsonRes);
        throw new Error(jsonRes.description || "Ditolak oleh Telegram");
      }

      setPaymentStep(2); // Pindah ke layar Polling/Menunggu
    } catch (err) {
      console.error("Fetch API Error:", err);
      alert("Gagal mengirim notifikasi. Cek Console Log untuk detailnya.");
    }
    setIsConfirming(false);
  };

  // Fungsi Step 3 (Polling Cek Status di Supabase)
  const checkApprovalStatus = async () => {
    setIsChecking(true);
    try {
      const { data, error } = await supabase.from('orders').select('status').eq('id', orderId).single();
      
      if (!error && data && data.status === 'approved') {
        alert("🎉 Pembayaran Berhasil Dikonfirmasi! Akses produk telah dikirimkan ke Email Anda.");
        setIsModalOpen(false);
      } else {
        alert("⏳ Pembayaran Anda sedang diverifikasi. Mohon tunggu beberapa saat.");
      }
    } catch (err) {
      console.error(err);
    }
    setIsChecking(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === 'Semua' || product.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  const openModal = (id, name, emoji, price, category) => {
    setModalData({ id, name, emoji, price, category });
    setPaymentStep(0);
    setFormName(''); setFormPhone(''); setFormEmail('');
    setIsModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Katalog Produk & Kelas | ARRIVAR.id</title>
      </Helmet>

      <nav style={{ position: 'sticky', top: 0, background: '#FFF', borderBottom: '1px solid rgba(201,168,76,0.2)', padding: '1rem 5vw', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#1B2A4A' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #D4AF37)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 22L12 2l8 20"></path>
            <path d="M8 14h8"></path>
          </svg>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 700 }}>ARRIVAR<em style={{ color: '#C9A84C', fontStyle: 'normal' }}>.id</em></span>
        </Link>
      </nav>

      <div style={{ background: '#F8F9FA', minHeight: '100vh', padding: '4rem 5vw' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: '#1B2A4A' }}>Katalog Ekosistem</h1>
            <div style={{ position: 'relative', maxWidth: '500px', margin: '2rem auto' }}>
              <input 
                type="text" 
                placeholder="Cari Solusi Karir atau Finansial..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '1rem 3rem', borderRadius: '100px', border: '1px solid #DDD' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
            {['Semua', 'Produk Digital', 'Kelas', 'Jasa'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{ background: activeFilter === f ? '#1B2A4A' : '#FFF', color: activeFilter === f ? '#C9A84C' : '#8B95A8', padding: '0.6rem 1.5rem', borderRadius: '100px', border: '1px solid #DDD', cursor: 'pointer', transition: 'all 0.3s', fontWeight: 'bold' }}>{f}</button>
            ))}
          </div>

          {loading ? <p style={{textAlign:'center', color: '#8B95A8', fontWeight: 'bold'}}>Menyinkronkan Data Katalog...</p> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {filteredProducts.map(product => (
                <div key={product.id} style={{ background: '#FFF', borderRadius: '8px', border: '1px solid rgba(201,168,76,.2)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                  
                  {/* Bagian Visual Atas */}
                  <div style={{ height: '150px', background: '#0F1A30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {renderSVGIcon(product.emoji)}
                  </div>
                  
                  <div style={{ padding: '1.5rem' }}>
                    <small style={{ color: '#C9A84C', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.category}</small>
                    <h3 style={{ margin: '0.5rem 0', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#1B2A4A' }}>{product.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#6B7590', lineHeight: '1.5' }}>{product.description}</p>
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EEE', paddingTop: '1rem' }}>
                      <span style={{ fontWeight: '900', color: '#1B2A4A', fontSize: '1.1rem' }}>{product.price}</span>
                      <button onClick={() => openModal(product.id, product.name, product.emoji, product.price, product.category)} style={{ background: '#C9A84C', color: '#0F1A30', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Pesan Sekarang</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL CHECKOUT & PAYMENT FLOW */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(11, 20, 38, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#FFF', padding: '3rem 2.5rem', borderRadius: '16px', maxWidth: '450px', width: '90%', position: 'relative' }}>
            
            {/* Tombol Close di Pojok */}
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888' }}>×</button>

            {paymentStep === 0 ? (
              // --- STEP 1: INPUT DATA DIRI ---
              <>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <small style={{ color: '#C9A84C', fontWeight: 'bold', textTransform: 'uppercase' }}>Detail Pemesanan</small>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: '#1B2A4A', margin: '0.5rem 0' }}>{modalData.name}</h2>
                  <div style={{ background: '#F8F9FA', display: 'inline-block', padding: '0.5rem 1.5rem', borderRadius: '100px', fontWeight: 'bold', color: '#1B2A4A' }}>Total: {modalData.price}</div>
                </div>

                <div style={{ margin: '1.5rem 0' }}>
                  <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1.5rem', textAlign: 'center' }}>Silakan lengkapi data diri Anda untuk pengiriman invoice dan akses produk.</p>
                  
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1B2A4A' }}>NAMA LENGKAP</label>
                  <input type="text" value={formName} onChange={e => setFormName(e.target.value)} style={{ width: '100%', padding: '1rem', marginBottom: '1rem', border: '2px solid #EEE', borderRadius: '8px', boxSizing: 'border-box' }} placeholder="Sesuai KTP/Rekening" />
                  
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1B2A4A' }}>NOMOR WHATSAPP</label>
                  <input type="tel" value={formPhone} onChange={e => setFormPhone(e.target.value)} style={{ width: '100%', padding: '1rem', marginBottom: '1rem', border: '2px solid #EEE', borderRadius: '8px', boxSizing: 'border-box' }} placeholder="Contoh: 08123456789" />
                  
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1B2A4A' }}>ALAMAT EMAIL</label>
                  <input type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} style={{ width: '100%', padding: '1rem', marginBottom: '1rem', border: '2px solid #EEE', borderRadius: '8px', boxSizing: 'border-box' }} placeholder="Untuk pengiriman akses" />
                </div>

                <button onClick={submitForm} style={{ width: '100%', background: '#C9A84C', color: '#0F1A30', border: 'none', padding: '1.2rem', borderRadius: '8px', fontWeight: '900', cursor: 'pointer', fontSize: '1rem' }}>LANJUTKAN PEMBAYARAN →</button>
              </>
            ) : paymentStep === 1 ? (
              // --- STEP 2: INSTRUKSI TRANSFER ---
              <>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ fontSize: '0.85rem', color: '#666', fontWeight: 'bold', marginBottom: '0.5rem' }}>TOTAL TRANSFER:</div>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: '#1B2A4A' }}>{modalData.price}</div>
                </div>

                <div style={{ background: '#F8F9FA', padding: '1.5rem', borderRadius: '12px', border: '1px solid #EEE', marginBottom: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#666', marginBottom: '1rem' }}>BAYAR CEPAT VIA QRIS</div>
                  <img src="/qris.png" alt="QRIS Pembayaran" style={{ width: '180px', height: '180px', objectFit: 'contain', borderRadius: '12px', border: '1px solid #DDD', marginBottom: '1rem' }} />
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>a.n. PT ARRIVAR INDONESIA</div>
                </div>

                <button onClick={handleConfirmPayment} disabled={isConfirming} style={{ width: '100%', background: '#27AE60', color: '#FFF', border: 'none', padding: '1.2rem', borderRadius: '8px', fontWeight: '900', cursor: 'pointer', fontSize: '1rem', marginBottom: '1rem' }}>
                  {isConfirming ? "Mengirim Notifikasi..." : "SAYA SUDAH TRANSFER"}
                </button>
                <button onClick={() => setPaymentStep(0)} style={{ width: '100%', background: 'transparent', color: '#666', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Kembali</button>
              </>
            ) : (
              // --- STEP 3: MENUNGGU VERIFIKASI ADMIN ---
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1.5rem', border: '1px solid #EEE' }}>
                  <span style={{ animation: isChecking ? 'spin 1s linear infinite' : 'none' }}>⏳</span>
                </div>
                <h2 style={{ color: '#1B2A4A', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', marginBottom: '0.5rem' }}>Menunggu Konfirmasi</h2>
                
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                  Admin sedang memverifikasi dana masuk dari Anda. Silakan klik tombol di bawah secara berkala untuk mengecek status pesanan.
                </p>
                
                <button onClick={checkApprovalStatus} disabled={isChecking} style={{ width: '100%', background: '#1B2A4A', color: '#C9A84C', border: 'none', padding: '1.2rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '1rem' }}>
                  {isChecking ? "Mengecek Server..." : "Cek Status Pembayaran"}
                </button>
                <button onClick={() => setIsModalOpen(false)} style={{ width: '100%', background: 'transparent', color: '#666', border: 'none', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>
                  Tutup Halaman (Cek Nanti Saja)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}