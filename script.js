document.addEventListener("DOMContentLoaded", function () {

    const prixProduits = {
        "Huile de Neem 200ml": 3450,
        "Huile de Neem 300ml": 5000,
        "Beurre de Karite 100ml": 1500,
        "Beurre de Karite 250ml": 2500,
        "Huile de Chébé 100ml": 2000,
        "Huile de Chébé 250ml": 3500
    };

    const produitsPanier = document.getElementById("produitsPanier");
    const totalCommande = document.getElementById("totalCommande");
    const form = document.getElementById("orderForm");

    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let texte = "";
    let total = 0;

    panier.forEach(item => {
        texte += `${item.produit} - Quantité : ${item.quantite}\n`;
        total += prixProduits[item.produit] * item.quantite;
    });

    if (produitsPanier) produitsPanier.value = texte;
    if (totalCommande) totalCommande.innerText = total;

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const nom = form.nom.value;
            const tel = form.tel.value;
            const ville = form.ville.value;
            const message = form.message.value;

            const whatsappMessage = 
`🟢 NOUVELLE COMMANDE WEZON CARE
👤 Nom : ${nom}
📞 Téléphone : ${tel}
🏠 Ville : ${ville}

🛒 Produits :
${texte}

💰 Total : ${total} FCFA

📝 Message :
${message}

Merci pour votre commande ! 🌿`;

            window.open(
                "https://wa.me/237696893347?text=" + encodeURIComponent(whatsappMessage),
                "_blank"
            );

            alert("Commande envoyée avec succès 🙏");

            localStorage.removeItem("panier");
            form.reset();
        });
    }
});
