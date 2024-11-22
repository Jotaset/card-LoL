const url = "https://br1.api.riotgames.com/lol/static-data/v14.23.1/champions?api_key=RGAPI-2a65d21d-c4fc-4ef9-98f6-b9b7fe4992f5"

fetch(url)
.then(response=> response.json())
.then(data => {
  console.log(data.data);
})

.catch(error => {
  console.error("Erro ao fazer a requisiçao:", error);
})