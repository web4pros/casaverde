const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const header = $('[data-header]');
const nav = $('[data-nav]');
const navToggle = $('[data-nav-toggle]');

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 40);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
  document.body.classList.toggle('no-scroll', !open);
});

$$('[data-nav] a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach(element => revealObserver.observe(element));

const imagePath = name => `assets/images/originals/${name}`;
const apartments = {
  1: {
    title: 'Appartement 1', kicker: 'Ca. 50 m² · bis 4 Personen', rate: '95 € / Nacht für 2 Personen',
    description: 'Ein entspanntes Zuhause mit eigenem Schlafzimmer und privater Terrasse. Der Wohnraum bietet eine zusätzliche Schlafcouch; die Küche ist vollständig eingerichtet.',
    features: ['Private Terrasse', 'Doppelbett', 'Schlafsofa', 'Küche', 'Badezimmer', 'TV & Stereoanlage'],
    images: ['casaverde-apt3-01.jpg','casaverde-apt3-02.jpg','casaverde-apt3-03.jpg','casaverde-apt3-04.jpg','casaverde-apt3-05.jpg','casaverde-apt3-06.jpg','casaverde-apt3-07.jpg','casaverde-apt3-08.jpg','casaverde-apt3-09.jpg']
  },
  2: {
    title: 'Appartement 2', kicker: 'Ca. 60 m² · bis 4 Personen', rate: '105 € / Nacht für 2 Personen',
    description: 'Viel Raum für Freunde oder Familie: zwei getrennte Schlafzimmer mit Doppelbetten, ein großzügiger Wohnbereich, eine private Terrasse und ein kleines eigenes Stück Garten.',
    features: ['Terrasse & Garten', '2 Schlafzimmer', '2 Doppelbetten', 'Küche', 'Badezimmer', 'TV & Stereoanlage'],
    images: ['casaverde-apt2-01.jpg','casaverde-apt2-02.jpg','casaverde-apt2-03.jpg','casaverde-apt2-04.jpg','casaverde-apt2-05.jpg','casaverde-apt2-06.jpg','casaverde-apt2-07.jpg','casaverde-apt2-08.jpg','casaverde-apt2-09.jpg']
  },
  3: {
    title: 'Appartement 3', kicker: 'Ca. 40 m² · bis 4 Personen', rate: '95 € / Nacht für 2 Personen',
    description: 'Kompakt, hell und behaglich. Eine abgetrennte Schlafecke mit Doppelbett, ein Wohnbereich mit Schlafsofa und die eigene Terrasse machen es leicht, sofort anzukommen.',
    features: ['Private Terrasse', 'Schlafecke', 'Doppelbett', 'Schlafsofa', 'Küche', 'Badezimmer'],
    images: ['casaverde-apt03-01.jpg','casaverde-apt03-02.jpg','casaverde-apt03-03.jpg','casaverde-apt03-04.jpg','casaverde-apt03-05.jpg','casaverde-apt03-06.jpg','casaverde-apt03-07.jpg','casaverde-apt03-08.jpg']
  },
  4: {
    title: 'Appartement 4', kicker: 'Ca. 70 m² · bis 4 Personen', rate: '115 € / Nacht für 2 Personen',
    description: 'Das großzügigste Appartement der Casa Verde. Neben dem separaten Schlafzimmer bietet eine offene Empore im Wohnraum zwei weitere Schlafplätze und viel Inselatmosphäre.',
    features: ['Private Terrasse', 'Schlafzimmer', 'Offene Empore', 'Küche', 'Badezimmer', 'TV & Stereoanlage'],
    images: ['casaverde-apt4-01.jpg','casaverde-apt4-02.jpg','casaverde-apt4-03.jpg','casaverde-apt4-04.jpg','casaverde-apt4-05.jpg','casaverde-apt4-06.jpg','casaverde-apt4-07.jpg','casaverde-apt4-08.jpg']
  },
  5: {
    title: 'Appartement 5', kicker: 'Ca. 50 m² · 2 Personen', rate: '95 € / Nacht für 2 Personen',
    description: 'Ein persönlicher Rückzugsort für zwei: separates Schlafzimmer, Wohnraum, vollständig eingerichtete Küche, Badezimmer und eine eigene Terrasse für ruhige Stunden.',
    features: ['Private Terrasse', 'Schlafzimmer', 'Doppelbett', 'Küche', 'Badezimmer', 'Sat-TV & Stereoanlage'],
    images: ['casaverde-apt5-01.jpeg','casaverde-apt5-02.jpeg','casaverde-apt5-03.jpeg','casaverde-apt5-04.jpeg','casaverde-apt5-05.jpeg','casaverde-apt5-06.jpeg']
  }
};

const apartmentDialog = $('[data-apartment-dialog]');
let activeApartment = null;
let activeImage = 0;

function renderApartmentImage() {
  const apartment = apartments[activeApartment];
  $('[data-dialog-image]').src = imagePath(apartment.images[activeImage]);
  $('[data-dialog-image]').alt = `${apartment.title} – Bild ${activeImage + 1}`;
  $('[data-gallery-count]').textContent = `${String(activeImage + 1).padStart(2,'0')} / ${String(apartment.images.length).padStart(2,'0')}`;
}

function openApartment(number) {
  activeApartment = number;
  activeImage = 0;
  const apartment = apartments[number];
  $('[data-dialog-kicker]').textContent = apartment.kicker;
  $('[data-dialog-title]').textContent = apartment.title;
  $('[data-dialog-description]').textContent = apartment.description;
  $('[data-dialog-features]').innerHTML = apartment.features.map(feature => `<li>${feature}</li>`).join('');
  $('[data-dialog-rate]').textContent = apartment.rate;
  renderApartmentImage();
  apartmentDialog.showModal();
  document.body.classList.add('no-scroll');
}

$$('[data-apartment]').forEach(button => button.addEventListener('click', () => openApartment(button.dataset.apartment)));
$('[data-gallery-prev]')?.addEventListener('click', () => {
  const images = apartments[activeApartment].images;
  activeImage = (activeImage - 1 + images.length) % images.length;
  renderApartmentImage();
});
$('[data-gallery-next]')?.addEventListener('click', () => {
  activeImage = (activeImage + 1) % apartments[activeApartment].images.length;
  renderApartmentImage();
});

const closeApartment = () => {
  apartmentDialog.close();
  document.body.classList.remove('no-scroll');
};
$('[data-dialog-close]')?.addEventListener('click', closeApartment);
$('[data-dialog-book]')?.addEventListener('click', () => {
  const select = $('[name="apartment"]');
  select.value = apartments[activeApartment].title;
  closeApartment();
});
apartmentDialog?.addEventListener('click', event => {
  if (event.target === apartmentDialog) closeApartment();
});

const lightbox = $('[data-lightbox-dialog]');
$$('[data-lightbox]').forEach(button => button.addEventListener('click', () => {
  $('[data-lightbox-image]').src = button.dataset.lightbox;
  lightbox.showModal();
  document.body.classList.add('no-scroll');
}));
const closeLightbox = () => {
  lightbox.close();
  document.body.classList.remove('no-scroll');
};
$('[data-lightbox-close]')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' && apartmentDialog?.open) $('[data-gallery-prev]').click();
  if (event.key === 'ArrowRight' && apartmentDialog?.open) $('[data-gallery-next]').click();
});

const bookingForm = $('[data-booking-form]');
bookingForm?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const subject = `Buchungsanfrage Casa Verde – ${data.get('arrival')} bis ${data.get('departure')}`;
  const body = [
    'Hallo Casa Verde,', '', 'ich interessiere mich für einen Aufenthalt:', '',
    `Anreise: ${data.get('arrival')}`, `Abreise: ${data.get('departure')}`,
    `Gäste: ${data.get('guests')}`, `Wunsch: ${data.get('apartment')}`, '',
    `Name: ${data.get('name')}`, `E-Mail: ${data.get('email')}`, '',
    `Nachricht: ${data.get('message') || '–'}`, '', 'Viele Grüße'
  ].join('\n');
  window.location.href = `mailto:casaverde.lanzarote@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

$('[data-year]').textContent = new Date().getFullYear();
