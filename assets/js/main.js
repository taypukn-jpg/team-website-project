// Галерея және сүйікті орындар
const places = document.querySelectorAll('.place');
const favList = document.getElementById('fav-list');
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
updateFavorites();
places.forEach(place => {
    place.addEventListener('click', () => {
        const name = place.dataset.name;
        if(!favorites.includes(name)){
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

// Фильтр
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

// Слайдер
const slides = [
    { src: "images/altai.jpg", caption: "Алтай таулары – керемет табиғат көрінісі." },
    { src: "images/burabay.jpg", caption: "Бурабай – Қазақстанның «Кіші Швейцариясы»." },
    { src: "images/sharyn.jpg", caption: "Шарын шатқалы – тарихи және табиғи ескерткіш." },
    { src: "images/kolsai.jpg", caption: "Көлсай көлдері – таулы көлдер тізбегі." },
    { src: "images/almaty.jpg", caption: "Алматы – мәдени және туристік орталық." },
    { src: "images/koltaz.jpg", caption: "Көлтаз – тыныш табиғат аймағы." },
    { src: "images/astana.jpg", caption: "Астана – заманауи сәулет және саябақтар." },
    { src: "images/karatau.jpg", caption: "Қаратау – Қазақстанның әсем таулы аймағы." },
    { src: "images/baikonur.jpg", caption: "Байқоңыр – ғарыш айлағы мен тарих." }
];

let slideIndex = 0;
const slideImage = document.getElementById('slide-image');
const slideCaption = document.getElementById('slide-caption');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

function showSlide(index){
    slideImage.src = slides[index].src;
    slideCaption.textContent = slides[index].caption;
}
prevBtn.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
});
nextBtn.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
});
showSlide(slideIndex);

// Карта
const map = L.map('mapid').setView([48.0, 66.9], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.marker([49.5, 86.0]).addTo(map).bindPopup('Алтай таулары');
L.marker([53.0, 71.5]).addTo(map).bindPopup('Бурабай');
L.marker([43.2, 79.1]).addTo(map).bindPopup('Шарын шатқалы');
L.marker([45.5, 79.2]).addTo(map).bindPopup('Көлсай көлдері');
L.marker([43.2, 76.9]).addTo(map).bindPopup('Алматы қаласы');
L.marker([43.0, 78.5]).addTo(map).bindPopup('Көлтаз');
L.marker([51.2, 71.4]).addTo(map).bindPopup('Астана қаласы');
L.marker([43.5, 69.8]).addTo(map).bindPopup('Қаратау таулары');
L.marker([45.6, 63.3]).addTo(map).bindPopup('Байқоңыр');
