class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Catalog {
  constructor() {
    this.books = [];
  }
  add(book) {
    this.books.push(book);
  }
}

const catalog = new Catalog();
catalog.add(new Book("Dune", "Frank Herbert"));
catalog.add(new Book("Kindred", "Octavia Butler"));
console.log(catalog.books.length);
