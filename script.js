const nonprofitPanel = document.getElementById('panel-nonprofit');
const businessPanel = document.getElementById('panel-business');
const nonprofitHero = document.getElementById('btn-nonprofit-hero');
const businessHero = document.getElementById('btn-business-hero');
const navLinks = document.querySelectorAll('.nav-link');

function updatePanel(sector) {
  nonprofitPanel.classList.toggle('active', sector === 'nonprofit');
  businessPanel.classList.toggle('active', sector === 'business');
}

function activateSector(sector) {
  updatePanel(sector);
  const targetPanel = sector === 'nonprofit' ? nonprofitPanel : businessPanel;
  targetPanel.scrollIntoView({behavior: 'smooth', block: 'center'});
}

function setActiveLink(hash) {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === hash);
  });
}

nonprofitHero.addEventListener('click', () => {
  activateSector('nonprofit');
  setActiveLink('#nonprofit');
});

businessHero.addEventListener('click', () => {
  activateSector('business');
  setActiveLink('#business');
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({behavior: 'smooth', block: 'start'});
      setActiveLink(targetId);
    }
  });
});

document.querySelectorAll('.panel').forEach(panel => {
  panel.addEventListener('mouseenter', () => {
    panel.style.background = '#fbfeff';
  });
  panel.addEventListener('mouseleave', () => {
    if (!panel.classList.contains('active')) {
      panel.style.background = '#fff';
    }
  });
});

const sections = [
  { id: '#core-interaction', name: 'core' },
  { id: '#services', name: 'services' },
  { id: '#credibility', name: 'credibility' },
  { id: '#contact', name: 'contact' }
];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = `#${entry.target.id}`;
      setActiveLink(id);
    }
  });
}, { rootMargin: '-20% 0px -60% 0px', threshold: 0.3 });

sections.forEach(section => {
  const el = document.querySelector(section.id);
  if (el) observer.observe(el);
});

// Analytics / tracking (console for POC)
function trackEvent(eventName, details = {}) {
  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    details,
  };
  console.info('[NEXARA-TRACK]', payload);
}

document.getElementById('contact-us').addEventListener('click', () => {
  trackEvent('contact-trigger', {channel: 'email'});
});

document.getElementById('download-pdf').addEventListener('click', () => {
  trackEvent('download-proposal', {method: 'print-to-pdf'});
  window.print();
});
