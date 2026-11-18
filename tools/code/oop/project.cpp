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
