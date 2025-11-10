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
    { src: "https://avatars.mds.yandex.net/i?id=447256547577cf1aa1dbe8bfffeb4d43c784662f-4306866-images-thumbs&n=13", caption: "Алтай таулары – керемет табиғат көрінісі." },
    { src: "https://avatars.mds.yandex.net/i?id=88e86dbf49faac72671b826cd8e428f9b42c6c9a-16509561-images-thumbs&n=13", caption: "Бурабай – Қазақстанның «Кіші Швейцариясы»." },
    { src: "https://cdn.nur.kz/images/1200x675/fd1d9d9b2ac051cd.jpeg?version=1", caption: "Шарын шатқалы – тарихи және табиғи ескерткіш." },
    { src: "https://avatars.mds.yandex.net/i?id=56bdf728f91307aaddd493460129a8c335e0b012-9833563-images-thumbs&n=13", caption: "Көлсай көлдері – таулы көлдер тізбегі." },
    { src: "https://avatars.mds.yandex.net/i?id=981121db6416f1fbc57f42b88ea87904d8fdaa4b-5889279-images-thumbs&n=13", caption: "Алматы – мәдени және туристік орталық." },
    { src: "https://avatars.mds.yandex.net/i?id=19e454fef5cb70a3b23b560bd2f5b890_l-5669136-images-thumbs&n=13", caption: "Көлтаз – тыныш табиғат аймағы." },
    { src: "https://avatars.mds.yandex.net/i?id=262f5d1d6c3eed23de75992c4056fa24c308cf57-4337876-images-thumbs&n=13", caption: "Астана – заманауи сәулет және саябақтар." },
    { src: "https://avatars.mds.yandex.net/i?id=10adb2c211ba6d52df9b2263729827a2_l-5280263-images-thumbs&n=13", caption: "Қаратау – Қазақстанның әсем таулы аймағы." },
    { src: "https://avatars.mds.yandex.net/i?id=1f32cab8047532d289281c7c4a7cd0b8_l-5221497-images-thumbs&n=13, caption: "Байқоңыр – ғарыш айлағы мен тарих." }
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
