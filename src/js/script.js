// Elementos do DOM
const champImage = document.querySelector(".champImg");
const champName = document.querySelector(".champName");
const champResume = document.querySelector(".champResume");
const searchInput = document.getElementById("search");

// URL da API Data Dragon
const version = "14.24.1";
const language = "pt_BR";
const apiUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`;

// Dados dos campeões
let championsData = {};

// Alias para nomes específicos
const aliases = {
    "miss fortune": "MissFortune", // Com espaço
    "missfortune": "MissFortune", // Sem espaço
    "mf": "MissFortune",          // Apelido comum
    "lilia": "Lillia", 
    "fidle": "Fiddlesticks",
    "evelin": "Evelynn",
    "smolder": "Smolder"
    // Adicione mais aliases conforme necessário
};

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
    // Normaliza a entrada do usuário
    const normalizedSearch = championName.trim().toLowerCase();

    // Verifica se o nome buscado tem um alias
    const championKey = aliases[normalizedSearch] || normalizedSearch;

    // Busca o campeão nos dados
    const champion = Object.values(championsData).find(champ => 
        champ.id.toLowerCase() === championKey.toLowerCase()
    );

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
        displayChampion(searchValue);
    }
});

// Carregar os dados ao inicializar
loadChampions();
