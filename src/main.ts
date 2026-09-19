import { companyContact } from './company';

const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation = document.querySelector<HTMLElement>('#main-nav');
const mobileQuery = window.matchMedia('(max-width: 760px)');

function closeMenu(restoreFocus = false): void {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', '메뉴 열기');
  navigation?.classList.remove('is-open');
  if (restoreFocus) menuButton?.focus();
}

// Keep navigation visible without JavaScript; collapse it only after wiring the button.
document.documentElement.classList.add('js');
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  menuButton.setAttribute('aria-label', expanded ? '메뉴 닫기' : '메뉴 열기');
  navigation?.classList.toggle('is-open', expanded);
});

navigation?.addEventListener('click', (event: MouseEvent) => {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest<HTMLAnchorElement>('a');
  if (!link || !mobileQuery.matches) return;
  closeMenu();
  const target = document.getElementById(link.hash.slice(1));
  target?.setAttribute('tabindex', '-1');
  target?.focus({ preventScroll: true });
});

document.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') closeMenu(true);
});

document.addEventListener('click', (event: MouseEvent) => {
  if (event.target instanceof Element && !event.target.closest('.site-header')) closeMenu();
});
document.querySelector('.site-header')?.addEventListener('focusout', (event) => {
  if (event instanceof FocusEvent && event.relatedTarget instanceof Node && !document.querySelector('.site-header')?.contains(event.relatedTarget)) closeMenu();
});
mobileQuery.addEventListener('change', () => closeMenu());

const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('#main-nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of navLinks) {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }, { rootMargin: '-15% 0px -60% 0px' });
  document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
}

const year = document.querySelector('#copyright-year');
if (year) year.textContent = String(new Date().getFullYear());
const address = document.querySelector('[data-company-address]');
if (address && companyContact.address.trim()) address.textContent = companyContact.address.trim();

const contact = document.querySelector<HTMLElement>('#verified-contact');
if (contact) {
  const items: { label: string; value: string; href: string }[] = [];
  const email = companyContact.email.trim();
  const telephone = companyContact.telephone.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) items.push({ label: 'EMAIL', value: email, href: `mailto:${encodeURIComponent(email).replace('%40', '@')}` });
  if (telephone && /^\+?[\d\s()-]+$/.test(telephone)) items.push({ label: 'TELEPHONE', value: telephone, href: `tel:${telephone.replace(/[^\d+]/g, '')}` });
  for (const item of items) {
    const block = document.createElement('div');
    const label = document.createElement('span');
    const link = document.createElement('a');
    label.textContent = item.label;
    link.textContent = item.value;
    link.href = item.href;
    block.append(label, link);
    contact.append(block);
  }
  contact.hidden = items.length === 0;
}
