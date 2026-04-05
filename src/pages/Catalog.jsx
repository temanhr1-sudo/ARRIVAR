import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../supabaseClient'; // Import koneksi

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ name: '', emoji: '', price: '', category: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');

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

  // KIRIM PESANAN KE DATABASE
  const submitForm = async () => {
    if (!formName || !formPhone || !formEmail) {
      alert('Mohon lengkapi data Anda.');
      return;
    }

    const { error } = await supabase
      .from('orders')
      .insert([
        { 
          customer_name: formName, 
          customer_phone: formPhone, 
          customer_email: formEmail,
          product_name: modalData.name,
          category: modalData.category
        }
      ]);

    if (error) {
      alert('Gagal mengirim pesanan. Coba lagi.');
    } else {
      setIsSuccess(true);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === 'Semua' || product.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  const openModal = (name, emoji, price, category) => {
    setModalData({ name, emoji, price, category });
    setIsSuccess(false);
    setFormName(''); setFormPhone(''); setFormEmail('');
    setIsModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Katalog Produk & Kelas | ARRIVAR.id</title>
      </Helmet>

      <nav style={{ position: 'sticky', top: 0, background: '#FFF', borderBottom: '1px solid rgba(201,168,76,0.2)', padding: '1rem 5vw', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="nav-logo">
          {/* LOGO ASLI + TEKS ARRIVAR */}
          <img src="/logo.png" alt="ARRIVAR Logo" style={{ height: '34px', width: 'auto', objectFit: 'contain' }} />
          <span>ARRIVAR<em>.id</em></span>
        </Link>
      </nav>

      <div style={{ background: '#F8F9FA', minHeight: '100vh', padding: '4rem 5vw' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: '#1B2A4A' }}>Katalog Ekosistem</h1>
            <div style={{ position: 'relative', maxWidth: '500px', margin: '2rem auto' }}>
              <input 
                type="text" 
                placeholder="Cari..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '1rem 3rem', borderRadius: '100px', border: '1px solid #DDD' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
            {['Semua', 'Produk Digital', 'Kelas', 'Jasa'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{ background: activeFilter === f ? '#1B2A4A' : '#FFF', color: activeFilter === f ? '#C9A84C' : '#8B95A8', padding: '0.6rem 1.5rem', borderRadius: '100px', border: '1px solid #DDD', cursor: 'pointer' }}>{f}</button>
            ))}
          </div>

          {loading ? <p style={{textAlign:'center'}}>Loading produk...</p> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {filteredProducts.map(product => (
                <div key={product.id} style={{ background: '#FFF', borderRadius: '8px', border: '1px solid rgba(201,168,76,.2)', overflow: 'hidden' }}>
                  <div style={{ height: '150px', background: '#0F1A30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>{product.emoji}</div>
                  <div style={{ padding: '1.5rem' }}>
                    <small style={{ color: '#C9A84C', fontWeight: 'bold' }}>{product.category}</small>
                    <h3 style={{ margin: '0.5rem 0', fontFamily: "'Cormorant Garamond', serif" }}>{product.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#6B7590' }}>{product.description}</p>
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold' }}>{product.price}</span>
                      <button onClick={() => openModal(product.name, product.emoji, product.price, product.category)} style={{ background: '#1B2A4A', color: '#C9A84C', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>Beli</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL ORDER */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#FFF', padding: '2.5rem', borderRadius: '8px', maxWidth: '450px', width: '90%' }}>
            {!isSuccess ? (
              <>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }}>Pesan {modalData.name}</h2>
                <div style={{ margin: '1.5rem 0' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Nama Lengkap</label>
                  <input type="text" value={formName} onChange={e => setFormName(e.target.value)} style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #DDD' }} />
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.5rem' }}>WhatsApp</label>
                  <input type="tel" value={formPhone} onChange={e => setFormPhone(e.target.value)} style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #DDD' }} />
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Email</label>
                  <input type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #DDD' }} />
                </div>
                <button onClick={submitForm} style={{ width: '100%', background: '#C9A84C', color: '#0F1A30', border: 'none', padding: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>Konfirmasi Pesanan</button>
                <button onClick={() => setIsModalOpen(false)} style={{ width: '100%', background: 'transparent', border: 'none', marginTop: '1rem', cursor: 'pointer' }}>Batal</button>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ color: '#27AE60' }}>Berhasil!</h2>
                <p>Tim ARRIVAR akan segera menghubungi Anda.</p>
                <button onClick={() => setIsModalOpen(false)} style={{ marginTop: '1.5rem', padding: '0.8rem 2rem', cursor: 'pointer' }}>Tutup</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}