/* eslint-disable no-use-before-define */
class AwesomeBook {
  library = [];

  setLocalStorage() {
    localStorage.setItem('library', JSON.stringify(this.library));
  }
  
  getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('library'));
  
    if (!data) return;
  
    this.library = data;
  }
  
  displayBook(library) {
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
    this.library.push({ title, author });
  
    this.setLocalStorage();
  
    displayBook(this.library);
  };
  
  removeBook(title) {
    this.library = this.library.filter((book) => book.title !== title);
    localStorage.removeItem('library');
    this.setLocalStorage();
    this.getLocalStorage();
  };
  
  deleteThisBook(button) {
    const titleToDelete = button.target.parentNode.firstElementChild.innerHTML;
    removeBook(titleToDelete);
    displayBook(this.library);
  };
  
  addBook() {
    let errorP;
    const titleBook = document.getElementById('titleBook').value;
    const authorBook = document.getElementById('authorBook').value;
    const mainTitle = document.querySelector('.main-title');
  
    if (titleBook === '' || authorBook === '') {
      return;
    }
  
    if (this.library.length > 0) {
      this.library.forEach((book) => {
        if (titleBook === book.title) {
          errorP = document.createElement('p');
          errorP.innerHTML = 'Book has already been added.';
          errorP.classList.add('error-p');
  
          if (!document.querySelector('.error-p')) {
            mainTitle.insertAdjacentElement('afterend', errorP);
          }
  
          throw new Error('Book has been already added.');
        }
      });
    }
    Book(titleBook, authorBook);
    errorP = document.querySelector('.error-p');
    errorP.remove();
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    const addBookBtn = document.querySelector('.addBook');
  
    addBookBtn.addEventListener('click', () => {
      addBook();
    });
  
    this.getLocalStorage();
    displayBook(this.library);
  });

}

const awesomeBook = new AwesomeBook();

awesomeBook();


