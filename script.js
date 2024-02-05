const container = document.getElementById("container")
let currentPage = 1;
let totalPages = 0;
let generoActual = ''; 



const personajesBtn= document.getElementById("personajes")
const femeninoBtn= document.getElementById("femenino")
const masculinoBtn= document.getElementById("masculino")
const indistintoBtn= document.getElementById("indistinto")
const desconocidoBtn= document.getElementById("desconocido")

const getCharacters=(pageNumber)=>{ 

container.innerHTML="";
fetch (`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)
.then(res => res.json())
.then((data) => {
renderCharacters(data)
totalPages=data.info.pages;
 })
}


getCharacters(currentPage)

const renderCharacters=(data)=>{
container.innerHTML=""
console.log(data)
data.results.forEach(characters => {
container.innerHTML +=
   `  <div class="card" style="width: 18rem;">
   <img src="${characters.image}" class="card-img-top" alt="...">
   <div class="card-body">
    <h5 class="card-title">${characters.name}</h5>
   <button class="button" onclick=verDescripcion("${characters.url}")>ver mas</button>
   </div>
</div>`
        
    });
}
const verDescripcion=(charactersUrl) =>{
    container.innerHTML=""
    fetch(charactersUrl)
    .then(res=>res.json())
   .then((character)=>{
    container.innerHTML+=`
    <div class="card" style="width: 18rem;">
    <img src="${character.image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${character.name}</h5>
    <p class="card-text"><b>genero:</b>${character.gender}</p>
    <p class="card-text"><b>especie:</b>${character.species}</p>
    <p class="card-text"><b>estado:</b>${character.status}</p>
    <p class="card-text"><b>origen:</b>${character.origin.name}</p>
    <p class="card-text"><b>locacion:</b>${character.location.name}</p>
    <button class="button" onclick=volver()>atras</button>
   
    </div>
    </div>
    `
   });
}
const volver=()=>{
    window.history.back
    location.reload();

}

const currentPageElement = document.getElementById("currentPage");
const totalPagesElement = document.getElementById("totalPages");
const firstBtn = document.getElementById("paginaPrincipal");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("previousBtn");
const lastBtn = document.getElementById("ultimaPagina");

const filterCharacters = () => {
    fetch(`https://rickandmortyapi.com/api/character/?gender=${generoActual}&page=${currentPage}`)
        .then(res => res.json())
        .then(data => {
            renderCharacters(data)
            totalPages = data.info.pages;
            updatePaginationInfo();
        })
}

const updatePaginationInfo = () => {
    currentPageElement.textContent = currentPage;
    totalPagesElement.textContent = totalPages;

    
    firstBtn.disabled = (currentPage === 1);
    prevBtn.disabled = (currentPage === 1);
    nextBtn.disabled = (currentPage === totalPages);
    lastBtn.disabled = (currentPage === totalPages);
};

nextBtn.addEventListener("click", () => {
    currentPage++;
    filterCharacters();
});

prevBtn.addEventListener("click", () => {
    currentPage--;
    filterCharacters();
});

lastBtn.addEventListener("click", () => {
    currentPage = totalPages;
    filterCharacters();
});

firstBtn.addEventListener("click", () => {
    currentPage = 1;
    filterCharacters();
});


filterCharacters();



femeninoBtn.addEventListener("click",()=> {
    currentPage = 1
    generoActual = "female"
    filterCharacters()
    
})
 
masculinoBtn.addEventListener("click",()=> {
    currentPage = 1
    generoActual = "male"
    filterCharacters()
})

indistintoBtn.addEventListener("click",()=> {
    currentPage = 1
    generoActual = "genderless"
    filterCharacters() 
})
personajesBtn.addEventListener("click", () => {
    currentPage = 1;
    generoActual = ''; 
    filterCharacters(); 
    
  });
  desconocidoBtn.addEventListener("click",()=> {
    currentPage = 1
    generoActual = "unknown"
    filterCharacters()
    
})


