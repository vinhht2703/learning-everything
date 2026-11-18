#include <iostream>
#include <map>
#include <queue>
#include <set>
#include <string>
#include <vector>
using namespace std;

map<string, vector<string>> adj;

// DFS with backtracking: how many different routes reach the target?
int countPaths(const string& node, const string& target, set<string>& visited) {
    if (visited.count(node)) return 0;
    if (node == target) return 1;
    visited.insert(node);
    int total = 0;
    for (const string& n : adj[node]) total += countPaths(n, target, visited);
    visited.erase(node);
    return total;
}

// BFS: fewest edges from node to target
int shortest(const string& node, const string& target) {
    queue<string> q;
    set<string> visited = {node};
    q.push(node);
    for (int length = 0; !q.empty(); length++) {
        for (int k = q.size(); k > 0; k--) {
            string cur = q.front();
            q.pop();
            if (cur == target) return length;
            for (const string& n : adj[cur])
                if (visited.insert(n).second) q.push(n);
        }
    }
    return -1;
}

int main() {
    // Directed edges, e.g. "you can fly from A to B".
    vector<vector<string>> edges = {{"A", "B"}, {"B", "C"}, {"B", "E"}, {"C", "E"}, {"E", "D"}};
    for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]]; }

    for (auto& [node, out] : adj) {
        cout << node << " -> ";
        for (auto& n : out) cout << n << " ";
        cout << endl;
    }
    set<string> visited;
    cout << "paths A->E: " << countPaths("A", "E", visited) << " | shortest A->D: " << shortest("A", "D") << endl;
}
