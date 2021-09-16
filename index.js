/* eslint-disable no-use-before-define */
// import {DateTime } from "luxon";

class AwesomeBook {
  DateTime = luxon.DateTime;
  dt = this.DateTime.now();

  library = [];

  setLocalStorage() {
    localStorage.setItem('library', JSON.stringify(this.library));
  }

  getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('library'));

    if (!data) return;

    this.library = data;
  }

  displayTime() {
    const span = document.createElement('span');
    const mainTitle = document.querySelector('.main-title');

    let dateToDisplay = this.dt.toLocaleString(this.DateTime.DATETIME_FULL_WITH_SECONDS);
    dateToDisplay = dateToDisplay.replace("AST", "")
    span.innerHTML = dateToDisplay

    mainTitle.style.position = "relative";
    span.style.position = "absolute";
    span.style.right = '1rem';
    span.style.top = '4rem';
    mainTitle.style.marginTop = "3rem"; 

    mainTitle.insertAdjacentElement("afterend", span);
  }

  displayBooks(library) {
    const booklist = document.querySelector('.book-list');
    
    this.displayTime();

    if (booklist.hasChildNodes()) {
      const nodesArray = document.querySelectorAll('li');
      nodesArray.forEach((node) => {
        booklist.removeChild(node);
      });
    }
    if (library.length > 0) {
      library.forEach((book, index) => {
        const li = document.createElement('li');
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const p1 = document.createElement('p');
        const span = document.createElement('span');
        const p2 = document.createElement('p');
        const removeBtn = document.createElement('button');

        p1.innerHTML = `"${book.title}"`;
        span.innerHTML = 'by';
        p2.innerHTML = book.author;
        removeBtn.innerHTML = 'Remove';

        if (AwesomeBook.isOdd(index)) {
          li.classList.add('list-group-item-dark');
        }

        li.classList.add('list-group-item');
        li.classList.add('row-line');
        div1.classList.add('div1');
        removeBtn.classList.add('remove-button');
        removeBtn.classList.add('btn');
        removeBtn.classList.add('btn-danger');

        div1.appendChild(p1);
        div1.appendChild(span);
        div1.appendChild(p2);
        div2.appendChild(removeBtn);
        li.appendChild(div1);
        li.appendChild(div2);
        booklist.appendChild(li);
      });
    }

    const allDeleteButtons = document.querySelectorAll('.remove-button');

    if (allDeleteButtons.length > 0) {
      allDeleteButtons.forEach((button) => {
        button.addEventListener('click', this.deleteThisBook.bind(this));
      });
    }
  }

  static isOdd(i) {
    return i % 2 === 0;
  }

  Book(title, author) {
    this.library.push({ title, author });

    this.setLocalStorage();

    this.displayBooks(this.library);
  }

  removeBook(title) {
    this.library = this.library.filter((book) => book.title !== title);
    localStorage.removeItem('library');
    this.setLocalStorage();
    this.getLocalStorage();
  }

  deleteThisBook(button) {
    const titleToDelete = button.target.parentNode.parentNode.firstElementChild.firstElementChild.innerHTML.replace('"', '').replace('"', '');
    this.removeBook(titleToDelete);
    this.displayBooks(this.library);
  }

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
    this.Book(titleBook, authorBook);
    document.getElementById('titleBook').value = '';
    document.getElementById('authorBook').value = '';

    errorP = document.querySelector('.error-p');
    if (errorP !== null) {
      errorP.remove();
    }
  }

  main() {
    document.addEventListener('DOMContentLoaded', () => {
      const addBookBtn = document.querySelector('.addBook');

      addBookBtn.addEventListener('click', () => {
        this.addBook();
      });

      this.getLocalStorage();
      this.displayBooks(this.library);
    });
  }
}

const awesomeBook = new AwesomeBook();

awesomeBook.main();

