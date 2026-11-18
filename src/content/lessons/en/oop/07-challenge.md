---
id: challenge
section: PUT IT TOGETHER
title: Practice challenge
summary: Choose the right class
duration: 8 min
description: Apply the class and object model to a compact library example.
goal: Create two books, store them in a catalog, and print the catalog size.
takeaways:
  - label: Book
    text: Each instance keeps its own title and author.
  - label: Catalog
    text: The catalog owns a collection of books.
  - label: Your turn
    text: Add a search_by_title() method next.
code:
  file: practice.py
  lang: python
  source: |-
    class Book:
        def __init__(self, title, author):
            self.title = title
            self.author = author

    class Catalog:
        def __init__(self):
            self.books = []

        def add(self, book):
            self.books.append(book)

    catalog = Catalog()
    catalog.add(Book("Dune", "Frank Herbert"))
    catalog.add(Book("Kindred", "Octavia Butler"))
    print(len(catalog.books))
  output: "2"
  variants:
    - lang: javascript
      file: practice.js
      source: |-
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
      output: "2"
    - lang: cpp
      file: practice.cpp
      source: |-
        #include <iostream>
        #include <string>
        #include <vector>
        using namespace std;

        struct Book {
            string title;
            string author;
        };

        class Catalog {
        public:
            vector<Book> books;
            void add(const Book& book) { books.push_back(book); }
        };

        int main() {
            Catalog catalog;
            catalog.add({"Dune", "Frank Herbert"});
            catalog.add({"Kindred", "Octavia Butler"});
            cout << catalog.books.size() << endl;
        }
      output: "2"
order: 7
---
