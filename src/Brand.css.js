// ARRIVAR BRAND SYSTEM — shared across all pages
// Based on brand guideline: #00182A navy, #D4AF37 gold, Poppins font
// Usage: import { BRAND_CSS, Navbar, Footer, ScrollTop } from './brand.css.js'

export const BRAND_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:        #00182A;
    --navy-mid:    #0D2940;
    --navy-light:  #1E3A52;
    --gold:        #D4AF37;
    --gold-dim:    #B8962E;
    --gold-light:  #E8C96A;
    --white:       #FFFFFF;
    --off-white:   #F4F6F9;
    --slate:       #394B5A;
    --slate-light: #A7B8C6;
    --success:     #22C55E;
    --ff:          'Poppins', sans-serif;
    --radius-sm:   6px;
    --radius-md:   12px;
    --radius-lg:   20px;
    --tr:          0.3s cubic-bezier(0.4,0,0.2,1);
    --shadow-sm:   0 4px 16px rgba(0,24,42,.08);
    --shadow-md:   0 12px 40px rgba(0,24,42,.14);
    --shadow-lg:   0 28px 60px rgba(0,24,42,.22);
  }

  html { scroll-behavior: smooth; }
  body { font-family: var(--ff); background: var(--off-white); color: var(--navy); -webkit-font-smoothing: antialiased; }

  /* ── NAVBAR ── */
  #navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.1rem 4rem;
    background: var(--navy);
    border-bottom: 1px solid rgba(212,175,55,.12);
    transition: padding var(--tr), box-shadow var(--tr);
  }
  #navbar.scrolled { padding: .7rem 4rem; box-shadow: 0 6px 32px rgba(0,0,0,.5); }
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

  /* ── SECTION BASE ── */
  .section { padding: 6rem 0; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 4rem; }
  .section-eyebrow {
    font-size: .68rem; font-weight: 700; letter-spacing: .17em;
    text-transform: uppercase; color: var(--gold); margin-bottom: .7rem;
  }
  .section-title {
    font-size: clamp(1.9rem, 3.5vw, 2.9rem);
    font-weight: 800; line-height: 1.12; color: var(--navy); margin-bottom: 1rem;
  }
  .section-title em { color: var(--gold); font-style: normal; }
  .section-title.light { color: var(--white); }
  .gold-bar {
    width: 48px; height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--gold-dim));
    border-radius: 2px; margin-bottom: 1.5rem;
  }
  .gold-bar.center { margin-left: auto; margin-right: auto; }
  .section-body { font-size: .93rem; line-height: 1.85; color: var(--slate); max-width: 600px; }
  .section-body.light { color: var(--slate-light); }

  /* ── HERO (shared base) ── */
  .page-hero {
    background: var(--navy); position: relative;
    padding: 10rem 4rem 6rem; text-align: center;
    border-bottom: 3px solid var(--gold);
    overflow: hidden;
  }
  .page-hero::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 70% at 50% 50%, #0D2D4A 0%, var(--navy) 70%);
  }
  .page-hero::after {
    content: ''; position: absolute; inset: 0; opacity: .04;
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 59px, var(--gold) 59px, var(--gold) 60px),
      repeating-linear-gradient(90deg, transparent, transparent 59px, var(--gold) 59px, var(--gold) 60px);
  }
  .page-hero-inner { position: relative; z-index: 2; max-width: 800px; margin: 0 auto; }
  .page-hero h1 {
    font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 800;
    line-height: 1.1; color: var(--white); margin: 1.2rem 0 1.5rem;
  }
  .page-hero h1 em { color: var(--gold); font-style: normal; }
  .page-hero p { font-size: 1rem; line-height: 1.85; color: var(--slate-light); max-width: 620px; margin: 0 auto; }

  /* ── BUTTONS ── */
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
    border: 1.5px solid rgba(255,255,255,.25);
    text-decoration: none; cursor: pointer;
    transition: border-color var(--tr), color var(--tr), transform var(--tr);
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }
  .btn-group { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
  .btn-group.center { justify-content: center; }

  /* ── CARDS ── */
  .card {
    background: var(--white); border: 1px solid rgba(0,24,42,.07);
    border-radius: var(--radius-lg); padding: 2.5rem 2rem;
    position: relative; overflow: hidden;
    transition: transform var(--tr), box-shadow var(--tr), border-color var(--tr);
  }
  .card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); border-color: rgba(212,175,55,.4); }
  .card-dark {
    background: var(--navy); border-radius: var(--radius-lg);
    padding: 2.5rem 2rem; position: relative; overflow: hidden;
    transition: transform var(--tr), box-shadow var(--tr);
  }
  .card-dark:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
  .card-dark-accent {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--gold-dim));
  }
  .card-icon {
    width: 52px; height: 52px; border-radius: var(--radius-md);
    background: var(--navy); display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.5rem;
  }
  .card-dark .card-icon { background: rgba(212,175,55,.12); border: 1px solid rgba(212,175,55,.22); }
  .card-tag {
    display: inline-block; font-size: .67rem; font-weight: 700;
    letter-spacing: .08em; text-transform: uppercase;
    color: var(--gold); background: rgba(212,175,55,.1);
    padding: .28rem .85rem; border-radius: 100px;
    border: 1px solid rgba(212,175,55,.25);
  }

  /* ── REVEAL ANIMATION ── */
  .reveal { opacity: 0; transform: translateY(28px); transition: opacity .65s cubic-bezier(.4,0,.2,1), transform .65s cubic-bezier(.4,0,.2,1); }
  .reveal.visible { opacity: 1; transform: none; }

  /* ── FOOTER ── */
  footer { background: #000f1a; color: var(--slate-light); padding: 5rem 0 2rem; }
  .footer-inner { max-width: 1200px; margin: 0 auto; padding: 0 4rem; }
  .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 4rem; }
  .footer-brand-name { font-size: 1.65rem; font-weight: 800; color: var(--white); margin-bottom: .7rem; }
  .footer-brand-name span { color: var(--gold); }
  .footer-brand > p { font-size: .82rem; line-height: 1.8; max-width: 270px; color: var(--slate-light); }
  .footer-socials { display: flex; gap: .7rem; margin-top: 1.5rem; }
  .social-link {
    width: 34px; height: 34px; border-radius: var(--radius-sm);
    border: 1px solid rgba(255,255,255,.14);
    display: flex; align-items: center; justify-content: center;
    font-size: .68rem; font-weight: 700; text-transform: uppercase;
    color: var(--slate-light); text-decoration: none;
    transition: border-color var(--tr), color var(--tr), background var(--tr);
  }
  .social-link:hover { border-color: var(--gold); color: var(--gold); background: rgba(212,175,55,.08); }
  .footer-col h4 { font-size: .67rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.2rem; }
  .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: .58rem; }
  .footer-col ul li a { font-size: .8rem; color: var(--slate-light); text-decoration: none; transition: color var(--tr); }
  .footer-col ul li a:hover { color: var(--gold); }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,.06); padding-top: 2rem;
    display: flex; justify-content: space-between; align-items: center;
    font-size: .74rem; color: rgba(167,184,198,.45); flex-wrap: wrap; gap: .5rem;
  }
  .footer-bottom span { color: var(--gold); }

  /* ── SCROLL TOP ── */
  .scroll-top {
    position: fixed; bottom: 2rem; right: 2rem; z-index: 999;
    width: 44px; height: 44px; border-radius: var(--radius-sm);
    background: var(--gold); color: var(--navy);
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; font-weight: 700;
    opacity: 0; transform: translateY(12px);
    transition: opacity var(--tr), transform var(--tr), background var(--tr);
    pointer-events: none;
  }
  .scroll-top.visible { opacity: 1; transform: none; pointer-events: all; }
  .scroll-top:hover { background: var(--gold-dim); }

  /* ── PILL / EYEBROW BADGE ── */
  .pill-badge {
    display: inline-flex; align-items: center; gap: .5rem;
    background: rgba(212,175,55,.1); border: 1px solid rgba(212,175,55,.28);
    border-radius: 100px; padding: .32rem 1rem;
    font-size: .68rem; font-weight: 600; letter-spacing: .13em;
    color: var(--gold); text-transform: uppercase; margin-bottom: 1.5rem;
  }
  .pill-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--gold); animation: blink 2s infinite;
  }
  @keyframes blink {
    0%,100% { opacity:1; transform: scale(1); }
    50% { opacity:.35; transform: scale(1.5); }
  }

  /* ── PROCESS STEP ROW ── */
  .step-row {
    display: flex; gap: 2rem; align-items: flex-start;
    padding: 2rem 2.5rem; background: var(--white);
    border-radius: var(--radius-md); border: 1px solid rgba(0,24,42,.07);
    transition: border-color var(--tr), box-shadow var(--tr);
  }
  .step-row:hover { border-color: rgba(212,175,55,.35); box-shadow: var(--shadow-sm); }
  .step-num {
    font-size: 3rem; font-weight: 800; line-height: 1;
    color: rgba(212,175,55,.2); flex-shrink: 0; min-width: 60px;
  }
  .step-title { font-size: 1rem; font-weight: 700; color: var(--navy); margin-bottom: .4rem; }
  .step-desc { font-size: .88rem; line-height: 1.75; color: var(--slate); }

  /* ── FEATURE LIST ── */
  .feature-list { list-style: none; display: flex; flex-direction: column; gap: .75rem; }
  .feature-list li { display: flex; align-items: flex-start; gap: .7rem; font-size: .88rem; line-height: 1.65; color: var(--slate); font-weight: 500; }
  .feature-list li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--gold); flex-shrink: 0; margin-top: .45rem; }
  .feature-list.dark li { color: var(--slate-light); }
  .feature-list.check li::before { content: none; }
  .feature-list.check li .check-icon { color: var(--gold); font-weight: 700; flex-shrink: 0; }

  /* ── CTA DARK SECTION ── */
  .cta-dark {
    background: var(--navy); position: relative; overflow: hidden;
    padding: 6rem 4rem; text-align: center;
  }
  .cta-dark::before {
    content: ''; position: absolute; inset: 0; opacity: .04;
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 59px, var(--gold) 59px, var(--gold) 60px),
      repeating-linear-gradient(90deg, transparent, transparent 59px, var(--gold) 59px, var(--gold) 60px);
  }
  .cta-dark::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, transparent, var(--gold), transparent); }
  .cta-dark-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }

  /* ── RESPONSIVE ── */
  @media (max-width: 960px) {
    #navbar { padding: 1rem 1.5rem; }
    #navbar.scrolled { padding: .7rem 1.5rem; }
    .nav-links { display: none; }
    .container { padding: 0 1.5rem; }
    .page-hero { padding: 8rem 1.5rem 5rem; }
    .footer-top { grid-template-columns: 1fr 1fr; }
    .footer-bottom { flex-direction: column; text-align: center; }
    .cta-dark { padding: 5rem 1.5rem; }
  }
  @media (max-width: 600px) {
    .footer-top { grid-template-columns: 1fr; }
  }
`;