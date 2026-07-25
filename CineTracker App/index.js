const API_KEY = "6a24899b5903f72d1fdc1d458555e9fa";
const BASE_URL = "https://api.themoviedb.org/3";


const input = document.getElementById("search-box");
const results = document.getElementById("results-div");

let currentMovies = [];
let scrollPosition = 0;
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
let currentView = "home";


async function searchMovies(query) {
    try {
        const res = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
        );
        const data = await res.json();

        console.log(data.results);
        return data.results;

    } catch (error) {
        console.error("Search failed:", error);
        return [];

    }
};


let debounceTimer;

input.addEventListener("input", (e) => {
    const userQuery = e.target.value.trim();

    // clear previous timer
    clearTimeout(debounceTimer);

    // handle empty input immediately
    if (!userQuery) {
        results.innerHTML = "";
        return;
    }

    // set new timer
    debounceTimer = setTimeout(async () => {

        if (userQuery.length < 3) return;

        console.log("Loading...");

        const response = await searchMovies(userQuery);
        currentMovies = response;

        if (response.length === 0) {
            results.innerHTML = "<p>No results found</p>";
            return;
        }
        currentView = "home";
        displayMovies(response);

    }, 500);
});


function displayMovies(movies) {
    results.innerHTML = "";

    movies.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-card");

        movieDiv.addEventListener("click", async ()=> {
            results.innerHTML = "<p>Loading movie details...</p>";

            scrollPosition = window.scrollY;
            const details = await getMovieDetails(movie.id);
            if (details) {
                displayMovieDetails(details);
            }
        });

        let poster;
        if (movie.poster_path) {
        poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        } else {
        poster = "https://via.placeholder.com/300x450?text=No+Image";
        }

        movieDiv.innerHTML = `
            <img src="${poster}" alt="${movie.title}" />
            <h3>${movie.title}</h3>
        `;

        results.appendChild(movieDiv);
    });

    
};


async function getMovieDetails(id) {
    try {
        const res = await fetch(
            `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
        );
        const data = await res.json();

        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

function displayMovieDetails(movie) {
    const backdrop = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
        : "https://via.placeholder.com/1280x720?text=No+Image";

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
        : "https://via.placeholder.com/300x450?text=No+Image";

    results.innerHTML = `
        <div class="hero" style="background-image: url('${backdrop}')">
            
            <div class="hero-overlay">
                
                <button id="backBtn">← Back</button>

                <div class="hero-content">

                    <img src="${poster}" alt="${movie.title}" />

                    <div class="hero-text">
                        <h1>${movie.title}</h1>
                        <button id="watchlistBtn">
                            ${isinWatchlist(movie.id) ? "✓ In Watchlist" : "+ Add to Watchlist"}
                        </button>

                        <p class="meta">
                            ⭐ ${movie.vote_average || "N/A"} | 
                            📅 ${movie.release_date || "N/A"}
                        </p>

                        <p class="overview">
                            ${movie.overview || "No description available."}
                        </p>

                    </div>

                </div>
            </div>
        </div>
    `;

    document.getElementById("backBtn").addEventListener("click", () => {
        displayMovies(currentMovies);
        window.scrollTo(0, scrollPosition);
    });

    const watchlistBtn = document.getElementById("watchlistBtn");

    watchlistBtn.addEventListener("click", () => {

        if (isinWatchlist(movie.id)) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchList(movie);
        }

        displayMovieDetails(movie); // refresh UI
    });
}

// Watchlist functions

function saveWatchlist() {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function isinWatchlist(id) {
    return watchlist.some(movie => movie.id === id);
}

function addToWatchList(movie) {
    if (isinWatchlist(movie.id) === false) {
        watchlist.push(movie);
        saveWatchlist();
    }
}

function removeFromWatchlist(id) {
    watchlist = watchlist.filter(movie => movie.id !== id);
    saveWatchlist();
}


//Watchlist Page

function displayWatchlist() {
    currentView = "watchlist";
    results.innerHTML = "";

    if (watchlist.length === 0) {
        results.innerHTML = "<p>Your Watchlist is empty.</p>";
        return;
    }

    watchlist.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-card");

        let poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image";

        movieDiv.innerHTML = `
            <img src=${poster} />
            <h3>${movie.title}</h3>
            <button class="remove-btn">Remove</button>

        `;
        
        // click → open details
        movieDiv.addEventListener("click", (e) => {
            if (e.target.closest("remove-btn")) {
                return;
            }

            getMovieDetails(movie.id).then(displayMovieDetails);
        });

        //remove button
        movieDiv.querySelector(".remove-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            removeFromWatchlist(movie.id);
            saveWatchlist();
            displayWatchlist();
        });

        results.appendChild(movieDiv);

    });

    
}

document.getElementById("homeBtn").addEventListener("click", () => {
    currentView = "home";
    displayMovies(currentMovies);
});

document.getElementById("watchlistPageBtn").addEventListener("click", () => {
    displayWatchlist();
});



