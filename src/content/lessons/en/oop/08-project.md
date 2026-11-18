---
id: project
section: PUT IT TOGETHER
title: Mini project
summary: Build a library catalog
duration: 15 min
description: Bring the ideas together in a small library catalog with a clean interface.
goal: Create a book model and a catalog that supports adding and searching for books.
takeaways:
  - label: Model
    text: Book holds the state for one title.
  - label: Encapsulation
    text: Library manages its own collection.
  - label: Next step
    text: Add a loan status or a return_book() method.
code:
  file: library.py
  lang: python
  source: |-
    class Book:
        def __init__(self, title, author):
            self.title = title
            self.author = author

    class Library:
        def __init__(self):
            self._books = []

        def add_book(self, book):
            self._books.append(book)

        def find_by_title(self, title):
            return [b for b in self._books
                    if title.lower() in b.title.lower()]

    library = Library()
    library.add_book(Book("Dune", "Frank Herbert"))
    print(len(library.find_by_title("dune")))
  output: "1"
  variants:
    - lang: javascript
      file: library.js
      source: |-
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
      output: "1"
    - lang: cpp
      file: library.cpp
      source: |-
        #include <algorithm>
        #include <cctype>
        #include <iostream>
        #include <string>
        #include <vector>
        using namespace std;

        struct Book {
            string title;
            string author;
        };

        string lower(string s) {
            transform(s.begin(), s.end(), s.begin(), ::tolower);
            return s;
        }

        class Library {
        private:
            vector<Book> books;

        public:
            void addBook(const Book& book) { books.push_back(book); }

            vector<Book> findByTitle(const string& title) {
                vector<Book> found;
                for (const Book& b : books)
                    if (lower(b.title).find(lower(title)) != string::npos)
                        found.push_back(b);
                return found;
            }
        };

        int main() {
            Library library;
            library.addBook({"Dune", "Frank Herbert"});
            cout << library.findByTitle("dune").size() << endl;
        }
      output: "1"
order: 8
---
