// assets/js/main.js
document.addEventListener('DOMContentLoaded', () => {
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  const favListEl = $('#fav-list');
  const filterButtons = $$('#filter button');
  const slideImage = $('#slide-image');
  const slideCaption = $('#slide-caption');
  const prevBtn = $('#prev');
  const nextBtn = $('#next');
  const mapEl = $('#mapid');
  const placeContainer = $('#places');
  const langButtons = $$('.lang-btn');

  // ====== FAVORITES ======
  const STORAGE_KEY = 'kz_tour_favorites';
  let favorites = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  function saveFavorites() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }

  function updateFavoritesUI() {
    favListEl.innerHTML = '';
    favorites.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      const btn = document.createElement('button');
      btn.textContent = '✖';
      btn.title = 'Жою';
      btn.style.marginLeft = '8px';
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        favorites = favorites.filter(x => x !== name);
        saveFavorites();
        updateFavoritesUI();
      });
      li.appendChild(btn);
      favListEl.appendChild(li);
    });
  }
  updateFavoritesUI();

  // ====== FILTER ======
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      $$('.place').forEach(place => {
        place.style.display = (type === 'all' || place.dataset.type === type) ? '' : 'none';
      });
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ====== SLIDER ======
  const slides = [
    { src: "https://avatars.mds.yandex.net/i?id=447256547577cf1aa1dbe8bfffeb4d43c784662f-4306866-images-thumbs&n=13", caption: "Алтай таулары – керемет табиғат көрінісі." },
    { src: "https://avatars.mds.yandex.net/i?id=88e86dbf49faac72671b826cd8e428f9b42c6c9a-16509561-images-thumbs&n=13", caption: "Бурабай – Қазақстанның «Кіші Швейцариясы»." },
    { src: "https://cdn.nur.kz/images/1200x675/fd1d9d9b2ac051cd.jpeg?version=1", caption: "Шарын шатқалы – тарихи және табиғи ескерткіш." }
  ];
  let slideIndex = 0;

  function showSlide(i) {
    slideIndex = ((i % slides.length) + slides.length) % slides.length;
    slideImage.src = slides[slideIndex].src;
    slideCaption.textContent = slides[slideIndex].caption;
  }

  prevBtn.addEventListener('click', () => showSlide(slideIndex - 1));
  nextBtn.addEventListener('click', () => showSlide(slideIndex + 1));
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') showSlide(slideIndex - 1);
    if (e.key === 'ArrowRight') showSlide(slideIndex + 1);
  });
  showSlide(slideIndex);

  // ====== MAP ======
  if (typeof L !== 'undefined' && mapEl) {
    const map = L.map('mapid').setView([48.0, 66.9], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const markers = [
      { coords:[49.5, 86.0], name:'Алтай таулары' },
      { coords:[53.0, 71.5], name:'Бурабай' },
      { coords:[43.2, 79.1], name:'Шарын шатқалы' }
    ];
    markers.forEach(m => L.marker(m.coords).addTo(map).bindPopup(m.name));
  }

  // ====== TRANSLATIONS ======
  const translations = {
    kk: {
      siteTitle: "Қазақстандағы танымал туристік орындар",
      filter: "Фильтр",
      favorites: "Сүйікті орындар",
      slider: "Танымал орындар",
      places: [
        { name: "Алтай таулары", desc: "Алтай таулары – керемет табиғат көрінісі.", type:"тау" },
        { name: "Бурабай", desc: "Бурабай – Қазақстанның «Кіші Швейцариясы».", type:"тау" }
      ]
    },
    ru: {
      siteTitle: "Популярные туристические места Казахстана",
      filter: "Фильтр",
      favorites: "Избранные места",
      slider: "Популярные места",
      places: [
        { name: "Горы Алтая", desc: "Алтайские горы — великолепная природная зона.", type:"тау" },
        { name: "Бурабай", desc: "Бурабай — «Маленькая Швейцария» Казахстана.", type:"тау" }
      ]
    },
    en: {
      siteTitle: "Popular Tourist Places in Kazakhstan",
      filter: "Filter",
      favorites: "Favorite Places",
      slider: "Famous Places",
      places: [
        { name: "Altai Mountains", desc: "Altai Mountains — a magnificent natural landscape.", type:"mountain" },
        { name: "Burabay", desc: "Burabay — the 'Little Switzerland' of Kazakhstan.", type:"mountain" }
      ]
    }
  };

  const siteTitleEl = $('#site-title');
  const filterTitleEl = $('#filter h2');
  const favoritesTitleEl = $('#favorites h2');
  const sliderTitleEl = $('#slider h2');

  function changeLanguage(lang) {
    const data = translations[lang];
    if (!data) return;

    siteTitleEl.textContent = data.siteTitle;
    filterTitleEl.textContent = data.filter;
    favoritesTitleEl.textContent = data.favorites;
    sliderTitleEl.textContent = data.slider;

    placeContainer.innerHTML = '';
    data.places.forEach(p => {
      const div = document.createElement('div');
      div.classList.add('place');
      div.dataset.name = p.name;
      div.dataset.type = p.type;
      div.innerHTML = `<img src="assets/images/${p.name.toLowerCase().split(" ")[0]}.jpg" alt="${p.name}"><p>${p.desc}</p>`;
      div.addEventListener('click', () => {
        if(favorites.includes(p.name)){
          favorites = favorites.filter(x => x !== p.name);
        } else {
          favorites.push(p.name);
        }
        saveFavorites();
        updateFavoritesUI();
      });
      placeContainer.appendChild(div);
    });
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      changeLanguage(lang);
      localStorage.setItem('lang', lang);
    });
  });

  const savedLang = localStorage.getItem('lang') || 'kk';
  const savedBtn = document.querySelector(`.lang-btn[data-lang="${savedLang}"]`);
  if(savedBtn) savedBtn.classList.add('active');
  changeLanguage(savedLang);
});

