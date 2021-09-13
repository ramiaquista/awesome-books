let library = [];

const Book = (title, author) => {
    library.push({title, author});
};

const removeBook = (title) => {
    library = library.filter((book) => book.title !== title);
}