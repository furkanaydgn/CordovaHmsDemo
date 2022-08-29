const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const main = document.getElementById("movie");

getMovies(APIURL);

var app_movie = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {


        //document.getElementById('btn_auth_button').addEventListener('click', signIn);

    }
};

async function getMovies(url) {

    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData.results);
}

function showMovies(movies) {

    main.innerHTML += "";

    movies.forEach((movie) => {

        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.style.width = "470px";
        movieEl.style.height = "470px";

        movieEl.innerHTML = `
         <img
                        src="${IMGPATH + poster_path}"
                        alt="${title}"
                    />
                    <div class="movie-info">
                        <h3>${title}</h3>
                    </div>
                     <div>
  						<button type="button" class="btn btn-warning">Buy Movie</button>
                    </div>
        `;

        main.appendChild(movieEl);
    });
}



app_movie.initialize();