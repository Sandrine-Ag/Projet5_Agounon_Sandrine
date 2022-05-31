// definition des variables
let items = document.querySelector("#cart__items");
let produit = JSON.parse(localStorage.getItem("produit"));
let produitArray = [];

// fonction afficher panier pour recuperer les donnees dans le localstorage
function afficherPanier() {
  // definition de prix total et total quantite article
  let prixTotal = 0;
  let quantiteTotal = 0;

  // boucle pour calculer le prix total et quantite produit
  for (let pq = 0; pq < produit.length; pq++) {
      prixTotal += (produit[pq].produitsClientsPrice * parseInt(produit[pq].produitsClientsQuantite));
      quantiteTotal += parseInt(produit[pq].produitsClientsQuantite)};
	    // Repartition des donnees
	    //On itere sur un tableau vide de base qui se rempli avec le html pour chaque produit.
	    for (let a = 0; a < produit.length; a++) {
		    const produitHTML =
			`
        <article class="cart__item" data-id="${produit[a].produitsClientsId}" data-color="${produit[a].produitsClientsCouleur}">
            <div class="cart__item__img">
                <img src="${produit[a].produitsClientsImage}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${produit[a].produitsClientsName}</h2>
					          <p>${produit[a].produitsClientsCouleur}</p>
                    <p>${produit[a].produitsClientsPrice}</p>
                </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
											produit[a].produitsClientsQuantite
										}">
                </div>                                                                                                                                        
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
        </article> `;
        items.innerHTML += produitHTML;
      }
    // on affiche le total quantite (article) et le total prix dans la partie correspondante dans le html
    let totalQuantiteHtml = document.getElementById("totalQuantity");
     totalQuantiteHtml.textContent = quantiteTotal;

    let totalPriceHtml = document.getElementById("totalPrice");
     totalPriceHtml.textContent = prixTotal;
}
afficherPanier();

// supprimer au clic un produit

function supprimerProduit() {
  // ........au clic du boutton supprimer, le produit voulant etre supprimer sur la page panier
  // doit disparaitre dans le dom. Pour se faire on prend le plus proche element parent, on recupere
  // le id du produit qu'on enleve du dom..........
  const elementsSupprimes = document.querySelectorAll(".deleteItem");
  for (let q = 0; q < elementsSupprimes.length; q++) {
		elementsSupprimes[q].addEventListener('click', (event) => {
			event.preventDefault();
      const parentArticle = event.target.closest(".cart__item");      
      const produitModifieId = parentArticle.getAttribute("data-id");
      const produitModifieCouleur = parentArticle.getAttribute("data-color");
      // on definit à nouveau le prix et la quantite total 
      let quantiteTotal = 0;
      let prixTotal = 0;
      // ........on fait une boucle si le produit selectionne pour suppression a un id
      // correspond à celui ci, retire ce dernier dans le tableau  
      for (let index = 0; index < produit.length; index++) {
        if(produit[index].produitsClientsId == produitModifieId && produit[index].produitsClientsCouleur == produitModifieCouleur){
          produit.splice(index, 1);
        }
      }
      // sauvegarde le changement dans le localstorage
      localStorage.setItem("produit", JSON.stringify(produit));
      parentArticle.remove();
      // on recalcule à nouveau le prix et la quantite total
      for (let index = 0; index < produit.length; index++) {
        prixTotal += (produit[index].produitsClientsPrice * parseInt(produit[index].produitsClientsQuantite));
        quantiteTotal += parseInt(produit[index].produitsClientsQuantite);
      }
      //on affiche le total quantite (article) et le total prix dans la partie correspondante dans le html 
      let totalQuantiteHtml = document.getElementById("totalQuantity");
      totalQuantiteHtml.textContent = quantiteTotal;

      let totalPriceHtml = document.getElementById("totalPrice");
      totalPriceHtml.textContent = prixTotal;
   });
  }
};
supprimerProduit();

// changement de la quantite de produits
function changerQuantite() {
  // ....au changement de quantite (+ ou -) on veut qu'il y ait changement dans le localstorage
  // au niveau de la quantite du produit id change ensuite on sauvegarde pour qu'au rafraichissement
  // de la page la quantite changee reste la meme sur la page panier ainsi que dans le local storage
  // tout en donnant le nouveau prix et la quantite total des articles (produits)
	let inputQuantites = document.querySelectorAll('.itemQuantity');
	for (let q = 0; q < inputQuantites.length; q++) {
		inputQuantites[q].addEventListener('change', (event) => {
			event.preventDefault();
      // ....on fait une boucle et on ecoute le changement qui va se produire
      // Pour se faire on prend le plus proche element parent, on recupere
      // le id du produit sur lequel le changement veut etre effectue
      const nouvelleQuantite =  event.target.value;
      const parentArticle = event.target.closest(".cart__item");
      const produitModifieId = parentArticle.getAttribute("data-id");
      const produitModifieCouleur = parentArticle.getAttribute("data-color");
      // on definit la quantite et le prix total
      let quantiteTotal = 0;
      let prixTotal = 0;
      // on calcule le prix et quantite nouvelle (le produit id qui a recu un changement de quantite)
      for (let index = 0; index < produit.length; index++) {
        // si dans produit, produit id selectionne correspond au produit id dont la quantite a ete changee
        // donc dans produit, donne la valeur de la quantite nouvelle a la quantite du produit quantite selectionne
        if(produit[index].produitsClientsId == produitModifieId && produit[index].produitsClientsCouleur == produitModifieCouleur){
          produit[index].produitsClientsQuantite = nouvelleQuantite;
        } 
        prixTotal += (produit[index].produitsClientsPrice * parseInt(produit[index].produitsClientsQuantite));
        quantiteTotal += parseInt(produit[index].produitsClientsQuantite);
      }
      //on affiche le total quantite (article) et le total prix dans la partie correspondante dans le html 
      let totalQuantiteHtml = document.getElementById("totalQuantity");
      totalQuantiteHtml.textContent = quantiteTotal;
      let totalPriceHtml = document.getElementById("totalPrice");
      totalPriceHtml.textContent = prixTotal;
      // on sauvergarde le changement dans le localstorage
      localStorage.setItem("produit", JSON.stringify(produit))
		});
	} 
}
changerQuantite();


// remplir les champs vides
// remplissage partie prenom
let isPrenomValid = false;
function validerPrenom (){
  let prenom = document.getElementById("firstName")
  prenom.addEventListener("change",() => {
    let RegExpPrenom = new RegExp(/^[A-Za-z]{3,20}$/);
    let messageErreur = document.getElementById("firstNameErrorMsg");
    if (RegExpPrenom.test(prenom.value) ==true){
      messageErreur.innerHTML = "";
      isPrenomValid = true;
    }else {
      messageErreur.innerHTML = "Le prénom est invalide";
      isPrenomValid = false;
    }
  })
}
validerPrenom();

// remplissage partie nom
let isNomValid = false;
function validerNom (){
  let nom = document.getElementById("lastName")
  nom.addEventListener("change",() => {
    let RegExpNom = new RegExp(/^[A-Za-z]{3,20}$/);
    let messageErreur = document.getElementById("lastNameErrorMsg");
    if (RegExpNom.test(nom.value) ==true){
      messageErreur.innerHTML = "";
      isNomValid = true;
    }else {
      messageErreur.innerHTML = "Le nom est invalide";
      isNomValid = false;
    }
  })
}
validerNom();

// remplissage partie adresse
let isAddressValid = false;
function validerAdresse (){
  let adresse = document.getElementById("address")
  adresse.addEventListener("change",() => {
    let RegExpAdresse = new RegExp(/^[A-Za-z0-9]{5,50}$/);
    let messageErreur = document.getElementById("addressErrorMsg");
    if (RegExpAdresse.test(adresse.value) ==true){
      messageErreur.innerHTML = "";
      isAddressValid = true;
    }else {
      messageErreur.innerHTML = "L'adresse est invalide";
      isAddressValid = false;
    }
  })
}
validerAdresse();

// remplissage partie ville
let isVilleValid = false;
function validerVille(){
  let ville = document.getElementById("city")
  ville.addEventListener("change",() => {
    let RegExpVille = new RegExp(/^[A-Za-z]{3,20}$/);
    let messageErreur = document.getElementById("cityErrorMsg");
    if (RegExpVille.test(ville.value) ==true){
      messageErreur.innerHTML = "";
      isVilleValid =  true;
    }else {
      messageErreur.innerHTML = "La ville est invalide";
      isVilleValid = false;
    }
  })
}
validerVille();

// remplissage partie e-mail
let isEmailValid = false;
function validerEmail(){
  let email = document.getElementById("email")
  email.addEventListener("change",() => {
    let RegExpEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/);
    let messageErreur = document.getElementById("emailErrorMsg");
    if (RegExpEmail.test(email.value) == true){
      messageErreur.innerHTML = "";
      isEmailValid = true;
    }else {
      messageErreur.innerHTML = "L'email est invalide";
      isEmailValid = false;
    }
  })
}
validerEmail();


// commande 
// Ecouter la soumission du formulaire

function ajouterCommande (){
  let bouttonCommande = document.getElementById("order");
  
  bouttonCommande.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      // Vérification des champs du formulaire
      isEmailValid &&
      isAddressValid &&
      isVilleValid &&
      isNomValid &&
      isPrenomValid
    ){
      // Récupération des valeurs du formulaire
      const formulaireContact = {
        firstName: document.querySelector('#firstName').value,
        lastName: document.querySelector('#lastName').value,
        address: document.querySelector('#address').value,
        city: document.querySelector('#city').value,
        email: document.querySelector('#email').value,
      };

      const produitIDs = [];
      for (let index = 0; index < produit.length; index++) {
       produitIDs.push(produit[index].produitsClientsId);
      }
      
      const objetCommande = {
        contact: formulaireContact,
        products: produitIDs
      };

      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(objetCommande),
        headers: {
          "Content-Type" : "application/json",
        },
      })
      .then((res) => res.json())
      .then((resJson) => {

        //Rediriger maintenant l'utilisateur sur la page confirmation avec le orderId dans l'URL
        //Pour pourvoir le recuperer et l'afficher dans la page confirmation
        document.location.href = `./confirmation.html?orderId=${resJson.orderId}`;
      })
      .catch((err) => {
        console.log(err)
      });
    }
  })
}
ajouterCommande();


















