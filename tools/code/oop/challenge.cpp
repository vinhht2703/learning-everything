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
