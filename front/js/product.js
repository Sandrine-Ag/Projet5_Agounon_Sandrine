// la variable params recupere l'url de la page et la variable id récupère la valeur de params id 
const params = new URLSearchParams (document.location.search);
const id = params.get("_id");
console.log(id);

fetch("http://localhost:3000/api/products/"+id)
	.then( res => res.json())
    .then( produit => {

    document.querySelector('.item__img').innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`
    document.querySelector('#title').textContent = produit.name
    document.querySelector('#price').textContent = produit.price
    document.querySelector('#description').textContent = produit.description

    produit.colors.forEach(item => {
        document.querySelector('#colors').innerHTML += `<option value="${item}">${item}</option>`
    })

    //on recupere des donnees //
    //ID selection //

    const colorSelect = document.querySelector("#colors");
    const quantityInput = document.querySelector("#quantity");

    //Button de panier selection //
    const ajoutAuPanier = document.querySelector("#addToCart");
    // ajout de produit dans le panier  //
	ajoutAuPanier.addEventListener("click", (e) => {
		e.preventDefault();
		// recuperation de valeur de id produit
		let produitClient = {
			id: id,
			quantity: parseInt(quantityInput.value),
			color: colorSelect.value
		};

		//  JSON en objet JS
		let panierStocke= JSON.parse(localStorage.getItem("produit"));
		// Si on trouve produits dans le localStorage
			if (panierStocke) {
				const produitsTrouves = panierStocke.find(
					(element) => element.id == id && element.color == colorSelect.value
				);
		// Si les produits sont les memes , addition des quantitees
			if (produitsTrouves) {
				let choixQuantite = parseInt(produitClient.quantity) 
              + parseInt(produitsTrouves.quantite);
				produitsTrouves.quantite = choixQuantite;
				localStorage.setItem("produit", JSON.stringify(panierStocke));
				return;
			} else {
				panierStocke.push(produitClient);
				localStorage.setItem("produit", JSON.stringify(panierStocke));
			}
		// Si on ne trouve pas de produits
			} else {
				panierStocke = [];
				panierStocke.push(produitClient);
				localStorage.setItem("produit", JSON.stringify(panierStocke));
				}
		});
})
