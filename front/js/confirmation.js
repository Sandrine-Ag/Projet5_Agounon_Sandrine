let confirmationCommande = document.querySelector("#orderId");
const params = new URLSearchParams (document.location.search);
const orderId = params.get("orderId");
console.log(orderId);

// Affichage de la commande Id dans span

 function afficherCommandeId() {
	confirmationCommande.innerText = orderId;
}
afficherCommandeId();
