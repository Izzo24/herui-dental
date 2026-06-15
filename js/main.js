/* ===================================================
   禾睿牙醫診所 — Main JavaScript
   =================================================== */

(function () {
  'use strict';

  // ── Page Loader ──────────────────────────────────
  window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 900);
    }
  });

  // ── Smart Nav ────────────────────────────────────
  const nav = document.querySelector('.site-nav');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) {
      if (y > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    lastScrollY = y;

    // Back to top
    const btt = document.getElementById('back-to-top');
    if (btt) {
      if (y > 400) btt.classList.add('visible');
      else btt.classList.remove('visible');
    }
  }, { passive: true });

  // ── Back to Top ──────────────────────────────────
  const btt = document.getElementById('back-to-top');
  if (btt) {
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Mobile Nav ───────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  const mobileClose = document.querySelector('.nav-mobile-close');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (mobileClose && mobileNav) {
    mobileClose.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // ── Scroll Reveal ────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  }

  // ── Stat Counters ────────────────────────────────
  function animateCounter(el, target, suffix, duration) {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + (suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statSection = document.querySelector('.stats-section');
  if (statSection) {
    let counted = false;
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !counted) {
          counted = true;
          document.querySelectorAll('[data-count]').forEach(el => {
            const target = parseInt(el.dataset.count, 10);
            const suffix = el.dataset.suffix || '';
            animateCounter(el, target, suffix, 1800);
          });
        }
      },
      { threshold: 0.5 }
    );
    statsObserver.observe(statSection);
  }

  // ── Active Nav Link ──────────────────────────────
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Form Handling ────────────────────────────────
  const appointmentForm = document.getElementById('appointment-form');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = appointmentForm.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = '送出中…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ 預約成功！';
        btn.style.background = '#28A745';
        // Show success message
        const msg = document.createElement('div');
        msg.innerHTML = `
          <div style="background:#E6F4F0;border:2px solid #0B7B74;border-radius:12px;padding:20px 24px;margin-top:20px;color:#085E59">
            <strong>🎉 預約申請已收到！</strong><br>
            我們將於 2 小時內以電話確認您的預約時間，感謝您選擇禾睿牙醫。
          </div>`;
        appointmentForm.appendChild(msg);
      }, 1500);
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      btn.textContent = '送出中…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ 訊息已送出';
        btn.style.background = '#28A745';
      }, 1200);
    });
  }

  // ── Smooth anchor scroll ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Service tab (services page) ──────────────────
  const tabs = document.querySelectorAll('.service-tab');
  if (tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.service-tab-content').forEach(c => {
          c.style.display = c.dataset.content === target ? 'block' : 'none';
        });
      });
    });
  }

  // ── Prefers reduced motion ───────────────────────
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
    document.querySelectorAll('.float-card').forEach(el => {
      el.style.animation = 'none';
    });
  }

})();
