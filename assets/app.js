(function () {
  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('[data-menu]');
  const menuButton = document.querySelector('[data-menu-button]');
  const tabs = Array.from(document.querySelectorAll('[data-filter]'));
  const cards = Array.from(document.querySelectorAll('[data-kind]'));
  const form = document.querySelector('[data-whatsapp-form]');
  const status = document.querySelector('[data-form-status]');
  const video = document.querySelector('.hero-video');

  if (header) {
    const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 18);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  if (menu && menuButton) {
    menuButton.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', (event) => {
      if (event.target.matches('a')) {
        menu.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;
      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.kind === filter;
        card.hidden = !show;
      });
    });
  });

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const nome = String(data.get('nome') || '').trim();
      const interesse = String(data.get('interesse') || '').trim();
      const unidade = String(data.get('unidade') || '').trim();
      const mensagem = String(data.get('mensagem') || '').trim();

      if (nome.length < 2 || !interesse || !unidade || !data.get('consentimento')) {
        if (status) status.textContent = 'Preencha os campos obrigatórios para abrir o WhatsApp.';
        return;
      }

      const texto = [
        `Olá, meu nome é ${nome}.`,
        `Vim pelo site da Naturale e tenho interesse em ${interesse}.`,
        `Unidade preferida: ${unidade}.`,
        mensagem ? `Observação: ${mensagem}` : 'Gostaria de saber disponibilidade para avaliação.'
      ].join(' ');

      if (status) status.textContent = 'Abrindo o WhatsApp com sua mensagem pronta.';
      window.open(`https://wa.me/5548999566821?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
    });
  }

  if (video && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.removeAttribute('autoplay');
    video.pause();
  }
})();
