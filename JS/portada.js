const d = document,
    $main = d.querySelector("main"),
    $links = d.querySelector(".links");

let rickandMorty = "https://rickandmortyapi.com/api/character";
async function rickandmortyapi(url) {
    try {
        $main.innerHTML = `<img class="loader" src="../img/loader.svg" alt="Cargando...">`;
        let res = await fetch(url),
            json = await res.json(),
            $template = "",
            $prevLink,
            $nextLink;
        if (!res.ok)
            throw {
                status: res.status,
                statusText: res.statusText,
            };
        for (let i = 0; i < json.results.length; i++) {
            try {
                let res = await fetch(json.results[i].url),
                    rick = await res.json();
                $template += `

<figure class="rm-row" id="rm-row">    
<div class="card mb-3" style="max-width: 600px;">
 <div class="row g-0">
   <div class="col-md-4">
    <img src="${rick.image}" class="img-fluid rounded-start" alt="...">
   </div>
    <div class="col-md-8">
      <div class="card-body">
        <h3 class="card-title">${rick.name} (${rick.species})</h3>
        <h5><p class="card-text">${rick.location.name}</p></h5>
        <h6><p class="card-text">ID:${rick.id}</p></h6>
        <h4><p class="card-text">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <span class="material-symbols-outlined">radio_button_checked</span>
        <small class="text-muted" class="badge bg-danger">${rick.status}</small></p></h4>
        <button type="button" class="btn btn-dark mx-auto d-grid btn-sm" type="button" data-toggle='modal' data-target='#modal' >More</button>
      </div>
    </div>
 </div>
</div>

<div class="modal" tabindex="-1" id="modal" >
 <div class="modal-dialog">
   <div class="modal-content">
     <div class="modal-header">
       <h5 class="modal-name container text-center">${rick.name} (${rick.species})</h5>
       <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
     </div>
     <div class="body">
     <div class="grid text-center">
        <div class="g-col-6">
          <img src="${rick.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="g-col-6">
          <p class="modal-id">Id: ${rick.id}</p>
          <p class="modal-gender">Gender: ${rick.gender}</p>
          <p class="modal-type">Type: ${rick.type}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
   </div>
 </div>
</div>
</figure>`;
            } catch (err) {
                let message = err.statusText || "ocurrio un error";
                $template += `
<figure>
<figcaption>Error ${err.status}: ${message}</figcaption>
</figure>`;
            }
        }

        $main.innerHTML = $template;
        $prevLink = json.info.prev ?
            `<a href="${json.info.prev}"> <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,1,-25" />skip_previous</span></a>` :
            "";
        $nextLink = json.info.next ?
            `<a  href="${json.info.next}"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,1,-25" /><span class="material-symbols-outlined">skip_next</span></a>` :
            "";
        $links.innerHTML = $prevLink + "" + $nextLink;
    } catch (err) {
        let message = err.statusText || "ocurrio un error";
        $main.innerHTML = `<p>Error ${err.status}:${message}</p>`;
    }
}
d.addEventListener("DOMContentLoaded", (e) => rickandmortyapi(rickandMorty));
d.addEventListener("click", (e) => {
    if (e.target.matches(".links a")) {
        e.preventDefault();
        rickandmortyapi(e.target.getAttribute("href"));
    }
});

function redirect() {
    window.location.href = "https://github.com/DeshiH/API-RickandMorty-Team";
}