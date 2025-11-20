document.addEventListener("DOMContentLoaded", () => {

    // ---------- ГАЛЕРЕЯ — МӘТІНДЕРДІ 3 ТІЛДЕ САҚТАУ ----------
    const galleryText = {
        kk: {
            "Алтай таулары": "Алтай таулары – керемет табиғат көрінісі.",
            "Бурабай": "Бурабай – Қазақстанның «Кіші Швейцариясы».",
            "Шарын шатқалы": "Шарын шатқалы – тарихи және табиғи ескерткіш.",
            "Көлсай көлдері": "Көлсай көлдері – таулы көлдер тізбегі.",
            "Алматы қаласы": "Алматы – мәдени және туристік орталық.",
            "Көлтаз": "Көлтаз – тыныш табиғат аймағы.",
            "Астана қаласы": "Астана – заманауи сәулет және саябақтар.",
            "Қаратау таулары": "Қаратау – Қазақстанның әсем таулы аймағы.",
            "Байқоңыр": "Байқоңыр – ғарыш айлағы мен тарих."
        },
        ru: {
            "Алтай таулары": "Алтайские горы — великолепные природные пейзажи.",
            "Бурабай": "Бурабай — «Маленькая Швейцария» Казахстана.",
            "Шарын шатқалы": "Шарынский каньон — природный и исторический памятник.",
            "Көлсай көлдері": "Озера Кольсай — горная цепь озёр.",
            "Алматы қаласы": "Алматы — культурный и туристический центр.",
            "Көлтаз": "Көлтаз — спокойная природная зона.",
            "Астана қаласы": "Астана — современная архитектура и парки.",
            "Қаратау таулары": "Каратау — красивый горный район Казахстана.",
            "Байқоңыр": "Байконур — космодром и исторический объект."
        },
        en: {
            "Алтай таулары": "Altai Mountains — a stunning natural landscape.",
            "Бурабай": "Burabay — Kazakhstan’s ‘Little Switzerland’.",
            "Шарын шатқалы": "Charyn Canyon — a natural and historical monument.",
            "Көлсай көлдері": "Kolsai Lakes — a chain of mountain lakes.",
            "Алматы қаласы": "Almaty — a cultural and tourist center.",
            "Көлтаз": "Koltaz — a peaceful natural area.",
            "Астана қаласы": "Astana — modern architecture and parks.",
            "Қаратау таулары": "Karatau — a beautiful mountain region of Kazakhstan.",
            "Байқоңыр": "Baikonur — spaceport and history."
        }
    };

    // ---------- СЛАЙДЕР МӘТІНДЕРІ ----------
    const sliderText = {
        kk: [
            "Алтай таулары – керемет табиғат көрінісі.",
            "Бурабай – Қазақстанның «Кіші Швейцариясы».",
            "Шарын шатқалы – тарихи және табиғи ескерткіш."
        ],
        ru: [
            "Алтайские горы — великолепные природные пейзажи.",
            "Бурабай — «Маленькая Швейцария» Казахстана.",
            "Шарынский каньон — природный и исторический памятник."
        ],
        en: [
            "Altai Mountains — a stunning natural landscape.",
            "Burabay — Kazakhstan’s ‘Little Switzerland’.",
            "Charyn Canyon — a natural and historical monument."
        ]
    };

    // ---------- SLIDES ----------
    const slides = [
        { src: "https://avatars.mds.yandex.net/i?id=447256547577cf1aa1dbe8bfffeb4d43c784662f-4306866-images-thumbs&n=13" },
        { src: "https://avatars.mds.yandex.net/i?id=88e86dbf49faac72671b826cd8e428f9b42c6c9a-16509561-images-thumbs&n=13" },
        { src: "https://cdn.nur.kz/images/1200x675/fd1d9d9b2ac051cd.jpeg?version=1" }
    ];

    let currentLang = "kk";

    // SLIDER elements
    let slideIndex = 0;
    const slideImage = document.getElementById('slide-image');
    const slideCaption = document.getElementById('slide-caption');

    function showSlide(index) {
        slideIndex = (index + slides.length) % slides.length;
        slideImage.src = slides[slideIndex].src;
        slideCaption.textContent = sliderText[currentLang][slideIndex];
    }

    showSlide(0);

    document.getElementById("prev").onclick = () => showSlide(slideIndex - 1);
    document.getElementById("next").onclick = () => showSlide(slideIndex + 1);

    // ---------- ГАЛЕРЕЯ МӘТІНІН ТІЛ БОЙЫНША ӨЗГЕРТУ ----------
    function updateGalleryText(lang) {
        document.querySelectorAll(".place").forEach(place => {
            const name = place.dataset.name;
            const p = place.querySelector("p");
            p.textContent = galleryText[lang][name];
        });
    }

    // ---------- ТҮЙМЕЛЕРДІҢ ТІЛ МӘТІНДЕРІ ----------
    const headings = {
        kk: {
            site: "Қазақстандағы Танымал Туристік Орындар",
            gallery: "Галерея",
            filter: "Фильтр",
            slider: "Танымал орындар",
            fav: "Сүйікті орындар",
            map: "Қазақстан картасы"
        },
        ru: {
            site: "Популярные туристические места Казахстана",
            gallery: "Галерея",
            filter: "Фильтр",
            slider: "Популярные места",
            fav: "Избранные места",
            map: "Карта Казахстана"
        },
        en: {
            site: "Popular Tourist Places in Kazakhstan",
            gallery: "Gallery",
            filter: "Filter",
            slider: "Popular Places",
            fav: "Favorite Places",
            map: "Map of Kazakhstan"
        }
    };

     // Обновление избранного UI
    function updateFavorites() {
        favList.innerHTML = '';
        favorites.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            li.dataset.name = name;
            // можно добавить кнопку удалить
            const btn = document.createElement('button');
            btn.textContent = '×';
            btn.className = 'fav-remove';
            btn.title = 'Удалить из избранного';
            li.appendChild(btn);
            favList.appendChild(li);
        });
    }

    updateFavorites();

    // Добавление в избранное по клику на карточку (делегирование)
    places.forEach(place => {
        place.addEventListener('click', (e) => {
            const name = place.dataset.name;
            if (!name) return;
            if (!favorites.includes(name)) {
                favorites.push(name);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                updateFavorites();
            }
        });
    });

    // Удаление из избранного (делегирование на ul)
    favList.addEventListener('click', (e) => {
        if (e.target.classList.contains('fav-remove')) {
            const li = e.target.closest('li');
            const name = li && li.dataset.name;
            if (!name) return;
            favorites = favorites.filter(n => n !== name);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavorites();
        }
    });

    // Фильтр
    const filterButtons = document.querySelectorAll('#filter button');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            places.forEach(place => {
                const placeType = place.dataset.type;
                if (type === 'all' || type === placeType) {
                    place.style.display = 'block';
                } else {
                    place.style.display = 'none';
                }
            });
        });
    });

    // Leaflet карта
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


    // LANGUAGE SWITCH
    function setLanguage(lang) {
        currentLang = lang;

        const t = headings[lang];

        document.getElementById('site-title').textContent = t.site;
        document.getElementById('gallery-title').textContent = t.gallery;
        document.getElementById('filter-title').textContent = t.filter;
        document.getElementById('slider-title').textContent = t.slider;
        document.getElementById('fav-title').textContent = t.fav;
        document.getElementById('map-title').textContent = t.map;

        updateGalleryText(lang);
        showSlide(slideIndex);

        document.querySelectorAll(".lang-btn").forEach(btn =>
            btn.classList.toggle("active", btn.dataset.lang === lang)
        );
    }

    // INIT default
    setLanguage("kk");

    // BUTTON click
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
    });

});
