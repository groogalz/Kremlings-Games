/* Kremlings Games — bouton « Tous les jeux », ajouté sur l'écran d'accueil de chaque jeu.
   Dans un jeu : <script src="../../retour.js" data-accueil="#home"></script> juste avant </body>.
   Le bouton n'apparaît que sur l'écran d'accueil du jeu, jamais pendant une partie. Il réserve
   sa place en haut de cet écran, et s'efface dès qu'on fait défiler la page. */
(function () {
  'use strict';
  var script = document.currentScript;
  if (!script) return;
  var accueil = script.getAttribute('data-accueil') || '#home';
  var racine = script.src.replace(/retour\.js(\?.*)?$/, '');
  var lien = racine + (location.protocol === 'file:' ? 'index.html' : '');
  var PLACE = 'max(%opx, calc(58px + env(safe-area-inset-top, 0px)))';

  var css = document.createElement('style');
  css.textContent =
    '.kg-retour{position:fixed;z-index:55;top:calc(10px + env(safe-area-inset-top,0px));left:calc(10px + env(safe-area-inset-left,0px));' +
    'display:inline-flex;align-items:center;gap:4px;min-height:38px;padding:0 13px 0 8px;border-radius:19px 16px 18px 15px;' +
    'background:#fbf5e4;color:#0e5626;border:2px solid #0e5626;box-shadow:2px 3px 0 #0e5626;' +
    'font:700 15px/1 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-decoration:none;letter-spacing:0;text-transform:none;' +
    '-webkit-tap-highlight-color:transparent;transition:transform .12s,box-shadow .08s,opacity .15s}' +
    '.kg-retour:active{transform:translate(2px,3px);box-shadow:0 0 0 #0e5626}' +
    '.kg-retour:focus-visible{outline:3px dashed #fbf5e4;outline-offset:3px}' +
    '.kg-retour svg{width:18px;height:18px;flex:none}' +
    '.kg-retour.kg-loin{opacity:0;pointer-events:none;transform:translateY(-10px)}' +
    '.kg-retour[hidden]{display:none}';
  document.head.appendChild(css);

  var a = document.createElement('a');
  a.className = 'kg-retour';
  a.href = lien;
  a.hidden = true;
  a.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Tous les jeux</span>';
  document.body.appendChild(a);

  var origine = null; // marge haute d'origine de l'écran d'accueil
  function ecran() { return document.querySelector(accueil); }
  function verifier() {
    var el = ecran();
    var visible = !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    if (a.hidden === visible) a.hidden = !visible;
    if (visible) {
      if (origine === null || el.dataset.kgPlace !== '1') {
        el.style.removeProperty('padding-top');
        origine = parseFloat(getComputedStyle(el).paddingTop) || 0;
        el.style.setProperty('padding-top', PLACE.replace('%o', origine));
        el.dataset.kgPlace = '1';
      }
      defiler();
    }
  }
  function defiler() {
    // Hauteur défilée : la page elle-même, ou le conteneur qui fait défiler l'écran d'accueil.
    var haut = window.scrollY || 0;
    for (var n = ecran(); n && n !== document.documentElement; n = n.parentElement) {
      if (n.scrollTop > haut) haut = n.scrollTop;
    }
    a.classList.toggle('kg-loin', haut > 24);
  }
  document.addEventListener('scroll', defiler, { capture: true, passive: true });
  verifier();
  setInterval(verifier, 300);
})();
