document.addEventListener('DOMContentLoaded', () => {
   document.addEventListener("DOMContentLoaded", function () {

    /* =========================
        ДАННЫЕ ДЛЯ ПЕРЕВОДОВ
    ========================== */
    const translations = {
        kk: {
            ui: {
                site: "Қазақстандағы Танымал Туристік Орындар",
                gallery: "Галерея",
                filter: "Фильтр",
                slider: "Танымал орындар",
                fav: "Сүйікті орындар",
                map: "Қазақстан картасы",
                remove: "Өшіру"
            },

            filters: {
                all: "Барлығы",
                mountain: "Тау",
                river: "Өзен",
                city: "Қала"
            },

            places: {
                altai: "Алтай таулары – керемет табиғат көрінісі.",
                burabay: "Бурабай – Қазақстанның «Кіші Швейцариясы».",
                sharyn: "Шарын шатқалы – тарихи және табиғи ескерткіш.",
                kolsay: "Көлсай көлдері – таулы көлдер тізбегі.",
                almaty: "Алматы – мәдени және туристік орталық.",
                koltaz: "Көлтаз – тыныш табиғат аймағы.",
                astana: "Астана – заманауи сәулет және саябақтар.",
                karatau: "Қаратау – Қазақстанның әсем таулы аймағы.",
                baikonyr: "Байқоңыр – ғарыш айлағы мен тарих."
            },

            slides: [
                "Алтай таулары – керемет табиғат көрінісі.",
                "Бурабай – Қазақстанның «Кіші Швейцариясы».",
                "Шарын шатқалы – тарихи және табиғи ескерткіш."
            ]
        },

        ru: {
            ui: {
                site: "Популярные туристические места Казахстана",
                gallery: "Галерея",
                filter: "Фильтр",
                slider: "Популярные места",
                fav: "Избранные места",
                map: "Карта Казахстана",
                remove: "Удалить"
            },

            filters: {
                all: "Все",
                mountain: "Горы",
                river: "Реки",
                city: "Города"
            },

            places: {
                altai: "Алтай – прекрасные горные пейзажи.",
                burabay: "Бурабай – «Маленькая Швейцария» Казахстана.",
                sharyn: "Шарынский каньон – природный памятник.",
                kolsay: "Кольсайские озёра – цепь горных озёр.",
                almaty: "Алматы – культурный и туристический центр.",
                koltaz: "Кольтаз – спокойная природная зона.",
                astana: "Астана – современная архитектура и парки.",
                karatau: "Каратау – красивый горный регион.",
                baikonyr: "Байконур – космодром и история."
            },

            slides: [
                "Алтай — живописные горные пейзажи.",
                "Бурабай — «Малая Швейцария» Казахстана.",
                "Шарын — природный памятник."
            ]
        },

        en: {
            ui: {
                site: "Popular Tourist Places in Kazakhstan",
                gallery: "Gallery",
                filter: "Filter",
                slider: "Popular Places",
                fav: "Favorite Places",
                map: "Map of Kazakhstan",
                remove: "Remove"
            },

            filters: {
                all: "All",
                mountain: "Mountains",
                river: "Rivers",
                city: "Cities"
            },

            places: {
                altai: "Altai mountains — stunning nature views.",
                burabay: "Burabay — the 'Little Switzerland' of Kazakhstan.",
                sharyn: "Charyn Canyon — natural and historic monument.",
                kolsay: "Kolsay Lakes — a chain of mountain lakes.",
                almaty: "Almaty — cultural and tourist center.",
                koltaz: "Koltaz — a peaceful natural zone.",
                astana: "Astana — modern architecture and parks.",
                karatau: "Karatau — beautiful mountain region.",
                baikonyr: "Baikonur — the spaceport and history."
            },

            slides: [
                "Altai mountains — stunning nature views.",
                "Burabay — the 'Little Switzerland' of Kazakhstan.",
                "Charyn Canyon — a natural monument."
            ]
        }
    };

    /* =========================
        ЭЛЕМЕНТЫ
    ========================== */

    const places = document.querySelectorAll('.place');
    const favList = document.getElementById('fav-list');
    const langButtons = document.querySelectorAll('.lang-btn');

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    /* =========================
        СЛАЙДЕР
    ========================== */

    const slides = [
        "https://avatars.mds.yandex.net/i?id=447256547577cf1aa1dbe8bfffeb4d43c784662f-4306866-images-thumbs&n=13",
        "https://avatars.mds.yandex.net/i?id=88e86dbf49faac72671b826cd8e428f9b42c6c9a-16509561-images-thumbs&n=13",
        "https://cdn.nur.kz/images/1200x675/fd1d9d9b2ac051cd.jpeg?version=1"
    ];

    let slideIndex = 0;
    const slideImage = document.getElementById('slide-image');
    const slideCaption = document.getElementById('slide-caption');

    function showSlide(index, lang = "kk") {
        slideIndex = ((index % slides.length) + slides.length) % slides.length;
        slideImage.src = slides[slideIndex];
        slideCaption.textContent = translations[lang].slides[slideIndex];
    }

    /* =========================
        ОБНОВЛЕНИЕ ИЗБРАННОГО
    ========================== */

    function updateFavorites(lang = "kk") {
        favList.innerHTML = "";
        favorites.forEach(name => {
            const li = document.createElement("li");
            li.textContent = name;

            const btn = document.createElement("button");
            btn.textContent = "×";
            btn.className = "fav-remove";
            btn.title = translations[lang].ui.remove;

            li.appendChild(btn);
            favList.appendChild(li);
        });
    }

    /* =========================
        ПЕРЕКЛЮЧЕНИЕ ЯЗЫКОВ
    ========================== */

    function setLanguage(lang) {
        const t = translations[lang];

        // Заголовки
        document.getElementById("site-title").textContent = t.ui.site;
        document.getElementById("gallery-title").textContent = t.ui.gallery;
        document.getElementById("filter-title").textContent = t.ui.filter;
        document.getElementById("slider-title").textContent = t.ui.slider;
        document.getElementById("fav-title").textContent = t.ui.fav;
        document.getElementById("map-title").textContent = t.ui.map;

        // Галерея (перевод <p>)
        const placeKeys = [
            "altai", "burabay", "sharyn", "kolsay",
            "almaty", "koltaz", "astana", "karatau", "baikonyr"
        ];

        places.forEach((place, index) => {
            const p = place.querySelector("p");
            p.textContent = t.places[placeKeys[index]];
        });

        // Перевод слайдера
        showSlide(slideIndex, lang);

        // Перевод избранного
        updateFavorites(lang);

        // Стили активной кнопки
        langButtons.forEach(b =>
            b.classList.toggle("active", b.dataset.lang === lang)
        );
    }

    /* =========================
        КЛИК ПО КАРТОЧКЕ (добавить избранное)
    ========================== */

    places.forEach(place => {
        place.addEventListener("click", () => {
            const name = place.querySelector("p").textContent;
            if (!favorites.includes(name)) {
                favorites.push(name);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                updateFavorites();
            }
        });
    });

    favList.addEventListener("click", e => {
        if (e.target.classList.contains("fav-remove")) {
            const li = e.target.closest("li");
            const name = li.firstChild.textContent;
            favorites = favorites.filter(f => f !== name);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            updateFavorites();
        }
    });

    /* =========================
        ИНИЦИАЛИЗАЦИЯ
    ========================== */

    setLanguage("kk");
    showSlide(slideIndex, "kk");

    langButtons.forEach(btn =>
        btn.addEventListener("click", () => setLanguage(btn.dataset.lang))
    );

});
