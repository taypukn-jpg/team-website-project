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
    const placeNames = {
        kk: {
            "Алтай таулары": "Алтай таулары", "Бурабай": "Бурабай", "Шарын шатқалы": "Шарын шатқалы",
            "Көлсай көлдері": "Көлсай көлдері", "Алматы": "Алматы", "Көлтаз": "Көлтаз",
            "Астана": "Астана", "Қаратау": "Қаратау", "Байқоңыр": "Байқоңыр"
        },
        ru: {
            "Алтай таулары": "Алтайские горы", "Бурабай": "Бурабай", "Шарын шатқалы": "Шарынский каньон",
            "Көлсай көлдері": "Кольсайские озёра", "Алматы": "Алматы", "Көлтаз": "Кольтаз",
            "Астана": "Астана", "Қаратау": "Горы Каратау", "Байқоңыр": "Байконур"
        },
        en: {
            "Алтай таулары": "Altai Mountains", "Бурабай": "Burabay", "Шарын шатқалы": "Charyn Canyon",
            "Көлсай көлдері": "Kolsai Lakes", "Алматы": "Almaty", "Көлтаз": "Koltaz",
            "Астана": "Astana", "Қаратау": "Karatau Mountains", "Байқоңыр": "Baikonur"
        }
    };

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
            "Көлсай көлдері": "Озёра Кольсай — три горных озера.",
            "Алматы": "Алматы — культурный центр Казахстана.",
            "Көлтаз": "Кольтаз — спокойная природная зона.",
            "Астана": "Астана — современная архитектура и парки.",
            "Қаратау": "Горы Каратау — красивые и исторические.",
            "Байқоңыр": "Байконур — первый космодром мира."
        },
        en: {
            "Алтай таулары": "Altai Mountains — a stunning natural landscape.",
            "Бурабай": "Burabay — Kazakhstan’s ‘Little Switzerland’.",
            "Шарын шатқалы": "Charyn Canyon — a natural and historical monument.",
            "Көлсай көлдері": "Kolsai Lakes — three mountain lakes.",
            "Алматы": "Almaty — cultural and tourist center.",
            "Көлтаз": "Koltaz — peaceful natural area.",
            "Астана": "Astana — modern architecture and parks.",
            "Қаратау": "Karatau Mountains — beautiful natural landscapes.",
            "Байқоңыр": "Baikonur — first spaceport in the world."
        }
    };

    const placeDescriptions = {
        kk: { /* длинные описания, как у тебя в коде */ },
        ru: { /* длинные описания */ },
        en: { /* длинные описания */ }
    };

    const sliderText = {
        kk: ["Алтай таулары – керемет табиғат көрінісі.", "Бурабай – Қазақстанның «Кіші Швейцариясы».", "Шарын шатқалы – тарихи және табиғи ескерткіш."],
        ru: ["Алтайские горы — великолепные природные пейзажи.", "Бурабай — «Маленькая Швейцария» Казахстана.", "Шарынский каньон — природный и исторический памятник."],
        en: ["Altai Mountains — a stunning natural landscape.", "Burabay — Kazakhstan’s ‘Little Switzerland’.", "Charyn Canyon — a natural and historical monument."]
    };

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

    // ==================== ГАЛЕРЕЯ ====================
    let galleryModal = document.getElementById('gallery-modal');
    if (!galleryModal) {
        galleryModal = document.createElement('div');
        galleryModal.id = 'gallery-modal';
        galleryModal.className = 'modal';
        galleryModal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn" id="gallery-close">&times;</span>
                <h3 id="gallery-title-modal"></h3>
                <img id="gallery-img" src="" alt="" style="width:100%;height:auto;border-radius:12px;margin:12px 0;">
                <p id="gallery-desc" style="font-weight:500"></p>
                <p id="gallery-type" style="font-style:italic;margin-top:6px"></p>
                <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:12px">
                    <button id="add-fav-btn" style="padding:10px 14px;border-radius:10px;border:none;cursor:pointer">Добавить в избранное</button>
                    <button id="close-info-btn" style="padding:10px 14px;border-radius:10px;border:none;cursor:pointer">Закрыть</button>
                </div>
            </div>
        `;
        document.body.appendChild(galleryModal);
    }

    const galleryClose = document.getElementById('gallery-close');
    const galleryTitleModal = document.getElementById('gallery-title-modal');
    const galleryImg = document.getElementById('gallery-img');
    const galleryDesc = document.getElementById('gallery-desc');
    const galleryType = document.getElementById('gallery-type');
    const addFavBtn = document.getElementById('add-fav-btn');
    const closeInfoBtn = document.getElementById('close-info-btn');

    function openGalleryModal(placeEl) {
        const name = placeEl.dataset.name;
        const imgSrc = placeEl.querySelector('img').src;
        const type = placeEl.dataset.type;

        galleryTitleModal.textContent = placeNames[currentLang][name] || name;
        galleryImg.src = imgSrc;
        galleryDesc.textContent = placeDescriptions[currentLang][name] || galleryText[currentLang][name] || '';
        galleryType.textContent = (currentLang === 'kk') ? `Түрі: ${type}` : (currentLang === 'ru') ? `Тип: ${type}` : `Type: ${type}`;

        galleryModal.style.display = 'block';

        if (favorites.includes(name)) {
            addFavBtn.textContent = (currentLang === 'kk') ? 'Сүйіктіге қосылған' : (currentLang === 'ru') ? 'В избранном' : 'In favorites';
            addFavBtn.disabled = true;
            addFavBtn.style.opacity = '0.6';
        } else {
            addFavBtn.textContent = (currentLang === 'kk') ? 'Сүйіктіге қосу' : (currentLang === 'ru') ? 'Добавить в избранное' : 'Add to favorites';
            addFavBtn.disabled = false;
            addFavBtn.style.opacity = '1';
        }

        addFavBtn.onclick = () => {
            if (!favorites.includes(name)) {
                favorites.push(name);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                updateFavorites();
                addFavBtn.textContent = (currentLang === 'kk') ? 'Сүйіктіге қосылған' : (currentLang === 'ru') ? 'В избранном' : 'In favorites';
                addFavBtn.disabled = true;
                addFavBtn.style.opacity = '0.6';
            }
        };
    }

    places.forEach(place => {
        place.addEventListener('click', () => openGalleryModal(place));
    });

    if (galleryClose) galleryClose.addEventListener('click', () => galleryModal.style.display = 'none');
    if (closeInfoBtn) closeInfoBtn.addEventListener('click', () => galleryModal.style.display = 'none');
    window.addEventListener('click', e => { if (e.target === galleryModal) galleryModal.style.display = 'none'; });

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
                place.style.display = (type === 'all' || type === place.dataset.type) ? 'block' : 'none';
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
    markers.forEach(m => L.marker(m.coords).addTo(map).bindPopup(placeNames[currentLang][m.name]));

    // ==================== МУЛЬТИЯЗЫК ====================
    function updateGallery(lang) {
        places.forEach(place => {
            const name = place.dataset.name;
            place.querySelector('p').textContent = galleryText[lang][name] || '';
            place.querySelector('img').alt = placeNames[lang][name] || name;
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

        if (galleryModal && galleryModal.style.display === 'block') {
            const title = galleryTitleModal.textContent;
            galleryDesc.textContent = placeDescriptions[lang][title] || galleryText[lang][title] || '';
            addFavBtn.textContent = favorites.includes(title) 
                ? ((lang === 'kk') ? 'Сүйіктіге қосылған' : (lang === 'ru') ? 'В избранном' : 'In favorites')
                : ((lang === 'kk') ? 'Сүйіктіге қосу' : (lang === 'ru') ? 'Добавить в избранное' : 'Add to favorites');
        }

        langButtons.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

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

    // ==================== ТЕМЫ ====================
    const themes = {
        dark: { '--bg-color':'#121212','--text-color':'#eee','--header-bg':'#1f1f1f','--header-text':'#fff','--btn-bg':'#333','--btn-active':'#bb86fc','--slider-bg':'#1e1e1e','--slider-text':'#bb86fc','--favorites-bg':'#1e1e1e','--favorites-text':'#bb86fc' },
        light: { '--bg-color':'#e3f6ff','--text-color':'#222','--header-bg':'
