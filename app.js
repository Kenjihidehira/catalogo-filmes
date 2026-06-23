const movies = [
  {
    id: 1,
    title: "Interestelar",
    year: 2014,
    director: "Christopher Nolan",
    genre: "Ficção científica",
    rating: 9.2,
    description: "Uma jornada épica entre espaço, tempo e família.",
    colors: ["#0f172a", "#38bdf8"]
  },
  {
    id: 2,
    title: "Cidade de Deus",
    year: 2002,
    director: "Fernando Meirelles",
    genre: "Drama",
    rating: 9.0,
    description: "Um retrato intenso sobre violência, escolhas e sobrevivência.",
    colors: ["#451a03", "#f97316"]
  },
  {
    id: 3,
    title: "A Viagem de Chihiro",
    year: 2001,
    director: "Hayao Miyazaki",
    genre: "Animação",
    rating: 8.9,
    description: "Fantasia, coragem e encantamento em um mundo espiritual.",
    colors: ["#312e81", "#f9a8d4"]
  },
  {
    id: 4,
    title: "Matrix",
    year: 1999,
    director: "Lana e Lilly Wachowski",
    genre: "Ficção científica",
    rating: 8.7,
    description: "Realidade, código e uma escolha entre duas pílulas.",
    colors: ["#052e16", "#22c55e"]
  },
  {
    id: 5,
    title: "O Auto da Compadecida",
    year: 2000,
    director: "Guel Arraes",
    genre: "Comédia",
    rating: 8.8,
    description: "Humor brasileiro com esperteza, fé e personagens inesquecíveis.",
    colors: ["#78350f", "#facc15"]
  },
  {
    id: 6,
    title: "Parasita",
    year: 2019,
    director: "Bong Joon-ho",
    genre: "Suspense",
    rating: 8.6,
    description: "Uma crítica afiada sobre desigualdade em forma de suspense.",
    colors: ["#18181b", "#a3e635"]
  },
  {
    id: 7,
    title: "O Senhor dos Anéis",
    year: 2003,
    director: "Peter Jackson",
    genre: "Fantasia",
    rating: 9.1,
    description: "Amizade e coragem em uma das maiores aventuras do cinema.",
    colors: ["#14532d", "#d97706"]
  },
  {
    id: 8,
    title: "Pantera Negra",
    year: 2018,
    director: "Ryan Coogler",
    genre: "Ação",
    rating: 8.1,
    description: "Tecnologia, identidade e heroísmo em Wakanda.",
    colors: ["#2e1065", "#c084fc"]
  },
  {
    id: 9,
    title: "Whiplash",
    year: 2014,
    director: "Damien Chazelle",
    genre: "Drama",
    rating: 8.5,
    description: "Ambição, ritmo e pressão em busca da excelência.",
    colors: ["#450a0a", "#ef4444"]
  }
];

const searchInput = document.querySelector("#searchInput");
const genreSelect = document.querySelector("#genreSelect");
const sortSelect = document.querySelector("#sortSelect");
const favoritesOnly = document.querySelector("#favoritesOnly");
const movieGrid = document.querySelector("#movieGrid");
const emptyState = document.querySelector("#emptyState");
const totalMovies = document.querySelector("#totalMovies");
const averageRating = document.querySelector("#averageRating");
const favoriteCount = document.querySelector("#favoriteCount");

function getFavorites() {
  return JSON.parse(localStorage.getItem("cinebox-favorites") || "[]");
}

function saveFavorites(ids) {
  localStorage.setItem("cinebox-favorites", JSON.stringify(ids));
}

function setupGenres() {
  const genres = [...new Set(movies.map((movie) => movie.genre))].sort();

  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreSelect.appendChild(option);
  });
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const nextFavorites = favorites.includes(id)
    ? favorites.filter((favoriteId) => favoriteId !== id)
    : favorites.concat(id);

  saveFavorites(nextFavorites);
  render();
}

function getFilteredMovies() {
  const term = searchInput.value.trim().toLowerCase();
  const genre = genreSelect.value;
  const favorites = getFavorites();

  return movies
    .filter((movie) => {
      const searchable = `${movie.title} ${movie.director} ${movie.year}`.toLowerCase();
      const matchesSearch = searchable.includes(term);
      const matchesGenre = genre === "all" || movie.genre === genre;
      const matchesFavorite = !favoritesOnly.checked || favorites.includes(movie.id);
      return matchesSearch && matchesGenre && matchesFavorite;
    })
    .sort((a, b) => {
      if (sortSelect.value === "year") return b.year - a.year;
      if (sortSelect.value === "title") return a.title.localeCompare(b.title);
      return b.rating - a.rating;
    });
}

function renderStats(list) {
  const average = list.length
    ? list.reduce((sum, movie) => sum + movie.rating, 0) / list.length
    : 0;

  totalMovies.textContent = list.length;
  averageRating.textContent = average.toFixed(1);
  favoriteCount.textContent = getFavorites().length;
}

function render() {
  const favorites = getFavorites();
  const list = getFilteredMovies();

  renderStats(list);
  emptyState.classList.toggle("hidden", list.length > 0);

  movieGrid.innerHTML = list
    .map((movie) => {
      const isFavorite = favorites.includes(movie.id);

      return `
        <article class="movie" style="--poster-a: ${movie.colors[0]}; --poster-b: ${movie.colors[1]}">
          <button
            class="favorite-btn ${isFavorite ? "active" : ""}"
            type="button"
            aria-label="Favoritar ${movie.title}"
            data-id="${movie.id}"
          >
            ${isFavorite ? "★" : "☆"}
          </button>
          <div class="movie-content">
            <div class="movie-meta">
              <span class="rating">★ ${movie.rating}</span>
              <span class="chip">${movie.year}</span>
            </div>
            <h2>${movie.title}</h2>
            <p>${movie.description}</p>
            <div class="chips">
              <span class="chip">${movie.genre}</span>
              <span class="chip">${movie.director}</span>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll(".favorite-btn").forEach((button) => {
    button.addEventListener("click", () => toggleFavorite(Number(button.dataset.id)));
  });
}

[searchInput, genreSelect, sortSelect, favoritesOnly].forEach((input) => {
  input.addEventListener("input", render);
});

setupGenres();
render();
