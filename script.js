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

  const avatarContainer = document.getElementById('characterAvatarContainer');
  const mainAvatar      = document.getElementById('characterAvatar');
  const popupBox        = document.getElementById('myPopup');
  const closeBtn        = document.querySelector('.popup-content-closeButton');
  const avatarOptions   = document.querySelectorAll('.popup-avatar-item .avatar-image');

  avatarContainer.addEventListener('click', () => {
    popupBox.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    popupBox.style.display = 'none';
  });

  avatarOptions.forEach(option => {
    option.addEventListener('click', () => {
      mainAvatar.src = option.src;
      popupBox.style.display = 'none';
    });
  });

  popupBox.addEventListener('click', e => {
    if (e.target === popupBox) {
      popupBox.style.display = 'none';
    }
  });

  const playerNameInput   = document.getElementById('playerNameInput');
  const saveBtn = document.getElementById('savePlayerNameBtn');
  const displayPlayerName = document.getElementById('displayPlayerName');

  let playerName = localStorage.getItem('playerName') || playerNameInput.value.trim();
  playerNameInput.value      = playerName;
  displayPlayerName.textContent = playerName;

  saveBtn.addEventListener('click', () => {
    if (saveBtn.textContent === 'Edit') {
      playerNameInput.disabled = false;
      saveBtn.textContent = 'Save';
      playerNameInput.focus();
    } else {
      const newName = playerNameInput.value.trim() || 'Player';
      playerName = newName;
      localStorage.setItem('playerName', playerName);
      displayPlayerName.textContent = newName;
      playerNameInput.disabled = true;
      saveBtn.textContent = 'Edit';
    }
  });
});