(function () {
  var KEY = 'smarttraining_lang';
  var LANGS = ['ru', 'be', 'en'];

  function normalize(stored) {
    return LANGS.indexOf(stored) >= 0 ? stored : 'ru';
  }

  function getStored() {
    try {
      return normalize(localStorage.getItem(KEY));
    } catch (_) {
      return 'ru';
    }
  }

  function apply(lang) {
    lang = normalize(lang);
    document.documentElement.lang = lang === 'be' ? 'be' : lang;
    try {
      localStorage.setItem(KEY, lang);
    } catch (_) {}

    LANGS.forEach(function (code) {
      document.querySelectorAll('.lang-' + code).forEach(function (el) {
        el.hidden = lang !== code;
      });
    });

    var title = document.documentElement.getAttribute('data-title-' + lang);
    if (title) {
      document.title = title;
    }

    var desc = document.documentElement.getAttribute('data-desc-' + lang);
    var meta = document.querySelector('meta[name="description"]');
    if (meta && desc) {
      meta.setAttribute('content', desc);
    }

    document.querySelectorAll('[data-st-lang-btn]').forEach(function (btn) {
      var active = btn.getAttribute('data-st-lang-btn') === lang;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.classList.toggle('lang-btn-active', active);
    });

    document.querySelectorAll('[data-aria-ru][data-aria-be][data-aria-en]').forEach(function (el) {
      var label = el.getAttribute('data-aria-' + lang);
      if (label) {
        el.setAttribute('aria-label', label);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(getStored());
    document.querySelectorAll('[data-st-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        apply(btn.getAttribute('data-st-lang-btn'));
      });
    });
  });
})();
