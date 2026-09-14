(function () {
  'use strict';

  /* ============================================================
     Tema claro/escuro (padrão: escuro)
     ============================================================ */
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var THEME_KEY = 'ws-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    }
  }

  var savedTheme = null;
  try {
    savedTheme = localStorage.getItem(THEME_KEY);
  } catch (e) {
    /* localStorage indisponível (modo privado, etc.) — segue com o padrão */
  }
  applyTheme(savedTheme === 'light' ? 'light' : 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {
        /* ignora se não for possível persistir */
      }
    });
  }

  /* ============================================================
     Menu mobile
     ============================================================ */
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  /* ============================================================
     Scroll reveal (IntersectionObserver)
     ============================================================ */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  /* ============================================================
     Filtro do portfólio
     ============================================================ */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      filterButtons.forEach(function (b) {
        b.classList.remove('is-active');
      });
      btn.classList.add('is-active');

      projectCards.forEach(function (card) {
        var categories = (card.getAttribute('data-category') || '').split(' ');
        var show = filter === 'all' || categories.indexOf(filter) !== -1;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ============================================================
     Botão voltar ao topo
     ============================================================ */
  var backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('is-visible', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     Formulário de contato (Formspree via fetch, com fallback)
     ============================================================ */
  var form = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');

  if (form && formStatus) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var action = form.getAttribute('action');
      if (!action || action.indexOf('SEU_FORM_ID') !== -1) {
        formStatus.textContent = 'Formulário ainda não configurado. Defina o endpoint do Formspree em index.html.';
        formStatus.className = 'form-status error';
        return;
      }

      var data = new FormData(form);
      formStatus.textContent = 'Enviando...';
      formStatus.className = 'form-status';

      fetch(action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            formStatus.textContent = 'Mensagem enviada com sucesso! Retorno em breve.';
            formStatus.className = 'form-status success';
            form.reset();
          } else {
            throw new Error('Falha no envio');
          }
        })
        .catch(function () {
          formStatus.textContent = 'Não foi possível enviar agora. Tente novamente ou use o e-mail/telefone ao lado.';
          formStatus.className = 'form-status error';
        });
    });
  }

  /* ============================================================
     Ano dinâmico no rodapé
     ============================================================ */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
