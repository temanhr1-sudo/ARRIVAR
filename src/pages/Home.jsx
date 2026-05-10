import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:       #00182A;
    --navy-mid:   #0D2940;
    --navy-light: #1E3A52;
    --gold:       #D4AF37;
    --gold-dim:   #B8962E;
    --white:      #FFFFFF;
    --off-white:  #F4F6F9;
    --slate:      #394B5A;
    --slate-light:#A7B8C6;
    --ff: 'Poppins', sans-serif;
    --radius-sm: 6px;
    --radius-md: 12px;
    --radius-lg: 20px;
    --tr: 0.3s cubic-bezier(0.4,0,0.2,1);
  }

  html { scroll-behavior: smooth; }
  body { font-family: var(--ff); background: var(--off-white); color: var(--navy); -webkit-font-smoothing: antialiased; }

  /* NAVBAR */
  #navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.1rem 4rem;
    background: var(--navy);
    border-bottom: 1px solid rgba(212,175,55,.12);
    transition: padding var(--tr), box-shadow var(--tr);
  }
  #navbar.scrolled {
    padding: .7rem 4rem;
    box-shadow: 0 6px 32px rgba(0,0,0,.5);
  }
  .nav-logo { display: flex; align-items: center; gap: .55rem; text-decoration: none; }
  .nav-logo img { height: 30px; width: auto; object-fit: contain; }
  .nav-logo span { font-size: 1.2rem; font-weight: 800; letter-spacing: .04em; color: var(--white); }
  .nav-logo em { color: var(--gold); font-style: normal; }
  .nav-links { display: flex; align-items: center; gap: 1.8rem; list-style: none; }
  .nav-links a {
    color: var(--slate-light); font-size: .74rem; font-weight: 500;
    text-decoration: none; letter-spacing: .07em; text-transform: uppercase;
    transition: color var(--tr);
  }
  .nav-links a:hover { color: var(--gold); }
  .nav-cta {
    background: var(--gold) !important; color: var(--navy) !important;
    padding: .48rem 1.25rem !important; border-radius: var(--radius-sm) !important;
    font-weight: 700 !important; letter-spacing: .05em !important;
  }
  .nav-cta:hover { background: var(--gold-dim) !important; }

  /* HERO — center aligned */
  .hero {
    position: relative; min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; background: var(--navy);
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 70% at 50% 50%, #0D2D4A 0%, var(--navy) 70%);
  }
  .hero-pattern {
    position: absolute; inset: 0; opacity: .045;
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 59px, var(--gold) 59px, var(--gold) 60px),
      repeating-linear-gradient(90deg, transparent, transparent 59px, var(--gold) 59px, var(--gold) 60px);
  }
  .hero-mark {
    position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    font-size: 52vw; font-weight: 900; color: var(--gold);
    opacity: .018; line-height: 1;
    user-select: none; pointer-events: none; font-family: var(--ff);
  }
  .hero-inner {
    position: relative; z-index: 2;
    max-width: 860px; margin: 0 auto; padding: 9rem 4rem 5rem;
    width: 100%;
    display: flex; flex-direction: column; align-items: center;
    text-align: center;
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: .5rem;
    background: rgba(212,175,55,.1); border: 1px solid rgba(212,175,55,.28);
    border-radius: 100px; padding: .32rem 1rem;
    font-size: .68rem; font-weight: 600; letter-spacing: .13em;
    color: var(--gold); text-transform: uppercase; margin-bottom: 2rem;
  }
  .hero-eyebrow span {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--gold); animation: blink 2s infinite;
  }
  @keyframes blink {
    0%,100% { opacity:1; transform: scale(1); }
    50% { opacity:.35; transform: scale(1.5); }
  }
  .hero h1 {
    font-size: clamp(2.6rem, 5.8vw, 4.8rem);
    font-weight: 800; line-height: 1.08;
    color: var(--white); letter-spacing: -.015em;
    max-width: 780px; margin-bottom: 1.5rem;
    text-align: center;
  }
  .hero h1 em { color: var(--gold); font-style: normal; display: block; }
  .hero-sub {
    font-size: .97rem; font-weight: 400; line-height: 1.85;
    color: var(--slate-light); max-width: 560px;
    margin-bottom: 2.5rem; text-align: center;
  }
  .hero-btns {
    display: flex; gap: 1rem; flex-wrap: wrap;
    align-items: center; justify-content: center;
    margin-bottom: 4rem;
  }
  .btn-primary {
    display: inline-flex; align-items: center; gap: .5rem;
    background: var(--gold); color: var(--navy);
    font-family: var(--ff); font-weight: 700; font-size: .82rem;
    letter-spacing: .07em; text-transform: uppercase;
    padding: .9rem 2.1rem; border-radius: var(--radius-sm);
    text-decoration: none; border: none; cursor: pointer;
    transition: background var(--tr), transform var(--tr), box-shadow var(--tr);
  }
  .btn-primary:hover { background: var(--gold-dim); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,175,55,.3); }
  .btn-outline {
    display: inline-flex; align-items: center; gap: .5rem;
    background: transparent; color: var(--white);
    font-family: var(--ff); font-weight: 600; font-size: .82rem;
    letter-spacing: .07em; text-transform: uppercase;
    padding: .9rem 2.1rem; border-radius: var(--radius-sm);
    border: 1.5px solid rgba(255,255,255,.22);
    text-decoration: none; cursor: pointer;
    transition: border-color var(--tr), color var(--tr), transform var(--tr);
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }
  .hero-stats {
    display: flex; gap: 0; align-items: stretch;
    border-top: 1px solid rgba(255,255,255,.08); padding-top: 2.5rem;
    width: 100%; max-width: 580px; justify-content: center;
  }
  .stat { flex: 1; padding-right: 2rem; text-align: center; }
  .stat:not(:last-child) { border-right: 1px solid rgba(255,255,255,.08); margin-right: 2rem; }
  .stat-num { font-size: 2.2rem; font-weight: 800; color: var(--gold); line-height: 1; margin-bottom: .4rem; }
  .stat-label { font-size: .68rem; color: var(--slate-light); font-weight: 500; letter-spacing: .04em; }

  /* WHAT WE BUILD */
  .build-section { background: var(--white); padding: 5.5rem 0; }
  .build-header { text-align: center; margin-bottom: 3.5rem; }
  .build-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .build-card {
    position: relative; overflow: hidden;
    border-radius: var(--radius-lg); background: var(--navy);
    padding: 2.5rem 2rem 2rem;
    display: flex; flex-direction: column;
    transition: transform var(--tr), box-shadow var(--tr);
  }
  .build-card:hover { transform: translateY(-7px); box-shadow: 0 28px 60px rgba(0,24,42,.28); }
  .build-card-accent {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--gold-dim));
  }
  .build-card-num {
    font-size: 5rem; font-weight: 900; color: var(--gold);
    opacity: .06; position: absolute; right: 1.5rem; bottom: .5rem;
    line-height: 1; pointer-events: none;
  }
  .build-icon {
    width: 52px; height: 52px; border-radius: var(--radius-md);
    background: rgba(212,175,55,.12); border: 1px solid rgba(212,175,55,.22);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.5rem;
  }
  .build-card h3 { font-size: 1.12rem; font-weight: 700; color: var(--white); margin-bottom: .65rem; }
  .build-card p { font-size: .855rem; line-height: 1.8; color: var(--slate-light); flex: 1; margin-bottom: 1.5rem; }
  .build-features { list-style: none; display: flex; flex-direction: column; gap: .45rem; margin-bottom: 2rem; }
  .build-features li { display: flex; align-items: center; gap: .6rem; font-size: .78rem; color: var(--slate-light); }
  .build-features li::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
  .build-cta {
    display: inline-flex; align-items: center; gap: .45rem;
    font-size: .75rem; font-weight: 700; letter-spacing: .08em;
    text-transform: uppercase; color: var(--gold); text-decoration: none;
    border-top: 1px solid rgba(255,255,255,.08); padding-top: 1.25rem;
    transition: gap var(--tr);
  }
  .build-cta:hover { gap: .75rem; }

  /* SECTION BASE */
  .section { padding: 6rem 0; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 4rem; }
  .section-eyebrow {
    font-size: .68rem; font-weight: 700; letter-spacing: .17em;
    text-transform: uppercase; color: var(--gold); margin-bottom: .7rem;
  }
  .section-title {
    font-size: clamp(1.8rem, 3.5vw, 2.75rem);
    font-weight: 800; line-height: 1.15; color: var(--navy); margin-bottom: 1rem;
  }
  .section-title em { color: var(--gold); font-style: normal; }
  .section-title.light { color: var(--white); }
  .gold-bar { width: 48px; height: 3px; background: linear-gradient(90deg, var(--gold), var(--gold-dim)); border-radius: 2px; margin-bottom: 1.5rem; }
  .gold-bar.center { margin-left: auto; margin-right: auto; }
  .section-body { font-size: .93rem; line-height: 1.85; color: var(--slate); max-width: 600px; }
  .section-body.light { color: var(--slate-light); }

  /* REVEAL */
  .reveal { opacity: 0; transform: translateY(28px); transition: opacity .65s cubic-bezier(.4,0,.2,1), transform .65s cubic-bezier(.4,0,.2,1); }
  .reveal.visible { opacity: 1; transform: none; }

  /* PILLARS */
  .pillars-section { background: var(--off-white); }
  .pillars-header { text-align: center; max-width: 620px; margin: 0 auto 4rem; }
  .pillars-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .pillar-card {
    background: var(--white); border: 1px solid rgba(0,24,42,.07);
    border-radius: var(--radius-lg); padding: 2.5rem 2rem;
    position: relative; overflow: hidden;
    transition: transform var(--tr), box-shadow var(--tr), border-color var(--tr);
  }
  .pillar-card::before {
    content: attr(data-num); position: absolute; right: 1.5rem; top: 1rem;
    font-size: 5rem; font-weight: 900; line-height: 1;
    color: var(--navy); opacity: .04; pointer-events: none;
  }
  .pillar-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,24,42,.12); border-color: var(--gold); }
  .pillar-icon-wrap { width: 54px; height: 54px; border-radius: var(--radius-md); background: var(--navy); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
  .pillar-card h3 { font-size: 1.05rem; font-weight: 700; color: var(--navy); margin-bottom: .7rem; }
  .pillar-card p { font-size: .855rem; line-height: 1.8; color: var(--slate); margin-bottom: 1.2rem; }
  .pillar-tag { display: inline-block; font-size: .67rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--gold); background: rgba(212,175,55,.1); padding: .28rem .85rem; border-radius: 100px; border: 1px solid rgba(212,175,55,.25); }

  /* VISION */
  .vision-section { background: var(--navy); position: relative; overflow: hidden; }
  .vision-section::before {
    content: ''; position: absolute; inset: 0;
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(212,175,55,.04) 59px, rgba(212,175,55,.04) 60px),
      repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(212,175,55,.04) 59px, rgba(212,175,55,.04) 60px);
  }
  .vision-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
  .vision-list { list-style: none; display: flex; flex-direction: column; gap: .85rem; margin-top: 1.5rem; }
  .vision-list li { display: flex; align-items: flex-start; gap: .75rem; font-size: .865rem; line-height: 1.75; color: var(--slate-light); }
  .vision-list li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--gold); margin-top: .55rem; flex-shrink: 0; }
  .vision-quote-card { background: rgba(255,255,255,.04); border: 1px solid rgba(212,175,55,.2); border-radius: var(--radius-lg); padding: 2.75rem 2.25rem; position: relative; }
  .vision-quote-card::before { content: '"'; position: absolute; top: -1.5rem; left: 2rem; font-size: 6rem; color: var(--gold); opacity: .18; font-family: Georgia, serif; line-height: 1; }
  .vision-quote-text { font-size: 1.05rem; font-weight: 500; line-height: 1.85; color: var(--white); font-style: italic; }
  .vision-quote-author { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,.08); font-size: .73rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--gold); }

  /* SERVICES */
  .services-section { background: var(--white); }
  .services-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; gap: 2rem; }
  .service-row {
    display: grid; grid-template-columns: 64px 1fr 40px;
    gap: 1.5rem; align-items: center;
    padding: 1.75rem 2rem; border-radius: var(--radius-md);
    border: 1px solid rgba(0,24,42,.07); background: var(--white);
    text-decoration: none; margin-bottom: 1rem;
    transition: background var(--tr), border-color var(--tr), transform var(--tr);
  }
  .service-row:hover { background: var(--navy); border-color: var(--navy); transform: translateX(6px); }
  .service-row:hover .sr-num { color: var(--gold); }
  .service-row:hover .sr-title, .service-row:hover .sr-desc, .service-row:hover .sr-arr { color: var(--white); }
  .sr-num { font-size: 1.8rem; font-weight: 800; color: rgba(0,24,42,.12); transition: color var(--tr); }
  .sr-title { font-size: .93rem; font-weight: 700; color: var(--navy); margin-bottom: .3rem; transition: color var(--tr); }
  .sr-desc { font-size: .8rem; line-height: 1.65; color: var(--slate); transition: color var(--tr); }
  .sr-arr { font-size: 1.25rem; color: var(--gold); font-weight: 700; text-align: center; transition: color var(--tr); }

  /* CTA */
  .cta-section { background: var(--navy); position: relative; overflow: hidden; }
  .cta-section::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, transparent, var(--gold), transparent); }
  .cta-inner { text-align: center; max-width: 700px; margin: 0 auto; }

  /* FOOTER */
  footer { background: #000f1a; color: var(--slate-light); padding: 5rem 0 2rem; }
  .footer-inner { max-width: 1200px; margin: 0 auto; padding: 0 4rem; }
  .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 4rem; }
  .footer-brand-name { font-size: 1.65rem; font-weight: 800; color: var(--white); margin-bottom: .7rem; }
  .footer-brand-name span { color: var(--gold); }
  .footer-brand p { font-size: .82rem; line-height: 1.8; max-width: 270px; }
  .footer-socials { display: flex; gap: .7rem; margin-top: 1.5rem; }
  .social-link { width: 34px; height: 34px; border-radius: var(--radius-sm); border: 1px solid rgba(255,255,255,.14); display: flex; align-items: center; justify-content: center; font-size: .68rem; font-weight: 700; text-transform: uppercase; color: var(--slate-light); text-decoration: none; transition: border-color var(--tr), color var(--tr), background var(--tr); }
  .social-link:hover { border-color: var(--gold); color: var(--gold); background: rgba(212,175,55,.08); }
  .footer-col h4 { font-size: .67rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; color: var(--white); margin-bottom: 1.2rem; }
  .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: .58rem; }
  .footer-col ul li a { font-size: .8rem; color: var(--slate-light); text-decoration: none; transition: color var(--tr); }
  .footer-col ul li a:hover { color: var(--gold); }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,.06); padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; font-size: .74rem; color: rgba(167,184,198,.45); }
  .footer-bottom span { color: var(--gold); }

  /* SCROLL TOP */
  .scroll-top { position: fixed; bottom: 2rem; right: 2rem; z-index: 999; width: 44px; height: 44px; border-radius: var(--radius-sm); background: var(--gold); color: var(--navy); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; font-weight: 700; opacity: 0; transform: translateY(12px); transition: opacity var(--tr), transform var(--tr), background var(--tr); pointer-events: none; }
  .scroll-top.visible { opacity: 1; transform: none; pointer-events: all; }
  .scroll-top:hover { background: var(--gold-dim); }

  /* RESPONSIVE */
  @media (max-width: 960px) {
    #navbar { padding: 1rem 1.5rem; }
    #navbar.scrolled { padding: .7rem 1.5rem; }
    .nav-links { display: none; }
    .hero-inner { padding: 7rem 1.5rem 4rem; }
    .container { padding: 0 1.5rem; }
    .build-grid, .pillars-grid { grid-template-columns: 1fr; }
    .vision-inner { grid-template-columns: 1fr; gap: 3rem; }
    .services-header { flex-direction: column; align-items: flex-start; }
    .footer-top { grid-template-columns: 1fr 1fr; }
    .footer-bottom { flex-direction: column; gap: .5rem; text-align: center; }
  }
  @media (max-width: 600px) {
    .footer-top { grid-template-columns: 1fr; }
    .hero-stats { flex-direction: column; gap: 1.5rem; align-items: center; }
    .stat { text-align: center; }
    .stat:not(:last-child) { border-right: none; border-bottom: 1px solid rgba(255,255,255,.08); padding-bottom: 1.5rem; padding-right: 0; margin-right: 0; }
  }
`;

const IcoWeb = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    <polyline points="6 8 10 11 6 14"/><line x1="13" y1="14" x2="18" y2="14"/>
  </svg>
);
const IcoApp = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const IcoExcel = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/>
  </svg>
);
const IcoCareer = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);
const IcoFinance = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8 11l3 3 5-5"/>
  </svg>
);
const IcoStartup = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
  </svg>
);

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 90);
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.07 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const BUILD_CARDS = [
  {
    num: '01', icon: <IcoWeb />, title: 'Website Profesional',
    desc: 'Kami merancang website modern yang responsif, cepat, dan mencerminkan identitas bisnis Anda — dari company profile hingga toko online siap jual.',
    features: ['Landing page & company profile', 'E-commerce & marketplace', 'Dashboard & admin panel', 'SEO-optimized & fast loading'],
    cta: 'Pesan Website', to: '/services'
  },
  {
    num: '02', icon: <IcoApp />, title: 'Aplikasi Mobile & Web App',
    desc: 'Kami bantu wujudkan ide Anda menjadi aplikasi nyata — dari desain UI/UX, pengembangan, hingga peluncuran di Android, iOS, maupun web.',
    features: ['Mobile app Android & iOS', 'Web application custom', 'Integrasi API & third-party', 'UI/UX design included'],
    cta: 'Diskusi Project', to: '/services'
  },
  {
    num: '03', icon: <IcoExcel />, title: 'Template Excel Premium',
    desc: 'Hemat waktu dengan template Excel profesional yang siap pakai — dirancang khusus untuk kebutuhan keuangan, HR, operasional, dan manajemen bisnis.',
    features: ['Template keuangan & akuntansi', 'Dashboard laporan otomatis', 'Template HR & payroll', 'Rumus & macro siap pakai'],
    cta: 'Lihat Katalog', to: '/catalog'
  },
];

const PILLARS = [
  {
    num:'01', icon:<IcoCareer/>, tag:'Career Development & HR', title:'Career Accelerator',
    desc:'Kami membantu individu dan perusahaan tumbuh lewat mentoring karir, pelatihan skill, dan optimalisasi SDM — mencetak profesional yang siap bersaing di era modern.'
  },
  {
    num:'02', icon:<IcoFinance/>, tag:'FinTech & InvestGuard', title:'Financial Ecosystem',
    desc:'Platform keuangan berbasis AI yang membantu Anda memahami, mengelola, dan menumbuhkan aset secara cerdas. Didukung InvestGuard — aplikasi manajemen investasi unggulan kami.'
  },
  {
    num:'03', icon:<IcoStartup/>, tag:'Inkubasi & Pendanaan', title:'Startup Incubator',
    desc:'Dari ide hingga pendanaan — kami mendampingi startup potensial dengan program inkubasi intensif dan menghubungkan mereka langsung ke jaringan investor yang tepat.'
  },
];

const SERVICES = [
  { num:'01', title:'Pembuatan Website & Aplikasi Custom', desc:'Website company profile, landing page, e-commerce, web app, dan mobile app yang dibangun sesuai kebutuhan dan tujuan bisnis Anda.' },
  { num:'02', title:'Template Excel & Tools Produktivitas', desc:'Koleksi template Excel premium untuk keuangan, HR, operasional, dan manajemen bisnis — siap pakai, mudah dikustomisasi, langsung produktif.' },
  { num:'03', title:'Corporate HR & Talent Development', desc:'Program pengembangan karir dan SDM korporat yang terstruktur — meningkatkan kompetensi tim dan daya saing organisasi Anda secara menyeluruh.' },
  { num:'04', title:'Strategic Business & Financial Consulting', desc:'Konsultasi strategis untuk eksekutif dan pemilik bisnis — mencakup perencanaan jangka panjang, optimalisasi aset, dan roadmap finansial yang terukur.' },
  { num:'05', title:'Startup Incubation & Accelerator', desc:'Program inkubasi dan akselerasi untuk startup tahap awal — pendampingan bisnis, validasi model, hingga akses ke jaringan modal ventura.' },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handle = () => {
      setIsScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const websiteSchema = {
    "@context": "https://schema.org", "@type": "WebSite",
    "name": "ARRIVAR.id", "url": "https://arrivar.id",
    "potentialAction": { "@type": "SearchAction", "target": "https://arrivar.id/catalog?search={search_term_string}", "query-input": "required name=search_term_string" }
  };

  return (
    <>
      <style>{css}</style>
      <Helmet>
        <title>ARRIVAR Indonesia — Website, Aplikasi, Template Excel & Ekosistem Karir</title>
        <meta name="description" content="ARRIVAR Indonesia — jasa pembuatan website, aplikasi mobile, template Excel profesional, serta ekosistem karir, finansial, dan startup." />
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      </Helmet>

      {/* NAVBAR */}
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="ARRIVAR Logo" />
          <span>ARRIVAR<em>.id</em></span>
        </Link>
        <ul className="nav-links">
          <li><a href="#build">Layanan</a></li>
          <li><a href="#pillars">Ekosistem</a></li>
          <li><a href="#visi">Visi</a></li>
          <li><Link to="/catalog" style={{color:'var(--slate-light)',textDecoration:'none',fontSize:'.74rem',fontWeight:500,letterSpacing:'.07em',textTransform:'uppercase',transition:'color .3s'}}>Katalog</Link></li>
          <li><Link to="/community" style={{color:'var(--slate-light)',textDecoration:'none',fontSize:'.74rem',fontWeight:500,letterSpacing:'.07em',textTransform:'uppercase',transition:'color .3s'}}>Komunitas</Link></li>
          <li><a href="#kontak" className="nav-cta">Hubungi Kami</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-pattern" />
        <div className="hero-mark" aria-hidden="true">A</div>
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <span />
            Platform Digital Indonesia — ARRIVAR.id
          </div>
          <h1>
            Solusi Digital untuk
            <em>Karir, Finansial &amp; Bisnis Anda</em>
          </h1>
          <p className="hero-sub">
            ARRIVAR adalah platform terintegrasi pertama di Indonesia yang membantu Anda tumbuh dari berbagai sisi — mulai dari membangun kehadiran digital, mengembangkan karir dan tim, mengelola keuangan secara cerdas, hingga meluncurkan startup dengan dukungan nyata.
          </p>
          <div className="hero-btns">
            <Link to="/catalog" className="btn-primary">Lihat Katalog →</Link>
            <a href="#kontak" className="btn-outline">Hubungi Kami</a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">3</div>
              <div className="stat-label">Pilar Ekosistem</div>
            </div>
            <div className="stat">
              <div className="stat-num">AI</div>
              <div className="stat-label">Berbasis Data &amp; Teknologi</div>
            </div>
            <div className="stat">
              <div className="stat-num">1×</div>
              <div className="stat-label">Platform Terintegrasi</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="build-section" id="build">
        <div className="container">
          <div className="build-header">
            <div className="section-eyebrow reveal">Produk &amp; Jasa Utama</div>
            <h2 className="section-title reveal">Kami Membangun <em>Solusi Digital yang Langsung Bisa Dipakai</em></h2>
            <div className="gold-bar center reveal" />
            <p className="section-body reveal" style={{margin:'0 auto',textAlign:'center'}}>
              Butuh website, aplikasi, atau tools bisnis? Kami kerjakan dari awal hingga selesai — profesional, tepat waktu, dan sesuai kebutuhan Anda.
            </p>
          </div>
          <div className="build-grid">
            {BUILD_CARDS.map(card => (
              <div className="build-card reveal" key={card.num}>
                <div className="build-card-accent" />
                <div className="build-card-num">{card.num}</div>
                <div className="build-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <ul className="build-features">
                  {card.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <Link to={card.to} className="build-cta">{card.cta} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="section pillars-section" id="pillars">
        <div className="container">
          <div className="pillars-header">
            <div className="section-eyebrow reveal">Tiga Pilar Ekosistem</div>
            <h2 className="section-title reveal">Satu Platform, <em>Tiga Kekuatan Nyata</em></h2>
            <div className="gold-bar center reveal" />
            <p className="section-body reveal" style={{margin:'0 auto'}}>
              Di balik layanan digital kami, ARRIVAR membangun ekosistem yang lebih besar — menghubungkan pengembangan karir, kecerdasan finansial, dan pertumbuhan startup dalam satu ekosistem yang saling mendukung.
            </p>
          </div>
          <div className="pillars-grid">
            {PILLARS.map(p => (
              <div className="pillar-card reveal" key={p.num} data-num={p.num}>
                <div className="pillar-icon-wrap">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="pillar-tag">{p.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="section vision-section" id="visi">
        <div className="container">
          <div className="vision-inner">
            <div>
              <div className="section-eyebrow reveal">Visi &amp; Misi</div>
              <h2 className="section-title light reveal">Mengakselerasi Indonesia Menuju Kemandirian Digital</h2>
              <div className="gold-bar reveal" />
              <p className="section-body light reveal">
                Kami percaya bahwa pertumbuhan sejati terjadi ketika seseorang mampu membangun kehadiran digital yang kuat, mengelola finansial dengan bijak, dan mengembangkan bisnis yang berkelanjutan — semuanya dalam satu ekosistem yang terhubung.
              </p>
              <ul className="vision-list reveal">
                {[
                  'Menyediakan solusi digital berkualitas tinggi — website, aplikasi, dan tools — untuk individu, UMKM, dan korporat',
                  'Membangun platform finansial berbasis AI yang membantu masyarakat Indonesia merencanakan dan mengelola keuangan lebih cerdas',
                  'Menghubungkan startup inovatif dengan ekosistem pendanaan dan mentor berpengalaman untuk tumbuh lebih cepat',
                  'Menjadi akselerator terintegrasi yang menjembatani kompetensi, kemandirian finansial, dan bisnis inovatif',
                ].map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
            <div className="reveal">
              <div className="vision-quote-card">
                <p className="vision-quote-text">
                  "Menjadi ekosistem akselerator terintegrasi terdepan di Indonesia yang menjembatani kesenjangan antara kompetensi profesional, kemandirian finansial, dan pertumbuhan bisnis inovatif."
                </p>
                <div className="vision-quote-author">— Visi ARRIVAR Indonesia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="section services-section" id="layanan">
        <div className="container">
          <div className="services-header">
            <div>
              <div className="section-eyebrow reveal">Semua Layanan</div>
              <h2 className="section-title reveal">Apa yang Bisa <em>Kami Bantu?</em></h2>
              <div className="gold-bar reveal" />
            </div>
            <p className="section-body reveal" style={{textAlign:'right',maxWidth:'340px'}}>
              Klik salah satu layanan di bawah untuk melihat detail dan cara kerja kami.
            </p>
          </div>
          {SERVICES.map(s => (
            <Link to="/services" className="service-row reveal" key={s.num} style={{textDecoration:'none'}}>
              <div className="sr-num">{s.num}</div>
              <div>
                <div className="sr-title">{s.title}</div>
                <div className="sr-desc">{s.desc}</div>
              </div>
              <div className="sr-arr">→</div>
            </Link>
          ))}
          <div className="reveal" style={{textAlign:'center',marginTop:'2.5rem'}}>
            <Link to="/services" className="btn-primary">Pelajari Semua Layanan →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section" id="kontak">
        <div className="container">
          <div className="cta-inner reveal">
            <div className="section-eyebrow" style={{textAlign:'center',marginBottom:'.75rem'}}>Mulai Sekarang</div>
            <h2 className="section-title light" style={{textAlign:'center'}}>
              Siap Tumbuh Bersama <em>ARRIVAR</em>?
            </h2>
            <div className="gold-bar center" style={{marginBottom:'1.5rem'}} />
            <p className="section-body light" style={{textAlign:'center',margin:'0 auto 2.5rem'}}>
              Entah Anda butuh website baru, aplikasi bisnis, template Excel, atau ingin bergabung dengan ekosistem karir dan finansial kami — tim ARRIVAR siap membantu. Mulai percakapan hari ini.
            </p>
            <div className="hero-btns" style={{justifyContent:'center'}}>
              <Link to="/catalog" className="btn-primary">Lihat Katalog →</Link>
              <a href="mailto:admin@arrivar.id" className="btn-outline">Email Kami</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-brand-name">ARRIVAR<span>.id</span></div>
              <p>Jasa pembuatan website, aplikasi, dan template Excel, serta ekosistem akselerator untuk karir, finansial, dan startup Indonesia.</p>
              <div className="footer-socials">
                <a href="https://www.linkedin.com/company/arrivar-id" target="_blank" rel="noopener noreferrer" className="social-link">in</a>
                <a href="https://www.instagram.com/arrivar.id" target="_blank" rel="noopener noreferrer" className="social-link">ig</a>
                <a href="https://www.threads.com/@arrivar.id" target="_blank" rel="noopener noreferrer" className="social-link">tr</a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Ekosistem</h4>
              <ul>
                <li><Link to="/catalog">Katalog Produk</Link></li>
                <li><Link to="/community">Komunitas</Link></li>
                <li><Link to="/services">Layanan Jasa</Link></li>
                <li><a href="https://www.investguard.id" target="_blank" rel="noopener noreferrer">InvestGuard App</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Perusahaan</h4>
              <ul>
                <li><Link to="/about">Tentang Kami</Link></li>
                <li><Link to="/privacy">Kebijakan Privasi</Link></li>
                <li><Link to="/legal">Syarat &amp; Ketentuan</Link></li>
                <li><Link to="/career">Karir</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Kontak</h4>
              <ul>
                <li><a href="mailto:admin@arrivar.id">admin@arrivar.id</a></li>
                <li><a href="#">Jakarta, Indonesia</a></li>
                <li><a href="https://www.arrivar.id">PT ARRIVAR INDONESIA</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 <span>PT ARRIVAR INDONESIA</span>. All rights reserved.</p>
            <p>Empowering Indonesia's Future — <span>Career · Financial · Startup</span></p>
          </div>
        </div>
      </footer>

      <button
        className={`scroll-top${showScrollTop ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >↑</button>
    </>
  );
}