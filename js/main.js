/* ============================================================
   GELAGEN — main.js
   Domain: gelagen-org.vercel.app
   ============================================================ */

(function(){
  'use strict';

  /* ── NAV ──────────────────────────────────────────────── */
  const nav        = document.getElementById('nav');
  const hamburger  = document.querySelector('.nav-hamburger');
  const navLinks   = document.querySelector('.nav-links');

  if(hamburger && navLinks){
    hamburger.addEventListener('click',()=>{
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // close on link click
    navLinks.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click',()=>{
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  if(nav){
    window.addEventListener('scroll',()=>{
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, {passive:true});
  }

  /* ── SMOOTH SCROLL ────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id = a.getAttribute('href');
      if(id === '#') return;
      const el = document.querySelector(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
        // offset for fixed nav
        const y = el.getBoundingClientRect().top + window.scrollY - 76;
        window.scrollTo({top:y, behavior:'smooth'});
      }
    });
  });

  /* ── SCROLL REVEAL ────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
  if(revealEls.length && 'IntersectionObserver' in window){
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    },{threshold:.12, rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(el=>io.observe(el));
  } else {
    revealEls.forEach(el=>el.classList.add('in-view'));
  }

  /* ── ACTIVE NAV HIGHLIGHT ─────────────────────────────── */
  const sections   = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link[href^="#"]');
  if(sections.length && navLinkEls.length && 'IntersectionObserver' in window){
    const navIO = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          navLinkEls.forEach(l=>l.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
          if(active) active.classList.add('active');
        }
      });
    },{rootMargin:'-30% 0px -60% 0px'});
    sections.forEach(s=>navIO.observe(s));
  }

  /* ── STAT COUNTER ─────────────────────────────────────── */
  function animateCount(el){
    const target  = parseFloat(el.dataset.count || 0);
    const suffix  = el.dataset.suffix || '';
    const prefix  = el.dataset.prefix || '';
    const dec     = parseInt(el.dataset.dec || 0);
    const dur     = 1800;
    const steps   = 60;
    const inc     = target / steps;
    let cur       = 0;
    const timer   = setInterval(()=>{
      cur = Math.min(cur + inc, target);
      el.textContent = prefix + cur.toFixed(dec) + suffix;
      if(cur >= target) clearInterval(timer);
    }, dur / steps);
  }

  const statNums = document.querySelectorAll('.stat-num[data-count]');
  if(statNums.length && 'IntersectionObserver' in window){
    const cntIO = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          animateCount(e.target);
          cntIO.unobserve(e.target);
        }
      });
    },{threshold:.5});
    statNums.forEach(el=>cntIO.observe(el));
  }

  /* ── FAQ ──────────────────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
      if(!isOpen) item.classList.add('open');
    });
  });

  /* ── SCROLL-TO-TOP ────────────────────────────────────── */
  const scrollTop = document.getElementById('scroll-top');
  if(scrollTop){
    window.addEventListener('scroll',()=>{
      scrollTop.classList.toggle('visible', window.scrollY > 500);
    }, {passive:true});
    scrollTop.addEventListener('click',()=>{
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  /* ── LAZY IMAGES POLYFILL ─────────────────────────────── */
  if('loading' in HTMLImageElement.prototype === false){
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    if('IntersectionObserver' in window){
      const imgIO = new IntersectionObserver(entries=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            const img = e.target;
            if(img.dataset.src) img.src = img.dataset.src;
            imgIO.unobserve(img);
          }
        });
      });
      imgs.forEach(img=>imgIO.observe(img));
    }
  }

  /* ── PROGRESS BARS ANIMATE ────────────────────────────── */
  const bars = document.querySelectorAll('.agg-bar-fill');
  if(bars.length && 'IntersectionObserver' in window){
    const barIO = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.style.width = e.target.dataset.width;
          barIO.unobserve(e.target);
        }
      });
    },{threshold:.4});
    bars.forEach(b=>barIO.observe(b));
  }

})();
