const myList = document.getElementById("movieList");
const clearBtn = document.querySelector('.clear-btn')

let movieList = JSON.parse(localStorage.getItem('myMovieList'))

console.log(movieList);
myList.innerHTML = ``;
movieList.map(c =>{
    myList.innerHTML += ` <div class="card">
    <img src="https://image.tmdb.org/t/p/w500${c.poster_path}" alt="Inception">
    <h3>${c.original_title}</h3>
   </div>`;
})


clearBtn.addEventListener('click' , ()=>{
    myList.innerHTML = ''
    localStorage.clear()
    myList.innerHTML= `Kinolar hali yo'q `
})
