(() => {
  const menus = document.querySelectorAll('details.mobile-menu');

  for (const menu of menus) {
    const summary = menu.querySelector('summary');

    for (const link of menu.querySelectorAll('a')) {
      link.addEventListener('click', () => menu.removeAttribute('open'));
    }

    menu.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !menu.hasAttribute('open')) return;
      menu.removeAttribute('open');
      summary?.focus();
    });

    document.addEventListener('pointerdown', (event) => {
      if (menu.hasAttribute('open') && !menu.contains(event.target)) {
        menu.removeAttribute('open');
      }
    });
  }
})();
