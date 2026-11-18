---
id: challenge
section: KẾT HỢP KIẾN THỨC
title: Bài tập thực hành
summary: Chọn lớp phù hợp
duration: 8 phút
description: Áp dụng mô hình lớp và đối tượng vào ví dụ thư viện nhỏ.
goal: Tạo hai cuốn sách, lưu vào danh mục và in số lượng sách.
takeaways:
  - label: Sách
    text: Mỗi thể hiện giữ tên sách và tác giả riêng.
  - label: Danh mục
    text: Danh mục sở hữu một bộ sưu tập sách.
  - label: Đến lượt bạn
    text: Tiếp theo, hãy thêm phương thức search_by_title().
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
