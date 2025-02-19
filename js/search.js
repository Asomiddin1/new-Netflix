const searchContainer = document.querySelector(".search-container");
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector(".search-input");
const searchContentBox = document.querySelector(".search_content");
const serachBox = document.querySelector(".search_box");
serachBox.style.display = "none";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzRiYThlOTdmOGI5OTRlMDhmNWM2ZThiOGM2YzM2NCIsIm5iZiI6MTY4Nzc3MDE2NS40OTgsInN1YiI6IjY0OTk1NDM1OTU1YzY1MDEwNTllMjVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZLcQVLkIE2SECXHwED4htC-AwuOch222BwWGt2RuhDc"; // TMDB API kalitingizni shu yerga qo'ying
const BASE_URL = "https://api.themoviedb.org/3";

searchIcon.addEventListener("click", () => {
  searchContainer.classList.toggle("active");
  if (searchContainer.classList.contains("active")) {
    searchInput.focus();
  }
});

document.addEventListener("click", (e) => {
  if (!searchContainer.contains(e.target)) {
    searchContainer.classList.remove("active");
  }
});

async function searchMovie(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data, "qidiruv");
    
    searchContentBox.innerHTML = ""; // Oldingi natijalarni tozalash
    if (data.results.length === 0) {
        // Agar natijalar bo'lmasa
        searchContentBox.innerHTML = `<p style="color: white; text-align: center;">Movie not found</p>`;
        return;
      }

    data.results.forEach((c) => {
      const movieElement = document.createElement("a");
      movieElement.style.textDecoration = "none";
      movieElement.style.color = "white";
      movieElement.href = "../oneMovie/one-movie.html";
      movieElement.dataset.movie = JSON.stringify(c); // Ma'lumotni saqlash uchun dataset ishlatiladi

      movieElement.innerHTML = `
        <div class="img_box">
          <img width="100px" src="https://image.tmdb.org/t/p/w500${c.poster_path}" alt="${c.original_title}" />
          <div>
            <h1>${c.original_title}</h1>
          </div>
        </div>
      `;
  
    

      movieElement.addEventListener("click", () => {
        localStorage.setItem("oneMovie", JSON.stringify(c));
      });

      searchContentBox.appendChild(movieElement);
    });

  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
}

searchInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    serachBox.style.display = "flex";
    searchContentBox.innerHTML = ""; // Oldingi natijalarni tozalash
    await searchMovie(searchInput.value);
  } else {
    serachBox.style.display = "none";
  }
});
