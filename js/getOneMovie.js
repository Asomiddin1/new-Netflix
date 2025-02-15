const oneMovieBox = document.getElementById("one_movie_box");
const oneMovieImgBox = document.getElementById("one_movie_img_box");

let movieId = JSON.parse(localStorage.getItem("oneMovie"));
console.log(movieId, "id");

async function getOneMovie() {
  const oneMovieUrl = `https://api.themoviedb.org/3/movie/${movieId.id}/videos?language=en-US`;
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzRiYThlOTdmOGI5OTRlMDhmNWM2ZThiOGM2YzM2NCIsIm5iZiI6MTY4Nzc3MDE2NS40OTgsInN1YiI6IjY0OTk1NDM1OTU1YzY1MDEwNTllMjVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZLcQVLkIE2SECXHwED4htC-AwuOch222BwWGt2RuhDc",
      },
    };

    const response = await fetch(oneMovieUrl, options);
    const data = await response.json();
    if (data.results) {
      let oneData = data.results;
      console.log(data.results, "one");
      oneMovieBox.innerHTML = `<div class="video-container">
            <iframe src="https://www.youtube.com/embed/${oneData[0].key}?autoplay=1&mute=1&loop=1&playlist=${oneData[0].key}&controls=0&showinfo=0&modestbranding=1&cc_load_policy=1" 
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
            </iframe>
        </div>
    
        <div class="content">
           <div class='content_h1'>
             <h1 class='slider_title'>${movieId.original_title}</h1>
             <p>${movieId.overview}</p>
               <div class="slider_btn_box">
                 <button onclick="playNowFunc('${oneData[0].key}')" class="slider_pl_btn">Play now</button>
                 <button onclick="addToMyList()" class="slider_add_btn">Add my list</button>
              </div>
           </div>
        </div>`;
      oneMovieImgBox.innerHTML = `
        <img width="300px" src="https://image.tmdb.org/t/p/w500${movieId.poster_path}" alt="">
           <div style='max-width:600px;'>
             <p>${movieId.vote_average}</p>
              <h1>${movieId.original_title}</h1>
              <p>${movieId.overview}</p>
              <p>${movieId.genre_ids}</p>
              <p>${movieId.original_language}</p>
           </div>
        `;
    }
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
}

function playNowFunc(videoKey) {
  oneMovieBox.innerHTML = `
    <iframe width="100%" height="500px" 
      src="https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0&controls=1" 
      title="YouTube video player" frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
    </iframe>`;
}

// Foydalanuvchi tanlagan filmni "My List" ga qo'shish
function addToMyList() {
  let myList = JSON.parse(localStorage.getItem("myMovieList")) || [];
  
  // Film allaqachon ro‘yxatda bor yoki yo‘qligini tekshiramiz
  const isAlreadyAdded = myList.some(movie => movie.id === movieId.id);
  
  if (!isAlreadyAdded) {
    myList.push(movieId);
    localStorage.setItem("myMovieList", JSON.stringify(myList));
    alert("Film muvaffaqiyatli qo'shildi!");
  } else {
    alert("Bu film allaqachon ro‘yxatda mavjud!");
  }
}

getOneMovie();
