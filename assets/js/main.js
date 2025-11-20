document.addEventListener('DOMContentLoaded', () => {
    // ==================== ПЕРЕМЕННЫЕ ====================
    let currentLang = 'kk';
    const langButtons = document.querySelectorAll('.lang-btn');
    const authorsBtn = document.getElementById('authors-btn');
    const authorsModal = document.getElementById('authors-modal');
    const closeBtn = document.querySelector('.close-btn');

    const places = document.querySelectorAll('.place');
    const favList = document.getElementById('fav-list');

    // ==================== ТЕКСТЫ ====================
    const galleryText = {
        kk: {
            "Алтай таулары": "Алтай таулары – керемет табиғат көрінісі.",
            "Бурабай": "Бурабай – Қазақстанның «Кіші Швейцариясы».",
            "Шарын шатқалы": "Шарын шатқалы – тарихи және табиғи ескерткіш.",
            "Көлсай көлдері": "Көлсай көлдері – таулы көлдер тізбегі.",
            "Алматы": "Алматы – мәдени және туристік орталық.",
            "Көлтаз": "Көлтаз – тыныш табиғат аймағы.",
            "Астана": "Астана – заманауи сәулет және саябақтар.",
            "Қаратау": "Қаратау – Қазақстанның әсем таулы аймағы.",
            "Байқоңыр": "Байқоңыр – ғарыш айлағы мен тарих."
        },
        ru: {
            "Алтай таулары": "Алтайские горы — великолепные природные пейзажи.",
            "Бурабай": "Бурабай — «Маленькая Швейцария» Казахстана.",
            "Шарын шатқалы": "Шарынский каньон — природный и исторический памятник.",
            "Көлсай көлдері": "Озёра Кольсай — горная цепь озёр.",
            "Алматы": "Алматы — культурный и туристический центр.",
            "Көлтаз": "Көлтаз — спокойная природная зона.",
            "Астана": "Астана — современная архитектура и парки.",
            "Қаратау": "Каратау — красивый горный район Казахстана.",
            "Байқоңыр": "Байконур — космодром и исторический объект."
        },
        en: {
            "Алтай таулары": "Altai Mountains — a stunning natural landscape.",
            "Бурабай": "Burabay — Kazakhstan’s ‘Little Switzerland’.",
            "Шарын шатқалы": "Charyn Canyon — a natural and historical monument.",
            "Көлсай көлдері": "Kolsai Lakes — a chain of mountain lakes.",
            "Алматы": "Almaty — a cultural and tourist center.",
            "Көлтаз": "Koltaz — a peaceful natural area.",
            "Астана": "Astana — modern architecture and parks.",
            "Қаратау": "Karatau — a beautiful mountain region of Kazakhstan.",
            "Байқоңыр": "Baikonur — spaceport and history."
        }
    };

    const sliderText = {
        kk: ["Алтай таулары – керемет табиғат көрінісі.", "Бурабай – Қазақстанның «Кіші Швейцариясы».", "Шарын шатқалы – тарихи және табиғи ескерткіш."],
        ru: ["Алтайские горы — великолепные природные пейзажи.", "Бурабай — «Маленькая Швейцария» Казахстана.", "Шарынский каньон — природный и исторический памятник."],
        en: ["Altai Mountains — a stunning natural landscape.", "Burabay — Kazakhstan’s ‘Little Switzerland’.", "Charyn Canyon — a natural and historical monument."]
    };

    const slides = [
        { src: "https://avatars.mds.yandex.net/i?id=447256547577cf1aa1dbe8bfffeb4d43c784662f-4306866-images-thumbs&n=13" },
        { src: "https://avatars.mds.yandex.net/i?id=88e86dbf49faac72671b826cd8e428f9b42c6c9a-16509561-images-thumbs&n=13" },
        { src: "https://cdn.nur.kz/images/1200x675/fd1d9d9b2ac051cd.jpeg?version=1" }
    ];

    const headings = {
        kk: { site: "Қазақстандағы Танымал Туристік Орындар", gallery: "Галерея", filter: "Фильтр", slider: "Танымал орындар", fav: "Сүйікті орындар", map: "Қазақстан картасы" },
        ru: { site: "Популярные туристические места Казахстана", gallery: "Галерея", filter: "Фильтр", slider: "Популярные места", fav: "Избранные места", map: "Карта Казахстана" },
        en: { site: "Popular Tourist Places in Kazakhstan", gallery: "Gallery", filter: "Filter", slider: "Popular Places", fav: "Favorite Places", map: "Map of Kazakhstan" }
    };

    const authorsText = {
        kk: { copyright: "© 2025 Барлық құқықтар қорғалған", authorsTitle: "Авторлар", authors: ["Таупық Нұрислам: репозиторий мен логика үшін жауапты", "Торыбай Нұрислам: дизайн және сайт"], button: "Авторлар" },
        ru: { copyright: "© 2025 Все права защищены", authorsTitle: "Авторы", authors: ["Таупык Нурислам: отвечал за репозиторий и логику", "Торыбай Нурислам: отвечал за дизайн и сайт"], button: "Авторы" },
        en: { copyright: "© 2025 All rights reserved", authorsTitle: "Authors", authors: ["Taupyk Nurislam: responsible for repository and logic", "Torybay Nurislam: responsible for design and site"], button: "Authors" }
    };

    // ==================== СЛАЙДЕР ====================
    let slideIndex = 0;
    const slideImage = document.getElementById('slide-image');
    const slideCaption = document.getElementById('slide-caption');

    function showSlide(index) {
        slideIndex = ((index % slides.length) + slides.length) % slides.length;
        slideImage.src = slides[slideIndex].src;
        slideCaption.textContent = sliderText[currentLang][slideIndex];
    }

    document.getElementById('prev').addEventListener('click', () => showSlide(slideIndex - 1));
    document.getElementById('next').addEventListener('click', () => showSlide(slideIndex + 1));

    showSlide(0);

    // ==================== ИЗБРАННОЕ ====================
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    function updateFavorites() {
        favList.innerHTML = '';
        favorites.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            li.dataset.name = name;
            const btn = document.createElement('button');
            btn.textContent = '×';
            btn.className = 'fav-remove';
            li.appendChild(btn);
            favList.appendChild(li);
        });
    }

    updateFavorites();

    places.forEach(place => {
        place.addEventListener('click', () => {
            const name = place.dataset.name;
            if (!favorites.includes(name)) {
                favorites.push(name);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                updateFavorites();
            }
        });
    });

    favList.addEventListener('click', (e) => {
        if (e.target.classList.contains('fav-remove')) {
            const li = e.target.closest('li');
            const name = li.dataset.name;
            favorites = favorites.filter(n => n !== name);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavorites();
        }
    });

    // ==================== ФИЛЬТР ====================
    const filterButtons = document.querySelectorAll('#filter button');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            places.forEach(place => {
                const placeType = place.dataset.type;
                place.style.display = (type === 'all' || type === placeType) ? 'block' : 'none';
            });
        });
    });

    // ==================== КАРТА ====================
    const map = L.map('mapid').setView([48.0, 66.9], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const markers = [
        { coords: [49.5, 86.0], name: 'Алтай таулары' },
        { coords: [53.0, 71.5], name: 'Бурабай' },
        { coords: [43.2, 79.1], name: 'Шарын шатқалы' },
        { coords: [45.5, 79.2], name: 'Көлсай көлдері' },
        { coords: [43.2, 76.9], name: 'Алматы' },
        { coords: [43.0, 78.5], name: 'Көлтаз' },
        { coords: [51.2, 71.4], name: 'Астана' },
        { coords: [43.5, 69.8], name: 'Қаратау' },
        { coords: [45.6, 63.3], name: 'Байқоңыр' }
    ];

    markers.forEach(m => L.marker(m.coords).addTo(map).bindPopup(m.name));

    // ==================== ФУНКЦИИ ЯЗЫКА ====================
    function updateGallery(lang) {
        places.forEach(place => {
            const name = place.dataset.name;
            const p = place.querySelector('p');
            p.textContent = galleryText[lang][name];
        });
    }

    function setLanguage(lang) {
        currentLang = lang;

        const t = headings[lang];
        document.getElementById('site-title').textContent = t.site;
        document.getElementById('gallery-title').textContent = t.gallery;
        document.getElementById('filter-title').textContent = t.filter;
        document.getElementById('slider-title').textContent = t.slider;
        document.getElementById('fav-title').textContent = t.fav;
        document.getElementById('map-title').textContent = t.map;

        updateGallery(lang);
        updateAuthors(lang);
        showSlide(slideIndex);

        langButtons.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    // ==================== АВТОРЫ ====================
    function updateAuthors(lang) {
        const t = authorsText[lang];
        document.getElementById('copyright-text').textContent = t.copyright;
        document.getElementById('authors-title').textContent = t.authorsTitle;
        document.getElementById('authors-list').innerHTML = t.authors.map(a => `<li>${a}</li>`).join('');
        if (authorsBtn) authorsBtn.textContent = t.button;
    }

    if (authorsBtn && authorsModal && closeBtn) {
        authorsBtn.addEventListener('click', () => authorsModal.style.display = 'block');
        closeBtn.addEventListener('click', () => authorsModal.style.display = 'none');
        window.addEventListener('click', e => { if (e.target === authorsModal) authorsModal.style.display = 'none'; });
    }

    // ==================== ИНИЦИАЛИЗАЦИЯ ====================
    setLanguage(currentLang);
});
const themes = {
    dark: {
        '--bg-color': '#121212',
        '--text-color': '#eee',
        '--header-bg': '#1f1f1f',
        '--header-text': '#fff',
        '--btn-bg': '#333',
        '--btn-active': '#bb86fc'
    },
    light: {
        '--bg-color': '#e3f6ff',
        '--text-color': '#222',
        '--header-bg': 'linear-gradient(90deg, #009688, #26a69a)',
        '--header-text': '#fff',
        '--btn-bg': 'rgba(20,20,35,0.7)',
        '--btn-active': '#9d4cff'
    },
    ocean: {
        '--bg-color': '#d0f0fd',
        '--text-color': '#03396c',
        '--header-bg': '#0077b6',
        '--header-text': '#fff',
        '--btn-bg': '#00b4d8',
        '--btn-active': '#023e8a'
    },
    sunset: {
        '--bg-color': '#fff0e6',
        '--text-color': '#5c1a00',
        '--header-bg': '#ff7f50',
        '--header-text': '#fff',
        '--btn-bg': '#ffb347',
        '--btn-active': '#ff4500'
    }
};

function setTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    for (let key in theme) {
        document.documentElement.style.setProperty(key, theme[key]);
    }
}

const themeButtons = document.querySelectorAll('.theme-btn');

themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const themeName = btn.dataset.theme;
        setTheme(themeName);
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Тема по умолчанию
document.querySelector('.theme-btn[data-theme="dark"]').classList.add('active');
setTheme('dark');



