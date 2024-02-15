let book_list = [];
let count = 0;

function Book(number, title, author, pages, genre) {        //Constructor function to create new book
    this.number = number;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
}

function createBookDiv(book) {                              //Creating Book division to display on webpage
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <p>${book.number}</p>
    <p>${book.title}</p>
    <p>${book.author}</p>
    <p>${book.pages}</p>
    <p>${book.genre}</p>`;
    return newDiv
}

let mainContainer = document.querySelector(".main-container");  //Container holding all Books
let viewAllButton = document.querySelector(".view-all button"); //View all Button
let searchForm = document.querySelector(".search form");            //Search form
let addBookForm = document.querySelector(".add-book form");         //Add book form
let addInputs = document.querySelectorAll(".add input");              //For Title, Author, Pages and Genre details

function defaultHTML() {                                        //To avoid redundancies
    mainContainer.innerHTML = `
        <div class="title">
            <h2>S.No</h2>
            <h2>Title</h2>
            <h2>Author</h2>
            <h2>Pages</h2>
            <h2>Genre</h2>
        </div>`;
}

function displayBooks() {
    let length = book_list.length;
    for(let i=0; i<length; i++) {
        mainContainer.appendChild(createBookDiv(book_list[i]));
    }
}

viewAllButton.addEventListener("click", ()=> {
    defaultHTML();
    displayBooks();
})

searchForm.addEventListener("submit", (e)=> {                       //Event Listener to display specific book asked by user
    e.preventDefault();     //To prevent default submission of input type submit
    let searchValue = document.querySelector("#search-box").value;  //Value of search input
    defaultHTML();
    let length = book_list.length;
    let found = 0;
    for(let i=0; i<length; i++) {
        if(book_list[i].title == searchValue) {
            mainContainer.appendChild(createBookDiv(book_list[i]));
            found++;
        }
    }
    if(found == 0) {
        alert("Sorry, Searched Book Not Found");
        displayBooks();
    }
})

addBookForm.addEventListener("submit", (e)=> {                  //Adding book
    e.preventDefault();
    let newBook = new Book(++count, addInputs[0].value, addInputs[1].value, addInputs[2].value, addInputs[3].value);
    book_list.push(newBook);
    defaultHTML();
    displayBooks();
    for(let i=0; i<4; i++) {            //To empty Inputs in add book form after submit
        addInputs[i].value = "";
    }
})