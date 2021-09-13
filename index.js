let library = [];

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
}

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem('library'));

  if (!data) return;

  library = data;
}

function setLocalStorage() {
  localStorage.setItem('library', JSON.stringify(library));
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
      let li = document.createElement('li');
      let p1 = document.createElement("p");
      let p2 = document.createElement("p");
			let removeBtn = document.createElement("button");
			let hr = document.createElement("hr");

			p1.innerHTML = book.title;
			p2.innerHTML = book.author;
			removeBtn.innerHTML = "Remove";
			removeBtn.classList.add("remove-button");
			li.appendChild(p1);
			li.appendChild(p2);
			li.appendChild(removeBtn);
			li.appendChild(hr);
			booklist.appendChild(li);
    });
  }

	const allDeleteButtons = document.querySelectorAll(".remove-button");

	if(allDeleteButtons.length > 0) {
    allDeleteButtons.forEach((button) => {
      button.addEventListener("click", deleteThisBook.bind(this));
    });
	}
};

const addBook = () => {
  let titleBook = document.getElementById('titleBook').value;
  let authorBook = document.getElementById('authorBook').value;
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
