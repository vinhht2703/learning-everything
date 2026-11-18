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
