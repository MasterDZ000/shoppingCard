document.addEventListener('DOMContentLoaded', () => {
    //updateTotalPrice: Cette fonction calcule le prix total en additionnant les produits des prix unitaires et des quantités de tous les articles.
    const updateTotalPrice = () => {
      let totalPrice = 0;
      document.querySelectorAll('.card-body').forEach(card => {
        const unitPrice = parseFloat(card.querySelector('.unit-price').innerText.replace(' $', ''));
        const quantity = parseInt(card.querySelector('.quantity').innerText);
        totalPrice += unitPrice * quantity;
      });
      document.querySelector('.total').innerText = `${totalPrice} $`;
    };
  
    //addEventListeners: Ajoute des écouteurs d'événements aux icônes de "plus", "moins", "poubelle" et "coeur". Ces écouteurs sont ajoutés une seule fois pour éviter les doublons.
    const addEventListeners = () => {
      document.querySelectorAll('.fa-plus-circle').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const quantityElement = e.target.nextElementSibling;
          let quantity = parseInt(quantityElement.innerText);
          quantityElement.innerText = ++quantity;
          updateTotalPrice();
        });
      });
  
      document.querySelectorAll('.fa-minus-circle').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const quantityElement = e.target.previousElementSibling;
          let quantity = parseInt(quantityElement.innerText);
          if (quantity > 0) {
            quantityElement.innerText = --quantity;
            updateTotalPrice();
          }
        });
      });
  
      document.querySelectorAll('.fa-trash-alt').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const card = e.target.closest('.card-body');
          card.querySelector('.quantity').innerText = 0;
          updateTotalPrice();
        });
      });
  
      document.querySelectorAll('.fa-heart').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.target.classList.toggle('liked');
        });
      });
    };

    //removeEventListeners: Remplace chaque élément avec son clone pour supprimer les écouteurs d'événements existants. Cela empêche les doublons.
    const removeEventListeners = () => {
      document.querySelectorAll('.fa-plus-circle').forEach(btn => {
        btn.replaceWith(btn.cloneNode(true));
      });
      document.querySelectorAll('.fa-minus-circle').forEach(btn => {
        btn.replaceWith(btn.cloneNode(true));
      });
      document.querySelectorAll('.fa-trash-alt').forEach(btn => {
        btn.replaceWith(btn.cloneNode(true));
      });
      document.querySelectorAll('.fa-heart').forEach(btn => {
        btn.replaceWith(btn.cloneNode(true));
      });
    };
  
    //Initialisation: On commence par supprimer les écouteurs d'événements existants puis on ajoute de nouveaux écouteurs.
    removeEventListeners();
    addEventListeners();
  });
  