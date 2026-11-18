class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  #books = [];

  addBook(book) {
    this.#books.push(book);
  }

  findByTitle(title) {
    return this.#books.filter((b) =>
      b.title.toLowerCase().includes(title.toLowerCase()));
  }
}

const library = new Library();
library.addBook(new Book("Dune", "Frank Herbert"));
console.log(library.findByTitle("dune").length);
