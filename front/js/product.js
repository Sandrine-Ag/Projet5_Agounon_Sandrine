let produitImage = document.querySelector(".item__img");
let produitName = document.querySelector("#title");
let produitPrice = document.querySelector("#price");
let produitDescription = document.querySelector("#description");
let produitColors = document.querySelector("#colors");
let quantite = document.querySelector("#quantity");
let ajoutAuPanier = document.querySelector("#addToCart");
let colorValue = document.querySelector("#colors");
// la variable params recupere l'url de la page et la variable id récupère la valeur de params id 

const params = new URLSearchParams (document.location.search);
const id = params.get("_id");
console.log(id);

const idProduit = async () => {
  // on reupère l'ID de produit des donnees de l'API
	await fetch("http://localhost:3000/api/products/"+id)
	.then((res) => res.json())
	.then((objetProduit) => (produitDetail = objetProduit));
	// console.log(produitDetail);

	// maintenant on passe au donnees de l'id du produit
	creationImage = document.createElement('image');
	produitImage.appendChild(creationImage);
	creationImage.src = produitDetail.imageUrl;
	produitName.innerText = produitDetail.name;
	produitPrice.innerText = produitDetail.price;
	produitDescription.innerText = produitDetail.description;

	// on passe maintenant à la selection couleurs + value
	for (let i = 0; i < produitDetail.colors.length; i++) {
		selectionCouleur = document.createElement("option");
		produitColors.appendChild(selectionCouleur);
		selectionCouleur.innerText = produitDetail.colors[i];
		selectionCouleur.setAttribute("value", produitDetail.colors[i]);
	}

	// au clic du bouton ajouter au panier les produits vont dans le localstorage
	function ajouterDansLocalStorage() {
		ajoutAuPanier.addEventListener("click", (e) => {
			e.preventDefault();

			let produitsClients = {
				produitsClientsName: produitDetail.name,
				produitsClientsDescription: produitDetail.description,
				produitsClientsImage: produitDetail.imageUrl,
				produitsClientsAlt: produitDetail.AltTxt,
				produitsClientsPrice: produitDetail.price,
				produitsClientsId:id,
				produitsClientsQuantite: quantity.value,
				produitsClientsCouleur: colorValue.value,
			};
			//  JSON en objet JS
			let panierStocke= JSON.parse(localStorage.getItem("produit"));
			// Si on trouve produits dans le localStorage
				if (panierStocke) {
					const produitsTrouves = panierStocke.find(
						(element) => element.produitsClientsId == id && element.produitsClientsCouleur == colorValue.value
					);
					// Si les produits sont les memes , addition des quantitees
					if (produitsTrouves) {
						let choixQuantite = parseInt(produitsClients.produitsClientsQuantite) 
              + parseInt(produitsTrouves.produitsClientsQuantite);
						produitsTrouves.produitsClientsQuantite = choixQuantite;
						localStorage.setItem("produits", JSON.stringify(panierStocke));
						return;
					} else {
						panierStocke.push(produitsClients);
						localStorage.setItem("produit", JSON.stringify(panierStocke));
					}
					// Si on ne trouve pas de produits
				} else {
					panierStocke = [];
					panierStocke.push(produitsClients);
					localStorage.setItem("produit", JSON.stringify(panierStocke));
				}
		});
	}
	ajouterDansLocalStorage();
};
idProduit();
