// Mobile menu
const nav = document.querySelector('.nav');
const menuBtn = document.querySelector('.menu-btn');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Year
document.getElementById('yr').textContent = new Date().getFullYear();

// Hover preview on desktop (muted, loaded only when needed)
const canHover = matchMedia('(hover:hover)').matches;
document.querySelectorAll('.card').forEach(card => {
  const v = card.querySelector('video');
  if (canHover) {
    card.addEventListener('mouseenter', () => {
      if (!v.src) v.src = v.dataset.src;
      v.play().catch(() => {});
    });
    card.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
  }
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); } });
});

// Lightbox
const lb = document.getElementById('lightbox');
const lbVideo = lb.querySelector('video');
const lbTitle = document.getElementById('lb-title');
function closeLb() { lbVideo.pause(); lbVideo.removeAttribute('src'); lbVideo.load(); lb.close(); }
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    lbVideo.src = card.dataset.video;
    lbTitle.textContent = card.dataset.title;
    lb.showModal();
    lbVideo.play().catch(() => {});
  });
});
lb.querySelector('.close').addEventListener('click', closeLb);
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
lb.addEventListener('cancel', () => { lbVideo.pause(); });

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.card, .svc, .steps li, .about-card, .contact-card, .head').forEach(el => { el.classList.add('reveal'); io.observe(el); });
