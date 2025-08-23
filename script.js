/* NAV hamburger toggle + animated X */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  hamburger.classList.toggle('open');
  // animate bars -> X
  const spans = hamburger.querySelectorAll('span');
  if (hamburger.classList.contains('open')) {
    spans[0].style.transform = 'translateY(6px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

/* Typing effect (left role) */
const roles = ['Developer', 'QA Engineer', 'Test Architect', 'Automation Enthusiast'];
const typedEl = document.getElementById('typed');
let r = 0, c = 0, forward = true;
function tickRole() {
  const word = roles[r];
  if (forward) {
    c++;
    typedEl.textContent = word.slice(0, c);
    if (c === word.length) { forward = false; setTimeout(tickRole, 1200); return; }
  } else {
    c--;
    typedEl.textContent = word.slice(0, c);
    if (c === 0) { forward = true; r = (r + 1) % roles.length; setTimeout(tickRole, 300); return; }
  }
  setTimeout(tickRole, forward ? 90 : 40);
}
document.addEventListener('DOMContentLoaded', tickRole);

/* TERMINAL live code typing (hero-right) */
const codeEl = document.getElementById('code-animation');

const featuredCode = [
  "const project = {",
  "  name: 'Portfolio Website',",
  "  tech: ['HTML','CSS','JS'],",
  "  status: 'live',",
  "};",
  "console.log('🚀 Project loaded:', project.name);"
];

const portfolioCode = [
  "function build(name) {",
  "  return `Building ${name} — testing & deploy`;",
  "}",
  "console.log(build('Finance Tracker'));",
  "// Running tests...",
  "✅ All tests passed"
];

let lines = featuredCode; // default
let lineIdx = 0, charIdx = 0;

function typeTerminal() {
  if (!codeEl) return;
  if (lineIdx < lines.length) {
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      codeEl.textContent += line.charAt(charIdx);
      charIdx++;
      setTimeout(typeTerminal, 28 + Math.random() * 40);
    } else {
      codeEl.textContent += "\n";
      lineIdx++;
      charIdx = 0;
      setTimeout(typeTerminal, 200 + Math.random() * 200);
    }
  } else {
    // pause then restart (loop)
    setTimeout(() => {
      codeEl.textContent = "";
      lineIdx = 0; charIdx = 0;
      typeTerminal();
    }, 2000);
  }
}
// start terminal typing
document.addEventListener('DOMContentLoaded', () => {
  typeTerminal();
});

/* chip buttons to switch terminal content */
const chipFeatured = document.getElementById('chipFeatured');
const chipPortfolio = document.getElementById('chipPortfolio');
const cardFooter = document.getElementById('cardFooter');

chipFeatured.addEventListener('click', () => {
  lines = featuredCode;
  codeEl.textContent = "";
  lineIdx = 0; charIdx = 0;
  typeTerminal();
  cardFooter.textContent = "Featured • Hydroo Lab";
});
chipPortfolio.addEventListener('click', () => {
  lines = portfolioCode;
  codeEl.textContent = "";
  lineIdx = 0; charIdx = 0;
  typeTerminal();
  cardFooter.textContent = "Portfolio • Hydroo Lab";
});

/* Section reveal on scroll */
const sections = document.querySelectorAll('.section');
const reveal = (entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      obs.unobserve(entry.target);
    }
  });
};
const observer = new IntersectionObserver(reveal, { threshold: 0.2 });
sections.forEach(s => observer.observe(s));

/* animate skill bars when about visible */
const aboutSection = document.getElementById('about');
if (aboutSection) {
  const aboutObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        document.querySelectorAll('.fill').forEach(el => {
          const w = el.style.getPropertyValue('--w') || '70%';
          el.style.width = w;
        });
        obs.unobserve(aboutSection);
      }
    });
  }, {threshold: 0.3});
  aboutObs.observe(aboutSection);
}

/* footer year */
document.getElementById('year').textContent = new Date().getFullYear();
    