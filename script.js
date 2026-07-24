// ===== Reading progress bar =====
const progressFill = document.getElementById('progressFill');
function updateProgress(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressFill.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// ===== Mask on/off theme toggle =====
const maskToggle = document.getElementById('maskToggle');
const maskLabel = document.getElementById('maskLabel');
const root = document.documentElement;

function applyTheme(masked){
  root.setAttribute('data-theme', masked ? 'mask' : 'default');
  maskLabel.textContent = masked ? 'Mask on' : 'Mask off';
  maskToggle.setAttribute('aria-pressed', String(masked));
  localStorage.setItem('anthology-masked', masked ? '1' : '0');
}
const savedMask = localStorage.getItem('anthology-masked') === '1';
applyTheme(savedMask);

maskToggle.addEventListener('click', () => {
  const isMasked = root.getAttribute('data-theme') === 'mask';
  applyTheme(!isMasked);
});

// ===== Scroll-spy nav =====
const navLinks = document.querySelectorAll('.navlinks a');
const sections = Array.from(navLinks).map(link => document.getElementById(link.dataset.section));

function updateActiveNav(){
  let current = null;
  const scrollPos = window.scrollY + window.innerHeight * 0.35;
  sections.forEach(sec => {
    if (sec && sec.offsetTop <= scrollPos) current = sec;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', !!current && link.dataset.section === current.id);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => io.observe(el));
