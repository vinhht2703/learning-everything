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
