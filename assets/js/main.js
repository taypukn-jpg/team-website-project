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
        kk: { /* короткие описания */ },
        ru: { /* короткие описания */ },
        en: { /* короткие описания */ }
    };

    // ===== ДОБАВЛЯЕМ БОЛЬШИЕ ОПИСАНИЯ =====
    const placeDescriptions = {
        kk: {
            "Алтай таулары": "Алтай таулары — Қазақстанның ең әсем табиғи аймақтарының бірі. Бұл өңір қарлы шыңдарымен, қалың ормандарымен, таза көлдерімен және ерекше флора‑фаунасымен танымал. Туристер мұнда жаяу серуендеу, атпен саяхаттау, тау туризмі және этнотурлармен айналыса алады.",
            "Бурабай": "Бурабай — табиғаттың нағыз жауһары. Көлдер, қарағай ормандары, ерекше пішіндегі таулар мен таза ауа оны Қазақстандағы ең танымал демалыс орындарының біріне айналдырады.",
            "Шарын шатқалы": "Шарын шатқалы — миллиондтаған жылдар бойы қалыптасқан табиғи ескерткіш. Ол өзінің қызғылт-қоңыр түсті жартастарымен және ерекше ландшафтымен әйгілі.",
            "Көлсай көлдері": "Көлсай көлдері — биік тауда орналасқан үш әсем көл. Мұнда табиғат ерекше таза, ал көрініс көздің жауын алады.",
            "Алматы": "Алматы — Қазақстанның ең ірі мәдени және туристік қаласы. Мұнда табиғат пен заманауи инфрақұрылым үйлесімді үйлескен.",
            "Көлтаз": "Көлтаз — тыныштық іздейтіндер үшін таптырмас жер. Таза ауа, табиғи көріністер және тыныш атмосфера.",
            "Астана": "Астана — заманауи сәулетімен көз тартатын қала. Биік ғимараттар, саябақтар және мәдени орталықтар көп.",
            "Қаратау": "Қаратау таулары — тарихи орындар мен ерекше табиғат аймағы. Геологиялық пішіндерімен танымал.",
            "Байқоңыр": "Байқоңыр — әлемдегі алғашқы ғарыш айлағы. Мұнда адамзат тарихындағы алғашқы ғарыш сапары басталды.",
            "Медеу": "Медеу - танымал тау шаңғысы аймағы және ашық каток.",
            "Капшагай": "Капшагай – суда демалыс және балық аулау орны.",
            "Актау": "Актау – ақ таулар мен керемет ландшафт.",
            "Жетысу": "Жетысу – таулы аймақтағы әдемі көлдер.",
            "Тянь-Шань": "Тянь-Шань – биік шыңдар мен треккинг жолдары.",
            "Боровое": "Боровое – орман, көлдер және әдемі жартас.",
            "Кокшетау": "Кокшетау – таулар мен көлдер аймағы.",
            "Сайрам-Өгем": "Сайрам-Өгем – Оңтүстік Қазақстан табиғаты."
        },
        ru: {
            "Алтай таулары": "Алтайские горы — одно из красивейших мест Казахстана. Снежные вершины, густые леса и чистейшие озёра привлекают тысячи туристов.",
            "Бурабай": "Бурабай — жемчужина природы. Горные массивы, сосновые леса и бирюзовые озёра создают неповторимую атмосферу.",
            "Шарын шатқалы": "Шарынский каньон — уникальное место с древней историей и фантастическими ландшафтами.",
            "Көлсай көлдері": "Озёра Кольсай — три горных озера с чистой водой и потрясающими видами.",
            "Алматы": "Алматы — культурный центр Казахстана, город у подножия живописных гор.",
            "Көлтаз": "Көлтаз — спокойная природная зона, идеальная для отдыха.",
            "Астана": "Астана славится своей современной архитектурой и зелёными парками.",
            "Қаратау": "Горы Каратау — место с удивительной природой и историей.",
            "Байқоңыр": "Байконур — первый космодром мира, связанный с развитием космической отрасли.",
            "Медеу": "Медеу – популярный горнолыжный курорт и открытый каток.",
            "Капшагай": "Капшагай – место для отдыха у воды и рыбалки.",
            "Актау": "Актау – белые скалы и живописные пейзажи.",
            "Жетысу": "Жетысу – красивые горные озера.",
            "Тянь-Шань": "Тянь-Шань – высокие вершины и треккинг маршруты.",
            "Боровое": "Боровое – лес, озёра и красивые скалы.",
            "Кокшетау": "Кокшетау – горы и озёра Акмолинской области.",
            "Сайрам-Өгем": "Сайрам-Огем – природа юга Казахстана."

        },
        en: {
            "Алтай таулары": "The Altai Mountains are one of Kazakhstan’s most beautiful natural regions, known for snowy peaks, forests, and clear lakes.",
            "Бурабай": "Burabay is a natural gem with pine forests, lakes, and iconic rock formations.",
            "Шарын шатқалы": "Charyn Canyon is a unique natural monument with stunning rock formations.",
            "Көлсай көлдері": "Kolsai Lakes consist of three mountain lakes with crystal-clear water.",
            "Алматы": "Almaty is Kazakhstan’s cultural heart, located near stunning mountains.",
            "Көлтаз": "Koltaz is a peaceful natural area perfect for quiet relaxation.",
            "Астана": "Astana is famous for its modern architecture and beautiful parks.",
            "Қаратау": "Karatau Mountains feature rich history and unique landscapes.",
            "Байқоңыр": "Baikonur is the world’s first spaceport with major historical significance.",
            "Медеу": "Medeu a famous mountain ski area and open-air skating rink.",
            "Капшагай": "Kapshagai – a spot for water recreation and fishing.",
            "Актау": "Aktau – white cliffs and stunning landscapes.",
            "Жетысу": "Zhetysu Lakes – beautiful mountain lakes.",
            "Тянь-Шань": "Tian Shan – high peaks and trekking routes.",
            "Боровое": "Borovoe – forests, lakes, and beautiful cliffs.",
            "Кокшетау": "Kokshetau – mountains and lakes region.",
            "Сайрам-Өгем": "Sairam-Ögem – nature of southern Kazakhstan."

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

    // ==================== ГАЛЕРЕЯ — ОТКРЫТИЕ ВКЛАДКИ ИНФОРМАЦИИ ====================
    // Создаём модал для просмотра информации (если его нет в HTML)
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

        galleryTitleModal.textContent = name;
        galleryImg.src = imgSrc;
        galleryDesc.textContent = placeDescriptions[currentLang][name] || galleryText[currentLang][name][currentLang][name] || '';
        galleryType.textContent = (currentLang === 'kk') ? `Түрі: ${type}` : (currentLang === 'ru') ? `Тип: ${type}` : `Type: ${type}`;

        galleryModal.style.display = 'block';

        // Подсветка кнопки добавления в избранное если уже в избранном
        if (favorites.includes(name)) {
            addFavBtn.textContent = (currentLang === 'kk') ? 'Сүйіктіге қосылған' : (currentLang === 'ru') ? 'В избранном' : 'In favorites';
            addFavBtn.disabled = true;
            addFavBtn.style.opacity = '0.6';
        } else {
            addFavBtn.textContent = (currentLang === 'kk') ? 'Сүйіктіге қосу' : (currentLang === 'ru') ? 'Добавить в избранное' : 'Add to favorites';
            addFavBtn.disabled = false;
            addFavBtn.style.opacity = '1';
        }

        // Установка обработчика для текущего места
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

    // Открывать модал при клике на карточку; прежняя логика добавления в избранное перенесена в кнопку
    places.forEach(place => {
        place.addEventListener('click', () => openGalleryModal(place));
    });

    // Закрытие модала
    if (galleryClose) galleryClose.addEventListener('click', () => galleryModal.style.display = 'none');
    if (closeInfoBtn) closeInfoBtn.addEventListener('click', () => galleryModal.style.display = 'none');
    window.addEventListener('click', e => { if (e.target === galleryModal) galleryModal.style.display = 'none'; });

    // ==================== ИЗБРАННОЕ — УДАЛЕНИЕ ====================
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
            p.textContent = galleryText[lang][name] || name;
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

        // Если открыт галерейный модал — обновим его описание и кнопки
        if (galleryModal && galleryModal.style.display === 'block') {
            const title = document.getElementById('gallery-title-modal').textContent;
            document.getElementById('gallery-desc').textContent = galleryText[lang][title] || '';
            // Обновим текст кнопки добавления
            if (favorites.includes(title)) {
                addFavBtn.textContent = (lang === 'kk') ? 'Сүйіктіге қосылған' : (lang === 'ru') ? 'В избранном' : 'In favorites';
            } else {
                addFavBtn.textContent = (lang === 'kk') ? 'Сүйіктіге қосу' : (lang === 'ru') ? 'Добавить в избранное' : 'Add to favorites';
            }
        }

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

    // ==================== ТЕМЫ ====================
    const themes = {
        dark: {
            '--bg-color': '#121212',
            '--text-color': '#eee',
            '--header-bg': '#1f1f1f',
            '--header-text': '#fff',
            '--btn-bg': '#333',
            '--btn-active': '#bb86fc',
            '--slider-bg': '#1e1e1e',
            '--slider-text': '#bb86fc',
            '--favorites-bg': '#1e1e1e',
            '--favorites-text': '#bb86fc'
        },
        light: {
            '--bg-color': '#e3f6ff',
            '--text-color': '#222',
            '--header-bg': 'linear-gradient(90deg, #009688, #26a69a)',
            '--header-text': '#fff',
            '--btn-bg': 'rgba(20,20,35,0.7)',
            '--btn-active': '#9d4cff',
            '--slider-bg': '#ffffff',
            '--slider-text': '#00695c',
            '--favorites-bg': '#ffffff',
            '--favorites-text': '#004d40'
        },
        ocean: {
            '--bg-color': '#d0f0fd',
            '--text-color': '#03396c',
            '--header-bg': '#0077b6',
            '--header-text': '#fff',
            '--btn-bg': '#00b4d8',
            '--btn-active': '#023e8a',
            '--slider-bg': '#caf0f8',
            '--slider-text': '#0077b6',
            '--favorites-bg': '#ade8f4',
            '--favorites-text': '#023e8a'
        },
        sunset: {
            '--bg-color': '#fff0e6',
            '--text-color': '#5c1a00',
            '--header-bg': '#ff7f50',
            '--header-text': '#fff',
            '--btn-bg': '#ffb347',
            '--btn-active': '#ff4500',
            '--slider-bg': '#ffe6d9',
            '--slider-text': '#b34700',
            '--favorites-bg': '#ffd9b3',
            '--favorites-text': '#b34700'
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

            // Подсветка активной кнопки
            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Тема по умолчанию
    const defaultThemeBtn = document.querySelector('.theme-btn[data-theme="dark"]');
    if (defaultThemeBtn) defaultThemeBtn.classList.add('active');
    setTheme('dark');

});
