let rickandMorty = {
    render: () => {


        let urlAPI = "https://rickandmortyapi.com/api/character/?page=19";
        let container = document.querySelector('#marvel-row');
        let containerHTML = ''

        fetch(urlAPI)
            .then(res => res.json())
            .then((json) => {

                console.log(json.results)
                json.results.forEach(rickandMorty => {

                    container.insertAdjacentHTML("beforeend",


                        `

<div class="card mb-3" style="max-width: 500px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${rickandMorty.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${rickandMorty.name} (${rickandMorty.species})</h5>
        <p class="card-text">${rickandMorty.location.name}</p>
        <p class="card-text"><small class="text-muted">${rickandMorty.status}</small></p>
      </div>
    </div>
  </div>
</div>`)




                    /* `<div class="card" style="width: 25% ;">
            <div class="image-container" style="width: 25% ;">
            <img src="${rickandMorty.image}" alt="Personaje" style="width: 250px;">
            </div>
                   
            <div class="card-body">
            <h5 class="card-title">${rickandMorty.name}</h5>   
            <a href="#" class="btn btn-primary">More info</a>            
            </div>`) */
                });
            })
    }
};
rickandMorty.render();