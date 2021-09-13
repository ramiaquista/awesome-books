/* eslint-disable no-use-before-define */
let library = [];

function setLocalStorage() {
  localStorage.setItem('library', JSON.stringify(library));
}

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem('library'));

  if (!data) return;

  library = data;
}

const displayBook = (library) => {
  const booklist = document.querySelector('.book-list');

  if (booklist.hasChildNodes()) {
    const nodesArray = document.querySelectorAll('li');
    nodesArray.forEach((node) => {
      booklist.removeChild(node);
    });
  }
  if (library.length > 0) {
    library.forEach((book) => {
      const li = document.createElement('li');
      const p1 = document.createElement('p');
      const p2 = document.createElement('p');
      const removeBtn = document.createElement('button');
      const hr = document.createElement('hr');

      p1.innerHTML = book.title;
      p2.innerHTML = book.author;
      removeBtn.innerHTML = 'Remove';
      removeBtn.classList.add('remove-button');
      li.appendChild(p1);
      li.appendChild(p2);
      li.appendChild(removeBtn);
      li.appendChild(hr);
      booklist.appendChild(li);
    });
  }

  const allDeleteButtons = document.querySelectorAll('.remove-button');

  if (allDeleteButtons.length > 0) {
    allDeleteButtons.forEach((button) => {
      button.addEventListener('click', deleteThisBook.bind(this));
    });
  }
};

const Book = (title, author) => {
  library.push({ title, author });

  setLocalStorage();

  displayBook(library);
};

const removeBook = (title) => {
  library = library.filter((book) => book.title !== title);
  localStorage.removeItem('library');
  setLocalStorage();
  getLocalStorage();
};

const deleteThisBook = (button) => {
  const titleToDelete = button.target.parentNode.firstElementChild.innerHTML;
  removeBook(titleToDelete);
  displayBook(library);
};

const addBook = () => {
  const titleBook = document.getElementById('titleBook').value;
  const authorBook = document.getElementById('authorBook').value;
  if (titleBook === '' || authorBook === '') {
    return;
  }
  if (library.length > 0) {
    library.forEach((book) => {
      if (titleBook === book.title) {
        throw new Error('Book already has been already added.');
      }
    });
  }
  Book(titleBook, authorBook);
};

document.addEventListener('DOMContentLoaded', () => {
  const addBookBtn = document.querySelector('.addBook');

  addBookBtn.addEventListener('click', () => {
    addBook();
  });

  getLocalStorage();
  displayBook(library);
});
