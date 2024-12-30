// Elementos do DOM
const champImage = document.querySelector(".champImg");
const champName = document.querySelector(".champName");
const champResume = document.querySelector(".champResume");
const searchInput = document.getElementById("search");


// URL da API Data Dragon
const version = "13.24.1";
const language = "pt_BR";
const apiUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`;

// Dados dos campeões
let championsData = {};

// Função para carregar os dados dos campeões
async function loadChampions() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        championsData = data.data; // Salva os dados para uso posterior
        displayChampion("Aatrox"); // Exibe o campeão padrão na inicialização
    } catch (error) {
        console.error("Erro ao carregar os dados dos campeões:", error);
    }
}

// Função para exibir os dados de um campeão específico
function displayChampion(championName) {
    const champion = championsData[championName];

    // Atualiza os elementos do DOM com os dados do campeão
    champName.textContent = champion.name;
    champResume.textContent = champion.blurb;

    champImage.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`;
    champImage.alt = `Imagem de ${champion.name}`;
}

// Event listener para a busca de campeões
searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.trim();
    if (searchValue) {
        displayChampion(searchValue.charAt(0).toUpperCase() + searchValue.slice(1).toLowerCase());
    }
});


// Carregar os dados ao inicializar
loadChampions();