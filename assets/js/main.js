// ===============================
// Сүйікті орындар
// ===============================

// Галереядағы элементтер
const places = document.querySelectorAll('.place');
const favList = document.getElementById('fav-list');

// LocalStorage-тен деректерді алу
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
updateFavorites();

// Галерея элементін басқанда – фаворитке қосу
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

// Фаворит тізімін жаңарту
function updateFavorites() {
    favList.innerHTML = '';
    favorites.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        favList.appendChild(li);
    });
}



// ===============================
// Слайдер
// ===============================

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

// Слайд көрсету функциясы
function showSlide(index) {
    slideImage.src = slides[index].src;
    slideCaption.textContent = slides[index].caption;
}

// Бастапқы слайд
showSlide(slideIndex);

// Алдыңғы/келесі батырмалары
prevBtn.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
});

nextBtn.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
});



// ===============================
// Фильтр
// ===============================

const filterButtons = document.querySelectorAll('#filter button');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;

        places.forEach(place => {
            const placeType = place.dataset.type;

            if (type === 'all' || type === placeType) {
                place.style.display = 'block';
                place.style.opacity = '1';
            } else {
                place.style.display = 'none';
            }
        });
    });
});



// ===============================
// Карта (Leaflet)
// ===============================

const map = L.map('mapid').setView([48.0, 66.9], 5);  // Қазақстан ортасы

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    .addTo(map);

// Маркерлер
L.marker([49.5, 86.0]).addTo(map).bindPopup('Алтай таулары');
L.marker([53.0, 71.5]).addTo(map).bindPopup('Бурабай');
L.marker([43.2, 79.1]).addTo(map).bindPopup('Шарын шатқалы');
L.marker([45.5, 79.2]).addTo(map).bindPopup('Көлсай көлдері');
L.marker([43.2, 76.9]).addTo(map).bindPopup('Алматы');
L.marker([51.2, 71.4]).addTo(map).bindPopup('Астана');
L.marker([43.5, 69.8]).addTo(map).bindPopup('Қаратау');
L.marker([45.6, 63.3]).addTo(map).bindPopup('Байқоңыр');



// ===============================
// Тіл ауыстыру (KK / RU / EN)
// ===============================

const titles = {
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

const langSelect = document.getElementById('language-select');

langSelect.addEventListener('change', () => {
    const lang = langSelect.value;

    document.getElementById('site-title').textContent = titles[lang].site;
    document.querySelector('#gallery h2').textContent = titles[lang].gallery;
    document.querySelector('#filter h2').textContent = titles[lang].filter;
    document.querySelector('#slider h2').textContent = titles[lang].slider;
    document.querySelector('#favorites h2').textContent = titles[lang].fav;
    document.querySelector('#map h2').textContent = titles[lang].map;
});


