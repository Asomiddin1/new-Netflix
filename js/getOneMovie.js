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
      oneMovieBox.innerHTML = ` <div class="video-container">
            <iframe src="https://www.youtube.com/embed/${oneData[0].key}?autoplay=1&mute=1&loop=1&playlist=${oneData[0].key}&controls=0&showinfo=0&modestbranding=1&cc_load_policy=1" 
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
            </iframe>
        </div>
    
        <div class="content">
           <div class='content_h1'>
             <h1 class='slider_title'>${movieId.original_title}</h1>
             <p>${movieId.overview}</p>
               <div class="slider_btn_box">
                 <button class="slider_pl_btn">Play now</button>
                 <button class="slider_add_btn">Add my list</button>
              </div>
           </div>
        </div>`;

      
    }
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
}

getOneMovie();
