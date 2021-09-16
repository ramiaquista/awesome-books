/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */

class AwesomeBook {
  DateTime = luxon.DateTime;

  dt = this.DateTime.now();

  mainClass = document.querySelector('.main');

  mainTitle = document.querySelector('.main-title');

  library = [];

  setLocalStorage() {
    localStorage.setItem('library', JSON.stringify(this.library));
  }

  getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('library'));

    if (!data) return;

    this.library = data;
  }

  addNewBookPage() {
    const form = document.createElement('form');
    const input1 = document.createElement('input');
    const input2 = document.createElement('input');
    const button = document.createElement('button');

    form.classList.add('form-flex');
    input2.classList.add('form-control');
    button.classList.add('addBook');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    input1.classList.add('form-control');

    input1.name = 'title';
    input1.id = 'titleBook';
    input1.placeholder = 'Title';
    input2.name = 'author';
    input2.id = 'authorBook';
    input2.placeholder = 'Author';
    button.type = 'button';

    this.mainTitle.innerHTML = 'Add a new book';
    button.innerHTML = 'Add';

    if (button) {
      button.addEventListener('click', () => {
        this.addBook();
      });
    }

    form.appendChild(input1);
    form.appendChild(input2);
    form.appendChild(button);

    this.mainClass.appendChild(form);
  }

  contactPage() {
    this.mainTitle.innerHTML = 'Contact Information';

    const containerInfo = document.createElement('div');
    const description = document.createElement('p');
    const description2 = document.createElement('p');
    const data = document.createElement('ul');
    const li1 = document.createElement('li');
    const li2 = document.createElement('li');
    const li3 = document.createElement('li');

    containerInfo.classList.add('contact-page');
    description.style.fontSize = '25px';
    description2.style.fontSize = '25px';
    data.style.fontSize = '20px';

    description.innerHTML = 'Do you have any questions or you just want to say "Hello"?';
    description2.innerHTML = 'You can reach out to us!';
    li1.innerHTML = 'Our e-mail: mail@mail.com';
    li2.innerHTML = 'Our phone number 03210312900';
    li3.innerHTML = 'Our address: Streetname 22, 3218 City, Country.';

    data.appendChild(li1);
    data.appendChild(li2);
    data.appendChild(li3);

    containerInfo.appendChild(description);
    containerInfo.appendChild(data);

    this.mainClass.appendChild(containerInfo);
  }

  displayTime() {
    const span = document.createElement('span');
    const mainTitle = document.querySelector('.main-title');

    let dateToDisplay = this.dt.toLocaleString(this.DateTime.DATETIME_FULL_WITH_SECONDS);
    dateToDisplay = dateToDisplay.replace('AST', '').replace('GMT-3', '');
    span.innerHTML = dateToDisplay;

    mainTitle.style.position = 'relative';
    span.style.position = 'absolute';
    span.style.right = '1rem';
    span.style.top = '4rem';
    mainTitle.style.marginTop = '3rem';

    mainTitle.insertAdjacentElement('afterend', span);
  }

  displayBooks(library) {
    const bookList = document.querySelector('.book-list');
    this.mainTitle.innerHTML = 'All awesome books';

    if (bookList.hasChildNodes()) {
      const nodesArray = document.querySelectorAll('list-group-item');
      nodesArray.forEach((node) => {
        bookList.removeChild(node);
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
        bookList.appendChild(li);
      });
    }

    if (this.library.length <= 5) {
      document.querySelector('.main').style.height = '77vh';
    } else {
      document.querySelector('.main').style.height = 'auto';
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
  }

  removeBook(title) {
    this.library = this.library.filter((book) => book.title !== title);
    localStorage.removeItem('library');
    this.setLocalStorage();
    this.getLocalStorage();
    document.querySelector('.book-list').innerHTML = '';
    this.displayBooks(this.library);
  }

  deleteThisBook(button) {
    const titleToDelete = button.target.parentNode.parentNode.firstElementChild.firstElementChild.innerHTML.replace('"', '').replace('"', '');
    this.removeBook(titleToDelete);
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
      const list = document.getElementById('list');
      list.classList.add('active');
      const addBook = document.getElementById('add-new');
      const contact = document.getElementById('contact');

      list.addEventListener('click', () => {
        addBook.classList.remove('active');
        contact.classList.remove('active');
        list.classList.add('active');

        if (!document.querySelector('.list-group-item')) {
          if (document.querySelector('.form-flex')) {
            this.mainClass.removeChild(document.querySelector('.form-flex'));
          }
          if (document.querySelector('.contact-page')) {
            this.mainClass.removeChild(document.querySelector('.contact-page'));
          }

          this.displayBooks(this.library);
        }
      });

      addBook.addEventListener('click', () => {
        list.classList.remove('active');
        contact.classList.remove('active');
        addBook.classList.add('active');

        if (!document.querySelector('.form-flex')) {
          if (document.querySelector('.book-list')) {
            document.querySelector('.book-list').innerHTML = '';
          }

          if (document.querySelector('.contact-page')) {
            this.mainClass.removeChild(document.querySelector('.contact-page'));
          }

          this.addNewBookPage();
        }
      });

      contact.addEventListener('click', () => {
        list.classList.remove('active');
        addBook.classList.remove('active');
        contact.classList.add('active');

        if (!document.querySelector('.contact-page')) {
          if (document.querySelector('.form-flex')) {
            this.mainClass.removeChild(document.querySelector('.form-flex'));
          }

          if (document.querySelector('.book-list')) {
            document.querySelector('.book-list').innerHTML = '';
          }

          this.contactPage();
        }
      });
    });
    this.getLocalStorage();

    this.displayTime();

    this.displayBooks(this.library);
  }
}

const awesomeBook = new AwesomeBook();

awesomeBook.main();
