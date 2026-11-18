#include <iostream>
#include <map>
#include <utility>
#include <vector>
using namespace std;

int main() {
    // The same undirected graph, three ways.  Edges: A-B, A-C, B-C, C-D
    vector<char> nodes = {'A', 'B', 'C', 'D'};
    vector<pair<char, char>> edges = {{'A', 'B'}, {'A', 'C'}, {'B', 'C'}, {'C', 'D'}};

    // 1. Adjacency matrix
    vector<vector<int>> matrix(4, vector<int>(4, 0));
    for (auto [a, b] : edges) matrix[a - 'A'][b - 'A'] = matrix[b - 'A'][a - 'A'] = 1;

    // 2. Adjacency list
    map<char, vector<char>> adj;
    for (auto [a, b] : edges) { adj[a].push_back(b); adj[b].push_back(a); }

    for (auto& row : matrix) {
        for (int v : row) cout << v << " ";
        cout << endl;
    }
    for (auto& [node, neighbours] : adj) {
        cout << node << ": ";
        for (char n : neighbours) cout << n << " ";
        cout << endl;
    }
    cout << "degree of C: " << adj['C'].size() << " | B-D connected? " << boolalpha << (matrix[1][3] == 1) << endl;
}
