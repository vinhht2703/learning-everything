---
id: intro-to-graphs
order: 28
section: ĐỒ THỊ
title: Giới thiệu đồ thị
summary: Đỉnh, cạnh, ba cách biểu diễn
duration: 22 phút
description: Đồ thị là tập các đỉnh nối với nhau bằng cạnh. Cây và danh sách liên kết là đồ thị đặc biệt; bản đồ, mạng lưới và quan hệ phụ thuộc là đồ thị tổng quát.
goal: Mô tả một đồ thị bằng danh sách cạnh, ma trận kề và danh sách kề, và biết chọn cách nào.
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Các đối tượng và kết nối giữa chúng
formula: "G = (V, E) · ma trận: O(V²) bộ nhớ · danh sách kề: O(V + E) bộ nhớ"
takeaways:
  - label: Đỉnh / cạnh
    text: Các đối tượng và kết nối giữa chúng.
  - label: Có hướng / vô hướng
    text: Kết nối một chiều hay hai chiều.
  - label: Bậc
    text: Số cạnh chạm vào một đỉnh.
widget: graph-reps
widgetTitle: Một đồ thị, ba cách biểu diễn
widgetDescription: Bật/tắt ô ma trận để thêm hoặc xóa cạnh và xem danh sách kề, danh sách cạnh cập nhật. Thử chế độ có hướng.
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
  description: Tạo ma trận kề và danh sách kề từ danh sách cạnh.
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
  - op: "Kiểm tra cạnh: ma trận / danh sách"
    time: O(1) / O(deg)
    space: O(V²) / O(V + E)
  - op: "Liệt kê đỉnh kề: ma trận / danh sách"
    time: O(V) / O(deg)
    space: —
videos:
  - title: Graph Theory Introduction
    channel: WilliamFiset
    url: https://www.youtube.com/watch?v=eQA-m22wjTQ
  - title: Algorithms Course - Graph Theory Tutorial from a Google Engineer
    channel: freeCodeCamp.org
    url: https://www.youtube.com/watch?v=09_LlHjoEiY
    note: khóa học đầy đủ
practice:
  - title: Find Center of Star Graph
    url: https://leetcode.com/problems/find-center-of-star-graph/
    difficulty: easy
  - title: Find the Town Judge
    url: https://leetcode.com/problems/find-the-town-judge/
    difficulty: easy
reflectionPrompt: Mô tả một thứ trong cuộc sống của bạn dưới dạng đồ thị. Các cạnh của nó có hướng không?
---

Đồ thị có các **đỉnh** (nút) và **cạnh** nối giữa chúng. Cạnh có thể **vô hướng** (tình bạn: hai chiều) hoặc **có hướng** (theo dõi ai đó, đường một chiều), và có thể mang trọng số như khoảng cách. Khác với cây, đồ thị không có gốc và có thể có chu trình.

Ba cách biểu diễn phổ biến: **danh sách cạnh** (chỉ các cặp), **ma trận kề** (lưới V × V trong đó `matrix[a][b] = 1` nghĩa là có cạnh, kiểm tra cạnh O(1) nhưng tốn O(V²) bộ nhớ), và **danh sách kề** (mỗi đỉnh ánh xạ tới các đỉnh kề, O(V + E) bộ nhớ và duyệt nhanh). Phần lớn thuật toán đồ thị dùng danh sách kề. Một lưới ô vuông cũng là đồ thị: mỗi ô nối với các ô trên/dưới/trái/phải.
