let nouveauLivre = document.querySelector(".h2");
let PageTitle = document.querySelector(".h1");
const contentBook = document.getElementById("content");
const container = document.getElementById("myBooks");
const maPochListe = document.getElementById("poch-list");

// fonction du bouton "ajouter un livre"
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
  document.getElementById('addButton').addEventListener('click', function() {
    searchBook();
    loadPochList();
    
  })

}
addBookButton();

function createAllEventListner() {

  
  document.getElementById('searchButton').addEventListener('click', function() {
    searchBook();
     
  })
  document.getElementById('cancelButton').addEventListener('click', function() {
      cancelSearch();
      
  })

}

// formulaire de recherche
function addSearchForm() {
  const addBookDiv = document.querySelector(".addBook");
  addBookDiv.innerHTML = `
  <form id="search-card" onsubmit="searchResults(); return false;">
    <div class="form-group">
      <label class="bookTitle" for="title"> Titre du Livre </label>
    
      <input class="row-s-8 form-control" type="text" name="title" id="title" placeholder="Titre" > </br>
    
      <label class="bookAuthor" for="author">Auteur</label>
  
      <input class="form-control" type="text" name="author" id="author" placeholder="Auteur" > 
    
      <div class="button2"><br>
        <button type="button" id="searchButton" class="searchButton"> Rechercher </button>
      </div><br>

      <div class="button3">
        <button type="button" id="cancelButton" class="cancelButton"> Annuler </button>
      </div><br>
    </div>
  </form>`;
  createAllEventListner();
}


function searchBook() {

    var url = "https://www.googleapis.com/books/v1/volumes?q=";
    var title= document.getElementById('title').value;
    console.log(title);
    url=url+title;
    var author= document.getElementById('author').value;
    console.log(author);
    url=url+author;

  fetch(url)
    .then((res) => res.json())
    .then((results) => {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'card-container';

      const search = results.items;
      search.map((book) => {
      

      const card = document.createElement('div');
      card.className = 'card';

      const idBookCard = document.createElement('h4');
      idBookCard.innerText = "Id : " + book.id;
      idBookCard.className = 'card-id';

      const titleBookCard = document.createElement('h4');
      titleBookCard.innerText = "Titre : " + book.volumeInfo.title;
      titleBookCard.className = 'card-title';

      const authorBookCard = document.createElement('p');
      authorBookCard.innerText = "Auteur : " + book.volumeInfo.authors;
      authorBookCard.className = 'card-author';
      if (book.volumeInfo.authors > 1) {
        book.volumeInfo.authors = book.volumeInfo.authors.slice(0, 2);
      }

        const descriptionBookCard = document.createElement('p');
        descriptionBookCard.innerText = "Description : " + book.volumeInfo.description;
        descriptionBookCard.className = 'card-description';
        if (descriptionBookCard === '' || descriptionBookCard === 'undefined') {
          descriptionBookCard.innerText = "Information manquante";
        } else if (descriptionBookCard.innerText.length > 200) {
          descriptionBookCard.innerText = descriptionBookCard.innerText.substring(0, 200) + '...';
        }
        const bookMarks = document.createElement('i');
        bookMarks.className = 'fas fa-bookmark';

        const headerCard = document.createElement('div');
        headerCard.className = 'card-header';
        headerCard.appendChild(titleBookCard);
        headerCard.appendChild(bookMarks);


        const imgCard = document.createElement('img');
        imgCard.className = 'card-img';

        if (book.volumeInfo.imageLinks === null || book.volumeInfo.imageLinks === undefined) {
          imgCard.src = 'logos/unavailable.png';
        } else {
          imgCard.src = book.volumeInfo.imageLinks.thumbnail;
        }

        const deleteCard = document.createElement('i');
        deleteCard.className = 'fas fa-trash-alt';

        cardContainer.appendChild(card);
        card.appendChild(headerCard);
        card.appendChild(idBookCard);
        card.appendChild(authorBookCard);
        card.appendChild(descriptionBookCard);
        card.appendChild(imgCard);



       
      });
      const titlePochList = document.createElement('h2');
      titlePochList.id = 'titlePochList';
      titlePochList.className = 'h2';
      titlePochList.innerHTML = "Résultats de la recherche";
      const cardWrapper = document.createElement('div');
      cardWrapper.appendChild(titlePochList);
      cardWrapper.appendChild(cardContainer);
      const content = document.getElementById("content");
      content.insertBefore(cardWrapper, content.childNodes[0]);
    });

}