const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

async function requestApi(searchTerm) {
  try {
    const response = await fetch(
      `http://localhost:3000/artists?name_like=${searchTerm}`
    );
    const results = await response.json();
    displayResults(results);
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
}

function displayResults(results) {
  hidePlaylists();
  const artistImage = document.getElementById("artist-img");
  const artistName = document.getElementById("artist-name");

  results.forEach((element) => {
    artistImage.src = element.urlImg;
    artistName.innerText = element.name;
  });
  resultArtist.classList.remove("hidden");
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
});
