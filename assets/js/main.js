const places = document.querySelectorAll('.place');
const favList = document.getElementById('fav-list');

// LocalStorage-тен сүйікті орындарды жүктеу
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
updateFavorites();

// Орындарды басқанда қосу
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

