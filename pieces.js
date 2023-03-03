import { ajoutListenersAvis,ajoutListenerEnvoyerAvis,afficherGraphiqueAvis} from "./avis.js";
let pieces = window.localStorage.getItem("pieces");
if (pieces === null)
{
    const pieces = await fetch('http://localhost:8081/pieces').then(pieces =>pieces.json());
    const valeursPieces = JSON.stringify(pieces);
    window.localStorage.setItem("pieces",valeursPieces);
}else{
    pieces = JSON.parse(pieces);
}
ajoutListenerEnvoyerAvis();
function genererPieces(pieces){
for(let i = 0;i < pieces.length; i++)
{
    const sectionFiches = document.querySelector(".fiches");
    const pieceElement = document.createElement("article");
    pieceElement.dataset.id = pieces[i].id
    const imageElement = document.createElement("img");
    imageElement.src = pieces[i].image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = pieces[i].nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = pieces[i].categorie ?? "Aucune catégorie";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment.";
    const stockElement = document.createElement("p");
    stockElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";

    const avisBouton = document.createElement("button");
    avisBouton.classList.add('btn');
    avisBouton.classList.add('btn-success');
    avisBouton.dataset.id = pieces[i].id;
    avisBouton.textContent = "Afficher les avis";

    pieceElement.classList.add('card');
    imageElement.style.height = '200px';
    imageElement.style.marginLeft = "auto";
    imageElement.style.marginRight = "auto";
    nomElement.classList.add('card-title');
    prixElement.classList.add('card-text');
    categorieElement.classList.add('card-text');
    descriptionElement.classList.add('card-text');
    stockElement.classList.add('card-text');

    sectionFiches.appendChild(pieceElement);
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);
    pieceElement.appendChild(avisBouton);
    }
    
}
genererPieces(pieces);
ajoutListenersAvis();
const boutonTrier = document.querySelector('.btn-trier');
boutonTrier.addEventListener('click',() =>{
const piecesOrdonnes = Array.from(pieces);
piecesOrdonnes.sort(function (a,b) {
    return a.prix - b.prix;
    
 });
document.querySelector('.fiches').innerHTML ="";
genererPieces(piecesOrdonnes);
})

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.prix <= 35;
   });
   document.querySelector('.fiches').innerHTML ="";
   genererPieces(piecesFiltrees);
   });

const boutonDescript = document.querySelector('.btn-descript');
boutonDescript.addEventListener('click',function (){
    const piecesFiltrees = pieces.filter(function (piece){
       return piece.description != null; 
    })
    document.querySelector('.fiches').innerHTML ="";
    genererPieces(piecesFiltrees);
})

const boutonDecroiss = document.querySelector('.btn-decroiss');
boutonDecroiss.addEventListener('click',function(){
    const pieceDecroiss = Array.from(pieces);
    pieceDecroiss.sort(function(a,b){
        return b.prix - a.prix; 
    })
    document.querySelector('.fiches').innerHTML ="";
    genererPieces(pieceDecroiss);
})

const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].prix > 35){
       noms.splice(i,1)
   }
}
console.log(noms);
const nomDisponibilite = pieces.map(piece => piece.nom);
const prixDispo = pieces.map(function (piece){return piece.prix});

for(let i = pieces.length-1; i >=0 ;i--){
    if(pieces[i].disponibilite === false){
        nomDisponibilite.splice(i,1);
        prixDispo.splice(i,1);
    }
}

const liste = document.createElement('ul');
for (let i=0;i<nomDisponibilite.length;i++){
    const elementListe = document.createElement('li');
    elementListe.style.listStyle = "none";
    elementListe.innerText = `${nomDisponibilite[i]} - ${prixDispo[i]}€`
    liste.appendChild(elementListe);
}
const rangeElt = document.querySelector('#Range');
rangeElt.addEventListener('input',()=>{
    const piecesFiltrees = pieces.filter(function (piece){
        return piece.prix <= rangeElt.value;
    })
    document.querySelector('.fiches').innerHTML = "";
    genererPieces(piecesFiltrees);
})
afficherGraphiqueAvis();



