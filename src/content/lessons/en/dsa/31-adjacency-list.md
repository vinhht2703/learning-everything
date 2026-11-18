---
id: adjacency-list
order: 31
section: GRAPHS
title: Adjacency lists
summary: DFS and BFS on any graph
duration: 20 min
description: "Most real graphs are stored as adjacency lists: each vertex keeps a list of its neighbours. DFS and BFS work the same way as on grids."
goal: Build an adjacency list from edges and run DFS and BFS on it in O(V + E).
eyebrow: THE BIG IDEA
conceptTitle: Neighbours instead of directions
formula: "adj = { node: [neighbours] } · DFS / BFS = O(V + E)"
takeaways:
  - label: Build once
    text: Convert the edge list into a dict of neighbours.
  - label: O(V + E)
    text: Each vertex and edge is processed once.
  - label: BFS vs DFS
    text: Fewest edges → BFS; explore / count → DFS.
widget: graph-bfs
widgetTitle: Run BFS on a directed graph
widgetDescription: Add or remove edges, pick a start node and step through the queue. Each node shows its distance once found.
code:
  file: adjacency_list.py
  lang: python
  source: |-
    from collections import deque

    # Directed edges, e.g. "you can fly from A to B".
    edges = [["A", "B"], ["B", "C"], ["B", "E"], ["C", "E"], ["E", "D"]]

    adj = {}
    for src, dst in edges:
        adj.setdefault(src, []).append(dst)
        adj.setdefault(dst, [])

    def count_paths(node, target, visited):
        # DFS with backtracking: how many different routes reach the target?
        if node in visited:
            return 0
        if node == target:
            return 1
        visited.add(node)
        total = sum(count_paths(n, target, visited) for n in adj[node])
        visited.remove(node)
        return total

    def shortest(node, target):
        # BFS: fewest edges from node to target
        queue, visited, length = deque([node]), {node}, 0
        while queue:
            for _ in range(len(queue)):
                cur = queue.popleft()
                if cur == target:
                    return length
                for n in adj[cur]:
                    if n not in visited:
                        visited.add(n)
                        queue.append(n)
            length += 1
        return -1

    print(adj)
    print("paths A->E:", count_paths("A", "E", set()), "| shortest A->D:", shortest("A", "D"))
  output: |-
    {'A': ['B'], 'B': ['C', 'E'], 'C': ['E'], 'E': ['D'], 'D': []}
    paths A->E: 2 | shortest A->D: 3
  description: Build an adjacency list, count paths with DFS and find the shortest route with BFS.
  variants:
    - lang: javascript
      file: adjacency_list.js
      source: |-
        // Directed edges, e.g. "you can fly from A to B".
        const edges = [["A", "B"], ["B", "C"], ["B", "E"], ["C", "E"], ["E", "D"]];

        const adj = {};
        for (const [src, dst] of edges) {
          (adj[src] ??= []).push(dst);
          adj[dst] ??= [];
        }

        // DFS with backtracking: how many different routes reach the target?
        function countPaths(node, target, visited) {
          if (visited.has(node)) return 0;
          if (node === target) return 1;
          visited.add(node);
          const total = adj[node].reduce((sum, n) => sum + countPaths(n, target, visited), 0);
          visited.delete(node);
          return total;
        }

        // BFS: fewest edges from node to target
        function shortest(node, target) {
          let queue = [node];
          const visited = new Set([node]);
          for (let length = 0; queue.length; length++) {
            const next = [];
            for (const cur of queue) {
              if (cur === target) return length;
              for (const n of adj[cur]) if (!visited.has(n)) { visited.add(n); next.push(n); }
            }
            queue = next;
          }
          return -1;
        }

        console.log(adj);
        console.log("paths A->E:", countPaths("A", "E", new Set()), "| shortest A->D:", shortest("A", "D"));
      output: |-
        { A: [ 'B' ], B: [ 'C', 'E' ], C: [ 'E' ], E: [ 'D' ], D: [] }
        paths A->E: 2 | shortest A->D: 3
    - lang: cpp
      file: adjacency_list.cpp
      source: |-
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
      output: |-
        A -> B 
        B -> C E 
        C -> E 
        D -> 
        E -> D 
        paths A->E: 2 | shortest A->D: 3
complexity:
  - op: Build adjacency list
    time: O(E)
    space: O(V + E)
  - op: DFS / BFS
    time: O(V + E)
    space: O(V)
videos:
  - title: Breadth First Search Algorithm | Shortest Path | Graph Theory
    channel: WilliamFiset
    url: https://www.youtube.com/watch?v=oDqjPvD54Ss
  - title: Depth First Search Algorithm | Graph Theory
    channel: WilliamFiset
    url: https://www.youtube.com/watch?v=7fujbpJ0LB4
practice:
  - title: Find if Path Exists in Graph
    url: https://leetcode.com/problems/find-if-path-exists-in-graph/
    difficulty: easy
  - title: Clone Graph
    url: https://leetcode.com/problems/clone-graph/
    difficulty: medium
  - title: Course Schedule
    url: https://leetcode.com/problems/course-schedule/
    difficulty: medium
reflectionPrompt: Model your course prerequisites as a directed graph. What would a cycle mean?
---

Problems usually give you edges as pairs, such as `[["A", "B"], ["B", "C"]]`. Turn them into a dictionary from each vertex to its list of neighbours (both directions if the graph is undirected). After that, graph DFS and BFS look exactly like the grid versions, except that the four directions are replaced by `for neighbour in adj[node]`.

Every vertex is visited once and every edge is looked at once (twice if undirected), so both searches run in **O(V + E)**. Use BFS for the fewest edges between two nodes, DFS to explore everything reachable, count paths, or detect cycles. Course prerequisites, flight routes, web links and social networks are all solved this way.
