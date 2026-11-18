---
id: intro-to-graphs
order: 28
section: GRAPHS
title: Intro to graphs
summary: Vertices, edges, three representations
duration: 22 min
description: A graph is a set of vertices connected by edges. Trees and linked lists are special graphs; maps, networks and dependencies are general ones.
goal: Describe a graph with an edge list, an adjacency matrix and an adjacency list, and choose between them.
eyebrow: THE BIG IDEA
conceptTitle: Things and the connections between them
formula: "G = (V, E) · matrix: O(V²) space · adjacency list: O(V + E) space"
takeaways:
  - label: Vertex / edge
    text: Things, and the connections between them.
  - label: Directed vs undirected
    text: One-way or two-way connections.
  - label: Degree
    text: How many edges touch a vertex.
widget: graph-reps
widgetTitle: One graph, three representations
widgetDescription: Toggle matrix cells to add or remove edges and watch the list and edge list update. Try directed mode.
code:
  file: graph_representations.py
  lang: python
  source: |-
    # The same undirected graph, three ways.  Edges: A-B, A-C, B-C, C-D
    nodes = ["A", "B", "C", "D"]
    edges = [("A", "B"), ("A", "C"), ("B", "C"), ("C", "D")]

    # 1. Adjacency matrix: matrix[i][j] = 1 if there is an edge
    index = {n: i for i, n in enumerate(nodes)}
    matrix = [[0] * len(nodes) for _ in nodes]
    for a, b in edges:
        matrix[index[a]][index[b]] = matrix[index[b]][index[a]] = 1

    # 2. Adjacency list: node -> neighbours
    adj = {n: [] for n in nodes}
    for a, b in edges:
        adj[a].append(b)
        adj[b].append(a)

    for row in matrix:
        print(row)
    print(adj)
    print("degree of C:", len(adj["C"]), "| B-D connected?", matrix[index["B"]][index["D"]] == 1)
  output: |-
    [0, 1, 1, 0]
    [1, 0, 1, 0]
    [1, 1, 0, 1]
    [0, 0, 1, 0]
    {'A': ['B', 'C'], 'B': ['A', 'C'], 'C': ['A', 'B', 'D'], 'D': ['C']}
    degree of C: 3 | B-D connected? False
  description: Build an adjacency matrix and an adjacency list from an edge list.
  variants:
    - lang: javascript
      file: graph_representations.js
      source: |-
        // The same undirected graph, three ways.  Edges: A-B, A-C, B-C, C-D
        const nodes = ["A", "B", "C", "D"];
        const edges = [["A", "B"], ["A", "C"], ["B", "C"], ["C", "D"]];

        // 1. Adjacency matrix: matrix[i][j] = 1 if there is an edge
        const index = Object.fromEntries(nodes.map((n, i) => [n, i]));
        const matrix = nodes.map(() => nodes.map(() => 0));
        for (const [a, b] of edges) matrix[index[a]][index[b]] = matrix[index[b]][index[a]] = 1;

        // 2. Adjacency list: node -> neighbours
        const adj = Object.fromEntries(nodes.map((n) => [n, []]));
        for (const [a, b] of edges) { adj[a].push(b); adj[b].push(a); }

        for (const row of matrix) console.log(row);
        console.log(adj);
        console.log("degree of C:", adj.C.length, "| B-D connected?", matrix[index.B][index.D] === 1);
      output: |-
        [ 0, 1, 1, 0 ]
        [ 1, 0, 1, 0 ]
        [ 1, 1, 0, 1 ]
        [ 0, 0, 1, 0 ]
        { A: [ 'B', 'C' ], B: [ 'A', 'C' ], C: [ 'A', 'B', 'D' ], D: [ 'C' ] }
        degree of C: 3 | B-D connected? false
    - lang: cpp
      file: graph_representations.cpp
      source: |-
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
      output: |-
        0 1 1 0 
        1 0 1 0 
        1 1 0 1 
        0 0 1 0 
        A: B C 
        B: A C 
        C: A B D 
        D: C 
        degree of C: 3 | B-D connected? false
complexity:
  - op: "Edge check: matrix / list"
    time: O(1) / O(deg)
    space: O(V²) / O(V + E)
  - op: "List all neighbours: matrix / list"
    time: O(V) / O(deg)
    space: —
videos:
  - title: Graph Theory Introduction
    channel: WilliamFiset
    url: https://www.youtube.com/watch?v=eQA-m22wjTQ
  - title: Algorithms Course - Graph Theory Tutorial from a Google Engineer
    channel: freeCodeCamp.org
    url: https://www.youtube.com/watch?v=09_LlHjoEiY
    note: full course
practice:
  - title: Find Center of Star Graph
    url: https://leetcode.com/problems/find-center-of-star-graph/
    difficulty: easy
  - title: Find the Town Judge
    url: https://leetcode.com/problems/find-the-town-judge/
    difficulty: easy
reflectionPrompt: Describe something in your life as a graph. Are its edges directed?
---

A graph has **vertices** (nodes) and **edges** between them. Edges can be **undirected** (friendship: both ways) or **directed** (following someone, a one-way street), and may carry weights such as distances. Unlike a tree there is no root, and there can be cycles.

Three common representations: an **edge list** (just the pairs), an **adjacency matrix** (a V × V grid where `matrix[a][b] = 1` means an edge, O(1) to test an edge but O(V²) memory), and an **adjacency list** (each node maps to its neighbours, O(V + E) memory and fast to iterate). Most graph algorithms use adjacency lists. A grid of cells is also a graph: each cell is connected to its up/down/left/right neighbours.
