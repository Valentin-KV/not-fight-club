document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.nav-link');
  const fightBtn   = document.getElementById('fightBtn');
  const menuTitle  = document.getElementById('menuTitle');

const sectionNames = {
    main:      'Main',
    battle:    'Battle',
    character: 'Character',
    settings:  'Settings',
    register:  'Register'
  };

  function showSection(id) {
    sections.forEach(sec => {
      sec.classList.toggle('active', sec.id === id);
    });

    menuTitle.textContent = sectionNames[id] || '';
  }

  showSection('main');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      showSection(targetId);
    });
  });

  fightBtn.addEventListener('click', () => {
    showSection('battle');
  });
});