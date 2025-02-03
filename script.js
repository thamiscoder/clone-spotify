const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((results) => displayResults(results))
    .catch((error) => console.error('Erro na requisição:', error));
}

function displayResults(results) {
  console.log('Resultados da API:', results);
  hidePlaylists();
  const artistImage = document.getElementById("artist-img");
  const artistName = document.getElementById("artist-name");

  // Limpa os campos antes de adicionar novos resultados
  artistImage.src = '';
  artistName.innerText = '';

  if (results.length === 0) {
    console.log('Nenhum artista encontrado');
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }

  // Atualiza os campos com os dados do primeiro resultado
  const artist = results[0];
  artistImage.src = artist.urlImg;
  artistName.innerText = artist.name;
  console.log('Artista encontrado:', artist.name);

  resultArtist.classList.remove("hidden");
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  console.log('Termo de busca:', searchTerm);

  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
});
