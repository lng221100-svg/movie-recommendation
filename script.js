const apiKey = "b22b4dc9099cfefe450a8ea9e8917cd4";

async function searchMovie(){

let query = document.getElementById("search").value;

let url =
`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
let res = await fetch(url);

let data = await res.json();

displayMovies(data.results);

}

function displayMovies(movies){

let container = document.getElementById("movies");
container.innerHTML="";

movies.forEach(movie => {

if(!movie.poster_path) return;

container.innerHTML += `
<div class="movie">

<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
onclick="openMovie(${movie.id})">

<h3>${movie.title}</h3>

<button onclick='addFavorite(${JSON.stringify(movie)})'>
⭐ Favorite
</button>

</div>
`;

});

}
async function openMovie(id){

let url =
`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

let res = await fetch(url);
let movie = await res.json();

document.getElementById("movieDetail").style.display="block";

document.getElementById("detailTitle").innerText = movie.title;

document.getElementById("detailPoster").src =
`https://image.tmdb.org/t/p/w500${movie.poster_path}`;

document.getElementById("detailOverview").innerText =
movie.overview;

loadTrailer(id);
loadSimilar(id);
document.getElementById("similar").innerHTML="";
document.getElementById("trailer").innerHTML="";

}
async function loadTrailer(id){

let url =
`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

let res = await fetch(url);
let data = await res.json();

let trailer = data.results.find(v => v.type === "Trailer");

if(trailer){

document.getElementById("trailer").innerHTML = `
<iframe width="560" height="315"
src="https://www.youtube.com/embed/${trailer.key}"
frameborder="0" allowfullscreen>
</iframe>
`;

}

}
function closeMovie(){

document.getElementById("movieDetail").style.display="none";

}

function addFavorite(movie){

let favorites =
JSON.parse(localStorage.getItem("favorites")) || [];

favorites.push(movie);

localStorage.setItem("favorites", JSON.stringify(favorites));

alert("Added to favorites ⭐");

}

function loadFavorites(){

let favorites =
JSON.parse(localStorage.getItem("favorites")) || [];

let container = document.getElementById("favorites");

container.innerHTML="";

favorites.forEach(movie => {

container.innerHTML += `
<div class="movie">

<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
onclick="openMovie(${movie.id})">

<h3>${movie.title}</h3>

</div>
`;

});

}

window.onload = function(){

loadFavorites();

}

async function loadSimilar(id){

let url =
`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`;

let res = await fetch(url);
let data = await res.json();

let container = document.getElementById("similar");

container.innerHTML="";

data.results.slice(0,6).forEach(movie => {

if(!movie.poster_path) return;

container.innerHTML += `
<img 
src="https://image.tmdb.org/t/p/w200${movie.poster_path}"
onclick="openMovie(${movie.id})"
class="similarMovie">
`;

});

}

function addFavorite(movie){

let favorites =
JSON.parse(localStorage.getItem("favorites")) || [];

if(!favorites.find(f => f.id === movie.id)){
favorites.push(movie);
}

localStorage.setItem("favorites", JSON.stringify(favorites));

loadFavorites();

}