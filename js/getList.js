const myList = document.getElementById("movieList");
const clearBtn = document.querySelector('.clear-btn');

let movieList = JSON.parse(localStorage.getItem('myMovieList')) || [];

console.log(movieList);
myList.innerHTML = ``;

movieList.reverse().map(c => {
    let card = document.createElement('div');
    card.classList.add('card');
    
    card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${c.poster_path}" alt="${c.original_title}">
        <h3>${c.original_title}</h3>
    `;
    card.addEventListener('click', () => {
        localStorage.setItem('oneMovie', JSON.stringify(c));
        window.location.href = "../oneMovie/one-movie.html"; 
    });

    myList.appendChild(card);
});


clearBtn.addEventListener('click', () => {
    myList.innerHTML = '';
    localStorage.clear();
    myList.innerHTML = `Kinolar hali yo'q`;
});
