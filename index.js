let library = [];

const Book = (title, author) => {
  library.push({ title, author });
};

const removeBook = (title) => {
  library = library.filter((book) => book.title !== title);
};

const booklist = document.querySelector('.book-list');
const addBookBtn = document.querySelector('.addBook');

const displayBook = (library) => {
  if (booklist.hasChildNodes()) {
    const nodeArray = document.querySelectorAll('li');
    nodeArray.forEach((node) => {
        booklist.removeChild(node);
    })
  }
  if (library.length > 0) {
    library.forEach((book) => {
      let li = document.createElement('li');
      li.innerHTML = book.title;
      booklist.appendChild(li);
    });
  }
};

const addBook = () => {
  let titleBook = document.getElementById('titleBook').value;
  let authorBook = document.getElementById('authorBook').value;
  Book(titleBook, authorBook);
  displayBook(library);
};

addBookBtn.addEventListener('click', () => {
  addBook();
});
