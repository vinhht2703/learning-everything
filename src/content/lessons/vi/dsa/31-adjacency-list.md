---
id: adjacency-list
order: 31
section: ĐỒ THỊ
title: Danh sách kề
summary: DFS và BFS trên mọi đồ thị
duration: 20 phút
description: "Phần lớn đồ thị thực tế được lưu dưới dạng danh sách kề: mỗi đỉnh giữ danh sách các đỉnh kề. DFS và BFS hoạt động giống như trên lưới."
goal: Tạo danh sách kề từ các cạnh và chạy DFS, BFS trên đó trong O(V + E).
eyebrow: Ý TƯỞNG CHÍNH
conceptTitle: Đỉnh kề thay cho các hướng đi
formula: "adj = { đỉnh: [các đỉnh kề] } · DFS / BFS = O(V + E)"
takeaways:
  - label: Tạo một lần
    text: Chuyển danh sách cạnh thành dict các đỉnh kề.
  - label: O(V + E)
    text: Mỗi đỉnh và cạnh được xử lý một lần.
  - label: BFS hay DFS
    text: Ít cạnh nhất → BFS; khám phá / đếm → DFS.
widget: graph-bfs
widgetTitle: Chạy BFS trên đồ thị có hướng
widgetDescription: Thêm hoặc xóa cạnh, chọn đỉnh bắt đầu và chạy từng bước hàng đợi. Mỗi đỉnh hiện khoảng cách khi được tìm thấy.
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
  description: Tạo danh sách kề, đếm đường bằng DFS và tìm lộ trình ngắn nhất bằng BFS.
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
  - op: Tạo danh sách kề
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
reflectionPrompt: Mô hình hóa điều kiện tiên quyết các môn học thành đồ thị có hướng. Một chu trình sẽ có nghĩa là gì?
---

Đề bài thường cho các cạnh dưới dạng cặp, như `[["A", "B"], ["B", "C"]]`. Hãy biến chúng thành một từ điển từ mỗi đỉnh tới danh sách các đỉnh kề (cả hai chiều nếu đồ thị vô hướng). Sau đó, DFS và BFS trên đồ thị giống hệt phiên bản trên lưới, chỉ khác là bốn hướng được thay bằng `for neighbour in adj[node]`.

Mỗi đỉnh được thăm một lần và mỗi cạnh được xét một lần (hai lần nếu vô hướng), nên cả hai thuật toán chạy trong **O(V + E)**. Dùng BFS để tìm số cạnh ít nhất giữa hai đỉnh, DFS để khám phá mọi thứ đến được, đếm đường hoặc phát hiện chu trình. Điều kiện tiên quyết của môn học, tuyến bay, liên kết web và mạng xã hội đều được giải theo cách này.
