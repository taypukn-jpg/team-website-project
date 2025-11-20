// ========= Галерея и Список избранного =========
const places = document.querySelectorAll('.place');
const favList = document.getElementById('fav-list');

// LocalStorage-тен сүйікті орындарды жүктеу
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
updateFavorites();

// Галереядағы орындарды басқанда сүйікті тізімге қосу
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

// Сүйікті тізімді жаңарту
function updateFavorites() {
    favList.innerHTML = '';
    favorites.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        favList.appendChild(li);
    });
}

// ========= Слайдер =========
const slides = [
    {
        src: "https://avatars.mds.yandex.net/i?id=447256547577cf1aa1dbe8bfffeb4d43c784662f-4306866-images-thumbs&n=13",
        caption: "Алтай таулары – керемет табиғат көрінісі."
    },
    {
        src: "https://avatars.mds.yandex.net/i?id=88e86dbf49faac72671b826cd8e428f9b42c6c9a-16509561-images-thumbs&n=13",
        caption: "Бурабай – Қазақстанның «Кіші Швейцариясы»."
    },
    {
        src: "https://cdn.nur.kz/images/1200x675/fd1d9d9b2ac051cd.jpeg?version=1",
        caption: "Шарын шатқалы – тарихи және табиғи ескерткіш."
    }
];

let slideIndex = 0;
const slideImage = document.getElementById('slide-image');
const slideCaption = document.getElementById('slide-caption');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

function showSlide(index) {
    slideImage.src = slides[index].src;
    slideCaption.textContent = slides[index].caption;
}

// Стрелкалар
prevBtn.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
});
nextBtn.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
});

// Инициализация слайдера
showSlide(slideIndex);

// ========= Фильтр =========
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

// ========= Карта =========
const map = L.map('mapid').setView([48.0, 66.9], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Маркеры
const mapMarkers = [
    {coords:[49.5, 86.0], name:"Алтай таулары"},
    {coords:[53.0, 71.5], name:"Бурабай"},
    {coords:[43.2, 79.1], name:"Шарын шатқалы"},
    {coords:[45.5, 79.2], name:"Көлсай көлдері"},
    {coords:[43.2, 76.9], name:"Алматы"},
    {coords:[43.0, 78.5], name:"Көлтаз"},
    {coords:[51.2, 71.4], name:"Астана"},
    {coords:[43.5, 69.8], name:"Қаратау"},
    {coords:[45.6, 63.3], name:"Байқоңыр"}
];

mapMarkers.forEach(m => {
    L.marker(m.coords).addTo(map).bindPopup(m.name);
});

// ========= Мультиязычность =========
const translations = {
    kk: {
        siteTitle: "Қазақстандағы Танымал Туристік Орындар",
        filterAll: "Барлығы",
        filterMountain: "Тау",
        filterRiver: "Өзен",
        filterCity: "Қала",
        galleryTitle: "Галерея",
        sliderTitle: "Танымал орындар",
        favoritesTitle: "Сүйікті орындар",
        mapTitle: "Қазақстан картасы",
        places: {
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
        slides: [
            {caption: "Алтай таулары – керемет табиғат көрінісі."},
            {caption: "Бурабай – Қазақстанның «Кіші Швейцариясы»."},
            {caption: "Шарын шатқалы – тарихи және табиғи ескерткіш."}
        ]
    },
    ru: {
        siteTitle: "Популярные туристические места Казахстана",
        filterAll: "Все",
        filterMountain: "Горы",
        filterRiver: "Река",
        filterCity: "Город",
        galleryTitle: "Галерея",
        sliderTitle: "Популярные места",
        favoritesTitle: "Избранные места",
        mapTitle: "Карта Казахстана",
        places: {
            "Алтай таулары": "Алтай – потрясающие виды природы.",
            "Бурабай": "Бурабай – «Малая Швейцария» Казахстана.",
            "Шарын шатқалы": "Каньон Шарын – исторический и природный памятник.",
            "Көлсай көлдері": "Кольсайские озера – цепь горных озер.",
            "Алматы қаласы": "Алматы – культурный и туристический центр.",
            "Көлтаз": "Кольтаз – спокойная природная зона.",
            "Астана қаласы": "Астана – современная архитектура и парки.",
            "Қаратау таулары": "Каратау – живописный горный район Казахстана.",
            "Байқоңыр": "Байконур – космодром и история."
        },
        slides: [
            {caption: "Алтай – потрясающие виды природы."},
            {caption: "Бурабай – «Малая Швейцария» Казахстана."},
            {caption: "Каньон Шарын – исторический и природный памятник."}
        ]
    },
    en: {
        siteTitle: "Popular Tourist Places in Kazakhstan",
        filterAll: "All",
        filterMountain: "Mountain",
        filterRiver: "River",
        filterCity: "City",
        galleryTitle: "Gallery",
        sliderTitle: "Popular Places",
        favoritesTitle: "Favorite Places",
        mapTitle: "Map of Kazakhstan",
        places: {
            "Алтай таулары": "Altai Mountains – stunning nature views.",
            "Бурабай": "Burabay – Kazakhstan’s 'Little Switzerland'.",
            "Шарын шатқалы": "Charyn Canyon – historical and natural monument.",
            "Көлсай көлдері": "Kolsai Lakes – chain of mountain lakes.",
            "Алматы қаласы": "Almaty – cultural and tourist center.",
            "Көлтаз": "Koltaz – tranquil nature area.",
            "Астана қаласы": "Astana – modern architecture and parks.",
            "Қаратау таулары": "Karatau – scenic mountainous area in Kazakhstan.",
            "Байқоңыр": "Baikonur – spaceport and history."
        },
        slides: [
            {caption: "Altai Mountains – stunning nature views."},
            {caption: "Burabay – Kazakhstan’s 'Little Switzerland'."},
            {caption: "Charyn Canyon – historical and natural monument."}
        ]
    }
};

// Смена языка
const languageSelect = document.getElementById('language-select');
languageSelect.addEventListener('change', () => {
    updateLanguage(languageSelect.value);
});

function updateLanguage(lang) {
    const data = translations[lang];

    document.getElementById('site-title').textContent = data.siteTitle;
    document.querySelector('#filter button[data-type="all"]').textContent = data.filterAll;
    document.querySelector('#filter button[data-type="тау"]').textContent = data.filterMountain;
    document.querySelector('#filter button[data-type="өзен"]').textContent = data.filterRiver;
    document.querySelector('#filter button[data-type="қала"]').textContent = data.filterCity;
    document.querySelector('#gallery h2').textContent = data.galleryTitle;
    document.querySelector('#slider h2').textContent = data.sliderTitle;
    document.querySelector('#favorites h2').textContent = data.favoritesTitle;
    document.querySelector('#map h2').textContent = data.mapTitle;

    places.forEach(place => {
        const name = place.dataset.name;
        place.querySelector('p').textContent = data.places[name];
    });

    // Слайдер
    slideCaption.textContent = data.slides[slideIndex].caption;
}


