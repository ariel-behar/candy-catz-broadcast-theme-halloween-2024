if (typeof BogoDrawer === 'undefined') {
    class BogoDrawer extends HTMLElement {
        constructor() {
            super();
        }
    
        init() {
    const bogoRoot = document.querySelector('.real_bogo_holder');
    
    if (!bogoRoot) return;

    this.tooltips = document.querySelectorAll('.bogo-info-wrapper');
    this.drawer = bogoRoot.querySelector('[data-bogo-drawer]');
    this.closeButton = bogoRoot.querySelector('[data-bogo-drawer-close-btn]');
    this.closeOverlay = bogoRoot.querySelector('[data-bogo-drawer-close-overlay]');

    this.bindEvents();
}
    
        bindEvents() {
            this.tooltips.forEach(tooltip => {
                tooltip.addEventListener('click', () => this.openDrawer());
            });
            this.closeButton?.addEventListener('click', () => this.closeDrawer());
            this.closeOverlay?.addEventListener('click', () => this.closeDrawer());
    
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.closeDrawer();
            });
        }
    
        openDrawer() {
            this.drawer?.classList.add('is-active');
            document.body.style.overflow = 'hidden';
        }
    
        closeDrawer() {
            this.drawer.classList.remove('is-active');
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


