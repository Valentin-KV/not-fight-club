document.addEventListener('DOMContentLoaded', () => {
  // 1. Селекторы
  const sections       = document.querySelectorAll('.content-section');
  const navLinks       = document.querySelectorAll('.nav-link');
  const fightBtn       = document.getElementById('fightBtn');
  const menuTitle      = document.getElementById('menuTitle');

  const registerInput  = document.querySelector('.register-field-input');
  const registerBtn    = document.querySelector('.register-button');

  const playerNameInput= document.getElementById('playerNameInput');
  const saveBtn        = document.getElementById('savePlayerNameBtn');

  const displays       = document.querySelectorAll('.player-name');

  const avatarContainer= document.getElementById('characterAvatarContainer');
  const mainAvatar     = document.getElementById('characterAvatar');
  const popupBox       = document.getElementById('myPopup');
  const closeBtn       = document.querySelector('.popup-content-closeButton');
  const avatarOptions  = document.querySelectorAll('.popup-avatar-item .avatar-image');

  // 2. Карта названий секций
  const sectionNames = {
    main:      'Main',
    battle:    'Battle',
    character: 'Character',
    settings:  'Settings',
    register:  'Register'
  };

  // 3. Функции показа секции и обновления имени
  function showSection(id) {
    sections.forEach(sec => {
      sec.classList.toggle('active', sec.id === id);
    });
    menuTitle.textContent = sectionNames[id] || '';
  }

  function updateDisplays(name) {
    displays.forEach(el => el.textContent = name);
  }

  // 4. Навигация по меню
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();  
      const targetId = link.getAttribute('href').slice(1);
      showSection(targetId);
    });
  });

  // 5. Кнопка Fight! переходит в Battle
  fightBtn.addEventListener('click', () => {
    showSection('battle');
  });

  // 6. Первоначальная загрузка: регистрация или main
  const storedName = localStorage.getItem('playerName');
  if (!storedName) {
    showSection('register');
  } else {
    updateDisplays(storedName);
    showSection('main');
  }

  // 7. Логика формы регистрации
  registerInput.addEventListener('input', () => {
    registerBtn.classList.toggle('disabled', !registerInput.value.trim());
  });

  registerBtn.addEventListener('click', () => {
    if (registerBtn.classList.contains('disabled')) return;
    const name = registerInput.value.trim();
    localStorage.setItem('playerName', name);
    updateDisplays(name);
    showSection('main');
  });

  // 8. Попап выбора аватара
  avatarContainer.addEventListener('click', () => popupBox.style.display = 'flex');
  closeBtn.addEventListener('click', () => popupBox.style.display = 'none');
  popupBox.addEventListener('click', e => {
    if (e.target === popupBox) popupBox.style.display = 'none';
  });
  avatarOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      mainAvatar.src = opt.src;
      popupBox.style.display = 'none';
    });
  });

  // 9. Редактирование имени в настройках
  saveBtn.addEventListener('click', () => {
    if (saveBtn.textContent === 'Edit') {
      playerNameInput.disabled = false;
      saveBtn.textContent = 'Save';
      playerNameInput.focus();
    } else {
      const newName = playerNameInput.value.trim() || 'Player';
      localStorage.setItem('playerName', newName);
      updateDisplays(newName);
      playerNameInput.disabled = true;
      saveBtn.textContent = 'Edit';
    }
  });
});