document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.nav-link');

  function showSection(id) {
    sections.forEach(sec => {
      sec.classList.toggle('active', sec.id === id);
    });
  }

  showSection('main');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      showSection(targetId);
    });
  });

  const fightBtn = document.getElementById('fightBtn');
  fightBtn.addEventListener('click', () => {
    showSection('battle');
  });
});