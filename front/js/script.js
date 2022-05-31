// recuperation des donnees de l'API
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  //j'ai le resulat en json apres la reponse et le resultat obtenu est appele objetProduits
  .then((objetProduits) => {
    console.table(objetProduits);
    // je recupere les informations sous forme de tableau
    afficherKanap(objetProduits);
    // fonction d'affichage des produits
  })
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api:" + err);
    // en cas d'erreur ecrit h1 dans html erreur
  });

  // recuperation des donnees sur la page Index
function afficherKanap(index) {
  let articleArea = document.querySelector("#items");
  for (let article of index) {
    articleArea.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
};
 