document.addEventListener("DOMContentLoaded", function () {
    const netflixIntro = document.querySelector("netflixintro");

    if (netflixIntro) {
        netflixIntro.addEventListener("animationend", function () {
            window.location.href = "../home/home.html"; // Animatsiya tugagandan so‘ng yo‘naltirish
        });
    }
});
