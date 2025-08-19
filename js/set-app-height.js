/* js/set-app-height.js
 * Σταθεροποιεί το mobile viewport height χωρίς "jump",
 * αποθηκεύει την τιμή ανά tab (sessionStorage) και ανανεώνει μόνο σε rotation.
 * Δεν αγγίζει το document.body μέχρι να είναι έτοιμο το DOM.
 */
(() => {
  const KEY = 'vhPx_v1';

  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  const measure  = () => ((window.visualViewport && window.visualViewport.height) || window.innerHeight) * 0.01;
  const setVar   = (px) => document.documentElement.style.setProperty('--vh', px + 'px');
  const save     = (px) => sessionStorage.setItem(KEY, String(px));

  // 1) Θέσε άμεσα --vh (διαβάζοντας αποθήκη ή μετρώντας)
  let saved = sessionStorage.getItem(KEY);
  let px = saved ? parseFloat(saved) : measure();
  if (!saved) save(px);
  setVar(px);

  // 2) Ξεκλείδωμα UI μόλις είναι έτοιμο το DOM (όχι στο load)
  function unlock(){ 
    // αν δεν υπάρχει ακόμη body (πολύ νωρίς στο head), περίμενε το DOM
    const go = () => {
      if (!document.body) return; // edge case: αν δεν έχει δημιουργηθεί ακόμη
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    };
    (document.readyState === 'loading')
      ? document.addEventListener('DOMContentLoaded', go, {once:true})
      : go();
  }
  unlock();

  // 3) Ανανεώσεις χωρίς jump
  if (isMobile) {
    // ΜΟΝΟ σε rotation (όχι σε scroll/resize της UI bar)
    window.addEventListener('orientationchange', () => {
      setTimeout(() => { const p = measure(); save(p); setVar(p); }, 250);
    }, { passive: true });
  } else {
    // Desktop: κανονικά σε resize
    window.addEventListener('resize', () => {
      const p = measure(); save(p); setVar(p);
    });
  }
})();
