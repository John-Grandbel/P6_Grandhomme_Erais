let nouveauLivre = document.querySelector(".h2");
let PageTitle = document.querySelector(".h1");
const contentBook = document.getElementById("content");
const container = document.getElementById("myBooks");
const maPochListe = document.getElementById("poch-list");

// création bouton ajouter un livre
function addBookButton() {
  let addButton = document.createElement("div");
  addButton.innerHTML = `<div class="addBook">
      <button onclick="addSearchForm()" type="button" class="addButton"> Ajouter un livre </button>
    </div>`;

  container.appendChild(addButton);
  nouveauLivre.after(addButton);
  }
  


function cancelSearch() {
  const addBookDiv = document.querySelector(".addBook");
  addBookDiv.innerHTML = `
  <button type="button" id="addButton" class="addButton">Ajouter un livre</button>`;

}
addBookButton();
