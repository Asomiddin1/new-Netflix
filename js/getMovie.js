// AOS va Slick Slider-ni ishga tushirish
AOS.init();
$(document).ready(function () {
  $(".single-item").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
  });
});

// API sozlamalari
const API_URL = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzRiYThlOTdmOGI5OTRlMDhmNWM2ZThiOGM2YzM2NCIsIm5iZiI6MTY4Nzc3MDE2NS40OTgsInN1YiI6IjY0OTk1NDM1OTU1YzY1MDEwNTllMjVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZLcQVLkIE2SECXHwED4htC-AwuOch222BwWGt2RuhDc";

const popular = document.querySelector("#popular");

// Mashhur filmlarni olish
async function getPopularMovies() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    });

    const data = await response.json();

    if (data.results) {
      console.log("Kelgan ma'lumot:", data.results); // Debug uchun

      // Sahifaga filmlarni qo‘shish
      data.results.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("card_popular");

        movieCard.innerHTML = `
            <div class='img-container_popular'>
              <a href="../oneMovie/one-movie.html">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
              </a>
            </div>
            <div class='card_title_popular'>
              <h1>${movie.title}</h1>
            </div>
        `;

        // Har bir filmni bosganda `getMovieId` ishga tushadi
        movieCard.addEventListener("click", () => getMovieId(movie));

        // HTML sahifaga qo‘shish
        popular.appendChild(movieCard);
      });
    }
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
}

// Film ID ni `localStorage` ga saqlash
function getMovieId(movie) {
  console.log("Tanlangan film:", movie); // Debug uchun

  try {
    localStorage.setItem("oneMovie", JSON.stringify(movie));
    console.log("Film muvaffaqiyatli saqlandi!");
  } catch (error) {
    console.error("localStorage xatosi:", error);
  }
}

// Ma'lumotlarni yuklash
getPopularMovies();
