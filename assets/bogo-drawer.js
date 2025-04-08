if (typeof BogoDrawer === 'undefined') {
  class BogoDrawer extends HTMLElement {
    constructor() {
      super();
      this.drawer = null;
      this.closeButton = null;
      this.closeOverlay = null;
      this.tooltips = [];
      this.initializedTooltips = new WeakSet(); // предотвратява двойно закачване
    }

    init() {
      const bogoRoot = document.querySelector('.real_bogo_holder');
      if (!bogoRoot) return;

      this.drawer = bogoRoot.querySelector('[data-bogo-drawer]');
      this.closeButton = bogoRoot.querySelector('[data-bogo-drawer-close-btn]');
      this.closeOverlay = bogoRoot.querySelector('[data-bogo-drawer-close-overlay]');

      this.observeTooltipChanges();
      this.bindStaticEvents(); // само веднъж за drawer-а
    }

    bindStaticEvents() {
      this.closeButton?.addEventListener('click', () => this.closeDrawer());
      this.closeOverlay?.addEventListener('click', () => this.closeDrawer());

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeDrawer();
      });
    }

    bindTooltipEvents() {
      const tooltips = document.querySelectorAll('.bogo-info-wrapper');
      tooltips.forEach(tooltip => {
        if (!this.initializedTooltips.has(tooltip)) {
          tooltip.addEventListener('click', () => this.openDrawer());
          this.initializedTooltips.add(tooltip);
        }
      });
    }

    observeTooltipChanges() {
      // Закачаме се веднага към вече налични
      this.bindTooltipEvents();

      // Наблюдаваме бъдещи добавяния
      const observer = new MutationObserver(() => {
        this.bindTooltipEvents();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    openDrawer() {
      this.drawer?.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }

    closeDrawer() {
      this.drawer?.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    connectedCallback() {
      this.init();
    }
  }

  if (!customElements.get('bogo-drawer')) {
    customElements.define('bogo-drawer', BogoDrawer);
  }
}