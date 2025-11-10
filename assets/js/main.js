// Галерея және сүйікті орындар
const places = document.querySelectorAll('.place');
const favList = document.getElementById('fav-list');

// LocalStorage-тен сүйікті орындарды жүктеу
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
updateFavorites();

// Галереядағы орындарды басқанда сүйікті тізімге қосу
places.forEach(place => {
    place.addEventListener('click', () => {
        const name = place.dataset.name;
        if(!favorites.includes(name)) {
            favorites.push(name);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavorites();
        }
    });
});

function updateFavorites() {
    favList.innerHTML = '';
    favorites.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        favList.appendChild(li);
    });
}

// Слайдер үшін суреттер мен сипаттамалар
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

// Стрелкаларға басу оқиғалары
prevBtn.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
});

nextBtn.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
});

// Бастапқы көрсетілім
showSlide(slideIndex);


// Фильтр
const filterButtons = document.querySelectorAll('#filter button');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        places.forEach(place => {
            const placeType = place.dataset.type;
            if(type === 'all' || type === placeType){
                place.style.display = 'block';
            } else {
                place.style.display = 'none';
            }
        });
    });
});

// Карта
const map = L.map('mapid').setView([48.0, 66.9], 5); // Қазақстан ортасы
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.marker([49.5, 86.0]).addTo(map).bindPopup('Алтай таулары');
L.marker([53.0, 71.5]).addTo(map).bindPopup('Бурабай');
L.marker([43.2, 79.1]).addTo(map).bindPopup('Шарын шатқалы');

