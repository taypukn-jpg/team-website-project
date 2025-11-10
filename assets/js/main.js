// assets/js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // --- Helper ---
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // --- Elements ---
  const places = $$('.place'); // коллекция карточек
  const favListEl = $('#fav-list');
  const filterButtons = $$('#filter button');
  const slideImage = $('#slide-image');
  const slideCaption = $('#slide-caption');
  const prevBtn = $('#prev');
  const nextBtn = $('#next');
  const mapEl = $('#mapid');

  // --- Favorites (localStorage) ---
  const STORAGE_KEY = 'kz_tour_favorites';
  let favorites = [];
  try {
    favorites = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    favorites = [];
    console.warn('Не удалось прочитать favorites из localStorage:', e);
  }

  function saveFavorites() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Не удалось записать favorites в localStorage:', e);
    }
  }

  function updateFavoritesUI() {
    if (!favListEl) return;
    favListEl.innerHTML = '';
    favorites.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      // добавить кнопкy удалить
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

  // --- Click on place: add/remove favorite (toggle) ---
  places.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const name = card.dataset.name;
      if (!name) return;
      if (favorites.includes(name)) {
        // если уже есть — убрать
        favorites = favorites.filter(x => x !== name);
      } else {
        favorites.push(name);
      }
      saveFavorites();
      updateFavoritesUI();
    });
  });

  // --- Filter ---
  if (filterButtons && filterButtons.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        places.forEach(place => {
          const placeType = place.dataset.type || 'unknown';
          // display методом учитываем flex-верстку: '' чтобы вернуть исходный
          if (type === 'all' || type === placeType) {
            place.style.display = '';
          } else {
            place.style.display = 'none';
          }
        });

        // optional: активный стиль для кнопок
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // --- Slider (robust) ---
  const slides = [
    { src: "https://avatars.mds.yandex.net/i?id=447256547577cf1aa1dbe8bfffeb4d43c784662f-4306866-images-thumbs&n=13", caption: "Алтай таулары – керемет табиғат көрінісі." },
    { src: "https://avatars.mds.yandex.net/i?id=88e86dbf49faac72671b826cd8e428f9b42c6c9a-16509561-images-thumbs&n=13", caption: "Бурабай – Қазақстанның «Кіші Швейцариясы»." },
    { src: "https://cdn.nur.kz/images/1200x675/fd1d9d9b2ac051cd.jpeg?version=1", caption: "Шарын шатқалы – тарихи және табиғи ескерткіш." },
    { src: "https://avatars.mds.yandex.net/i?id=56bdf728f91307aaddd493460129a8c335e0b012-9833563-images-thumbs&n=13", caption: "Көлсай көлдері – таулы көлдер тізбегі." },
    { src: "https://avatars.mds.yandex.net/i?id=981121db6416f1fbc57f42b88ea87904d8fdaa4b-5889279-images-thumbs&n=13", caption: "Алматы – мәдени және туристік орталық." },
    { src: "https://avatars.mds.yandex.net/i?id=19e454fef5cb70a3b23b560bd2f5b890_l-5669136-images-thumbs&n=13", caption: "Көлтаз – тыныш табиғат аймағы." },
    { src: "https://avatars.mds.yandex.net/i?id=262f5d1d6c3eed23de75992c4056fa24c308cf57-4337876-images-thumbs&n=13", caption: "Астана – заманауи сәулет және саябақтар." },
    { src: "https://avatars.mds.yandex.net/i?id=10adb2c211ba6d52df9b2263729827a2_l-5280263-images-thumbs&n=13", caption: "Қаратау – әсем таулы аймақ." },
    { src: "https://avatars.mds.yandex.net/i?id=1f32cab8047532d289281c7c4a7cd0b8_l-5221497-images-thumbs&n=13", caption: "Байқоңыр – ғарыш айлағы мен тарих." }
  ];

  // safety checks
  let slideIndex = 0;
  function isEl(e) { return e !== null && e !== undefined; }

  function showSlide(i) {
    if (!isEl(slideImage) || !isEl(slideCaption)) return;
    if (!slides.length) return;
    slideIndex = ((i % slides.length) + slides.length) % slides.length; // безопасно
    const s = slides[slideIndex];
    // предзагрузка
    const img = new Image();
    img.onload = () => {
      slideImage.src = s.src;
      slideCaption.textContent = s.caption || '';
    };
    img.onerror = () => {
      console.warn('Не удалось загрузить изображение слайда:', s.src);
      // не ломаем UI — показываем пусто или placeholder
      slideImage.src = s.src; // всё равно пытаемся показать
      slideCaption.textContent = s.caption || '';
    };
    img.src = s.src;
  }

  if (isEl(prevBtn)) {
    prevBtn.addEventListener('click', () => showSlide(slideIndex - 1));
  }
  if (isEl(nextBtn)) {
    nextBtn.addEventListener('click', () => showSlide(slideIndex + 1));
  }

  // optional: arrow keys support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') showSlide(slideIndex - 1);
    if (e.key === 'ArrowRight') showSlide(slideIndex + 1);
  });

  // стартовый слайд
  showSlide(slideIndex);

  // optional: автоплей (закомментируй если не нужно)
  // let autoplay = setInterval(() => showSlide(slideIndex + 1), 5000);
  // // остановка автоплея при наведении
  // const sliderWrap = document.querySelector('.slide-container');
  // if (sliderWrap) {
  //   sliderWrap.addEventListener('mouseenter', () => clearInterval(autoplay));
  //   sliderWrap.addEventListener('mouseleave', () => autoplay = setInterval(() => showSlide(slideIndex + 1), 5000));
  // }

  // --- Карта (Leaflet) ---
  if (typeof L !== 'undefined' && mapEl) {
    try {
      const map = L.map('mapid').setView([48.0, 66.9], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // маркеры (проверь координаты при необходимости)
      const markers = [
        { coords:[49.5, 86.0], name:'Алтай таулары' },
        { coords:[53.0, 71.5], name:'Бурабай' },
        { coords:[43.2, 79.1], name:'Шарын шатқалы' },
        { coords:[45.5, 79.2], name:'Көлсай көлдері' },
        { coords:[43.2, 76.9], name:'Алматы қаласы' },
        { coords:[43.0, 78.5], name:'Көлтаз' },
        { coords:[51.2, 71.4], name:'Астана қаласы' },
        { coords:[43.5, 69.8], name:'Қаратау таулары' },
        { coords:[45.6, 63.3], name:'Байқоңыр' }
      ];
      markers.forEach(m => {
        L.marker(m.coords).addTo(map).bindPopup(m.name);
      });
    } catch (e) {
      console.warn('Ошибка инициализации карты:', e);
    }
  } else {
    if (!mapEl) console.warn('Элемент #mapid не найден — карта не инициализируется.');
    if (typeof L === 'undefined') console.warn('Leaflet не загружен (L === undefined). Проверьте подключение скрипта leaflet.js.');
  }

  // --- Debug helper (включи если нужно) ---
  // console.log({ placesCount: places.length, favorites, slidesLength: slides.length });
});

